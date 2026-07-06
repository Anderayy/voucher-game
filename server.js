const crypto = require("crypto");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
const port = process.env.PORT || 3000;
const publicDir = __dirname;
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "db.json");
const sessionTtlMs = 1000 * 60 * 60 * 24 * 7;

const seedTransactions = [
  ["TX-90214", "Mobile Legends Diamonds", "GOPAY", 150000, "SUCCESS"],
  ["TX-90215", "Genshin Impact Crystals", "QRIS", 799000, "PENDING"],
  ["TX-90216", "Free Fire Diamonds", "OVO", 45000, "SUCCESS"],
  ["TX-90217", "Valorant Points", "DANA", 210000, "SUCCESS"],
  ["TX-90218", "PUBG Mobile UC", "Bank Transfer", 300000, "PENDING"],
  ["INV-2841-ML", "Mobile Legends 257 Diamonds", "QRIS", 84500, "SUCCESS"],
  ["INV-9210-GS", "Genshin Blessing of Moon", "DANA", 79000, "PENDING"]
];

const qris = {
  merchant: "SMASIH DIGITAL",
  mid: "26070100000585",
  nmid: "ID1026542504703",
  web: "https://ngegameyukz.com/",
  value: "00020101021126670016COM.NOBUBANK.WWW01189360050312600001450214260701000005850303UKE51440014ID.CO.QRIS.WWW0215ID10265425047030303UKE5204581753033605802ID5914SMASIH DIGITAL6005DEPOK61051640062070703A01630455B7"
};

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
    points: user.points || 0,
    balance: user.balance || 0
  };
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const attempt = hashPassword(password, salt).split(":")[1];
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(attempt, "hex"));
}

async function readDb() {
  try {
    const raw = await fs.readFile(dbPath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await fs.mkdir(dataDir, { recursive: true });
    const now = new Date().toISOString();
    const db = {
      users: [
        {
          id: "usr-admin",
          name: "Admin",
          email: "admin@ngegameyukz.com",
          passwordHash: hashPassword("1234"),
          role: "admin",
          points: 1240,
          balance: 1250000,
          createdAt: now
        }
      ],
      sessions: [],
      transactions: seedTransactions.map((row) => ({
        invoice: row[0],
        product: row[1],
        item: row[1],
        payment: row[2],
        amount: row[3],
        status: row[4],
        userId: null,
        gameUserId: "",
        serverId: "",
        phone: "",
        createdAt: now,
        paidAt: row[4] === "SUCCESS" ? now : null
      })),
      qris
    };
    await writeDb(db);
    return db;
  }
}

async function writeDb(db) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

async function getSession(req) {
  const token = String(req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return { db: await readDb(), user: null, token: null };
  const db = await readDb();
  const now = Date.now();
  db.sessions = (db.sessions || []).filter((session) => new Date(session.expiresAt).getTime() > now);
  const session = db.sessions.find((item) => item.token === token);
  const user = session ? db.users.find((item) => item.id === session.userId) : null;
  return { db, user, token };
}

function requireAuth(handler) {
  return async (req, res, next) => {
    try {
      const session = await getSession(req);
      if (!session.user) {
        res.status(401).json({ error: "Login diperlukan." });
        return;
      }
      req.db = session.db;
      req.user = session.user;
      req.token = session.token;
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    if (!name || !email || password.length < 4) {
      res.status(400).json({ error: "Nama, email, dan password minimal 4 karakter wajib diisi." });
      return;
    }
    const db = await readDb();
    if (db.users.some((user) => user.email === email)) {
      res.status(409).json({ error: "Email sudah terdaftar." });
      return;
    }
    const user = {
      id: `usr-${Date.now().toString(36)}${crypto.randomBytes(3).toString("hex")}`,
      name,
      email,
      passwordHash: hashPassword(password),
      role: "user",
      points: 0,
      balance: 0,
      createdAt: new Date().toISOString()
    };
    const token = crypto.randomBytes(32).toString("hex");
    db.users.push(user);
    db.sessions.push({ token, userId: user.id, expiresAt: new Date(Date.now() + sessionTtlMs).toISOString() });
    await writeDb(db);
    res.status(201).json({ user: publicUser(user), token });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const identifier = normalizeEmail(req.body.identifier);
    const password = String(req.body.password || "");
    const db = await readDb();
    const user = db.users.find((item) => item.email === identifier || item.name.toLowerCase() === identifier);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      res.status(401).json({ error: "Login gagal. Cek email/username dan password." });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    db.sessions.push({ token, userId: user.id, expiresAt: new Date(Date.now() + sessionTtlMs).toISOString() });
    await writeDb(db);
    res.json({ user: publicUser(user), token });
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/me", requireAuth(async (req, res) => {
  res.json({ user: publicUser(req.user) });
}));

app.post("/api/auth/logout", requireAuth(async (req, res) => {
  req.db.sessions = req.db.sessions.filter((session) => session.token !== req.token);
  await writeDb(req.db);
  res.json({ ok: true });
}));

app.get("/api/transactions", async (req, res, next) => {
  try {
    const db = await readDb();
    res.json({ transactions: db.transactions.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/transactions/mine", requireAuth(async (req, res) => {
  const mine = req.db.transactions
    .filter((transaction) => transaction.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ transactions: mine });
}));

app.get("/api/transactions/:invoice", async (req, res, next) => {
  try {
    const db = await readDb();
    const invoice = String(req.params.invoice || "").replace("#", "").toUpperCase();
    const transaction = db.transactions.find((item) => item.invoice.toUpperCase() === invoice);
    if (!transaction) {
      res.status(404).json({ error: "Invoice tidak ditemukan." });
      return;
    }
    res.json({ transaction });
  } catch (error) {
    next(error);
  }
});

app.post("/api/orders", requireAuth(async (req, res) => {
  const product = String(req.body.product || "").trim();
  const item = String(req.body.item || "").trim();
  const payment = String(req.body.payment || "QRIS").trim();
  const amount = Number(req.body.amount || 0);
  const gameUserId = String(req.body.gameUserId || "").trim();
  const serverId = String(req.body.serverId || "").trim();
  const phone = String(req.body.phone || "").trim();
  if (!product || !item || !amount || !gameUserId || !phone) {
    res.status(400).json({ error: "Produk, nominal, User ID, WhatsApp, dan total bayar wajib diisi." });
    return;
  }
  const now = new Date().toISOString();
  const invoice = `TX-${Date.now().toString().slice(-6)}${crypto.randomInt(10, 99)}`;
  const transaction = {
    invoice,
    product,
    item,
    payment,
    amount,
    status: payment === "QRIS" ? "PENDING" : "SUCCESS",
    userId: req.user.id,
    gameUserId,
    serverId,
    phone,
    createdAt: now,
    paidAt: payment === "QRIS" ? null : now
  };
  req.db.transactions.unshift(transaction);
  await writeDb(req.db);
  res.status(201).json({ transaction, qris: req.db.qris });
}));

app.post("/api/orders/:invoice/confirm", requireAuth(async (req, res) => {
  const invoice = String(req.params.invoice || "").replace("#", "").toUpperCase();
  const transaction = req.db.transactions.find((item) => item.invoice.toUpperCase() === invoice && item.userId === req.user.id);
  if (!transaction) {
    res.status(404).json({ error: "Invoice tidak ditemukan." });
    return;
  }
  transaction.status = "SUCCESS";
  transaction.paidAt = new Date().toISOString();
  req.user.points = (req.user.points || 0) + Math.max(1, Math.round(transaction.amount / 1000));
  await writeDb(req.db);
  res.json({ transaction, user: publicUser(req.user) });
}));

app.get("/api/qris", async (req, res, next) => {
  try {
    const db = await readDb();
    res.json({ qris: db.qris });
  } catch (error) {
    next(error);
  }
});

app.get("/api/qris.svg", async (req, res, next) => {
  try {
    const db = await readDb();
    const value = String(req.query.data || db.qris.value);
    const svg = await QRCode.toString(value, {
      type: "svg",
      margin: 2,
      width: 280,
      errorCorrectionLevel: "M"
    });
    res.type("image/svg+xml").send(svg);
  } catch (error) {
    next(error);
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(express.static(publicDir, {
  extensions: ["html"],
  maxAge: 0,
  etag: false
}));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Server sedang bermasalah." });
});

app.listen(port, () => {
  console.log(`NgeGameYukz server running on port ${port}`);
});

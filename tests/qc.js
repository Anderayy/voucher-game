const { chromium } = require("playwright");

const base = process.env.QC_BASE_URL || "http://localhost:3000";

async function visible(locator) {
  return locator.evaluate((el) => getComputedStyle(el).display !== "none");
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 768 } });
  const email = `qc${Date.now()}@example.com`;

  await page.goto(base, { waitUntil: "networkidle" });
  await page.click("#accountButton");
  await page.click('[data-auth-tab="register"]');
  await page.fill("#authName", email);
  await page.fill("#authPassword", "1234");
  await page.click(".submit-auth");
  await page.waitForSelector("#userScreen.active", { timeout: 10000 });

  await page.click('.user-topbar [data-screen="home"]');
  await page.waitForSelector("#homeScreen.active", { timeout: 10000 });
  const userAccountText = await page.locator("#accountButton").innerText();
  const userAdminVisible = await visible(page.locator('.site-header [data-screen="admin"]'));

  await page.reload({ waitUntil: "networkidle" });
  const reloadedText = await page.locator("#accountButton").innerText();
  await page.click("#accountButton");
  await page.waitForSelector("#userScreen.active", { timeout: 10000 });
  await page.click(".settings-card .danger");
  await page.waitForSelector("#authScreen.active", { timeout: 10000 });

  await page.goto(base, { waitUntil: "networkidle" });
  await page.click("#accountButton");
  await page.fill("#authName", "admin@ngegameyukz.com");
  await page.fill("#authPassword", "1234");
  await page.click(".submit-auth");
  await page.waitForSelector("#adminScreen.active", { timeout: 10000 });
  await page.click('.admin-sidebar [data-screen="home"]');
  await page.waitForSelector("#homeScreen.active", { timeout: 10000 });
  const adminNavVisible = await visible(page.locator('.site-header [data-screen="admin"]'));
  const adminAccountText = await page.locator("#accountButton").innerText();

  await page.click(".flash-card button");
  await page.fill("#userIdInput", "12345678");
  await page.fill("#phoneInput", "+6281234567890");
  await page.click("#orderNow");
  await page.waitForSelector("#paymentModal.show", { timeout: 10000 });
  await page.waitForLoadState("networkidle");
  const qrisVisible = await page.locator("#qrisImage").evaluate((img) => img.complete && img.naturalWidth > 0);
  const hasQrisTextarea = await page.locator("#qrisString").count();
  await page.click("#confirmPayment");
  await page.waitForFunction(() => document.querySelector("#paymentState")?.textContent.includes("BERHASIL"), null, { timeout: 10000 });
  const paymentState = await page.locator("#paymentState").innerText();

  await browser.close();

  const result = {
    userAccountText,
    reloadedText,
    userAdminVisible,
    adminNavVisible,
    adminAccountText,
    qrisVisible,
    hasQrisTextarea,
    paymentState
  };
  console.log(JSON.stringify(result, null, 2));

  if (userAccountText.trim() !== "Akun Saya") throw new Error("User header still shows login after Topup navigation.");
  if (reloadedText.trim() !== "Akun Saya") throw new Error("Session was not restored after reload.");
  if (userAdminVisible) throw new Error("Admin menu is visible for a normal user.");
  if (!adminNavVisible) throw new Error("Admin menu is hidden for admin.");
  if (adminAccountText.trim() !== "Admin") throw new Error("Admin account state is not rendered.");
  if (!qrisVisible) throw new Error("QRIS image did not render.");
  if (hasQrisTextarea !== 0) throw new Error("QR string textarea is still visible in payment modal.");
  if (!paymentState.includes("BERHASIL")) throw new Error("Payment confirmation did not show success state.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

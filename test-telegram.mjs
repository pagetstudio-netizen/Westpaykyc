import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!token || !chatId) {
  console.error("❌ TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID manquant");
  process.exit(1);
}

const response = await fetch(
  `https://api.telegram.org/bot${token}/sendMessage`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text:
`🔔 WESTPAY TEST

✅ Telegram connection successful.

🔖 Reference: WP-TEST-001

⚠️ DEMO — TEST DATA ONLY`
    })
  }
);

const result = await response.json();

if (result.ok) {
  console.log("✅ Message envoyé dans le groupe WestPay Admin !");
} else {
  console.error("❌ Telegram a refusé la requête :");
  console.error(result);
}

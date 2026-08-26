export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  try {
    const {
      name,
      email,
      business,
      volume,
      countries,
      activity
    } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        error: "Missing required information"
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({
        ok: false,
        error: "Telegram configuration missing"
      });
    }

    const reference =
      "WP-" + Math.floor(100000 + Math.random() * 900000);

    const text = `
🔔 WESTPAY TEST APPLICATION

🔖 Reference: ${reference}

👤 Name:
${name}

📧 Email:
${email}

🏢 Business:
${business || "Not provided"}

💰 Monthly volume:
${volume || "Not provided"}

🌍 Countries:
${countries || "Not provided"}

📝 Activity:
${activity || "Not provided"}

⚠️ DEMO — TEST DATA ONLY
`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text
        })
      }
    );

    const result = await response.json();

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        error: "Telegram API error"
      });
    }

    return res.status(200).json({
      ok: true,
      reference
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
}

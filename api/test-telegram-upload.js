import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({
      ok: false,
      error: "Telegram configuration missing",
    });
  }

  try {
    const form = formidable({
      multiples: false,
      maxFileSize: 10 * 1024 * 1024,
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    const uploaded = files.file?.[0];

    if (!uploaded) {
      return res.status(400).json({
        ok: false,
        error: "No image received",
      });
    }

    const filePath = uploaded.filepath;

    const telegramForm = new FormData();

    telegramForm.append("chat_id", chatId);
    telegramForm.append(
      "caption",
      "🧪 WESTPAY TEST\n\n📎 Test image received from KYC form.\n\n⚠️ TEST FILE ONLY"
    );

    const buffer = fs.readFileSync(filePath);

    const blob = new Blob([buffer], {
      type: uploaded.mimetype || "image/jpeg",
    });

    telegramForm.append(
      "photo",
      blob,
      uploaded.originalFilename || "test-image.jpg"
    );

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendPhoto`,
      {
        method: "POST",
        body: telegramForm,
      }
    );

    const result = await response.json();

    try {
      fs.unlinkSync(filePath);
    } catch {}

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        error: "Telegram API error",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Test image sent to Telegram",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: "Upload failed",
    });
  }
}

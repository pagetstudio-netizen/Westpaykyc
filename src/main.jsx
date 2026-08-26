import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// TEST TELEGRAM UPLOAD
// Utilise uniquement une image non sensible pour ce test.
document.addEventListener("submit", async (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) return;

  const files = form.querySelectorAll('input[type="file"]');

  if (!files.length) return;

  let selectedFile = null;

  for (const input of files) {
    if (input.files && input.files.length > 0) {
      selectedFile = input.files[0];
      break;
    }
  }

  if (!selectedFile) return;

  event.preventDefault();

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("/api/test-telegram-upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.ok) {
      alert("✓ Test image sent to Telegram");
    } else {
      alert("Telegram upload failed");
      console.error(result);
    }
  } catch (error) {
    console.error(error);
    alert("Connection error");
  }
}, true);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

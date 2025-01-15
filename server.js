import express from "express";
import QRCode from "qrcode";

const app = express();
const PORT = 3000;

// parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// form
app.get("/", (req, res) => {
  res.send(`
    <h1>QR Code Generator</h1>
    <form action="/generate" method="POST">
      <label for="text">Enter text to generate QR Code:</label><br><br>
      <input type="text" id="text" name="text" required><br><br>
      <button type="submit">Generate</button>
    </form>
  `);
});

// generate qr code
app.post("/generate", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("Text is required to generate a QR code.");
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text);
    res.send(`
      <h1>Generated QR Code</h1>
      <img src="${qrCodeDataURL}" alt="QR Code"><br><br>
      <a href="/">Generate another QR Code</a>
    `);
  } catch (error) {
    res.status(500).send("Error generating QR Code.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

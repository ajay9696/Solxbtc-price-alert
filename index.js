const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// ===============================
// TELEGRAM BOT TOKEN
// ===============================
const token = "8762967387:AAGmtJVq_qio9VHN0DDoCQhSPRG8rbFkx08";

// ===============================
// TELEGRAM CHAT ID
// ===============================
const chatId = "8762967387";

// Create Telegram Bot
const bot = new TelegramBot(token, { polling: false });

// Function to fetch crypto prices
async function sendPrices() {
  try {

    // CoinGecko API
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true"
    );

    // Bitcoin Data
    const btcPrice = response.data.bitcoin.usd;
    const btcChange =
      response.data.bitcoin.usd_24h_change.toFixed(2);

    // Solana Data
    const solPrice = response.data.solana.usd;
    const solChange =
      response.data.solana.usd_24h_change.toFixed(2);

    // Telegram Message
    const message = `
🚀 LIVE CRYPTO PRICE ALERT

━━━━━━━━━━━━━━

🟠 BTC (Bitcoin)
💵 Price: $${btcPrice}
📈 24H Change: ${btcChange}%

━━━━━━━━━━━━━━

🟣 SOL (Solana)
💵 Price: $${solPrice}
📈 24H Change: ${solChange}%

━━━━━━━━━━━━━━

⏰ Updated Every 1 Minute
`;

    // Send Message
    await bot.sendMessage(chatId, message);

    console.log("Message Sent Successfully");

  } catch (error) {
    console.log("Error:", error.message);
  }
}

// Send every 1 minute
setInterval(sendPrices, 60000);

// Start instantly
sendPrices();

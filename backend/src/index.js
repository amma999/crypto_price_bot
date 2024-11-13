import dotenv from 'dotenv'
dotenv.config()
import axios from "axios"
import TelegramBot from "node-telegram-bot-api"
const token = process.env.TOKEN;
const eth_chat_id = process.env.ETH;
const btc_chat_id = process.env.BTC;


const bot = new TelegramBot(token, { polling: true });

let eth_setter = 1;
let btc_setter = 1;
const fetchCryptoData = async () => {
  try {
    const response_btc = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot');
    const response_eth = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot');
    const price_btc = parseInt(response_btc.data.data.amount) + "$";
    const price_eth = parseInt(response_eth.data.data.amount) + "$";



    if (eth_setter !== 0 && eth_setter !== price_eth) {
      bot.sendMessage(eth_chat_id, price_eth);
      eth_setter = price_eth;
    }
    if (btc_setter !== 0 && btc_setter !== price_btc) {
      bot.sendMessage(btc_chat_id, price_btc);
      btc_setter = price_btc;
    }
  } catch (error) {
    console.error(error);
  }
};



setInterval(() => {
  fetchCryptoData();
}, 30000);


const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');

const client = new Client({
  intents: Object.values(GatewayIntentBits),
});

const app = express();
const port = 4000;

const statusMessages = ["PLAYING", "SONG"];
const channelId = ''; // Replace with your desired channel ID

app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages.shift();
  statusMessages.push(currentStatus);

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: 'dnd',
  });

  const textChannel = client.channels.cache.get(channelId);
  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus}`)
      .catch(error => console.error('Error sending message:', error));
  } else {
    console.error('Text channel not found or invalid.');
  }
}

client.once('ready', () => {
  console.log(`✅ Bot is ready as ${client.user.tag}`);
  console.log(`✨ HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`❤️ WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();

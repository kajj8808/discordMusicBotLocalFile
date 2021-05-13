const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

const token = "token";

const randomNumber = (len) => Math.floor(Math.random() * (0 - len) + len);

const randomSongFile = () => {
  const songs = fs.readdirSync("songs");
  return songs[randomNumber(songs.length - 1)];
};

let autoPlay = false;
let connection = false;

const localPlaySong = async (message) => {
  if (connection === false) {
    connection = await message.member.voice.channel.join();
  }
  console.log(randomSongFile())
  const dispatcher = connection.play(`songs/${randomSongFile()}`);
  dispatcher.on("finish", () => {
    if (autoPlay === true) {
      localPlaySong(randomSongFile());
    } else {
      message.send("music finish!.");
    }
  });
};

const app = () => {
  client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.content === "/auto") {
      if (message.member.voice.channel) {
        autoPlay = true;
        localPlaySong(message);
      } else {
        message.reply("You need to join a voice channel first!");
      }
    }
  });
  client.login(token);
};

app();

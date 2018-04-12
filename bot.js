const Discord = require("discord.js");
const client = new Discord.Client();
const version = '0.1.0';
var Team = {};
var Role = {};
var Luvr = {};
var Inve = {};
let hellowed = false;

client.on('ready', () => {
  //console.log(`Logged in as ${423868710940311552}!`);
});

client.on('message', msg => { 
  if(hellowed == false) {
    msg.channel.send("Я обновился (Версия " + version + "), а Ваши экспириенсы были сброшены :/");
    hellowed = true;
  }
  
  if(!(msg.author.id in Team || msg.author.bot)) {
    Team[msg.author.id] = 0;
    Role[msg.author.id] = 0;
    Luvr[msg.author.id] = 0;
    Inve[msg.author.id] = [0, 0, 0, 0, 0, 0, 0, 0];
    msg.reply('Привет, друг! Либо ты новенький, либо твои данные были сброшены! Приятного общения!');
  }
});

client.login(process.env.BOT_TOKEN); // wow


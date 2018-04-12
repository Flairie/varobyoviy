const Discord = require("discord.js");
const client = new Discord.Client();
var Team = {};
var Role = {};
var Luvr = {};
let hellowed = false;

client.on('ready', () => {
  //console.log(`Logged in as ${423868710940311552}!`);
});

client.on('message', msg => { 
  if(hellowed == false) {
    msg.channel.send("Я обновился, а Ваши экспириенсы были сброшены :/");
    hellowed = true;
  }
  
  if(!(msg.author.id in Team)) {
    Team[msg.author.id] = 0;
    Role[msg.author.id] = 0;
    Luvr[msg.author.id] = 0;
    msg.reply('Привет, друг! Либо ты новенький, либо твои данные были сброшены! Приятного общения!');
  }
});

client.login(process.env.BOT_TOKEN); // wow


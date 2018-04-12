const Discord = require("discord.js");
const client = new Discord.Client();
const version = '0.1.0';
const ItemName = {"Пусто", "Диск"}
var Team = {};
var Role = {};
var Luvr = {};
var Inve = {};
var Invn = {};
let hellowed = false;

function InvenoryString(id, USER) {
  let Str = "Инвентарь:\n";
  for(let i = 0; i < 8; i++){
    Str += (i+1.toString() + ". " + ItemName[Inve[id]]);
    if(Inve[id] != 0 && Invn[id] > 1) Str += (" x" + Invn[id].toString());
    Str += "\n";
  }
  USER.sendMessage(Str);
}

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
    Inve[msg.author.id] = [1, 0, 0, 0, 0, 0, 0, 0];
    Invn[msg.author.id] = [1, 0, 0, 0, 0, 0, 0, 0];
    msg.reply('Привет, друг! Либо ты новенький, либо твои данные были сброшены! Приятного общения! (Пиши :help для доп. инфы)');
  } else {
    if(msg.content == ":inv") {
      InvenoryString(msg.author.id, msg.author);
    }
  }
});

client.login(process.env.BOT_TOKEN); // wow


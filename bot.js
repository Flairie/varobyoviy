const Discord = require("discord.js");
const client = new Discord.Client();
const version = '0.0.3';
const ItemName = ["Пусто", "Диск"];
var Team = {};
var Role = {};
var Luvr = {};
var Ruby = {};
var Inve = {};
var Invn = {};
let hellowed = false;

function InvenoryString(id, USER) {
  let Str = "Инвентарь:\n";
  for(i = 1; i <= 8; i++){
    Str += (i.toString() + ". " + ItemName[Inve[id][i-1]]);
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
    Luvr[msg.author.id] = 100;
    Ruby[msg.author.id] = 5;
    Inve[msg.author.id] = [1, 0, 0, 0, 0, 0, 0, 0];
    Invn[msg.author.id] = [1, 0, 0, 0, 0, 0, 0, 0];
    msg.reply('Привет, друг! Либо ты новенький, либо твои данные были сброшены! Приятного общения! (Пиши :help для доп. инфы)');
  } else {
    if(msg.content == ":inv") {
      InvenoryString(msg.author.id, msg.author);
    } else if(msg.content == ":invpubl") {
      InvenoryString(msg.author.id, msg.channel);
    } if(msg.content == ":mny") {
      msg.author.sendMessage("Рубины: " + Ruby[msg.author.id].toString() + "\nЛувры: "+ Luvr[msg.author.id].toString());
    } else if(msg.content == ":mnypubl") {
      msg.channel.sendMessage("Рубины: " + Ruby[msg.author.id].toString() + "\nЛувры: "+ Luvr[msg.author.id].toString());
    } else if(msg.content == ":help") {
      msg.reply("Список команд:\n:help - Список команд\n:inv - Приватный инвентарь\n:mny - Приватные деньги\n:invpubl - Публичный инвентарь\n:mnypubl - Публичные деньги")
    }
  }
});

client.login(process.env.BOT_TOKEN); // wow


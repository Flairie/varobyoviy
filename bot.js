const Discord = require("discord.js");
const client = new Discord.Client(); 
const version = '0.2.1: job system';
const ItemName = ["Пусто", "Диск"];
const Rank = ["434273045159346181", "434273241121554444", "422839749536120832", "422832838971228171", "422850622216339467"];
var Team = {};
var Role = {};
var Luvr = {};
var Ruby = {};
var Inve = {};
var Invn = {};
var WorkP = [];
var PokrC = 0;
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
  
  PokrC -= 1;
  
  if(!(msg.author.id in Team || msg.author.bot)) {
    Team[msg.author.id] = 0;
    Luvr[msg.author.id] = 100;
    Ruby[msg.author.id] = 5;
    Inve[msg.author.id] = [1, 0, 0, 0, 0, 0, 0, 0];
    Invn[msg.author.id] = [1, 0, 0, 0, 0, 0, 0, 0];
    msg.reply('Привет, друг! Либо ты новенький, либо твои данные были сброшены! Приятного общения!');
    let maxrole = -1;
    
    for(i = 0; i < Rank.length; i++) {
      if(msg.member.roles.exists("id", Rank[i])) maxrole = i;
    }
    
    if(maxrole == -1) {
      msg.member.addRole(Rank[0]);
      msg.reply('Да ты новичёк! Пиши ":help" для получения списка команд.');
      maxrole = 0;
    }
    Role[msg.author.id] = maxrole;
    
  } else {
    if(msg.content == ":inv") {
      InvenoryString(msg.author.id, msg.author);
    } else if(msg.content == ":job") {
      msg.reply("Список работ:\n1. Реклама Покровского (1rub, 5luv). Пишите :workP");
    } else if(msg.content == ":workP") {
      msg.author.sendMessage('Вы наняты. За каждое сообщение "Голосуйте за Покровского!" вы будете получать указаную зарплату, но при условии, что предыдущая реклама была достаточно давно');
      WorkP += msg.author.id;
    } else if(msg.content == ":invpubl") {
      InvenoryString(msg.author.id, msg.channel);
    } else if(msg.content == ":mny") {
      msg.author.sendMessage("Рубины: " + Ruby[msg.author.id].toString() + "\nЛувры: "+ Luvr[msg.author.id].toString());
    } else if(msg.content == ":mnypubl") {
      msg.channel.sendMessage("Рубины: " + Ruby[msg.author.id].toString() + "\nЛувры: "+ Luvr[msg.author.id].toString());
    } else if(msg.content == ":help") {
      msg.reply("Список команд:\n:help - Список команд\n:job - Список работ\n:inv - Приватный инвентарь\n:mny - Приватные деньги\n:invpubl - Публичный инвентарь\n:mnypubl - Публичные деньги");
    }
    
    if(msg.content === "Голосуйте за Покровского!" && PokrC <= 0) {
      Luvr[msg.author.id] += 5;
      Ruby[msg.author.id] += 1;
      msg.author.sendMessage("Средства not начислены!");
      PokrC = 20;
    }
  }
});

client.login(process.env.BOT_TOKEN); // wow


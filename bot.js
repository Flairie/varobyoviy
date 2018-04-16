const Discord = require("discord.js");
const client = new Discord.Client(); 
const version = '0.3.0: rank system';
const ItemName = ["Пусто", "Диск"];
const Adventurer = "435460526529576960";
const Rank = ["434273045159346181", "434376692119896114", "434273241121554444", "422839749536120832", "422832838971228171", "422850622216339467"];
const Worker = ["434380717280198658"];
const Zone = ["435300505770655748"];
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

client.on('message', msg => { if(!msg.author.bot) {
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
      if(!msg.member.roles.exists("id","434380717280198658")) {
         msg.author.sendMessage('Вы наняты. За каждое сообщение "Голосуйте за Покровского!" вы будете получать указаную зарплату, но при условии, что предыдущая реклама была достаточно давно');
         msg.member.addRole("434380717280198658");
      } else {
        msg.author.sendMessage("Вы уволились с должности");
        msg.member.removeRole("434380717280198658");
      }
    } else if(msg.content == ":invpubl") {
      InvenoryString(msg.author.id, msg.channel);
    } else if(msg.content == ":mny") {
      msg.author.sendMessage("Рубины: " + Ruby[msg.author.id].toString() + "\nЛувры: "+ Luvr[msg.author.id].toString());
    } else if(msg.content == ":mnypubl") {
      msg.channel.sendMessage("Рубины: " + Ruby[msg.author.id].toString() + "\nЛувры: "+ Luvr[msg.author.id].toString());
    } else if(msg.content == ":help") {
      msg.reply("Список команд:\n:help - Список команд\n:job - Список работ\n:adv - Завербоваться в Приключенцы\n:inv - Приватный инвентарь\n:mny - Приватные деньги\n:invpubl - Публичный инвентарь\n:mnypubl - Публичные деньги");
    } else if(msg.content == ":adv" && !msg.member.roles.exists("id", Adventurer) {
      msg.reply(", Приключенцы не могут устраиваться на работу. :advreally, чтобы стать приключенцем.");
    } else if(msg.content == ":advreally" && !msg.member.roles.exists("id", Adventurer) {
      let Not = false;
      for(i = 0; i < Worker.length; i++) {
        if(msg.member.roles.exists("id,", Worker[i]) {Not = true; break;}
      }
    
      if(!Not) {
          msg.reply(" больше не может устроиться на работу.");
          msg.member.addRole(Adventurer);
          msg.member.addRole(Zone[0]);
      } else msg.reply(" забыл уволиться");
    } else if(msg.content == ":advreally") msg.reply(", похоже, потерял память");
    
    if(msg.member.roles.exists("id" ,"434380717280198658") && msg.content === "Голосуйте за Покровского!" && PokrC <= 0) {
      Luvr[msg.author.id] += 5;
      Ruby[msg.author.id] += 1;
      msg.author.sendMessage("Средства начислены!");
      PokrC = 40;
    }
  } 
  
  if(Ruby[msg.author.id] >= 10 *Math.pow(2, Role[msg.author.id])) {
     msg.reply(", а ты крут. Лови Повышенье");
     msg.member.removeRole(Rank[Role[msg.author.id]]);
     Role[msg.author.id] += 1;
     msg.member.addRole(Rank[Role[msg.author.id]]);
  }
}});

client.login(process.env.BOT_TOKEN); // wow


const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
require('dotenv').config();
client.commands = new Discord.Collection();
client.login(process.env.LOGIN);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands!");
    return;
  }
  jsfile.forEach((f, i) =>{ 
    let props = require(`./commands/${f}`);
    client.commands.set(props.command.name, props);  
  });
  console.log(`Loaded ${jsfile.length} commands successfully!`);
});

client.on("message", msg => {
    if(!msg.guild || msg.author.bot || msg.content.indexOf(process.env.PREFIX) !== 0) return;
    if(!client.user.bot && msg.author.id !== process.env.OWNER) return;
    const args = msg.content.split(/\s+/g);
    const command = args.shift().slice(process.env.PREFIX.length).toLowerCase();
    try {
      let commandFile = client.commands.get(command);
      if(commandFile) commandFile.run(client, msg, args);
    } catch (err) {
      console.log(err);
    }
});
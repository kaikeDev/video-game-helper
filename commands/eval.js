const Discord = require('discord.js');
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}
function emoji(emo) {
    delete require.cache[require.resolve(`../resources/emoji.js`)];
    let emojia = require("../resources/emoji.js");
    if (emojia[emo] === undefined) return "🅱";
    return emojia[emo];
}

exports.run = (client, msg, args) => {
    const emb = new Discord.RichEmbed();
      if(msg.author.id !== process.env.OWNER) return;
          try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
              msg.channel.startTyping();
              emb.setColor('#41B589');
              emb.setTitle('Eval | <:tickYes:412632634070532097>');
              emb.addField('Input', '```'+args.join(" ")+'```');
              emb.addField('Output', '```'+clean(evaled)+'```');
              emb.setFooter(msg.author.tag, msg.author.avatarURL);
              msg.channel.stopTyping();
              msg.channel.send({embed:emb});
          } catch (err) {
              msg.channel.startTyping();
              emb.setColor('#A22665');
              emb.setTitle('Eval | <:tickNo:412632888010604555>');
              emb.addField('Output', '```'+clean(err)+'```');
              emb.setFooter(msg.author.tag, msg.author.avatarURL);
              msg.channel.stopTyping();
              msg.channel.send({embed:emb});
          }
}

exports.command = {
    name: "eval",
    fullCmd: process.env.PREFIX+"eval",
    description: "Evals JavaScript code",
    hidden: true
}
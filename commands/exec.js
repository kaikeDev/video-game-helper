const exec = require("util").promisify(require("child_process").exec);
const Discord = require('discord.js');

exports.run = (client, msg, args) => {
    const input = args.join(" ");
    if(msg.author.id !== process.env.OWNER) return;
    const result = exec(input).catch((err) => { throw err; });
    const output = result.stdout ? `**\`OUTPUT\`**${"```sh"}\n${result.stdout}\n${"```"}` : "";
    const outerr = result.stderr ? `**\`ERROR\`**${"```sh"}\n${result.stderr}\n${"```"}` : "";
    const output2 = result.stdout ? `${"```sh"}\n${result.stdout}\n${"```"}` : "Done.";
    const outerr2 = result.stderr ? `${"```sh"}\n${result.stderr}\n${"```"}\n` : "";
    const embed = new Discord.RichEmbed()
    .setColor("0x2ECC71")
    .setTitle('Exec / Shell')
    .addField(":inbox_tray: Input", `\`\`\`sh\n${input}\n\`\`\``)
    .addField(":outbox_tray: Output", `${output2}\n${outerr2}`)
    .setFooter(msg.author.tag, msg.author.avatarURL);
    return msg.channel.send({ embed });
}

exports.command = {
    name: "exec",
    fullCmd: process.env.PREFIX+"exec",
    description: "Evals shell code",
    hidden: true
}
exports.run = (client, msg) => {
    const Discord = require('discord.js');
    const emb = new Discord.RichEmbed();
    msg.channel.startTyping();
    emb.setColor('#2040ff');
    emb.setAuthor(client.user.tag+' Commands', client.user.avatarURL, 'http://vgh.ftp.sh');
    emb.addField('Command List', process.env.PREFIX+"cr** ➤ Shows stats in Clash Royale\n**"+process.env.PREFIX+"fortnite** ➤ Shows stats in Fortnite\n**"+process.env.PREFIX+"gw2** ➤ Shows stats in Guild Wars 2\n**"+process.env.PREFIX+"igdb** ➤ Shows stats in the Internet Game Database\n**"+process.env.PREFIX+"lol** ➤ Shows stats in League of Legends\n**"+process.env.PREFIX+"minecraft** ➤ Shows stats in Minecraft\n**"+process.env.PREFIX+"osu** ➤ Shows stats in osu!\n**"+process.env.PREFIX+"rocket** ➤ Shows stats in Rocket League\n**"+process.env.PREFIX+"stats** ➤ Shows stats about the bot**");
    emb.addBlankField();
    emb.addField('Useful Links', 'Invite me to your server: [http://vgh.ftp.sh/invite](http://vgh.ftp.sh/invite)\nGithub repository: [https://github.com/PillGP/video-game-helper](https://github.com/PillGP/video-game-helper)\nMy website: [http://vgh.ftp.sh](http://vgh.ftp.sh)\nDonate so that I can stay online 24/7: [http://vgh.ftp.sh/donations](http://vgh.ftp.sh/donations)');
    emb.addBlankField();
    emb.addField('Official Partners', 'TUNADOS: <https://discord.gg/tunados>');
    emb.setFooter(msg.author.tag, msg.author.avatarURL);
    msg.channel.send({embed:emb});
    msg.channel.stopTyping();
}

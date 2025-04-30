const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) => {

    let log = "LOG KANAL ID";

  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(`Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmalısın!`)

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Bir üyenin banını kaldırmak için ID yazmalısın!`)
        .setColor("RED"))

    try {
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@!${args[0]}> adlı kullanıcının kalıcı banı kalktı!`)
            .setColor("GREEN")
        message.channel.send(embed)
        message.guild.members.unban(args[0])
        db.delete(`forceban.${args[0]}`);
        client.users.fetch(args[0]).then(x => client.channels.cache.get(log).send(new Discord.MessageEmbed()
            .setAuthor("Force UnBan")
            .setDescription(`${x} kullanıcının bulunan yasağı kaldırıldı.`)
            .setColor("GREEN")))
    } catch (err) {
        message.react("🚫")
    }
}

exports.conf = {
    aliases: []
};

exports.help = {
    name: 'unforce-ban'
};
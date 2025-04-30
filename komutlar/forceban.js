const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

    const log = "LOG KANAL ID";

    const üye = message.mentions.members.first();
    const sebep = args.slice(1).join(" ");

    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Bu komutu kullanabilmek için **YÖNETİCİ** yetkisine sahip olmalısın!`)
            .setColor("RED"))

    if (!üye) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Bir üye etiketlemelisin!`)
        .setColor("RED"))

    if (!sebep) return message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Bir sebep belirtmelisin!`)
        .setColor("RED"))

    const embed = new Discord.MessageEmbed()
        .setDescription(`${üye} adlı üye başarıyla sunucudan kalıcı olarak banlandı!`)
        .setColor("GREEN")
    message.channel.send(embed)

    const logs = new Discord.MessageEmbed()
        .setAuthor("Force Ban")
        .setDescription(`${üye} adlı üye başarıyla sunucudan kalıcı olarak banlandı!`)
        .setColor("GREEN")
    client.channels.cache.get(log).send(logs)

    message.guild.members.ban(üye);
    db.set(`forceban.${üye.id}`, "force")
}
exports.conf = {
    aliases: []
};

exports.help = {
    name: 'force-ban'
};
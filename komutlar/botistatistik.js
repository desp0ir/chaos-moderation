const { MessageEmbed } = require('discord.js')
const moment= require('moment')
require('moment-duration-format')
const os= require('os')

exports.run = async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('İstatistik')
        .addField('Kullanıcı sayısı', client.users.cache.size)
        .addField('Sunucu sayısı', client.guilds.cache.size)
        .addField('Kanal sayısı', client.channels.cache.size)
        .addField('RAM Kullanımı', `${(process.memoryUsage().heapUsed / 1204 / 1024).toFixed(2)}`, true)
        .addField('Versiyon', 'v0.1', true)
        .addField('Kuruluş Tarihi', '18.02.2020', true)
        .addField('Kurucu', `<@525678239704678400>`, true)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setThumbnail('https://cdn.discordapp.com/attachments/717842312872591451/791638011241955328/bot_pp.png')
    message.channel.send(embed)
        }
        exports.conf = {
            enabled: true,
            guildOnly: true,
            aliases: ["botstats"],
            kategori: "moderasyon",
            permLevel: 0
          };
          exports.help = {
            name: "botstat",
            description: "botun bilgilerini gösterir",
            usage: "botstat"
          };
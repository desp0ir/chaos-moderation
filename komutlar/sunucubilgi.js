let { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
                let guild = message.guild

                let sunucuEmbed = new MessageEmbed()
                .setThumbnail(guild.iconURL)
                .setFooter(guild.name)
                .addField('Sunucu İsmi', guild.name)
                .addField('Kuruluş', guild.createdAt)
                .addField('Kurucu', `${guild.owner} / ID = ${guild.ownerID}`)
                .addField('Üye Sayısı', guild.memberCount)
                .setColor('RED')
                .setThumbnail('https://cdn.discordapp.com/attachments/717842312872591451/791638011241955328/bot_pp.png')
                .setTimestamp()
        
                message.channel.send(sunucuEmbed)
             
 
        };
        exports.conf = {
          enabled: true,
          guildOnly: true,
          aliases: ["guildinfo"],
          kategori: "moderasyon",
          permLevel: 0
        };
        exports.help = {
          name: "sunucubilgi",
          description: "Açıklama",
          usage: "sunucubilgi"
        };
        
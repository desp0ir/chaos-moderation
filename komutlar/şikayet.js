let { MessageEmbed } = require('discord.js');

exports.run = async (app, message, args) => {
                let guildID = '805131059678412811'
                let channelID = '805131066192166949'
        
                let reaportMessage = args.join(' ')
                if (!reaportMessage) return message.channel.send('Şikayetini belirt!')
        
                let reaportMessageEmbed = new MessageEmbed()
                .addField('Şikayet', reaportMessage)
                .addField('Kullanıcı', `${message.author.tag} ID = ${message.author.id}`)
                .addField('Sunucu', message.guild.name)
                .addField('Şikayetin geldiği yer', await message.channel.createInvite({ temporary: true }).then(i => i.url))
                .setColor('RED')
                .setFooter('Şikayet Sistemi')
                .setTimestamp()
                .setThumbnail("https://cdn.discordapp.com/attachments/717842312872591451/791638011241955328/bot_pp.png")
                .setAuthor(app.user.username, app.user.avatarURL())
        
                message.channel.send('Şikayetiniz başarılı bir şekilde gönderilmiştir.')
                app.guilds.cache.get(guildID).channels.cache.get(channelID).send(reaportMessageEmbed) 
                message.delete()
 
        };
        exports.conf = {
          enabled: true,
          guildOnly: true,
          aliases: ["şikayet"],
          kategori: "ekstra",
          permLevel: 0
        };
        exports.help = {
          name: "şikayet",
          description: "Açıklama",
          usage: "şikayet"
        };
        
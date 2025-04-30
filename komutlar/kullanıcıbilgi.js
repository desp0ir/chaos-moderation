let { MessageEmbed } = require('discord.js'); 


exports.run = async (client, message, args) => {
                let user = message.mentions.users.first()

        if (!user) {
            return message.channel.send('Kullanıcı belirt.')
        };

        let userEmbed = new MessageEmbed()
        .addField('İsim', user.username)
        .addField('Kuruluş', user.createdAt)
        .addField('ID', user.id)
        .addField('Tag', '#' + user.discriminator)
        .setColor('RANDOM')
        .setFooter(message.author.username + ' tarafından istendi.', message.author.displayAvatarURL())
        .setThumbnail("https://cdn.discordapp.com/attachments/717842312872591451/791638011241955328/bot_pp.png")

        message.channel.send(userEmbed)
      
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["KBİLGİ"],
  kategori: "Kategori Adı",
  permLevel: 0
};
exports.help = {
  name: "kbilgi",
  description: "hesap ile ilgi detayları gösterir",
  usage: "kbilgi"
};


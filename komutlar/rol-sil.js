
exports.run = async (client, message, args) => {
                if (!message.member.hasPermission('805131060168884284')) return message.channel.send('Bunu yapamazsın')
                let user = message.mentions.users.first();
                let role = message.mentions.roles.first();
                let member = message.guild.member(user);
                
                if (!user) return message.channel.send('Kullanıcıyı belirt.')
                if (!role) return message.channel.send('Rolü belirt.')
        
                member.roles.remove(role)
                message.channel.send(`${role} rolü, ${user} adlı kullanıcıdan alındı.`)
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolsil"],
  kategori: "moderasyon",
  permLevel: 3
};
exports.help = {
  name: "rol-sil",
  description: "Açıklama",
  usage: "rol-sil"
};

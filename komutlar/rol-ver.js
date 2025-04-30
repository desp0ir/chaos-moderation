       
exports.run = async (client, message, args) => {
                if (!message.member.hasPermission('805131060168884284')) return message.channel.send('Bunu yapamazsın')
                let user = message.mentions.users.first();
                let role = message.mentions.roles.first();
                let member = message.guild.member(user);
                
                if (!user) return message.channel.send('Kullanıcıyı belirt.')
                if (!role) return message.channel.send('Rolü belirt.')
        
                member.roles.add(role)
                message.channel.send(`${role} rolü, ${user} adlı kullanıcıya verildi.`)
                
      
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolver"],
  kategori: "moderasyon",
  permLevel: 3
};
exports.help = {
  name: "rol-ver",
  description: "Açıklama",
  usage: "rol-ver"
};

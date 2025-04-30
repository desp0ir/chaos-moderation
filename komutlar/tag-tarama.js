const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
  
    if (!message.member.hasPermission("ADMINISTRATOR"))

    return message.channel.send(
    new Discord.MessageEmbed()
    .setDescription(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`)
    .setColor('f5f5f5')
    
    );
    
    
  const tag = ('ᶜʰᵃᵒˢ');


  const memberss = message.guild.members.cache.filter(member => member.user.username.includes(tag));
    const embed = new Discord.MessageEmbed()
        .addField(`Discord kullanıcı adında ${tag} tagı olan kullanıcı listesi`, memberss.map(member => `${member} = ${member.user.username}`).join("\n") || `Kimsenin Discord kullanıcı adında \`${tag}\` tagı,simgesi bulunmuyor. `)
        .setColor("f5f5f5")
        .setFooter(`Chaos`)
        return message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['tag-tara'],
    permLevel: 0
}
exports.help = {
    name: 'tag-tara',
    description: 'Kullanıcıların kullanıcı adını tarar.',
    usage: 'tag-tara'
}
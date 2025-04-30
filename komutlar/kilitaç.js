const Discord = require('discord.js')
const ms = require("ms");

exports.run = async (client, message, args) => {
const mb = new Discord.MessageEmbed()
.setColor('f5f5f5')

const emb = new Discord.MessageEmbed()
.setColor('f5f5f5')
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(mb.setDescripton(`:uyar2:  Bu komutu kullanabilmek için yetkiniz yetersiz.`))
let chaos = message.mentions.channels.first()
let kanal = message.guild.channels.cache.get(chaos.id);
let role = message.guild.roles.cache.find(c => c.name === '@everyone');

kanal.createOverwrite(role, { 'SEND_MESSAGES': null })
kanal.send(emb.setDescription(`Kanalın kiliti açıldı iyi eğlenceler!`)).then(m => {

})
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kilitaç'
};
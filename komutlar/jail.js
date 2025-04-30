const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\
  
if(!["805131060110295111"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const cezalırol = '805131060052361223'//Jail rolü
const jaillog = message.guild.channels.cache.find(c => c.id === '805131066192166946')//Jail Log
const unr = '805856933206163526'

//-------------------------------------------------------------------------------\\



let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let sebep = args[1]
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan cezalıya atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan cezalıya atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan cezalıya atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`${message.author} tarafından ${kullanici} \`${sebep}\` sebebiyle jail'a atıldı`));
 
  
  
  let tumaylar = {
        "01": "Ocak",  
        "02": "Şubat", 
        "03": "Mart",  
        "04": "Nisan",  
        "05": "Mayıs", 
        "06": "Haziran", 
        "07": "Temmuz",
        "08": "Ağustos", 
        "09": "Eylül", 
        "10": "Ekim", 
        "11": "Kasım", 
        "12": "Aralık", 
        }
        let aylar = tumaylar; 
   let muteler = jdb.get(`tempmute`) || [];
                if (!muteler.some(j => j.id == kullanici.id)) {
                  kdb.add(`kullanici.${message.author.id}.mute`, 1);
                    db.add('case', 1)
                    const numara = await db.fetch('case')
                    moment.locale("tr");
                  kdb.push(`kullanici.${kullanici.id}.sicil`, {
                    Yetkili: message.author.id,
                    Sebep: sebep,
                    Ceza: "JAIL",
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                };
kullanici.roles.add(cezalırol);
kullanici.roles.set([cezalırol])
jaillog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Cezalandırıldı !**\n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${kullanici.user} (\`${kullanici.user.id}\`) \n**Sebep:** \`${sebep}\` \n**Tarih:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
message.react('✅')
  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['jail'],
    permLevel: 0,
}

exports.help = {
      name: "jail"  
  
}
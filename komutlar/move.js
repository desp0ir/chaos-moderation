
exports.run = async (client, message, args) => {
                if (!message.member.hasPermission('805131060110295117')) return message.channel.send('Bu komutu kullanmaya yetkin yok')
                const üye = message.mentions.members.first()
                if (!üye) return message.channel.send('Herhangi geçerli bir üye belirtiniz')
                if (!üye.voice.channel) return message.channel.send('Bahsettiğiniz kişi sesli kanalda değil');
                if (message.member.voice.channel){
                        message.channel.send('Başarıyla sesli kanala taşındı.');
                        üye.voice.setChannel(message.member.voice.channel.id)
                } else {
                        if (!args[1]) return message.channel.send('KANAL ID GİRİNİZ')
                if (isNaN(args[1])) return message.channel.send('Lütfen sadece kanal adını giriniz.')
                if (message.member.voice.channel){
                        message.channel.send('Başarıyla kanala taşındı.');
                        üye.voice.setChannel(args[1]) 
}}};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["move"],
  kategori: "moderasyon",
  permLevel: 3
};
exports.help = {
  name: "taşı",
  description: "Açıklama",
  usage: "taşı"
};




exports.run = async (client, message, args) => {
            const ms = require('rhino-ms')
            if(!message.member.hasPermission('ADMİNİSTRATOR')) return message.reply('Slowmode açmak için Yönetici yetkisine sahip olman gerek');
            const zaman = ms(args.join(" "), {birim: "saniye"})
            if(zaman > 21600 || zaman < 1) return message.reply('1saniye ila 6 saat arasında bir değer girin.');
            const slowmode = Math.floor(zaman)
            message.channel.setRateLimitPerUser(slowmode)
            message.channel.send('Slowmode durumu: ' + args.join(" ") )
           
     
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slow-mode"],
  kategori: "moderasyon",
  permLevel: 3
};
exports.help = {
  name: "slowmode",
  description: "Açıklama",
  usage: "slowmode"
};

const {MessageEmbed, Message} = require ('discord.js');
exports.run = async (client, message, args) => {
  
                const yardım = new MessageEmbed()
              .setDescription(`
               **MODERASYON komutları**
              [.] -ban/unban         <- Bir kişiyi banlamanızı/banını kaldırmanızı sağlar.
              [.] -taşı         <- Bir kişiyi taşımanızı sağlar. 
              [.] -cmute/uncmute       <- Bir kişiyi chatte susturmanızı / susturmayı kaldırmanızı sağlar.
              [.] -rol-sil/rol-ver        <- Bir kişiye rol silip/eklemenizi sağlar. 
              [.] -slowmode (herhangi bir sayı)sn/kapalı     <- Slowmode açar/kapar. 
              [.] -temizle          <- Chatten istediğiniz miktarda mesaj siler. 
              [.] -bansorgu         <- Bir ID girerek ban sebebi görmenizi sağlar.
              [.] -kilitle #chat ismi + süre / kilitaç #chat ismi     <- Etketlediğiniz chati kilitler/kilidi açar.
              [.] -küfür-engel   (aç-kapa)       <- Küfür taramasını açar.
              [.] -sunucu-patlat          <- Sunucuyu patlatır.
              [.] -reklam-engel   (aç-kapa)      <- Reklam taramasını açar.
              [.] -tag-tara          <- Tag taraması yapar.
              [.] -afk          <- Afk olmanızı sağlar.
              [.] -sicil/sicil-sıfırla          <- Sicili gösterir/Sicili sıfırlar.
              [.] -capslock-engel   (aç-kapa)       <- Caps taramasını açar.

               **GENEL Komutları** 
              [.] -botstat        <- Botun istatistiklerini gösterir.
              [.] -kbilgi    <- Etiketlediğiniz kişi hakkında bilgi alırsınız.
              [.] -sunucubilgi     <- Sunucu hakkında bilgi alırsınız.
              [.] -say          <- Sunucudaki, seslideki, taglıları veya çevrimiçi üyeleri sayar.
              [.] -snipe          <- Sunucudaki son silinmiş mesajı geri alır.
              [.] -istek       <- Bize iletmek istediğiniz herhangi bir isteğinizi istek-şikayet kanalına atar.
              [.] -şikayet     <- Bize iletmek istediğiniz herhangi bir şikayetinizi istek-şikayet kanalına atar.

             
              
              `,true);
              message.channel.send(yardım);
                const yardım2 = new MessageEmbed()
                .setDescription(
                  `**DİĞER BOTLAR**
                  [.] -yardım-e        <- Eğlence botunun komutlarını atar.
                  [.] -yardım-m        <- Müzik botunun komutlarını atar.
                  [.] -yardım-g        <- Gif botunun komutlarını atar.
                  [.] -yardım-i        <- İstatistik botunun komutlarını atar.`
                )
                message.channel.send(yardım2);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help"],
  kategori: "moderasyon",
  permLevel: 0
};
exports.help = {
  name: "yardım",
  description: "Açıklama",
  usage: "yardım"
};


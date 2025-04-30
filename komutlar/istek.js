const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.channel.id !== "805131061688139809")//komut yazabilecek kanal id
    return message.channel.send(
      "komut başka komutlar yazılırsa yazılan yazı örnek (sadece bu kanalda kullanabilirsin #sipariş)"
    );
  let type = args.slice(0).join(" ");
  if (type.length < 1)
    return message.channel.send("Hatalı kullanım > **!istek `istek ismi` **");
  const embed = new Discord.MessageEmbed()
    .setColor("#2c2f33")
    .setTitle("**İsteğiniz yetkililere iletildi**")
    .setDescription(`**İsteği yazan kişi :**\n ${message.author.tag}`)
    .addField("**İstek:**", type)
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/717842312872591451/791638011241955328/bot_pp.png"
    );
  message.channel.bulkDelete(1).then(() => {
    message.channel
      .send(`Bizi Tercih Ettiniz İçin Teşekkürler. `)
      .then(msg => msg.delete(10000));
  });
  message.channel.send(embed);

  
  const embed2 = new Discord.MessageEmbed()
    .setColor("#2c2f33")
    .setDescription(
      `**${message.author.tag}** adlı kullanıcının **İstek ;**`
    )
    .addField(
      `**Gönderen Kişinin Bilgileri**`,
      `:white_small_square:Kullanıcı ID: ${message.author.id}\n:white_small_square:Kullanıcı Adı: ${message.author.username}\n:white_small_square:Kullanıcı Tagı: ${message.author.discriminator}`
    )
    .addField(":pencil: **İsteği**", type)
    .setThumbnail(message.author.avatarURL);
    client.channels.cache.get('805131066192166949').send(embed2) 
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "istek",
  description: "istek komutu.",
  usage: "istek <paket>"
};
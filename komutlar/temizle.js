
exports.run = async (client, message, args) => {
                        if (message.deletable) {
                            }
                     
                            if (isNaN(args[0]) || parseInt(args[0]) <= 0) return message.channel.send('Miktarı belirt.')
                     
                            if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
                     
                            let deleteAmount;
                     
                            if (parseInt(args[0]) > 100) {
                                deleteAmount = 100;
                            } else {
                                deleteAmount = parseInt(args[0])
                            }
                     
                            message.channel.bulkDelete(deleteAmount, true).then(deleted => message.channel.send(`${deleted.size} kadar mesaj silindi.`)).then(x => x.delete({timeout: 5000})) 

           
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  kategori: "moderasyon",
  permLevel: 0
};
exports.help = {
  name: "temizle",
  description: "Açıklama",
  usage: "temizle"
};

const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


module.exports = client => {
  console.log(`MERHABALR AQ`);  
 console.log(`Durum ===> 👾 ᶜʰᵃᵒˢ 👾 oldu.`)
 if (client.channels.cache.has(ayarlar.voicechannel)) client.channels.cache.get(ayarlar.voicechannel).join().catch();
 
 client.user.setActivity("👾 ᶜʰᵃᵒˢ 👾", {
});
};

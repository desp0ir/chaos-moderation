
      const Discord = require("discord.js");
      const client = new Discord.Client();
      const ayarlar = require("./ayarlar.json");
      const fs = require("fs");
      const  db  = require('quick.db');
      const moment = require("moment");
      moment.locale("tr")  
      const chalk = require("chalk"); 
      require("./util/eventLoader")(client);
      
      var prefix = ayarlar.prefix;

      client.on('ready', () => {
  
        
        client.user.setActivity('👾ᶜʰᵃᵒˢ👾', {type: 'PLAYING'})
        .then(presence => console.log(`Durum ==> ${presence.activities[0].name}  oldu.`))
        .catch(console.error);
      });
      const log = message => {
        console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
      };
      
      client.commands = new Discord.Collection();
      client.aliases = new Discord.Collection();
      fs.readdir("./komutlar/", (err, files) => {
        if (err) console.error(err);
        log(`${files.length} komut yüklenecek.`);
        files.forEach(f => {
          let props = require(`./komutlar/${f}`);
         //log(`Yüklenen komut: ${props.help.name}.`);
          client.commands.set(props.help.name, props);
          props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
        });
      });
      
      client.reload = command => {
        return new Promise((resolve, reject) => {
          try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
              if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
              client.aliases.set(alias, cmd.help.name);
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      
      client.load = command => {
        return new Promise((resolve, reject) => {
          try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
              client.aliases.set(alias, cmd.help.name);
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      
      client.unload = command => {
        return new Promise((resolve, reject) => {
          try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
              if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      
      client.elevation = message => {
        if (!message.guild) {
          return;
        }
        let permlvl = 0;
        if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
        if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
        if (message.author.id === ayarlar.sahip) permlvl = 4;
        return permlvl;
      };
      
      var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
      // client.on('debug', e => {
      //   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
      // });
      
      client.on("warn", e => {
        console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
      });
      
      client.on("error", e => {
        console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
      });
      
// OTO MESAJ


client.on('message', Chaostagmesaj => {
  if (Chaostagmesaj.content.toLowerCase() === 'Nehir') {
    Chaostagmesaj.delete();
    Chaostagmesaj.channel.send('Böyle orospu evlatlarını anmak yasaktır!');//TAG
  }
});

client.on('message', Chaostagmesaj => {
  if (Chaostagmesaj.content.toLowerCase() === '.tag') {
    Chaostagmesaj.channel.send('ᶜʰᵃᵒˢ');//TAG
  }
});

client.on('message', Chaostagmesaj => {
  if (Chaostagmesaj.content.toLowerCase() === 'tag') {//TAG
    Chaostagmesaj.channel.send('ᶜʰᵃᵒˢ');
  }
});
      // selam şeysi(channel yerine author yazarsan dm atıyor)
client.on('message', msg => {
  if (msg.content.toLowerCase()  === 'sa') {
          msg.react('👽')
    msg.channel.send('👾 Aleyküm Selam, Hoşgeldin👾');
  }
  if (msg.content.toLocaleLowerCase() === 'selam') {
        msg.react('👽')
          msg.channel.send('👾 Aleyküm Selam, Hoşgeldin👾');
  }
  if (msg.content.toLocaleLowerCase() === 'selamın aleyküm') {
        msg.react('👽')
        msg.channel.send('👾 Aleyküm Selam, Hoşgeldin👾');
        if (msg.content.toLowerCase() === `<@${client.user.id}>`) { //Botu etiketleyince mesaj atar
          msg.channel.send('Ha efendim knk')
        }
      
        if (msg.content.toLowerCase() === 'yok bişi') {
          msg.channel.send('LA SEN BENİMLE DALGA MI GEÇİYON')
        }
    
}});




//giriş çıkış
client.on('guildMemberAdd', member => {
        const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
        girişçıkış.send(`Hoşgeldin!, ${member} Üye sayımız ${member.guild.memberCount}`);
      });

      client.on('guildMemberRemove', member => {
        const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
        girişçıkış.send(`${member} sunucumuzdan ayrıldı! Üye sayımız ${member.guild.memberCount}`);
      });


//oto jail
client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(30, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.cache.get("805131060052361224")
   var kayıtsız = member.guild.roles.get("805856933206163526")
   member.addRole(rol)
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)
   }
        else {

        } 
    });

//otorol
client.on('guildMemberAdd', member => {
  let rol = "805856933206163526"
  member.roles.add(rol)
});


//snipe
client.on('messageDelete', message => {
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
})

//afk

const ms = require("parse-ms");
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   let süre = await db.fetch(`afk_süre_${afk.id}`);
   let timeObj = ms(Date.now() - süre);
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`**Bu Kullanıcı Afk**\n\n**Afk Olan Kullanıcı :** \`${afk.tag}\`\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${sebep}\``))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afk_süre_${msg.author.id}`)
    msg.member.setNickname(isim)
    
  }
  
});


//reklam engel
client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLocaleLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setTitle("Chaos Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setTitle("Chaos Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Chaos Code | Reklam-Engel Sistemi!`
          });
          let uyari = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setTitle("Chaos Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Chaos Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setTitle("Chaos Reklam Kick Sistemi")
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

//küfür taraması

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq", "skm", "sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"
    ];
    if (kufur.some(word => msg.content.toLocaleLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          return msg.reply (`Bu Sunucuda Küfür Edemezsin.`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq", "skm", "sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"
    ];
    if (kufur.some(word => msg.content.toLocaleLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          return msg.reply (`Bu Sunucuda Küfür Edemezsin.`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async(member) => {
  let rol = member.guild.roles.cache.find(r => r.name === "Cezalı");
  let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
  let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
  if (!cezalımı) return;
  if (cezalımı == "cezali") {
  member.roles.add(ayarlar.JailCezalıRol)
   
  member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
   setTimeout(function(){
      // msg.channel.send(`<@${user.id}> Muten açıldı.`)
  db.delete(`cezali_${member.guild.id + member.id}`)
      member.send(`<@${member.id}> Cezan açıldı.`)
      member.roles.remove('cezalı rol id');
    }, ms(sürejail));
  }
  })
  
  //--------------------------------------------------------------------------------------\\
  
  client.on('guildMemberAdd', async(member) => {
  let mute = member.guild.roles.cache.find(r => r.name === "Muted");
  let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
  let süre = db.fetch(`süre_${member.id + member.guild.id}`)
  if (!mutelimi) return;
  if (mutelimi == "muteli") {
  member.roles.add(ayarlar.MuteliRol)
   
  member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
   setTimeout(function(){
      // msg.channel.send(`<@${user.id}> Muten açıldı.`)
  db.delete(`muteli_${member.guild.id + member.id}`)
      member.send(`<@${member.id}> Muten açıldı.`)
      member.roles.remove('muteli rol id');
    }, ms(süre));
  }
  })
  
  //--------------------------------------------------------------------------------------\\
  
  
  client.on('guildMemberAdd', async member => {
  const data = require('quick.db')
  const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
  if(asd) {
  let data2 = await data.fetch(`jailrol_${member.guild.id}`)
  let rol = member.guild.roles.cache.get(data2)
  if(!rol) return;
  let kişi = member.guild.members.cache.get(member.id)
  kişi.roles.add(rol.id);
  kişi.roles.cache.forEach(r => {
  kişi.roles.remove(r.id)
  data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
      data.set(`${member.guild.id}.jail.${kişi.id}`)
    const wasted = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
    .setColor(`#0x800d0d`)
    .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
    .setTimestamp()
      member.send(wasted)
  } 
    
    
  })

client.on("guildMemberAdd", async member => {
    const forceban = await database.get(`forceban.${member.id}`);

    if (forceban === "force") {
        member.send(`${member} heyy! sen ${member.guild.name} adlı sunucudan kalıcı olarak yasaklanmışsın!`).then(c => console.log(`${member.user.tag} aldı üyeye mesaj atıldı!`)).catch(err => console.error(`${member.user.tag} aldı üyeye mesaj atamıyorum!`));
        setTimeout(() => {
            member.guild.members.ban(member);
        }, 2000);
    }
});

  //CAPSLOCK
  client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`${msg.author}, Aslanım yavaş ol biraz ne bağırıyon!`)
     }
       }
     }
   }
  }
});





client.login(ayarlar.token);
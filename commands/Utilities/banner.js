const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
 const config = require("../../config")
const fs = require('fs')
const { MessageEmbed } = require("discord.js")
const footer = config.app.footer

module.exports = {
    name: 'banner',
    usage: 'banner <@user/id>',
    description: `Afficher la bannière de quelqu'un.`,
    async execute(client, message, args) {

        let user;
        if(message.user ? args._hoistedOptions.length >= 1 : args >= 1) {
            user = message.user ? await client.users.fetch(args._hoistedOptions[0].value) : (message.mentions.members.first() || await client.users.fetch(args[0]))
            if(!user) return message.reply("Rien trv")
        } else user = message.mentions.users.first() || args[0] || message.author 

          let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
          const url = await user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 })); 
    
          const ERRbannerEmbed = new MessageEmbed()
            .setTitle(`Pas De Bannière`)
            .setColor("DarkButNotBlack")
            .setDescription(`${user.tag} n'a pas de bannière`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}));

          if (!url) return message.channel.send({ embeds: [ERRbannerEmbed] }); 
          if(!user) return message.reply("jtrouve pas");
          if(!member) return message.reply("jtrouve pas");

          const bannerEmbed = new MessageEmbed()
            .setDescription(`[${user.tag}](${user.bannerURL({ format: "png", size: 4096 })}) | (\`${user.id}\`)`)
            .setColor("Blurple")
            .setURL(user.avatarURL({ format: "png", size: 4096 }))
            .setImage(await (await client.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))

            const button = new Discord.MessageButton()
                    .setLabel("Bannière")
                    .setURL(user.bannerURL({ dynamic: true, format: "png", size: 512 }))
                    .setStyle("LINK");


            const row = new Discord.MessageActionRow().addComponents(button)
       
         await message.channel.send({embeds: [bannerEmbed], components: [row]});
    }
}
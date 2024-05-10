const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const fs = require('fs')
const { MessageEmbed } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: 'pp',
    usage: 'pp <@user/id>',
    description: `Afficher l'avatar de quelqu'un.`,
    async execute(client, message, args) {
        
                let user;
                if(message.user ? args[0].length >= 1 : args >= 1) {
                    user = message.user ? await client.users.fetch(message.mentions.users.first().id) : (message.mentions.users.first() || await client.users.fetch(args[0]))
                } else user =  message.mentions.users.first() || args[0] || message.author 
            
                  if(!user) user = message.author;
        
                  const ppEmbed = new MessageEmbed()
                    .setColor("Blurple")
                    .setDescription(`[${user.tag}](${user.displayAvatarURL({ format: "png", size: 4096 })}) | (\`${user.id}\`)`)
                    .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))

                    const button = new Discord.MessageButton()
                    .setLabel("Avatar")
                    .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
                    .setStyle("LINK");

                 const row = new Discord.MessageActionRow().addComponents(button)
                 await message.channel.send({embeds: [ppEmbed], components: [row]}); 
        }
    }

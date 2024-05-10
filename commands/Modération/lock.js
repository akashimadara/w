const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const alerte = new db.table("AlertePerm")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const fs = require('fs')
const moment = require('moment')
const p3 = new db.table("Perm3")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'lock',
    usage: 'lock',
    description: `Permet de lock un salon`,
    async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

   
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.everyone;
    if(channel.isThread())
      return message.channel.send(`Je peux pas lock un thread`);


      channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
      message.channel.send(`> Les membres ne peuvent plus parler dans ${channel}`);
      
    }
  

        let embed = new Discord.MessageEmbed()
            .setTitle("Salon verrouillé")
            .setDescription(`le salon <#${message.channel.id}> \`${message.channel.name}\` a été verouillé.`)
            .addFields({name: "Modérateur :", value: `> <@${message.author.id}> **@${message.author.username}**` })
            .setFooter({text: `ID du salon : ${message.channel.id}`})
            .setTimestamp()
            .setColor("ORANGE")
        const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
        if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

    }
    }


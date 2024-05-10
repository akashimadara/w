const Discord = require("discord.js")
const db = require("quick.db")

const { Client, Intents, Collection } = require('discord.js');
const msglog = new db.table("msglog")
const config = require("../config")


module.exports = {
    name: 'messageDelete',
    once: false,

    async execute(client, message, color) {
        if(message.partial) return;

        client.snipes = new Map()


    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })


        if (!message.author) return
        let chan = `${msglog.fetch(`${message.guild.id}.messagelog`)}`
        if (chan == null) return

        let channel = message.guild.channels.cache.get(chan)
        if (channel == null) return

        const mess = message.content

        var fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        }),
            deletionLog = fetchedLogs.entries.first();
            const { executor, target } = deletionLog;
        const embed1 = new Discord.MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTitle("Message supprimé")
            .setDescription(`Un message de ${message.author} a été supprimé.`)
            .addFields({name: `**Salon :**\n`, value: `> ${message.channel} \`${message.channel.name}\``})
            .addFields({name: `**Contenu :**\n`, value: `> ${mess}`})
            .addFields({ name: `Heure de suppresion`, value: `> <t:${Math.floor(message.createdAt / 1000)}:f> (<t:${Math.floor(message.createdAt / 1000)}:R>)`})
            .setFooter({ text: `ID du messages : ${message.id}` })
            .setColor(color)
        if (!deletionLog) return channel.send({ embeds: [embed1] })


        const embed = new Discord.MessageEmbed()
        .setAuthor({name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        .setTitle("Message supprimé")
        .setDescription(`Un message de ${message.author} a été supprimé.`)
        .addFields({name: `Salon :\n`, value: `> ${message.channel} \`${message.channel.name}\``})
        .addFields({name: `Contenu :\n`, value: `> ${mess}`})
        .addFields({ name: `Heure de suppresion`, value: `> <t:${Math.floor(message.createdAt / 1000)}:f> (<t:${Math.floor(message.createdAt / 1000)}:R>)`})
        .setFooter({ text: `ID du messages : ${message.id}` })
        .setTimestamp()
        .setColor("RED")

        if (target.id === message.authorID) {
            channel.send({ embeds: [embed] })
        } else {
            channel.send({ embeds: [embed] })
        }
    }
}
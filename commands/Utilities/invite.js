const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const { MessageActionRow, MessageButton } = require('discord.js');

 const config = require("../../config")

module.exports = {
    name: 'invite',
    aliases: 'addbot',
    async execute(client, message, args, data, color) {

        const embed = new MessageEmbed()
            .setTitle('Ajoute moi')
            .setDescription(`Pour m'inviter Ajoute moi [ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) ou sur le bouton ci-dessous !`)
            .setTimestamp()
            .setColor("WHITE")
            
            const button = new Discord.MessageButton()
            .setLabel(`Inviter ${client.user.username}`)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
            .setStyle("LINK");

            const bt = new Discord.MessageButton()
            .setLabel(`Serveur Support`)
            .setURL("https://discord.gg/snowaybot")
            .setStyle("LINK");

         const row = new Discord.MessageActionRow().addComponents(button, bt)

        message.reply({ embeds: [embed], components: [row]})    
    }
}

const ms = require('ms')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

const db = require('quick.db')
const cl = new db.table("Color")


module.exports = {
    name: 'ping',

     async execute(client, message, args,config,emote,footer,color) {   


        const APIPing = client.ws.ping;
        let APIemoji;
        if(APIPing <= 100) { APIemoji = "🟢" }
        else if(APIPing <= 200 && APIPing >= 100) { APIemoji = "🟠" }
        else if(APIPing >= 300) {APIemoji = "🔴" }
        

        const embed = new Discord.MessageEmbed()
        .setDescription(`\`${APIemoji}\` Mon ping est de : ${client.ws.ping}ms`)
        .setColor("BLURPLE")
        message.channel.send({ embeds: [embed] }).then(async msg => {
        })
    }
}
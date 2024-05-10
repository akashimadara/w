const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
 const config = require("../../config.js")
const cl = new db.table("Color")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'say',
    usage: 'say',
    description: `Permet de repéter un message.`,
    /**
     * 
     * @param {*} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} config 
     * @param {*} emote 
     * @param {*} footer 
     * @param {*} color 
     * @returns 
     */
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            message.delete();
            if (args.join(" ") == '@everyone') return await message.channel.send({ content: "Vous ne pouvez pas mentionner de personne." })
            if(message.mentions.users.first() || message.mentions.roles.first()) return message.channel.send({ content: "Vous ne pouvez pas mentionner de personne." })
            message.channel.send({ content: args.join(" ") });
        }
    }
}
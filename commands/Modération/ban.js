const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")

const fs = require('fs')
const moment = require('moment')
const ml = new db.table("modlog")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'ban',
    usage: 'ban <membre>',
    description: `Permet de bannir un membre.`,
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

            let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user
            if (!member) try{
                member = await client.users.fetch(args[0])
            }
            catch(e){
                member = null
            }

            if (!member) {
                return message.reply("Merci de mentionner l'utilisateur que vous souhaitez bannir du serveur !")
            }

            if (member.id === message.author.id) {
                return message.reply("Tu ne peux pas te bannir !")
            }
            if(message.guild.members.cache.get(member.id)?.roles.highest.position >= message.member.roles.highest.position)  return message.reply("Tu ne peux pas bannir ce membre !")
            if(member.id == message.guild.ownerId) return message.reply("Tu ne peux pas bannir le propriétaire du serveur !")
            if(await message.guild.bans.fetch({
                user: member
            }).catch(()=> (false))) return message.reply("Ce membre est déjà banni du serveur !")
            

            if (owner.get(`owners.${member.id}`) || config.app.owners.includes(member.id) || config.app.funny.includes(member.id) === true) return message.reply("Tu ne peux pas bannir un owner bot !")
   

            let reason = args.slice(1).join(" ") || `Aucune raison`
            await message.guild.bans.create(member,{reason : reason}).then(()=> {
                message.reply({ content: `${member} à été banni du serveur` }).catch(err => err)
                member.send({ content: `Tu as été banni par ${message.author} pour la raison suivante: \n\n ${reason}` }).catch(err => {})
            }).catch(err => message.reply("Je n'ai pas la permission de bannir ce membre !"))

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`banni\` ${member} du serveur\nRaison : ${reason}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
        }

       

        }
    }


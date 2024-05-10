const Discord = require("discord.js")

const db = require("quick.db")
const owner = new db.table("Owner")
const punish = new db.table("Punition")
const p = new db.table("Prefix")
const cl = new db.table("Color")

module.exports = {
    name: 'punition',
    usage: 'punition',
    description: `Permet de configuré la punition de l'antiraid.`,
     async execute(client, message, args,config,emote,footer,color) {

        

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let fufu = punish.get(`sanction_${message.guild.id}`)
            if (fufu == null) fufu = "rien"

            const embed = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Punition actuelle : \`${fufu}\``)
                .setColor(color)

            const rien = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`rien\``)
                .setColor(color)

            const kick = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`kick\``)
                .setColor(color)

            const ban = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`ban\``)
                .setColor(color)

            message.channel.send({ embeds: [embed], components: [await getCompo(fufu)] }).then(async msg => {

                const collector = msg.createMessageComponentCollector({
                    componentType: "BUTTON",
                    filter: i => i.user.id === message.author.id
                })
                collector.on("collect", async (c) => {
                    const value = c.customId
                    punish.set(`sanction_${message.guild.id}`, value)
                    c.reply({ content: `La punition en cas de __raid__ sera désormais **${value}**`, ephemeral: true })
                    c.message.edit({ components: [await getCompo(value)] })

                })
            })
        }
    }
}

function getCompo(fufu) {
    const punition = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('rien')
            .setLabel('rien')
            .setStyle('DANGER')
    )
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('kick')
            .setLabel('Kick')
            .setStyle('DANGER')
    )
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('ban')
            .setLabel('Ban')
            .setStyle('DANGER')
    )

punition.components.find(r=> r.customId === fufu).setStyle("PRIMARY")
return punition
}
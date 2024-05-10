const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")


module.exports = {
    name: 'buttonrole',
    usage: 'buttonrole',
    description: `Permet de faire un buttonrole.`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if(role.position > message.guild.me.roles.highest.position) return message.reply(`Le role est plus haut que moi`)
            const msg = args.slice(1).join(" ")

         
            const embed = new Discord.MessageEmbed()
                .setTitle(`Prends ton role`)
                .setDescription(`${msg}\n__Role :__ ${role}`)
                .setColor(color)


            const rolemenu = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('buttonrole_' + role.id)
                        .setLabel(role.name)
                        .setStyle('SUCCESS')
                )

             await message.channel.send({ embeds: [embed], components: [rolemenu] })

        }
    }
}
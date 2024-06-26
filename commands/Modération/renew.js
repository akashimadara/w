const Discord = require("discord.js")

const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'renew',
    usage: 'renew',
    description: `Permet de renew un salon.`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(p3.fetch(`perm3_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (!message.channel.deletable) return message.reply("*Impossible de renew ce channel !*")
            message.channel.clone().then((ch) => {
                ch.setParent(message.channel.parent);
                ch.setPosition(message.channel.position);
                message.channel.delete();
                ch.send("<@" + message.author.id + "> Salon recrée !").then(msg => {
                })
            })

            
    
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`renew\` le salon ${message.channel.name}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
        }

    }
}
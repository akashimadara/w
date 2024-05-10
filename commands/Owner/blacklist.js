const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")



module.exports = {
    name: 'bl',
    usage: 'bl',
    description: `Permet de blacklist des membres`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
           

            if (args[0]) {
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

               if (!member)  return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)



                    if (owner.get(`owners.${member.id}`) || config.app.owners.includes(member.id) || config.app.funny.includes(member.id) === true) return;

                if (db.get(`blacklist.${member.id}`) === member.id) { return message.channel.send(`${member.username} est déjà blacklist`) }
                
              
        
                db.push(`${config.app.blacklist}.blacklist`, member.id)

               


                db.set(`blacklist.${member.id}`, member.id)
                member.kick(`Blacklist par ${message.author.username}`).catch(e => { })
                message.channel.send(`<@${member.id}> est maintenant blacklist`)

            } else if (!args[0]) {

                let own = db.get(`${config.app.blacklist}.blacklist`)
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n"))
                    .setFooter({ text: `${footer}` })
                message.channel.send({ embeds: [embed] })

                
            }
        }
    }
}

const Discord = require("discord.js")

const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const pgs = new db.table("PermGs")

module.exports = {
    name: 'addrole',
    usage: 'addrole',
    description: `Permet d'ajouter un role à un membre.`,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} config 
     * @param {*} emote 
     * @param {*} footer 
     * @param {*} color 
     * @returns 
     */
     async execute(client, message, args,config,emote,footer,color) {

        if (!args[0]) return message

        let own = message.guild.ownerId

        if (own === message.author.id || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) || wl.get(`${message.guild.id}.${message.member.id}.wl`) || message.member.permissions.has("ADMINISTRATOR")) {

            let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!rMember) return

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(role => role.name === args[1])

            if(role.position > message.guild.members.me.roles.highest.position) return message.channel.send(`Ce rôle est plus haut que mon rôle le plus haut, je ne peux donc pas l'ajouter à un membre.`)
            if(role.managed) return message.channel.send(`Ce rôle est géré par un bot, vous ne pouvez pas l'ajouter à un membre.`)
            if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)
            if ((rMember.guild.ownerId !== rMember.id) &&( rMember.roles.highest.position < message.guild.members.me.roles.highest.position) ) return message.channel.send(`1 rôle ajouté à 0 membre`)

            if (rMember.roles.cache.has(role.id)) return message.channel.send({content :  rMember.displayName  + " possédes déjà ce rôle"})


   
            if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id, `Rôle ajouté par ${message.author.tag}`).then(()=> message.channel.send(`1 rôle ajouté à 1 membre`)).catch(e => message.reply("Une erreur c'est produite lors de l'ajout d'un rôle,assurez-vous que mon rôle sois le plus haut."))

            

            


        } else if (message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`)) === true) {
            {

                let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                if (!rMember) return



                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])


                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)
                if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
                    return message.channel.send("1 rôle n'a pas pu être ajouté car il a des permissions dangereuses")
                }

                if (rMember.roles.highest.position > client.user.id) return message.channel.send(`1 rôle enlevé à 0 membre`)

                if (rMember.roles.cache.has(role.id)) return message.channel.send(`1 rôle ajouté à 0 membre`)

                if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id, `Rôle ajouté par ${message.author.tag}`);

                message.channel.send(`1 rôle ajouté à 1 membre`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`➕ <@${message.author.id}> à utilisé la commande \`addrole\` sur ${rMember}\nRole ajouté : ${role}`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}
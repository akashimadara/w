const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")


const { QuickClick } = require("weky");

module.exports = {
    name: 'click',
    usage: 'click',
    description: `jeux`,
     async execute(client, message, args,config,emote,footer,color) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        

        await QuickClick({
            message: message,
            embed: {
                title: 'Clique | Soit rapide',
                color: `${color}`,
                footer: footer,
                timestamp: true
            },
            time: 60000,
            waitMessage: 'Les boutons peuvent apparaître à tout moment',
            startMessage:
                'La première personne à appuyer sur le bon bouton gagnera. Tu as **{{time}}**!',
            winMessage: 'GG, <@{{winner}}> a appuyé sur le bouton dans **{{time}} secondes**.',
            loseMessage: 'Personne n\'a appuyé sur le bouton à temps. Alors',
            emoji: '🎁',
            ongoingMessage:
                "Un jeu est déjà en cours dans <#{{channel}}>"
        });
    }
}
const { Connect4 } = require('discord-gamecord')
const Discord = require("discord.js")

const db = require('quick.db')
const cl = new db.table("Color")


module.exports = {
    name: 'puissance4',
    usage: 'puissance4',
     async execute(client, message, args,config,emote,footer,color) {

        

        if (!message.mentions.members.first()) 
        return message.reply("Veuillez mentionner un membre")
        if(message.mentions.members.first().id === message.author.id) return message.reply("Vous ne pouvez pas jouer contre vous même")
        //bot
        if(message.mentions.members.first().user.bot) return message.reply("Vous ne pouvez pas jouer contre un bot")
        

        new Connect4({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Puissance 4',
                color: color,
            },
            emojis: {
                player1: '🔵',
                player2: '🟡'
            },
            turnMessage: '{emoji} | C\'est maintenant le tour de **{player}**',
            winMessage: '{emoji} | **{winner}** a gagné la partie',
            gameEndMessage: 'Le jeu est resté interminé :(',
            drawMessage: 'C\'est une égalité',
            askMessage: 'Hey {opponent}, {challenger} vous a défié pour une partie de Puissance 4',
            cancelMessage: 'On dirait qu\'il a refusé',
            timeEndMessage: 'L\'adversaire n\'a pas répondu',
        }).startGame();
    },
};
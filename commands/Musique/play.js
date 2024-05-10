const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")

const { QueryType, Player } = require('discord-player');


module.exports = {
    name: 'play',
    usage: 'play',
    category: "owner",
    description: `Music`,
     async execute(client, message, args,config,emote,footer,color) {

        if (!args[0]) return message.reply(`Veuillez entrer une recherche valide ${emote.musique.no}`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply(`Aucun résulat ${emote.musique.no}`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Lancement de votre ${res.playlist ? 'playlist' : 'musique'} ${emote.musique.yes}`)
        .setDescription("**Si la musique ne se lance pas,réesayer avec une autre musique !**")
        .setColor(color)

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.stop();
            embed.setDescription("Une erreur est survenue surement un rate limit de discord")
            return message.reply({embeds: [embed]});
        }

        await message.reply({embeds: [embed]});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();

    }
}


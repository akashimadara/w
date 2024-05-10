
const config = require('../config')
const db = require('quick.db')
const cl = new db.table("Color")

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction, message) {


        if (!interaction.isButton()) return;
	
        if(!interaction.customId.startsWith('buttonrole_')) return;
       
        const role = interaction.guild.roles.cache.get(interaction.customId.split('_')[1])
        if (!role) return interaction.deferUpdate();

        if (!interaction.member.roles.cache.has(role.id)) {
            interaction.member.roles.add(role).then(()=> interaction.reply({ content: `${interaction.user}, je vous ai donné le rôle \`${role.name}\``, ephemeral: true })).catch(() => interaction.reply({ content: `${interaction.user}, je n'ai pas pu vous donner le rôle \`${role.name}\``, ephemeral: true }))
        }
        else {
            interaction.member.roles.remove(role).then(()=>interaction.reply({ content: `${interaction.user}, je vous ai enlevé le rôle \`${role.name}\``, ephemeral: true }) ).catch(() => interaction.reply({ content: `${interaction.user}, je n'ai pas pu vous enlever le rôle \`${role.name}\``, ephemeral: true }))
        }
    }
}
const { SlashCommandBuilder } = require('discord.js');
const warnDB = require('../utils/warn_data')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription(`Commande de modération permettant d'avertir un membre du serveur en cas de problèmes.`)
        .addUserOption(option =>
			option.setName('membre')
				.setDescription(`La personne qui doit recevoir l'avertissement`)
				.setRequired(true))
        .addStringOption(option =>
			option.setName('raison')
				.setDescription(`La raison de l'avertissement`)
				.setRequired(false)),
	async execute(interaction) {
		//await interaction.reply({ content:'Pong!', ephemeral: true });
        if (!interaction.member.roles.cache.has('1068590384718028922')) {
            return interaction.reply({ content:`Vous ne pouvez pas faire cela`, ephemeral: true });
        }
        const target = interaction.options.getUser('membre');
        const reason = interaction.options.getString('raison');
		await warnDB.CheckUserPresence(target.id,target.username);
		interaction.reply({ content:`${target.username} va être averti pour ${reason}`, ephemeral: true });
		console.log(await warnDB.GetWarns(target.id));
		return;
	},
};
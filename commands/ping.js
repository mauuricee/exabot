const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Un petit peu de ping pong'),
	async execute(interaction) {
		await interaction.reply({ content:`🏓 Ma latence est de ${Date.now() - interaction.createdTimestamp}ms`, ephemeral: true });

	},
};
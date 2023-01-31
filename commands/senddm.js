const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('senddm')
		.setDescription(`Pour envoyer un message privé un quelqu'un.`)
        .addUserOption(option =>
			option.setName('membre')
				.setDescription(`La personne qui doit recevoir le message`)
				.setRequired(true))
        .addStringOption(option =>
			option.setName('contenu')
				.setDescription(`Le contenu du message à envoyer`)
				.setRequired(true))
        .addAttachmentOption(option =>
            option.setName('fichier')
                .setDescription(`(Optionel) Fichier à envoyer en pièce jointe de - de 8 Mo`)
                .setRequired(false)),
	async execute(interaction) {
		//await interaction.reply({ content:'Pong!', ephemeral: true });
        if (!interaction.member.roles.cache.has('1068590384718028922')) {
            return interaction.reply({ content:`Vous ne pouvez pas faire cela`, ephemeral: true });
        }
        const target = interaction.options.getUser('membre');
        const text = interaction.options.getString('contenu');
        const file = interaction.options.getAttachment("fichier");
        interaction.reply({ content:`${target.username} va recevoir votre message`, ephemeral:true });
        console.log('Initiation du message');
        target.send({content:`${text}`});
        console.log(`Message de ${interaction.member.user.username} envoyé à ${target.username}. Contenu : ${text}`);
        if (file) {
            console.log(`Une pièce jointe a été renseignée, elle va être envoyée`);
            return target.send({files:[file]});
        }
        console.log(`Aucune pièce jointe renseignée`);
	},
};
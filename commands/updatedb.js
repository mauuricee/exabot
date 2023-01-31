const { SlashCommandBuilder } = require('discord.js');
const warnDB = require('../utils/warn_data');
const Enabled = true;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('updatedb')
		.setDescription(`Commande de modération permettant d'avertir un membre du serveur en cas de problèmes.`),
	async execute(interaction,client) {
		//await interaction.reply({ content:'Pong!', ephemeral: true });
        if (!Enabled) {
            return interaction.reply({ content:`Commande indisponible`, ephemeral: true });
        }
        //const guild = client.guilds.cache.get('610881681829789698');
        guild.members.fetch()
            .then(console.log)
            .catch(console.error);
        
        /*guild.members.cache.forEach(member =>
            {
                  // Loop through every members
                
                    if (member.user.bot) {
                        console.log(`${member.username} est un bot est n'a donc pas été ajouté à la base.`)
                    } else {
                        warnDB.CheckUserPresence(member.id,member.username);
                    }   
                ;
            });*/
        //guild.members.cache.forEach(member => console.log(member.user.username));
		return interaction.reply({ content:`Lancement de l'ajout des utilisateurs sur la base`, ephemeral: true });
	},
};
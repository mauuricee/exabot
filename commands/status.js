const { SlashCommandBuilder } = require('discord.js');
const Gamedig = require('gamedig');
let state = null;
      // query your game server
module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription("Permet d'obtenir le statut du serveur"),
	async execute(interaction) {
		//await interaction.reply({ content:'Pong!', ephemeral: true });
        Gamedig.query({
            type: 'garrysmod',
            host: '*',
            port: '27015',
          })
            .then((updatedState) => {
              state = updatedState;
      
              //const nom = state.name;
              const carte = state.map;
              const joueursmax = state.maxplayers;
              const joueurs = state.players.length;
              const latence = state.ping;
              const slotsdispo = state.maxplayers - state.players.length;

              if (!state) {
                return interaction.reply({ content:`Aucune information sur le serveur n'a pu être obtenue. Cela peut être dû au fait qu'il soit hors ligne ou en maintenance.`, ephemeral: true})
              }

              interaction.reply({ content:`Il y a actuellement ${joueurs} joueurs connectés sur le serveur.\n${slotsdispo} places sont encore disponibles pour se connecter.\nLa map actuelle est ${carte}.\nLe ping est de ${latence}ms.`, ephemeral:true})
      
              //client.user.setActivity(`${joueurs}/${joueursmax} Joueurs`);
            })
            .catch((e) => {
              console.log(e);
              return interaction.reply({ content:`Aucune information sur le serveur n'a pu être obtenue. Cela peut être dû au fait qu'il soit hors ligne ou en maintenance.`, ephemeral: true});
         });
	},
};

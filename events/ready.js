const { Events } = require('discord.js');
const Gamedig = require('gamedig');
let state = null;

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        //client.getWarns = sql.prepare("SELECT * FROM warns WHERE memberID = ?");
        //client.setWarns = sql.prepare("INSERT OR REPLACE INTO warns (memberID, warncount, warnDetails) VALUES (@id, @count, @details);");
        console.log(`Chargement réussi ! Chargé en tant que :  ${client.user.tag}`);
        client.user.setActivity("être développé");// WATCHING, LISTENING ou pas type mais url:lien twitch pour STREAMING  
        client.user.setStatus('dnd'); //dnd, invisible, online, idle
	},
};
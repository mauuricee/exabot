const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.guildMemberAdd,
	async execute(member) {
        if (!member.user.bot) {
            const WelcomeChannel = member.guild.channels.get('710280803388489748');
            const WelcomeEmbed = new EmbedBuilder()
                .setColor('#ed872d')
                .setTitle('Bienvenue')
                .addField('', member.nickname)
                .setImage(member.user.avatarURL);
            await WelcomeChannel.send({content:'Bienvenue à ', embeds:[WelcomeEmbed]});
            await WelcomeChannel.send("test");
        }
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
module.exports = {
    data: new SlashCommandBuilder()
        .setName('issue')
        .setDescription('Contribute to this bot on github'),
    async execute(interaction) {
        const issueEmbed = new MessageEmbed()
		.setColor('#ffff00')
		.setTitle("Report an issue")
		.setDescription('Error!')
		.addField("Issue link:",`https://github.com/ComputerComa/SOTDBOTV3/issues`)
        interaction.reply({embeds: [issueEmbed], ephemeral: true })
    }
};
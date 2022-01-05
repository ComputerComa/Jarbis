const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Contribute to this bot on github'),
    async execute(interaction) {
        const githubEmbed = new MessageEmbed()
		    .setColor('#ffff00')
		    .setTitle("Check out the project on Github!")
		    .setDescription('Take a peek under the hood!')
		    .addField("Repository link:",`https://github.com/ComputerComa/SOTDBOTV2`)
        interaction.reply({embeds: [githubEmbed], ephemeral: true })
    }
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const  Discord  = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows how to use the commands'),
    async execute(interaction) {
        const helpembed = new MessageEmbed()
        .setColor('#ff1111')
        .setTitle("Help Menu")
        .setDescription(`Help Documentation`)
		.addFields(
			{name: `/ping`, value : `Gets the latency of the bot`},
			{name: `/announce`, value : `Pings the specified role with a message and song info.\nAccepted parameters {spotify url} {ping role} {user}`},
			{name: `/invite`, value : `Shows the invite url for this bot.`},
			{name: `/github`, value : `Shows the Github URL for the source code repository.`},
			{name: `/issue`, value : `Shows the url to the Github issues page.`},
		)
        .setFooter('Thanks for the song suggestion!')
        interaction.reply({embeds: [helpembed], ephemeral: true })
    }
};
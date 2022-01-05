const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction) {
        const pingEmbed = new MessageEmbed()
		    .setColor('#ffff00')
		    .setTitle("Ping....")
		    .setDescription('...Pong')
		    .addField("-----",`Current Latency: ${interaction.client.ws.ping} ms.`)

        interaction.reply({embeds: [pingEmbed], ephemeral: true })
    }
};

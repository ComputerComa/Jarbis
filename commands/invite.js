const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
var url = "https://discord.com/api/oauth2/authorize?client_id=884581938663391283&permissions=0&scope=bot%20applications.commands"
const MessageEmbed = Discord.MessageEmbed
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server'),
    async execute(interaction) {
        const inviteEmbed = new MessageEmbed()
		.setColor('#ffff00')
		.setTitle("Add me to your server!")
		.setDescription('Share your love of music')
		.addField("Invite url",`${url}`)
        interaction.reply({embeds: [inviteEmbed], ephemeral: true })
    }
};
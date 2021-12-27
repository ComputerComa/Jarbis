const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Permissions = Discord.Permissions
const MessageEmbed = Discord.MessageEmbed
const GuildSettigs = require("../models/GuildSettings")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the channel where join/leave messages will be sent')
        .addChannelOption(option => option.setName("user").setDescription("The User to kick").setRequired(true)),
    async execute(interaction) {


        //Check for admin perms
        if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])){
            interaction.reply("You do not have permissions to use this command!");
            return;
        }


    }
}

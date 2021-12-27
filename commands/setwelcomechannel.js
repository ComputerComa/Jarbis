const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Permissions = Discord.Permissions
const MessageEmbed = Discord.MessageEmbed
const GuildSettigs = require("../models/GuildSettings")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the channel where join/leave messages will be sent')
        .addChannelOption(option => option.setName("channel").setDescription("The channel to use").setRequired(true)),
    async execute(interaction) {


        //Check for admin perms
        if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])){
            interaction.reply("You do not have permissions to use this command!");
            return;
        }
        GuildSettigs.findOne({guild_id: interaction.guild.id},(err,settings) =>{
            if(err){
                console.log(err);
                interaction.reply("An error occurred while trying to set the join/leave channel!")
            
            return;
        };
        if(!settings){
            settings = new GuildSettigs({
                guild_id: interaction.guild.id,
                welcome_channel: interaction.options.getChannel("channel").id
                
            })
        } else{
            settings.welcome_channel_id = interaction.options.getChannel("channel").id
            console.log(interaction.options.getChannel("channel").id)
        }
        settings.save(err => {
            if (err){
                console.log(err);
                interaction.reply("An error occurred while trying to set the join/leave channel!")
            
            return; 
            }
            interaction.reply(`The join / leave channel has been updated to <#${interaction.options.getChannel("channel").id}>`)
        })
        })
    }
};

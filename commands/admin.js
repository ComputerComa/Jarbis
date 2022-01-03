const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
const Permissions = Discord.Permissions
const {getData, getPreview, getTracks} = require('spotify-url-info');
const {ms,s,m,h,d} = require('time-convert')
const utils = require('../etc/utils')
function msToHms(time, ms) {
    let pretty = ms.to(h, m, s)(time)
    pretty[0] = utils.zeropad(pretty[0])
    pretty[1] = utils.zeropad(pretty[1])
    pretty[2] = utils.zeropad(pretty[2])
    let out = "00:00:00"
    if (pretty[0] == "00") {
        pretty.splice(0, 1)
        //console.log(pretty)
        out = `${
            pretty[0]
        }:${
            pretty[1]
        }`
    } else {
        out = `${
            pretty[0]
        }:${
            pretty[1]
        }:${
            pretty[2]
        }`
    }
    //console.log(out)

    return out
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Admin utilities')
        .addSubcommand(subcommand =>
            subcommand
            .setName('ban')
            .setDescription("Bans the mentioned user.")
            .addUserOption(option => option.setName('target').setDescription('The user to act upon').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for the action').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('unban')
            .setDescription("UnBans the mentioned user.")
            .addUserOption(option => option.setName('target').setDescription('The user to act upon').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('kick')
            .setDescription("Kicks the mentioned user.")
            .addUserOption(option => option.setName('target').setDescription('The user to act upon').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for the action').setRequired(true))
            )
        .addSubcommand(subcommand =>
            subcommand
            .setName('timeout')
            .setDescription("Timeouts the mentioned user.")
            .addUserOption(option => option.setName('target').setDescription('The user to act upon').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for the action').setRequired(true))
            .addIntegerOption(option => option.setName('duration').setDescription("The duration to timeout the user in miliseconds.").setRequired(true))
        ),

        async execute(interaction){
            if(interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])){
            if(interaction.options.getSubcommand() === 'ban'){
                let user = interaction.options.getUser('target')
                let guilduser = await interaction.guild.members.fetch(user)
                let reason = interaction.options.getString('reason')
                try {
                    const userembed = new MessageEmbed().setTitle("Administrative Message").setColor("#00FF00").setTimestamp().setDescription(`You have been banned from ${interaction.guild.name} by ${interaction.user.username} for ${reason}`)
                    await user.send({embeds:[userembed]})
                    await interaction.reply(`${user} banned from ${interaction.guild.name} by ${interaction.user.username} for ${reason} `)
                    await guilduser.ban()
                } catch (error) {
                    await interaction.reply(`Unable to ban this member!\n Error: ${error}`)
                }
            }else if(interaction.options.getSubcommand() === 'unban'){
                    let user = interaction.options.getUser('target')
                try {
                    await interaction.guild.members.unban(user) 
                    await interaction.reply(`${user} unbanned from ${interaction.guild.name} by ${interaction.user.username}`)
                        
                } catch (error) {
                    await interaction.reply(`Unable to ban this member!\n Error: ${error}`)
                }
            }else if(interaction.options.getSubcommand() === 'kick'){
                    let user = interaction.options.getUser('target')
                    //let dmuser = await interaction.client.users.fetch(user)
                    let guilduser = await interaction.guild.members.fetch(user)
                    let reason = interaction.options.getString('reason')
                try {
                    
                        const userembed = new MessageEmbed().setTitle("Administrative Message").setColor("#00FF00").setDescription(`You have been kicked from ${interaction.guild.name} by ${interaction.user.username} for ${reason}.`).setTimestamp()
                        await user.send({embeds:[userembed]})
                        await guilduser.kick()
                        await interaction.reply(`${user} kicked from ${interaction.guild.name} by ${interaction.user.username} for ${reason} `)

                } catch (error) {
                    await interaction.reply(`Unable to kick this member!\n Error: ${error}`)
                }
            }else if(interaction.options.getSubcommand() === 'timeout'){
                    let user = interaction.options.getUser('target')
    
                    let guilduser = await interaction.guild.members.fetch(user)
                    let reason = interaction.options.getString('reason')
                    let duration = interaction.options.getInteger('duration')
                   // let pretty = msToHms(duration.ms)
                   // let hr = pre
                try {
                        let guilduser = await interaction.guild.members.fetch(user)
                        let now = Date.now()
                        let expires = new Date(now + duration)
                        await guilduser.timeout(duration,reason)
                        const userembed = new MessageEmbed().setTitle("Administrative Message").setColor("#00FF00").setDescription(`You have been timedout in ${interaction.guild.name} by ${interaction.user.username} for ${reason}. You will be able to talk again on ${expires}.`).setTimestamp()
                        await user.send({embeds:[userembed]})
                        await interaction.reply(`${user} timed out in ${interaction.guild.name} by ${interaction.user.username} for ${reason}. They will be able to talk again on ${expires}`)

                } catch (error) {
                    await interaction.reply(`Unable to timeout this member!\n Error: ${error}`)
                }
            }

        }else{
            await interaction.reply("You do not have permissions to use these commands!")
        }
    }
    
    
    }
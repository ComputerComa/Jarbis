const Discord = require('discord.js')
const GuildSettigs = require("../models/GuildSettings")
module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        const guildSettings = await GuildSettigs.findOne({guild_id: member.guild.id});

        if(!guildSettings && !guildSettings.welcome_channel_id){
            return;
        }
     //   member.guild.channels.cache.get("918896229340024964").send(`${member.user} has joined the server!`)
     const byememberembed = new Discord.MessageEmbed()
        .setColor("#FF7263")
        .setTitle("Member Left!")
        .setDescription(`${member.user} has left the server! Sorry to see you go!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()


        member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({embeds: [byememberembed]})
    }
}
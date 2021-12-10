const Discord = require('discord.js')
const GuildSettigs = require("../models/GuildSettings")

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const guildSettings = await GuildSettigs.findOne({guild_id: member.guild.id});

        if(!guildSettings && !guildSettings.welcome_channel_id){
            return;
        }
     //   member.guild.channels.cache.get("918896229340024964").send(`${member.user} has joined the server!`)
     const newmemberembed = new Discord.MessageEmbed()
        .setColor("#8A49AF")
        .setTitle("New Member!")
        .setDescription(`${member.user} has joined the server! Have a wonderful time!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()


        member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({embeds: [newmemberembed]})
    }
}

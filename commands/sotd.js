const { SlashCommandBuilder } = require('@discordjs/builders');
const { ms, s, m, h, d, minutes, seconds } = require('time-convert');
const { getData, getPreview, getTracks } = require('spotify-url-info');
const  Discord  = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Create a SOTD announcement')
        .addStringOption(option =>
            option.setName('spotify-url')
                .setDescription('Spotify URL')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('ping-role')
                .setDescription('The role to ping for the announcement')
                    .setRequired(true))
        .addUserOption(option =>
            option.setName('user-credit')
                .setDescription('The user to credit for the song suggestion')
                    .setRequired(true)),
        

    async execute(interaction) {
        const spotify_url_to_parse = interaction.options.getString('spotify-url')
        const ping_role = interaction.options.getRole('ping-role')
        const user_credit = interaction.options.getUser('user-credit');
        const spotifydata = await getData(spotify_url_to_parse)
        const album_image = spotifydata.album.images[1].url
        const dominant_color = spotifydata.dominantColor
        var explicit = spotifydata.explicit
        if(explicit){
            explicit = "Yes"
          }else{
            explicit = "No"
          }
        const duration = spotifydata.duration_ms
        var pretty_duration = ms.to(h,m,s)(duration)
        var strigified_duration = `${pretty_duration[0]} hr(s) ${pretty_duration[1]}  minute(s) ${pretty_duration[2]} second(s)`
        const release_precision = spotifydata.album.release_date_precision
        const date = spotifydata.album.release_date
        if(release_precision == 'day'){
          const date_split = date.split("-")
          var dformatted = ""
           dformatted = String(date_split[1]) +"/"+ String(date_split[2] +"/" + String(date_split[0]))
        }else if(release_precision == 'year'){
          dformatted = spotifydata.album.release_date
        }
        const sotdPingEmbedWithAttribution = new MessageEmbed()
        .setColor(dominant_color)
        .setTitle("Announcement ping.")
        .setDescription(`Hey ${ping_role}! There's a new SOTD suggestion!`)
        .setAuthor("SOTDBOT#1214")
        .setImage(album_image)
        .addFields(
          {name: `Song`, value: `${spotifydata.name}`},
          {name: `Artist`, value: `${spotifydata.artists[0].name}`},
          {name: `Duration`,value: `${strigified_duration}`},
          {name: `Release ${release_precision}`, value : `${dformatted}`},
          {name: `Spotify URL`, value: `${spotify_url_to_parse}`},
          {name: `Explicit`, value: `${explicit}` },
          {name: `Suggested By:`, value: `${user_credit}`}
        )
        .setFooter('Thanks for the song suggestion!')
        await interaction.channel.send({embeds:[sotdPingEmbedWithAttribution]})

        interaction.reply({ content: 'SOTD sent', ephemeral: true })

    }
};
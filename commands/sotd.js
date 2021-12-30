const {SlashCommandBuilder} = require('@discordjs/builders');
const {
    ms,
    s,
    m,
    h,
    d
} = require('time-convert')
const {getData, getPreview, getTracks} = require('spotify-url-info');
const Discord = require("discord.js");
const MessageEmbed = Discord.MessageEmbed
const MessageActionRow = Discord.MessageActionRow
const MessageButton = Discord.MessageButton
const SOTDHistory = require("../models/SOTDHistory")
const utils = require('../etc/utils')

function msToHms(time, ms) {
    let pretty = ms.to(h, m, s)(time)
    pretty[0] = utils.zeropad(pretty[0])
    pretty[1] = utils.zeropad(pretty[1])
    pretty[2] = utils.zeropad(pretty[2])
    let out = "00:00:00"
    if (pretty[0] == "00") {
        pretty.splice(0, 1)
        console.log(pretty)
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
    console.log(out)

    return out
}
function buildSotdEmbed(ping_role,user_credit,spotify_url_to_parse,){}

async function hasAnnouncedHistory(serverID, songID) {
    let history_count =  await SOTDHistory.count({guild_id: serverID.toString(), song_ID: songID.toString()})
    if (history_count > 0) {
        return true
    } else {
        return false
    }
}
module.exports = {
    data: new SlashCommandBuilder().setName('announce').setDescription('Create a SOTD announcement').addStringOption(option => option.setName('spotify-url').setDescription('Spotify URL').setRequired(true)).addRoleOption(option => option.setName('ping-role').setDescription('The role to ping for the announcement').setRequired(true)).addUserOption(option => option.setName('user-credit').setDescription('The user to credit for the song suggestion').setRequired(true)),


    async execute(interaction) {
      await interaction.deferReply({ephemeral: true})
        const spotify_url_to_parse = interaction.options.getString('spotify-url')
        const song_ID = utils.getSongID(spotify_url_to_parse)
        const guild_ID = interaction.guild.id
      let announced = await hasAnnouncedHistory(guild_ID,song_ID)
      if(announced){
        console.log("this song has been announced in this server before")
        const BtnYes = new MessageButton()
            .setCustomId('yes')
            .setLabel('Yes')
            .setStyle('PRIMARY')

            const BtnNo = new MessageButton()
            .setCustomId('no')
            .setLabel('No')
            .setStyle('PRIMARY')

        const NoticeEmbed = new MessageEmbed()
          .setColor("#FF0000")
          .setTitle("Notice")
          .setAuthor("Johnny 5")
          .setDescription("It appears you already have announced this song in this server.\nDo you still want to announce this song?");

          const row = new MessageActionRow()
          .addComponents(
            BtnYes,
            BtnNo
          )
          interaction.editReply({ephemeral: true, embeds: [NoticeEmbed],components: [row]})

      }else{
        console.log("this song has not been announced in this server before")
        const ping_role = interaction.options.getRole('ping-role')
        const user_credit = interaction.options.getUser('user-credit');
        const spotifydata = await getData(spotify_url_to_parse)
        const album_image = spotifydata.album.images[1].url
        const dominant_color = spotifydata.dominantColor
        var explicit = spotifydata.explicit
        if (explicit) {
            explicit = "Yes"
        } else {
            explicit = "No"
        }
        const duration = spotifydata.duration_ms
        var pretty_duration = msToHms(duration, ms)
        const release_precision = spotifydata.album.release_date_precision
        const date = spotifydata.album.release_date
        if (release_precision == 'day') {
            const date_split = date.split("-")
            var dformatted = ""
            dformatted = String(date_split[1]) + "/" + String(date_split[2] + "/" + String(date_split[0]))
        } else if (release_precision == 'year') {
            dformatted = spotifydata.album.release_date
        }

        

        
        await interaction.channel.send({embeds: [sotdPingEmbed]})

        var SOTDHistoryEntry = new SOTDHistory({guild_id: interaction.guild.id, song_ID: songID, date_announced: Date.now()})

        SOTDHistoryEntry.save();

        interaction.reply({content: 'Announcement Sent!', ephemeral: true})
      }

        
      const filter = i => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({filter,max:1})

      collector.on('collect',async i =>{
          if(i.customId === "yes"){
              await i.update({embeds:[passable_embed],components: []})
          }else if(i.customId === "no"){
              await i.update({ephemeral: true,content:"This announcement was canceled!",components:[],embeds:[]})
          }else{
              return
          }
      })

    }

};

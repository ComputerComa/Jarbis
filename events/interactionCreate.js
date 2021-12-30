const Discord = require('discord.js')
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
       // console.log(interaction.id)


        if (interaction.isCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);
    if (! command){
        
        return;
        
    }else{
        
    

    try {
        await command.execute(interaction);
    } catch (error) {
        if (error){
            console.error(error);
        }

        await interaction.reply({content: 'There was an error while executing this command!'});
    }}
            
          } else if (interaction.isButton()) {
            console.log("This was a button")
            //interaction.update({content: 'Button clicked', ephemeral: true,embeds:[],components:[]})
          }



      //  if (!interaction.isCommand()) Unl
      //  return;
    

    
    }
}

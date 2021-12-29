const Discord = require('discord.js')
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        console.log(interaction.id)
        if (!interaction.isCommand()) 
        return;
    

    const command = interaction.client.commands.get(interaction.commandName);
    if (! command) 
        return;
    

    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) 
            console.error(error);
        

        await interaction.reply({content: 'There was an error while executing this command!'});
    }
    }
}

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('경매')
		.setDescription('분배금 계산')
        .addIntegerOption(option =>
            option
                .setName('가격')    
                .setDescription('경매장 가격')
                .setRequired(true)
        ),
	async execute(interaction) {
        const auctionCost = interaction.options.getInteger('가격');
        const charge = 0.95;
        const fairCost = auctionCost * charge

        await interaction.reply("4인: " + (fairCost - (fairCost / 4)) + "\n8인: " + (fairCost - (fairCost / 8)));
	},
};
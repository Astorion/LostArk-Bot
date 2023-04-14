const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('경매')
		.setDescription('분배금 계산')
        .addIntegerOption(option =>
            option
                .setName('가격')    
                .setDescription('거래소 가격')
                .setRequired(true))
        ,
	async execute(interaction) {
        const auctionCost = interaction.options.getInteger('가격');
        const auctionCostInCharge = auctionCost * 0.95;

        const fairCost4 = Math.floor(auctionCostInCharge / 4) * 3;
        const fairCost8 = Math.floor(auctionCostInCharge / 8) * 7;
        const fairCost16 = Math.floor(auctionCostInCharge / 16) * 15;
        const bidCost4 = Math.floor(fairCost4 / 1.1);
        const bidCost8 = Math.floor(fairCost8 / 1.1);
        const bidCost16 = Math.floor(fairCost16 / 1.1);

        await interaction.reply(
            "\n거래소 가격: " + auctionCost +
            "\n\nN빵 입찰가(4인): " + fairCost4 + " 이득: " + (Math.floor(auctionCostInCharge) - fairCost4) +
            "\nN빵 선점 입찰가(4인): " + bidCost4 + " 이득: " + (Math.floor(auctionCostInCharge) - bidCost4) +
            "\n\nN빵 입찰가(8인): " + fairCost8 + " 이득: " + (Math.floor(auctionCostInCharge) - fairCost8) +
            "\nN빵 선점 입찰가(8인): " + bidCost8 + " 이득: " + (Math.floor(auctionCostInCharge) - bidCost8) +
            "\n\nN빵 입찰가(16인): " + fairCost16 + " 이득: " + (Math.floor(auctionCostInCharge) - fairCost16) +
            "\nN빵 선점 입찰가(16인): " + bidCost16 + " 이득: " + (Math.floor(auctionCostInCharge) - bidCost16)
        );
	},
};
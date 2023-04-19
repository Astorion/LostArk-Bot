const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// const StringUtil = require('../stringUtil.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('경매테스트')
		.setDescription('분배금 계산')
        .addIntegerOption(option =>
            option.setName('가격')    
                .setDescription('거래소 가격')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('인원')
                .setDescription('경매 입찰 인원')
                .setRequired(true)
                .addChoices(
                    { name: '4인', value: '4' },
                    { name: '8인', value: '8' },
                    { name: '필드보스', value: '16' }))
    ,
	async execute(interaction) {
        const auctionCost = interaction.options.getInteger('가격');
        const personnel = interaction.options.getString('인원');
        const auctionCostInCharge = auctionCost * 0.95;

        let fairCost = Math.floor(auctionCostInCharge / personnel) * (personnel - 1);
        let bidCost = Math.floor(fairCost / 1.1);

        let headerName = personnel != '16' ? personnel + '인' : '필드보스';
        // let stringWidth = StringUtil.getStringWidth(auctionCost);

        // fairCost = StringUtil.fillSpaces(fairCost, stringWidth, 3);


        const exampleEmbed = new EmbedBuilder()
            .setColor(0xA6FF4D)
            .setTitle('경매 분배금 계산기')
            // .setURL('https://discord.js.org/')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            // .setDescription(`거래소 가격: ${auctionCost}`)
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: '`거래소 가격`', value: `${auctionCost}` }
            )
            .addFields(
                { name: '`[ ' + `${headerName}` + ' ]`', value: 'N빵 입찰가\nN빵 선점 입찰가', inline: true },
                { name: '`입찰가`', value: `${fairCost}\n${bidCost}`, inline: true },
                { name: '`이득`', value: `${Math.floor(auctionCostInCharge) - fairCost}\n${Math.floor(auctionCostInCharge) - bidCost}`, inline: true },
                //{ name: '\u200B', value: '\u200B' },    // 줄 넘김
            )
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            // .setTimestamp()
            // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

            // ``` : 범위 배경지정.

        await interaction.channel.send({ embeds: [exampleEmbed] }).then(interaction => {});
	}
};
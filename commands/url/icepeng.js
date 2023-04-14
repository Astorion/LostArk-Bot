const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('아이스펭')
		.setDescription('아이스펭 URL'),
	async execute(interaction) {
		await interaction.reply('https://loa.icepeng.com/');
	},
};
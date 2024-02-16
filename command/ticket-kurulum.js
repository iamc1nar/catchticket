const {MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name: 'ticket',
    usage: 'Şablon',
    category: "mod",
    description: `Şablon komutu.`,
    async execute(client, message, args) {
		message.delete()
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Bir işlem tipi belirt!')
					.addOptions([
						{
							label: 'Destek',
							description: 'Bir Destek Talebi Aç.',
							value: 'ortaklık',
              emoji: '1114553547049140246',
						},
						{
							label: 'Altyapı Sorunu',
							description: 'Bir Altyapı Sorunu Talebi Aç. ',
							value: 'şikayet',
              emoji: '1114553618914357248',
						},
                        {
							label: 'Yetkili Alım',
							description: 'Bir Yetkili Alım Talebi Aç.',
							value: 'yetkili',
              emoji: '1114553383571955743',
						},
            {
							label: 'Seçimi Sıfırla ',
							description: 'Seçimi Sıfırlar. ',
							value: 'asdadad',
              emoji: '1114555537393209384',
						},
            
					]),
			);

        message.channel.send({
            embeds: [{
                title: 'Ticket Aç',
                description: 'Lütfen açmak istediğiniz bilet türünü seçin.',
                color: "#99AAB5",
                footer: {text: 'Catch Ticket'}
            }],
            components: [row]
        })
    }
}

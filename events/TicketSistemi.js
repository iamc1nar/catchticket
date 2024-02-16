const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu }=require('discord.js')
const moment = require("moment")
moment.locale("tr")
const { kategori, yetkili } = require('../config.json');
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isSelectMenu()) return;
      const ticketlog = new MessageEmbed()
      .setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL({dynamic: true })}`})
      .setDescription(`
      \`Ticket Açan Kullanıcı:\` ${interaction.user} - (**${interaction.user.id}**)
      \`Ticket Açılma Tarihi:\` ${moment(Date.now()).format("LLL")}
      `)
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Ticketi silmek için tıkla !')
					.addOptions([
						{
							label: 'Ticketi Sil',
							description: 'Kanalı sil',
							value: 'delete',
              emoji: '1114555537393209384'
						}
					])
                );
                
                
        let catégorie = kategori
        let roleStaff = interaction.guild.roles.cache.get(yetkili)
        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
            if (!interaction.member.roles.cache.get("1109597781728960623")) return interaction.reply({content: "Ticketı Sadece Yetkililer Kapatabilir !",ephemeral: true})
                channel.delete();
              
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: '<:info:1109598882943471677> Sunucuda zaten açık bir biletiniz var.', ephemeral: true})
            if (interaction.values[0] == "yetkili") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const yetkili = new MessageEmbed()
                    .setTitle('Yetkili alım')
                    .setDescription('Lütfen başvurunuzu detaylandırınki Staff lar daha hızlı yardım edebilsin.')
                    .setFooter('Catch Ticket')
                    c.send({embeds: [yetkili], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `<:info:1109598882943471677>  Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
                  interaction.guild.channels.cache.get("1114553913912344596").send({embeds: [ticketlog] })          
            } else if (interaction.values[0] == "şikayet") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const şikayet = new MessageEmbed()
                    .setTitle('Altyapı Sorunu')
                    .setDescription('Lütfen Sorununuzu detaylandırınki Staff lar daha hızlı yardım edebilsin.')
                    .setFooter('Catch Ticket')
                    c.send({embeds: [şikayet], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `<:info:1109598882943471677>  Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                  interaction.guild.channels.cache.get("1114553913912344596").send({embeds: [ticketlog] })
                })
            } else if (interaction.values[0] == "ortaklık") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Destek Talebi')
                    .setDescription('Lütfen Sorununuzu detaylandırınki Staff lar daha hızlı yardım edebilsin.')
                    .setFooter('Catch Ticket')
                    c.send({embeds: [embed], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `<:info:1109598882943471677>  Ticketiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                  interaction.guild.channels.cache.get("1114553913912344596").send({embeds: [ticketlog] })
                })
                
            
                
            
            }
        }
    }
}
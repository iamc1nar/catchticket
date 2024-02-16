module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
      const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');


      
        console.log(`${client.user.username} Giriş Yaptım`)

        var KARISIKDURUM = 1
        setInterval(async () => {
            status =  [`Devolop By Catch❤️`]
            KARISIKDURUM = (KARISIKDURUM + 2) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[KARISIKDURUM]}`,
                    type: "PLAYING",
                  }],
                  status: "idle"})
        }, 5000);
      
      // Join voice channel
      
        const voiceChannelId = '1109830920220971100';

  const channel = client.channels.cache.get(voiceChannelId);
          const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    }
}

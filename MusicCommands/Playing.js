const Command = require("../modules/Command");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");

class Playing extends Command {
  constructor(client) {
    super(client, {
      name: "playing",
      description: "Afficher le nom de la musique en cours de lecture.",
      usage: "_playing"
    });
  }
  run(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique en cours !");
    return message.channel.send(`🎵🎶 La musique en cours de lecture est : **{serverQueue.songs[0].title}** 🎶🎵`)
  }
}

module.exports = Playing;

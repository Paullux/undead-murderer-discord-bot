const Command = require("../modules/Command");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Afficher la liste de musique.",
      usage: "_queue"
    });
  }
  run(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique en cours !");
    return message.channel.send(`
      **Playlist:**
      ${serverQueue.songs.map(song => `${song.title}`).join("\n")}
      ** En cours de lecture : ** ${serverQueue.songs[0].title}
    `);

  }
}

module.exports = Queue;

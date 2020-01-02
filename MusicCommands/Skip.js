const Command = require("../modules/Command");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Morceau suivant.",
      usage: "_skip"
    });
  }
  run(message) {
    const { voiceChannel } = message.member
    if (!voiceChannel)
      return message.channel.send(
        "Vous devez être dans un salon vocal pour utiliser cette commande !"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique en cours !");
    serverQueue.connection.dispatcher.end("La Commande skip est utilisée !");
  }
}
module.exports = Skip;

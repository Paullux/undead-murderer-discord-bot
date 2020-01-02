const Command = require("../modules/Command");

const YouTube = require('simple-youtube-api');
const cleYT = process.env.YOUTUBE;
const youtube = new YouTube(cleYT);

class Video extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_video')
  }
  static action (message) {
    let args = message.content.split(' ');
    args.shift();
    youtube.searchVideos(args.join(' '),4)
    .then(results => {
      message.reply(`Vous trouverez aussi **${results[0].title}** en vidéo sur le canal #📺-vidéo-youtube-📺`);
      return message.guild.channels.get(`661562097196466216`).send(`**${results[0].title}** \n${results[0].url}`);
    })
    .catch(function(error) {
      message.reply(`Vous trouverez **Windows XP ERROR Song** en vidéo sur le canal #📺-vidéo-youtube-📺`);
      message.guild.channels.get(`661562097196466216`).send(`**Windows XP ERROR Song** \nhttps://www.youtube.com/watch?v=yxxyjDFnbb0`);
      return message.channel.send('😥 **Erreur de recherche sur YouTube** 😥 \n😥 **Surement trop de requête au près de Youtube pour Aujourd\'hui** 😥 \n😥 **Réinitialisation des Requêtes le matin à 9h00 heure de Paris (Minuit heure du pacifique aux Etas-Unis)** 😥');
    });
  }
}

module.exports = Video;

const ytdl = require("ytdl-core");
const { Util } = require("discord.js");
const opus = require("node-opus");
const YouTube = require('simple-youtube-api');
const cleYT = process.env.YOUTUBE;
const youtube = new YouTube(cleYT);
const yturl = null;
const playlist = new Array(0)

function accessDispatcher(message) {

  if (typeof dispatcher !== 'undefined' && dispatcher) { const dispatcher = null} ;

  let args = message.toString().split(' ')
  let instruction = args[0];

  if (instruction.toLowerCase() !== '_playfrommachine') {
    if (!message.member.voiceChannel) {
      return message.reply("**N'oubliez pas de vous connecter sur un canal vocal avant de taper cette commande**");
    }
    if (message.channel.id == 521754132500054016) {

    if (instruction == '_playfrommachine') {instruction = '_play'};
    //message.reply("instruction = " + instruction);
    args.shift();
    if (instruction == '_volume') {
      argument = args[0]
      if (argument < 0) { argument = 0 };
      if (argument > 120) { argument = 120 };
    } else {argument = args.join(' ') };
    //message.reply("argument = " + argument);

    if (instruction.toLowerCase() == '_play') {
      youtube.searchVideos(argument,4)
        .then(results => {
          message.reply(`🎶🎵 Nouveau titre ajouté à la liste de lecture  💿 **${results[0].title}** 💿 ! 🎵🎶`);
          return playlist.push(`${results[0].url}`);
        })
        .catch(function(error) {
          console.log(error);
          playlist.push("https://www.youtube.com/watch?v=yxxyjDFnbb0");
          message.reply(`🎶🎵 Nouveau titre ajouté à la liste de lecture  💿 **Windows XP ERROR Song** 💿 ! 🎵🎶`);
          return message.channel.send('😥 **Erreur de recherche sur YouTube** 😥 \n😥 **Surement trop de requête au près de Youtube pour Aujourd\'hui** 😥 \n😥 **Réinitialisation des Requêtes le matin à 9h00 heure de Paris (Minuit heure du pacifique aux Etas-Unis)** 😥');
        });
    }
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first();
    voiceChannel
      .join()
      .then(function(connection) {
          if (playlist.lenght !== 0) {
            function playAgain() {
              let url = "" + playlist[0];
              let stream = ytdl(url, {filter: 'audioonly'});
              if (instruction.toLowerCase() == '_play') {
                stream.on('error', function () {
                  playlist[playlist.lenght] = null;
                  connection.disconnect();
                  message.reply(`😥 Echec de la d'ajout de la musique ! 😥`)
                });

              dispatcher = connection.playStream(stream)
              dispatcher.on('end', function () {
                playlist.shift();
                if (playlist.lencht !== 0) {
                  playAgain();
                  /**let url = "" + playlist[0];
                  let stream = ytdl(url, {filter: 'audioonly'});
                  dispatcher = connection.playStream(stream);
                  accessDispatcher("_playfrommachine " + playlist[0]);**/
                }
              });
              dispatcher.on('error', function () {
                message.reply("😥 Erreur durant la lecture du Morceau ! 😥")
              });
            }
            }
            if (instruction.toLowerCase() == '_volume') {
              if (typeof dispatcher !== 'undefined' && dispatcher) {
                if (!argument) { return message.reply(`**Le volume** actuel est de : **${60 * dispatcher.volume}%**`) };
                dispatcher.setVolume(argument / 60);
                message.reply(`**Le volume** est maintenant de : **${60 * dispatcher.volume}%**`);
              } else {
                message.reply("😥 En attente de la lecture de musique 😥")
              }
            }
            if (instruction.toLowerCase() == '_pause') {
              if (typeof dispatcher !== 'undefined' && dispatcher) {
                if (!dispatcher.paused) {
                  dispatcher.pause();
                  message.reply("⏯️ La musique est en pause ! ⏯️");
                };
              } else {
                message.reply("😥 En attente de la lecture de musique 😥")
              }
            }
            if (instruction.toLowerCase() == '_resume') {
              if (typeof dispatcher !== 'undefined' && dispatcher) {
                if (dispatcher.paused) {
                  dispatcher.resume();
                  message.reply("⏯️ La musique qui était en pause est relancé ! ⏯️");
                };
              } else {
                message.reply("😥 En attente de la lecture de musique 😥")
              }
            }
        }
      })
      message.member.setVoiceChannel(voiceChannel);

      if (playlist.lenght === 0) {
        connection.disconnect();
      }
    } else {
      message.reply("😥 Vous devez envoyer vos requêtes sur le salon 🤖-discussions-avec-le-bot-🤖 😥");
    }
  }
}


module.exports = accessDispatcher;

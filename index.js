const Discord = require("discord.js");
const token = process.env.TOKEN;
const fetch = require("node-fetch");
const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const klaw = require("klaw");
const path = require("path");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const Play = require("./MusicCommands/Play");
console.log("MusicCommands Play chargée");
const Stop = require("./MusicCommands/Stop");
console.log("MusicCommands Stop chargée");
const Volume = require("./MusicCommands/Volume");
console.log("MusicCommands Volume chargée");
const Pause = require("./MusicCommands/Pause");
console.log("MusicCommands Pause chargée");
const Resume = require("./MusicCommands/Resume");
console.log("MusicCommands Resume chargée");
const Queue = require("./MusicCommands/Queue");
console.log("MusicCommands Queue chargée");
const Skip = require("./MusicCommands/Skip");
console.log("MusicCommands Skip chargée");
const Now = require("./MusicCommands/Now");
console.log("MusicCommands Now chargée");
const Help = require("./MusicCommands/Help");
console.log("MusicCommands Help chargée");
const Video = require("./MusicCommands/Video");
console.log("MusicCommands Video chargée");
const Test = require("./MusicCommands/Test");
console.log("MusicCommands Test chargée");

/**
const comandFiles = fs.readdirSync('./MusicCommands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./MusicCommands/${file}`);
	client.commands.set(command.name, command);
  console.log(`MusicCommands ${command.name} chargée`);
}**/

const http = require("http");
const express = require("express");
const app = express();

const delaiAMOI = 7200000;

let nbDownloads = 0;
let nvxDownloads = 0;

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("message", msg => {
  let commandUsed =
    Play.parse(msg) ||
    Stop.parse(msg) ||
    Volume.parse(msg) ||
    Pause.parse(msg) ||
    Resume.parse(msg) ||
    Help.parse(msg) ||
    Video.parse(msg) ||
    Test.parse(msg) ||
    Queue.parse(msg) ||
    Now.parse(msg) ||
    Skip.parse(msg);
  var answer = "";
  if (msg.channel.id == 521754132500054016) {
    if (
      msg.content.toLowerCase().startsWith("hello") ||
      msg.content.toLowerCase().startsWith("bonjour") ||
      msg.content.toLowerCase().startsWith("bonsoir") ||
      msg.content.toLowerCase().startsWith("coucou") ||
      msg.content.toLowerCase().startsWith("hey") ||
      (msg.content.toLowerCase().startsWith("salut") &&
        msg.author.username !== "🧟 Undead_&_Zombies 🧟")
    ) {
      answer = `Salut, comment vas-tu ${msg.author} ?`;
      msg.channel.send(answer);
    }
    if (
      msg.content.toLowerCase().startsWith("re") &&
      msg.author.username !== "🧟 Undead_Murderer 🧟"
    ) {
      answer = `Re ${msg.author}, bon retour parmis nous ! Tu vas toujours aussi bien ?`;
      msg.channel.send(answer);
    }
    if (msg.content.toLowerCase().startsWith("ça va")) {
      answer = `Oui et toi ${msg.author} ?`;
      msg.channel.send(answer);
    }
    if (msg.content.toLowerCase().startsWith("_nbdl")) {
      answer = `nb DL demandé`;
      msg.channel.send(answer);
      requestHOSDL(msg);
      requestSF();
    }
  }
});

client.on("ready", () => {
  this.queue = new Map();
  if (typeof nbDownloads === "undefined") {
    requestSF();
  }
  requestSF();
  const intervalID = setInterval(function() {
    requestSF();
  }, `${delaiAMOI}`);
});

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.channels
    .find(x => x.name === "👶-bienvenue-aux-nouveaux-👶")
    .sendMessage(`Bienvenue ${member.user} sur ce serveur.`)
    .catch(function(error) {
      client.channels.cache
        .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
        .send(
          '__**Le client n\'a pas pu affficher "bienvenue-aux-nouveaux"**__'
        );
    });
});

function requestSF() {
  let aujourdhui = new Date();
  let annee = aujourdhui.getFullYear();
  let mois =
    (aujourdhui.getMonth() + 1 < 10 ? "0" : "") + (aujourdhui.getMonth() + 1);
  let jour = (aujourdhui.getDate() < 10 ? "0" : "") + aujourdhui.getDate();
  fetch(
    `https://sourceforge.net/projects/undead-murderer/files/stats/json?start_date=2018-12-21&end_date=${annee}-${mois}-${jour}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      let newDownloads = myJson.summaries.time.downloads;
      //client.channels.find(x => x.name === '🇫🇷-🗣-en-français-🗣-🇫🇷').send(newDownloads);
      if (nbDownloads != 0) {
        client.channels.cache
          .find(x => x.name === "📥-game-dl-📥")
          .send("__**Attention nouvel affichage des téléchargements**__")
          .catch(function(error) {
            client.channels.cache
              .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
              .send(
                "__**Le client n'a pas pu affficher le badge des nouveaux téléchargements**__"
              );
          });
        if (nbDownloads <= newDownloads) {
          nvxDownloads = newDownloads - nbDownloads;
        }
        if (nvxDownloads <= 1) {
          client.channels.cache
            .find(x => x.name === "📥-game-dl-📥")
            .send({
              file: `https://raster.shields.io/badge/Nouveau%20Téléchargement-${nvxDownloads}-orange.png`
            })
            .catch(function(error) {
              client.channels.cache
                .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
                .send(
                  "__**Le client n'a pas pu affficher le badge des nouveaux téléchargements**__"
                );
            });
        } else {
          client.channels.cache
            .find(x => x.name === "📥-game-dl-📥")
            .send(
              `https://raster.shields.io/badge/Nouveaux%20Téléchargements-${nvxDownloads}-orange.png`
            )
            .catch(function(error) {
              client.channels.cache
                .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
                .send(
                  "__**Le client n'a pas pu affficher le badge des nouveaux téléchargements**__"
                );
            });
        }
        client.channels.cache
          .find(x => x.name === "📥-game-dl-📥")
          .send(
            `https://raster.shields.io/badge/Téléchargements%20totaux-${newDownloads}-yellowgreen.png`
          )
          .catch(function(error) {
            client.channels.cache
              .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
              .send(
                "__**Le client n'a pas pu afficher le badge du total des téléchargements**__"
              );
          });
        client.channels.cache
          .find(x => x.name === "📥-game-dl-📥")
          .send(
            "Lien de téléchargements https://sourceforge.net/projects/undead-murderer/"
          )
          .catch(function(error) {
            client.channels.cache
              .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
              .send(
                "__**Le client n'a pas pu afficher le lien de téléchargements**__"
              );
          });
        client.channels.cache
          .find(x => x.name === "📥-game-dl-📥")
          .send(
            `https://img.shields.io/badge/platforme-mac%20%7C%20linux%20%7C%20win-lightgrey.png`
          )
          .catch(function(error) {
            client.channels.cache
              .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
              .send("__**Le client n'a pas pu afficher le bagde des OS**__");
          });
        nbDownloads = newDownloads;
      } else {
        nbDownloads = newDownloads;
      }
    })
    .catch(function(error) {
      client.channels.cache
        .find(x => x.name === "🇫🇷-🗣-en-français-🗣-🇫🇷")
        .send("__**Le client n'a pas pu récupérer le fichier json**__");
    });
}

function dateAujourdui() {
  var Aujourdui = new Date();
  Aujourdui.setDate(Aujourdui.getDate() + 1);
  Aujourdui = Aujourdui.toISODate();
  return Aujourdui;
}
function dateSeptJour() {
  var septJours = new Date();
  septJours.setDate(septJours.getDate() - 7);
  septJours = septJours.toISODate();
  return septJours;
}
if (!Date.prototype.toISODate) {
  Date.prototype.toISODate = function() {
    return (
      this.getFullYear() +
      "-" +
      ("0" + (this.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + this.getDate()).slice(-2)
    );
  };
}

function requestHOSDL(msg) {
  var nbWeek;
  var NbWeekURL = `https://www.dvkbuntu.org/nodejs/gettotal/?startdate=${dateSeptJour()}&enddate=${dateAujourdui()}`;
  var nbWeekDV;
  var NbWeekDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
  var nbWeekDVL;
  var NbWeekDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=${dateSeptJour()}&end_date=${dateAujourdui()}`;
  fetch(NbWeekURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data1) {
      fetch(NbWeekDVURL)
        .then(function(response) {
          return response.json();
        })
        .then(function(data2) {
          fetch(NbWeekDVLURL)
            .then(function(response) {
              return response.json();
            })
            .then(function(data3) {
              nbWeek = `${data1.result[0].total}`;
              nbWeekDV = `${data2.summaries.time.downloads}`;
              nbWeekDVL = `${data3.summaries.time.downloads}`;
              var weektot =
                parseInt(nbWeek, 10) +
                parseInt(nbWeekDV, 10) +
                parseInt(nbWeekDVL, 10);
              weektot = weektot.toString() + "%20cette%20semaine";
              msg.channel.send(
                `https://raster.shields.io/static/v1?message=${weektot}&labelColor=black&color=36393f&label=T%C3%A9l%C3%A9chargements%20DVKBuntu&style=for-the-badge`
              );
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });

  var nbTotal;
  var nbTotalURL = `https://www.dvkbuntu.org/nodejs/gettotal/?startdate=2010-01-01&enddate=${dateAujourdui()}`;
  var nbTotalDV;
  var nbTotalDVURL = `https://sourceforge.net/projects/dvkbuntu/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
  var nbTotalDVL;
  var nbTotalDVLURL = `https://sourceforge.net/projects/dvkbuntulight/files/stats/json?start_date=2010-01-01&end_date=${dateAujourdui()}`;
  fetch(nbTotalURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data1) {
      fetch(nbTotalDVURL)
        .then(function(response) {
          return response.json();
        })
        .then(function(data2) {
          fetch(nbTotalDVLURL)
            .then(function(response) {
              return response.json();
            })
            .then(function(data3) {
              nbTotal = `${data1.result[0].total}`;
              nbTotalDV = `${data2.total}`;
              nbTotalDVL = `${data3.total}`;
              var Totaltot =
                parseInt(nbTotal, 10) +
                parseInt(nbTotalDV, 10) +
                parseInt(nbTotalDVL, 10);
              Totaltot = Totaltot.toString() + "%20au%20total";
              msg.channel.send(
                `https://raster.shields.io/static/v1?message=${Totaltot}&label=T%C3%A9l%C3%A9chargements%20dvkbuntu&labelColor=black&style=for-the-badge&color=36393f`
              );
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
}

client.login(token);

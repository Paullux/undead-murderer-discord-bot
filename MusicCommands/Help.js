const Command = require("../modules/Command");

class Help extends Command {
  static match(message) {
    return message.content.toLowerCase().startsWith("_help");
  }
  static action(message) {
    message.channel.send(
      `🆘 **Bienvenue dans l\'aide ${message.author}** 🆘 \n` +
        "\n" +
        'En préambule l\'aide est accessible par la commande "_help"\n' +
        "\n" +
        `A - Pour intéragir avec le bot toutes les commandes doivent être entrée dans le salon : #🤖-discussions-avec-le-bot-🤖 \n` +
        "\n" +
        "B - Pour écouter de la musique : \n" +
        `  1 - Connectez-vous au chat vocal 🔊🎶-Musique-🎶 ;\n` +
        '  2 - Pour lancer une musique, il suffit d\'entrer la commande suivant "_play" suivi de mots clés à rechercher ;\n' +
        '  3 - Pour mettre en pause la lecture de musique il suffit d\'entrer la commande "_pause" ; \n' +
        '  4 - Pour reprendre la lecture de musique il suffit d\'entrer la commande "_resume" ; \n' +
        '  5 - Pour régler le volume la commande est "_volume", sans argument la commande renvoit le volume actuel, avec un argument entre 0 et 120, la commande règle le volume au niveau désiré ; \n' +
        '  6 - Pour arrêter la musique, la commande est "_stop" ;\n' +
        '  7 - Pour connaitre la liste des chansons à venir entrez la commande "_queue"; \n' +
        '  8 - Pour connaitre la musique qui est lu en ce moment, la commande est : "_now" ; \n' +
        '  9 - Pour passer la musique en cours à la suivante, il faut entrer la commande "_skip" \n' +
        "\n" +
        "C - Pour regarder des vidéos YouTube : \n" +
        '  1 - Lancer la commande "_video" suivi des mots clés à rechercher ;\n' +
        `  2 - Vous trouverez ainsi le résultat en vidéo sur le canal #📺-vidéo-youtube-📺 ; \n` +
        "\n" +
        "D - Pour discuter avec le bot : \n" +
        "  1 - Essayez de le saluer (hello, bonjour, bonsoir, coucou, hey, salut) ; \n" +
        '  2 - Il réagit aussi à "re" ; \n' +
        '  3 - Demandez lui si "ça va ?" ; \n' +
        "\n" +
        "E - Pour finir, pour tester le bot (s'il est toujours connecté) : \n" +
        '  1 - la commande est "_test" ; \n' +
        "\n" +
        "\n" +
        "Le code source du bot est situé ici : https://github.com/Paullux/undead-murderer-discord-bot"
    );
  }
}

module.exports = Help;

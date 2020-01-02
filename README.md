![Bandeau Undead Murderer](https://cdn.discordapp.com/attachments/661900131066445824/661901177893552128/56236267_815854922081744_7548488624258416640_n.png)

# Bienvenu sur le depôt de mon Bot pour Discord !

![Image issue de Discord](https://cdn.discordapp.com/attachments/493353214326865922/662394535430586422/unknown.png)

Bonjour à tous, vous trouverez ici mon bot Discord que j'utilise sur mon serveur Discord pour y accéder à mon serveur rendez vous ici : [https://discord.gg/udp9vKe](https://discord.gg/udp9vKe). Si vous voulez récupérer des éléments de ce bot pour le votre n'hésitez pas.


# Pourquoi ce bot ?

J'ai commencé à écrire un jeu vidéo Undead Murderer, je développe ce jeu avec Godot, il est disponible sur Windows, Linux et Mac. Dans le cadre de ce jeu j'ai essayé de communiquer à son propos pour le faire connaître sur SourceForge pour le télécharger, sur un site web et finalement sur Discord, pour plus d'information voici la liste des liens utiles :
- **Lien de DL : [Lien vers Source Forge](https://sourceforge.net/projects/undead-murderer/)**
- **Site Web : [Lien vers le site Web](https://www.undead-murderers.com)**
- **Serveur Discord : [Lien vers le serveur Discord](https://discord.gg/udp9vKe)**

## Pour une démonstration du bot, connectez sur le serveur Discord.

Si vous voulez utiliser le bot sur votre propre serveur Discord, tout ce dont vous avez besoin c'est :
- D'un token de votre propre bot  [Discord developers portal](https://discordapp.com/developers/applications/)
(à renseigner dans le fichier ***index.js***).
- Et d'une clé API pour YouTube disponible ici [Google Cloud Platform](https://console.developers.google.com/)
(à renseigner dans ***modules/AccessDispatcher.js*** et dans ***MusicCommands/Video.js***

Ou de passez par des variables d'environnement de votre hébergeur : ***TOKEN*** et ***YOUTUBE***

De plus, n'oubliez de lancer dans le terminal de votre hébergeur ou sur votre machine :
```js
~$ npm i --save
~$ node index.js
```
la première commande pour installer les dépendances   
la seconde pour lancer le bot en lui même
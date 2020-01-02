const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Test extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_test')
  }
  static action (message) {
    let answer = `C'est bon ${message.author}, je suis toujours là ! Je ne suis pas mort ou perdu dans les abîmes du grand code interplanétaire...`;
    message.channel.send(answer);
  }
}

module.exports = Test;

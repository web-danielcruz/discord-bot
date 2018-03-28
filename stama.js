var Discord = require('discord.js');
var bot = new Discord.Client();
var isReady = true;
const auth = require('./auth.json');
//var prefix = require('./info.js').prefixo;
prefix = 'º';
//var Func = require('./func.js');

/*---------------------------------*/
/*         SOUND LIST

  -copacabana -vinho    -curtodegozar
  -rir        -amumu    -cns
  -casado     -ah       -calate
  -gg         -hoodoo   -pestana
  -pocrl      -wannabe







*/
/*----------------------------------*/

var sounds = ['copacabana','vinho','curtodegozar','rir','amumu','cns','casado','ah','calate','gg','hoodoo','pestana','pocrl','wannabe','magic','tyler','longtime','piteco','ladidadida','oh','abalou','ptroleo','gasoil','energias','mumble','chopsuey','california','bennylava','ahah'];
console.log(sounds);

bot.on('message', message => {

  if(isReady && message.content === (prefix+'stop'))
  {
    isReady = false;
    var voiceChannel = message.member.voiceChannel;
    voiceChannel.leave();
    isReady = true;
  }

  if(isReady && startsWith(message.content))
  {
    //console.log(message.content);
    var command = message.content.substring(1);
    //console.log(command);
    if(!command)
    {
      console.log('empty command');
    }
    else
    {
      var isSound = false;
      //console.log(sounds.length);
      soundLenght = sounds.length;
      var i = 0;
      //console.log(i);
      for(i = 0; i < soundLenght; i++)
      {
        //console.log(i);
        if(command == sounds[i])
        {
          isSound = true;
        }
      }
      //console.log(i);
      //console.log(isSound);


      if(isSound && isReady)
      {
        isReady = false;
        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection =>
        {
          //console.log('./music/'+command+'.mp3');
          soundPath = './music/'+command+'.mp3';
          console.log(soundPath);
          const dispatcher = connection.playFile(soundPath);
          
          dispatcher.on("end", end => 
          {
            console.log('acabou :)');
            voiceChannel.leave();
          });
        }).catch(err => console.log(err));
        isReady = true;
      }

    }

  }

});

function startsWith(msg)
{
  var pre = msg.split('',1);
  if(pre == prefix)
    return true;
  else
    return false;
}


bot.login(auth.token);
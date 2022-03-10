const {Client, RichEmbed } = require('discord.js')
 
const bot = new Client()
 
const ping = require('minecraft-server-util')
 
const config = require('./config.json')

const PREFIX = config.prefix
 
bot.on('ready', () =>{
    console.log('Bot has come online.')
})
 
bot.on('message', message =>{
 
    let args = message.content.substring(PREFIX.length).split(' ')
 
    switch(args[0]){
        case 'mc':
 
            if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port')
 
            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
                .setTitle('Server Status')
                .addField('Server IP', reponse.host)
                .addField('Server Version', reponse.version)
                .addField('Online Players', reponse.onlinePlayers)
                .addField('Max Players', reponse.maxPlayers)
                .addField('Server MOTD', reponse.motd)
                .addField('Port', reponse.port)
                .setColor('#00ff00')
                .setFooter('Made by: ' + message.author.tag)
                .setTimestamp()
                
                message.channel.send(Embed)
            })
        break
 
    }
 
})
 
bot.login(config.token)
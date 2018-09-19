const Discord = require("discord.js"); 
const YTDL = require("ytdl-core");

const TOKEN = "";
const PREFIX = "-v";

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
});
}

var bot = new Discord.Client();
var servers = {};

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
     

    switch(args[0].toLowerCase()){


        case "beep":
        message.channel.send("Boop!")
        setTimeout(function(){
            message.channel.send( new Date().getTime() - message.createdTimestamp + " ms");   }, 1); 
        break;





        case "create":
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        if (!message.content.includes("?")) return message.channel.send("Add a question mark.")
        var say = new Discord.RichEmbed()
    .setColor(0x42f468)
    .setTitle( message.author.username + ": " + args.slice(1).join(" "))
        message.delete().catch()
        if (args[1]) message.channel.send(say)
            .then(function (message) {
              message.react("👍")
              setTimeout(function() {
                message.react("👎"); }, 500);
                setTimeout(function(){
                    message.channel.send("@here");   }, 1000); 
              
            }).catch(function() {
              // Interesting
             });
             else message.channel.send("Do it properly......");
        break;



        case "help":
        var help = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setTitle("Hello, this is the help command.")
            .addField("create", "The command needed for the voting, use question marks at the end for it to work.")
            message.channel.send(help)
            break;

        case "about":
        var about = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setTitle("Vote Bot")
            .setDescription("Vote bot is a bot made by <@210587829980495872> exclusively for this server, called The Lounge.")
            message.channel.send(about)
            break;

            case "play":
            if (message.author.id !== '210587829980495872') { message.channel.send("only mon allowed uwu"); return; }
                if (!args[1]) {
                    message.channel.send("give link boi.");
                    return;
                }

                if (!message.member.voiceChannel) {
                    message.channel.send("join voice channel boi")
                    return;
                }

                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []

                };

                var server = servers[message.guild.id];

                server.queue.push(args[1]);

                if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
            });
            break;

            case "skip":
            if (message.author.id !== '210587829980495872') { message.channel.send("only mon allowed uwu"); return; }
                var server = servers[message.guild.id];

                if (server.dispatcher) server.dispatcher.end();
            break;

            case "stop":
            if (message.author.id !== '210587829980495872') { message.channel.send("only mon allowed uwu"); return; }
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        default:
        message.channel.send("I don't know if you realize, but that's not a command.")
    }
});

bot.login(TOKEN);

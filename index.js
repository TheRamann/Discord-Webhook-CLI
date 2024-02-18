const { Webhook, MessageBuilder } = require('discord-webhook-node');
const inquirer = require('inquirer')

console.log(`
██████╗░██╗░██████╗░█████╗░░█████╗░██████╗░██████╗░  ░██╗░░░░░░░██╗███████╗██████╗░██╗░░██╗░█████╗░░█████╗░██╗░░██╗
██╔══██╗██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗  ░██║░░██╗░░██║██╔════╝██╔══██╗██║░░██║██╔══██╗██╔══██╗██║░██╔╝
██║░░██║██║╚█████╗░██║░░╚═╝██║░░██║██████╔╝██║░░██║  ░╚██╗████╗██╔╝█████╗░░██████╦╝███████║██║░░██║██║░░██║█████═╝░
██║░░██║██║░╚═══██╗██║░░██╗██║░░██║██╔══██╗██║░░██║  ░░████╔═████║░██╔══╝░░██╔══██╗██╔══██║██║░░██║██║░░██║██╔═██╗░
██████╔╝██║██████╔╝╚█████╔╝╚█████╔╝██║░░██║██████╔╝  ░░╚██╔╝░╚██╔╝░███████╗██████╦╝██║░░██║╚█████╔╝╚█████╔╝██║░╚██╗
╚═════╝░╚═╝╚═════╝░░╚════╝░░╚════╝░╚═╝░░╚═╝╚═════╝░  ░░░╚═╝░░░╚═╝░░╚══════╝╚═════╝░╚═╝░░╚═╝░╚════╝░░╚════╝░╚═╝░░╚═╝`)

var isPAUSED = false

function msg() {
    inquirer.prompt({
        type: "input",
        name: "webhookURL",
        message: "Enter your webhook URL"
    }).then(answer => {
        var hook;
        hook = new Webhook(answer.webhookURL)
        inquirer.prompt({
            type: "input",
            name: "avatarURL",
            message: "Enter avatar URL (optional)"
        }).then(answer => {

            answer.avatarURL ? hook.setAvatar(answer.avatarURL) : null
            inquirer.prompt({
                name: "userNAME",
                message: "Enter a username for the webhook (optional)"
            }).then(answer => {

                answer.userNAME ? hook.setUsername(answer.userNAME) : null

                inquirer.prompt({
                    name: "messageCONTENT",
                    message: "Enter the message content"
                }).then(answer => {

                    hook.send(answer.messageCONTENT)
                        .then(() => {
                            console.log('Sent webhook successfully!')

                            msg()
                        })
                        .catch(err => {
                            console.log(err.message)
                            msg()
                        });
                })
            })
        }).catch(err => {
            err ? console.log(err) : null
        })

    }).catch(err => {
        err ? console.log(err) : null
    })
}

function embed() {
    inquirer.prompt({
        type: "input",
        name: "webhookURL",
        message: "Enter your webhook URL"
    }).then(answer => {
        var hook;
        hook = new Webhook(answer.webhookURL)
        inquirer.prompt({
            type: "input",
            name: "avatarURL",
            message: "Enter avatar URL (optional)"
        }).then(answer => {

            answer.avatarURL ? hook.setAvatar(answer.avatarURL) : null
            inquirer.prompt({
                name: "userNAME",
                message: "Enter a username for the webhook (optional)"
            }).then(answer => {

                answer.userNAME ? hook.setUsername(answer.userNAME) : null

                inquirer.prompt({
                    name: "embTITLE",
                    message: "Enter embed title"
                }).then(answer => {
                    var embed = new MessageBuilder()
                    embed.setTitle(answer.embTITLE)

                    inquirer.prompt({
                        name: "embAUTHOR",
                        message: "Set embed author(optional)"
                    }).then(answer => {
                        answer.embAUTHOR ? embed.setAuthor(answer.embAUTHOR) : null

                        inquirer.prompt({
                            name: "embURL",
                            message: "Set embed URL(optional)"
                        }).then(answer => {
                            answer.embURL ? embed.setURL(answer.embURL) : null

                            function fld() {
                                isPAUSED = true
                                inquirer.prompt({
                                    name: "embFIELDTITLE",
                                    message: "Field Title"
                                }).then(answer => {
                                    inquirer.prompt({
                                        name: "embFIELDBODY",
                                        message: "Field Body"
                                    }).then(ans => {
                                        embed.addField(answer.embFIELDTITLE, ans.embFIELDBODY)
                                    })
                                })
                                isPAUSED = false
                            }

                            inquirer.prompt({
                                name: "choice",
                                message: "Add field",
                                type: "list",
                                choices: ["Yes", "No"]
                            }).then(answer => {

                                function next(){
                                inquirer.prompt({
                                    name: "color",
                                    message: "Embed Color(optional)"
                                }).then(answer => {
                                    answer.color ? embed.setColor(answer.color) : null
                                    inquirer.prompt({
                                        name: "thumbnail",
                                        message: "Embed Thumbnail(optional)"
                                    }).then(answer => {
                                        answer.thumbnail ? embed.setThumbnail(answer.thumbnail) : null
                                        inquirer.prompt({
                                            name: "desc",
                                            message: "Embed Description(optional)"
                                        }).then(answer => {
                                            answer.desc ? embed.setDescription(answer.desc) : null

                                            inquirer.prompt({
                                                name: "image",
                                                message: "Embed Image(optional)"
                                            }).then(answer => {
                                                answer.image ? embed.setImage(answer.image) : null

                                                inquirer.prompt({
                                                    name: "timestamp",
                                                    message: "Add timestamp",
                                                    type: "list",
                                                    choices: ["Yes", "No"]
                                                }).then(answer => {
                                                    answer.choice == "Yes" ? embed.setTimestamp() : null

                                                    hook.send(embed)
                                                        .then(() => {
                                                            console.log('Sent webhook successfully!')

                                                            msg()
                                                        })
                                                        .catch(err => {
                                                            console.log(err.message)
                                                            msg()
                                                        });
                                                })
                                            })
                                        })
                                    })
                                })
                            }


                            if (answer.choice == "Yes") {

                                // fld()
                                function waitForIt(){
                                    if (isPAUSED) {
                                        setTimeout(function(){waitForIt()},100);
                                    } else {
                                        next()
                                    };
                                }
                                waitForIt()
                            }
                            else{
                                next()
                            }
                        })
                        })
                    })
                })
            })
        }).catch(err => {
            err ? console.log(err) : null
        })

    }).catch(err => {
        err ? console.log(err) : null
    })
}

inquirer.prompt([{
    name: "choice",
    message: "Select: ",
    type: "list",
    choices: ["Embed", "Normal Message"]
}]).then(answer => {
    if (answer.choice == "Normal Message") {
        msg()
    }
    if (answer.choice == "Embed") {
        embed()
    }
})
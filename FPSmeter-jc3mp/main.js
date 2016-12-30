/**
 * @author Alexander "Tyrola" Birkner
 * @license MIT
 */

'use strict';

const config = require('./config');
const ws = require("nodejs-websocket");

console.log('[FPSmeter] Starting Websocket Server on Port ' + config.queryPort);

ws.createServer(function (conn) {
    conn.on("connect", function(conn) {
        console.log('[FPSmeter] New connection.');
        conn.auth = false;
    });

    conn.on("text", function (str) {
        let json = JSON.parse(str);

        if (json.command == 'login') {
            if (conn.auth) {
                conn.sendText(JSON.stringify({success: true, id: json.id, command: json.command, message: 'You are already logged in.'}));
            } else {
                if (json.password === config.password) {
                    console.log('[FPSmeter] Login successful.');
                    conn.sendText(JSON.stringify({success: true, id: json.id, command: json.command, message: 'Login was successful.'}));
                    conn.auth = true;
                } else {
                    console.log('[FPSmeter] Login failed. Wrong password.');
                    conn.sendText(JSON.stringify({success: false, id: json.id, command: json.command, message: 'Login failed. Wrong password.'}));
                }
            }
        } else {
            if (conn.auth) {
                if (json.command === 'serverinfo') {
                    let currentFPS = jcmp.server.currentTickRate;
                    let currentPlayers = jcmp.server.clients.length;
                    let maxFPS = JSON.parse(jcmp.server.config).maxTickRate;

                    console.log("[FPSmeter] Serverinfo - currentFPS: " + currentFPS + " currentPlayers: " + currentPlayers + " maxFPS: " + maxFPS);
                    conn.sendText(JSON.stringify({success: true, id: json.id, command: json.command, currentFPS: currentFPS, currentPlayers: currentPlayers, maxFPS: maxFPS}));
                } else {
                    console.log('[FPSmeter] Unkwown command "' + json.command + '".');
                    conn.sendText(JSON.stringify({success: false, id: json.id, command: json.command, message: 'Unkwown command "' + json.command + '".'}));
                }
            } else {
                console.log('[FPSmeter] Please login first.');
                conn.sendText(JSON.stringify({success: false, id: json.id, command: json.command, message: 'Please login first.'}));
            }
        }
    });
    conn.on("close", function() {
        console.log('[FPSmeter] Connection closed.');
    })
}).listen(config.queryPort, config.host);

require 'websocket-client-simple'
require 'json'

ws = WebSocket::Client::Simple.connect 'ws://127.0.0.1:11100'
ws.on :message do |msg|
  parsed = JSON.parse(msg.data)
  if parsed['success'] and parsed['command'] == 'serverinfo'
    puts "Current FPS: #{parsed['currentFPS']}, Current Players: #{parsed['currentPlayers']}, Max FPS: #{parsed['maxFPS']}"
  end
end

ws.on :open do
  ws.send(JSON.dump({:command => 'login', :password => 'mySpecialPassword'}))
  ws.send(JSON.dump({:command => 'serverinfo'}))
end
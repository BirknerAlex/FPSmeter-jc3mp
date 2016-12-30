# FPSmeter-jc3mp

If you like to use FPSmeter.org with your personal Just Cause 3 Multiplayer Server, just install this small and fine mod to your server.

This mod provides all functionalities to work with FPSmeter.org. 

## Installing

* Copy the FPSmeter-jc3mp directory to your server packages folder.
* Execute `npm install` inside the packages/FPSmeter-jc3mp directory.
* Restart your server.

## How does this work?

Just install this plugin to your packages folder on your Just Cause 3 Multiplayer Server. After installing it and restarting the server, you are able to use FPSmeter.org to measure your Server Performance.

## Configuration

Please change the configuration file on your own. Also make sure that your Firewall allows incoming TCP traffic on the specified port.

```json
module.exports = {
    queryPort: 11100,
    host: "0.0.0.0",
    password: "mySpecialPassword"
};
```

## Advanced Usage

If you like to use the Websocket connection for your own, just take a look into the sample_server.rb file.

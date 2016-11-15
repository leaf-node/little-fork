# little-fork

`little-fork` creates a simple child processes in nodejs. When a new event
listener is set, it replaces the previously set listener for that event.

The API for `little-fork` is a subset and basic extension of node's
`child.fork()`.

## Status:

Version: 1.0.2

This is beta software.

## Caveats

There is a time gap between the calling of .replaceListener() and the listener
table getting updated. If the child process repsonds in that time period then
the previous listener will be executed.

## Installation:

    npm install little-fork

## Use:

main program:

    littleFork = require('little-fork');

    // locate the worker in the same directory as the javascript file reading the `__dirname` variable
    workerPath = path.join(__dirname, "worker.js");

    // run the worker
    worker = littleFork(workerPath);

    // set listeners
    worker.replaceListener("message", function (message) { console.log(message); });
    worker.replaceListener("exit", function (code, signal) { console.log(code, signal); });

    // send a message
    worker.send({"abc": 123});

    // tell the worker to quit
    worker.disconnect();

    // alternatively:
    //worker.kill();

worker program:

    // reply with the incoming message then quit
    process.on("message", function (message) {
        process.send(message);
        process.exit()
    });

## Authors:

Andrew Engelbrecht

## License:

`little-fork` is realeased under CC0. ([CC0 License](https://creativecommons.org/publicdomain/zero/1.0/))


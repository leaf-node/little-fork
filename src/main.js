// Copyright 2016 Andrew Engelbrecht
//
// This program is released under CC0
//
// https://creativecommons.org/publicdomain/zero/1.0/
//
//
// little-fork - a simple child process creator.
//               new listeners replace previous listeners..


var fork, simpleSubprocess;

fork = require('child_process').fork;

simpleSubprocess = function (workerPath) {

    "use strict";

    var that, worker, listeners,
        send, replaceListener, disconnect, kill;

    worker = fork(workerPath);

    listeners = {};


    send = function (message) {
        worker.send(message);
    };

    replaceListener = function (listenerType, newListener) {

        var oldListener;

        oldListener = listeners[listenerType];

        if (oldListener !== undefined) {
            worker.removeListener(listenerType, oldListener);
        }

        worker.on(listenerType, newListener);

        listeners[listenerType] = newListener;
    };

    disconnect = function () { return worker.disconnect(); };

    kill = function (signal) {
        if (worker.connected) {
            return worker.kill(signal);
        }
    };

    that = {};
    that.send = send;
    that.replaceListener = replaceListener;
    that.disconnect = disconnect;
    that.kill = kill;

    return that;
};

module.exports = simpleSubprocess;

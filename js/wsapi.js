/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

var wsAPI = (function(){
    var ws = null;
    var callbackQueue = {};
    var reqId = 0;
    var ready = false;
    connect();

    function connect(url)
    {
        url = typeof url !== 'undefined' ? url : 'ws://localhost:9999';
        ws = new WebSocket(url);
        ws.onopen = function() {
            ready = true;
            send({
                'type': 'connect',
            });
        };

        ws.onmessage = function (e) {
            console.log('Received data: ', e.data);
            jsonMsg = JSON.parse(e.data);
            if (jsonMsg.api_namespace !== 'tizen.ivi.texttospeech') return;
/*
            if (jsonMsg.type === 'api_error')
                console.log(jsonMsg.api_error_msg);
*/
            if (jsonMsg.type === 'method_reply' && jsonMsg.method_name === 'speak') {
                callback = callbackQueue[jsonMsg.request_id]
                if (!callback || !typeof(callback) === 'function') {
                    return;
                }
                
                callback(jsonMsg.results);
                delete callbackQueue[jsonMsg.request_id];
            }
        };

        ws.onclose = function(e) {
            ready = false;
            console.log(e);
        };
    }

    function send(msg) {
        if (!ready) {
	    console.log('Websocket connection not ready, cannot send message');
            return;
        } 
        jsonMsg = JSON.stringify(msg);
        ws.send(jsonMsg);
        console.log('sent message: ' + jsonMsg);
    }

    function invokeMethod(json, callback) {
        reqId++;
        if (callback)
            callbackQueue[reqId.toString()] = callback;
        json['request_id'] = reqId.toString();
        send(json);
        console.log('invoke method');
    }

    return {
        isReady: function() {
            return ready;
        },
        connect: connect,
        speak: function (text, callback) {
            if (!text)
                return;
            if (callback && typeof(callback) !== 'function')
                return;

            json = {
                'api_namespace': 'tizen.ivi.texttospeech',
                'type': 'method',
                'method_name': 'speak',
                'method_args': {
                    'text': text
                }
            };
            invokeMethod(json, callback);
        }
    }
})()

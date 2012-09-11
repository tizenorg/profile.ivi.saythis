/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

App = {};

(function () {
    function init() {
        /* initialization */
        //license_init('license', "main_page");
    }

    function onSpeakResults(results) {
        console.log(results);
        $('#speakButton').removeClass('pressed');
    }

    function checkAPI() {
        var result = wsAPI.isReady();
        if (!result) {
            console.log('Cannot connect to websocket API daemon');
            wsAPI.connect();
        }
        return result;
    }

    $(document).ready(function()
    {
		init();

        $('#speakButton').click(function() {
            if (checkAPI()) {
                var text = $('#inputArea').val();
                console.log(text);
                if (text && !$('#speakButton').hasClass('pressed')) {
                    wsAPI.speak(text, onSpeakResults);
                    $('#speakButton').addClass('pressed');
                }
            }
            console.log('Speak button clicked');
        });
    });
})()

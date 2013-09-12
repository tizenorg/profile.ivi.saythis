/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */
var mySpeechObj = tizen.speech;

$(document).ready(function()
{
   $('#speakButton').click(function() {

            var text = $('#inputArea').val();
            console.log(text);

            if (text) {
               mySpeechObj.vocalizeString(text);
            }

	    $('#inputArea').val("");
    });

    $('#inputArea').keyup(function(event) {
            if (event.keyCode === 13) {
                    $('#speakButton').click();
             }
    });
});

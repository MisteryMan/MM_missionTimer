// ==UserScript==
// @name         MC-MissionTimer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Original script by KBOE2, modified and republished with permission. This version adds the mission timer to the mission header in the mission list.
// @author       MisteryMan
// @grant        none
// @include      /^https?:\/\/(?:w{3}\.)?(?:leitstellenspiel\.de|(?:meldkamerspel|missionchief|missionchief-australia|nodsentralspillet|112-merkez|jogo-operador112|operador193|dyspetcher101-game|missionchief-japan|jocdispecerat112|missionchief-korea|hatakeskuspeli|dispecerske-centrum)\.com|missionchief\.co\.uk|centro-de-mando\.es|operatorratunkowy\.pl|larmcentralen-spelet\.se|operatore112\.it|operateur112\.fr|dispetcher112\.ru|alarmcentral-spil\.dk|operacni-stredisko\.cz|centro-de-mando\.mx)\/.*$/
// ==/UserScript==

(function() {
	'use strict';
    $("head").append("<style type='text/css'>.countdownTimer { color: #fff; margin: 3px; display: inline; border-radius: .25em; padding: 2px; padding-left: 4px; padding-right: 4px; text-align: center;}</style>");
	let missionTimerOrig = missionTimer;

	missionTimer = function(t){
            var einsatzdauer = t.date_end * 1000 - new Date().getTime();
            if (einsatzdauer > 0) {
                var time = new Date(einsatzdauer - (1000 * 60 * 60));
                var timeFormated = "";
                if (time.getHours() != 0) {
                    if (time.getHours() < 10) {
                        timeFormated += "0";
                    }
                    timeFormated += time.getHours() + ':';
                }
                if (time.getMinutes() != 0) {
                    if (time.getMinutes() < 10) {
                        timeFormated += "0";
                    }
                    timeFormated += time.getMinutes() + ':';
                } else {
                    timeFormated += "00:";
                }
                if (time.getSeconds() != 0) {
                    if (time.getSeconds() < 10) {
                        timeFormated += "0";
                    }
                    timeFormated += time.getSeconds();
                } else {
                    timeFormated += "00";
                }
                if (!$("#mission_overview_countdown_" + t.id).hasClass("mission_overview_countdown countdownTimer label-danger")) {
                    $("#mission_caption_" + t.id).before('<div class="mission_overview_countdown countdownTimer label-danger" id="mission_overview_countdown_' + t.id + '" timeleft="0"></div>');
                }
                $('#mission_overview_countdown_' + t.id).html(timeFormated);
                if ($('#mission_out_' + t.id)[0]) {
                    if ($('#mission_out_' + t.id).find('.btn-danger')[0]) {
                        $('#mission_overview_countdown_' + t.id).appendTo('#mission_caption_' + t.id);
                    } else {
                        $('#mission_overview_countdown_' + t.id).prependTo($('#mission_bar_outer_' + t.id).parent());
                    }
                }
            }
		missionTimerOrig(t);
	};
})();

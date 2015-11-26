(function($) {

    var raptorUrls = [
        'raptor.png',
        'llama.png',
    ];

    $.fn.raptorize = function(options) {
        var locked = false;
        var defaults = {
            enterOn: 'click',
            delayTime: 5000
            };
        var options = $.extend(defaults, options);

        return this.each(function() {
			var _this = $(this);
			var audioSupported = false;
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) {
				audioSupported = true;
			}

			function init() {
                locked = true;

                var randomImageUrl = raptorUrls[Math.floor(Math.random() * raptorUrls.length)];
    			var raptorImageMarkup = '<img id="elRaptor" style="display: none" src="'+randomImageUrl+'" />'
    			var raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="raptor-sound.mp3" /><source src="raptor-sound.ogg" /></audio>';

    			$('body').append(raptorImageMarkup);
     			if(audioSupported) { $('body').append(raptorAudioMarkup); }
    			var raptor = $('#elRaptor').css({
    				"position":"fixed",
    				"bottom": "-700px",
    				"right" : "0",
    				"display" : "block"
    			})
				if(audioSupported) {
					function playSound() {
                        document.getElementById('elRaptorShriek').addEventListener('ended', function(){
                            $('#elRaptorShriek').remove();
                            locked = false;
                        });
						document.getElementById('elRaptorShriek').play();
					}
					playSound();
				}

				raptor.animate({
					"bottom" : "0"
				}, function() {
					$(this).animate({
						"bottom" : "-130px"
					}, 100, function() {
						var offset = (($(this).position().left)+400);
						$(this).delay(300).animate({
							"right" : offset
						}, 2200, function() {
							raptor = $('#elRaptor').css({
								"bottom": "-700px",
								"right" : "0"
							})
                            $('#elRaptor').remove();
							// locked = false;
						})
					});
				});
			}

			//Determine Entrance
			if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.raptorz", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	// $(window).unbind('keydown.raptorz');
                        kkeys = [];
			        }
			    }, true);

			}

        });//each call
    }//orbit plugin call
})(jQuery);

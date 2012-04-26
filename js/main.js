/*   Washer/Dryer Prototype
	 by Devon Blandin, April 2012
	 for CSC 360, Spring Quarter 2012 */

/**
 * jQuery mousehold plugin - fires an event while the mouse is clicked down.
 * Additionally, the function, when executed, is passed a single
 * argument representing the count of times the event has been fired during
 * this session of the mouse hold.
 *
 * @author Remy Sharp (leftlogic.com)
 * @date 2006-12-15
 * @example $("img").mousehold(200, function(i){  })
 * @desc Repeats firing the passed function while the mouse is clicked down
 *
 * @name mousehold
 * @type jQuery
 * @param Number timeout The frequency to repeat the event in milliseconds
 * @param Function fn A function to execute
 * @cat Plugin
 */

jQuery.fn.mousehold = function(timeout, f) {
	if (timeout && typeof timeout == 'function') {
		f = timeout;
		timeout = 100;
	}
	if (f && typeof f == 'function') {
		var timer = 0;
		var fireStep = 0;
		return this.each(function() {
			jQuery(this).mousedown(function() {
				fireStep = 1;
				var ctr = 0;
				var t = this;
				timer = setInterval(function() {
					ctr++;
					f.call(t, ctr);
					fireStep = 2;
				}, timeout);
			})

			clearMousehold = function() {
				clearInterval(timer);
				if (fireStep == 1) f.call(this, 1);
				fireStep = 0;
			}
			
			jQuery(this).mouseout(clearMousehold);
			jQuery(this).mouseup(clearMousehold);
		})
	}
}

function main () {
var mySound;
var state = "off";
	var setupSounds = function() {
		mySound = soundManager.createSound({
		id: 'aSound',
		url: 'sfx/washing-machine-1.mp3',
		autoLoad: true,
		stream: true
		// onload: myOnloadHandler,
		// other options here..
		});
		mySound2 = soundManager.createSound({
		id: 'aSound2',
		url: 'sfx/washing-machine-1-fast.mp3',
		autoLoad: true,
		stream: true
		// onload: myOnloadHandler,
		// other options here..
		});
		buzzer = soundManager.createSound({
		id: 'buzzer',
		url: 'sfx/buzzer.mp3',
		autoLoad: true,
		stream: true
		// onload: myOnloadHandler,
		// other options here..
		});
		startUp = soundManager.createSound({
		id: 'startUp',
		url: 'sfx/MacStartUp.mp3',
		autoLoad: true,
		stream: true
		// onload: myOnloadHandler,
		// other options here..
		});
		beep = soundManager.createSound({
		id: 'beep',
		url: 'sfx/beep.mp3',
		autoLoad: true,
		stream: true
		// onload: myOnloadHandler,
		// other options here..
		});

	}

	soundManager.onready(function() {
	  // Ready to use; soundManager.createSound() etc. can now be called.
		setupSounds();
	});
	soundManager.ontimeout(function(){
  		alert('Sounds failed to load');
	});
	var cycle;

	var updateTimer = null;

	// setup the stage
	// hide controls in touchscreen
	$('#touchScreen li').hide();
	// setup buttons
	$('li').addClass('circle');

	// remove icons from time buttons
	$('#cycleName, #setWashTime li, #setDryTime li').css('background-image', 'none');

	// setup power button event handler

var powerHandler = function(state) {
	if (state === "off") {
		$('#powerControl').click(function() {
			try {
				startUp.play();
			} 
			catch(err) {

			}
			$('#touchScreen').css('background-color', '#8FB2EB');
			$('#touchScreen li').fadeIn();

			// initialize WashDryCycle object
			cycle = new WashDryCycle;
			// setup the controls
			initControls();
			initHandlers();
			printTestInfo();
			state = "on";
			powerHandler(state);
		});
	} else {
		$('#powerControl').click(function() {
			$('#touchScreen li,#touchScreen div, p').fadeOut();
			$('#touchScreen').css('background-color', '#000');
			$('li').removeClass('selected');
			state = "off";
			powerHandler(state);
		});
	}
}

	powerHandler(state);

	// setup touchscreen button event handlers
		var setupPresetButtonHandlers = function() {
			$('#cycleBack').click(function() {
				try {
					beep.play();
				} 
				catch(err) {

				}

				if (cycle.getName() === "Custom") {
					var washTime = $('#setWashTime li.selected').attr('class').split(' ')[0];
					var dryTime = $('#setDryTime li.selected').attr('class').split(' ')[0];
					var waterTemp = $('#setWaterTemp li.selected').attr('id')
					var waterLevel = $('#setWaterLevel li.selected').attr('id')
					var dryTemp = $('#setDryTemp li.selected').attr('id')
					cycle.setCustomPreset(washTime, dryTime, waterTemp, waterLevel, dryTemp);
				}
				cycle.cycleBack();
				initControls();
				printTestInfo();
			});
			$('#cycleForward').click(function() {
				try {
					beep.play();
				} 
				catch(err) {

				}
				if (cycle.getName() === "Custom") {
					var washTime = $('#setWashTime li.selected').attr('class').split(' ')[0];
					var dryTime = $('#setDryTime li.selected').attr('class').split(' ')[0];
					var waterTemp = $('#setWaterTemp li.selected').attr('id')
					var waterLevel = $('#setWaterLevel li.selected').attr('id')
					var dryTemp = $('#setDryTemp li.selected').attr('id')
					cycle.setCustomPreset(washTime, dryTime, waterTemp, waterLevel, dryTemp);
				}
				cycle.cycleForward();
				initControls();
				printTestInfo();
			});
		}
		setupPresetButtonHandlers();

	var initControls = function() {

		// disable button highlights
		$('li.circle').removeClass('selected');
		
		// display progress bar
		$("#cycleProgressBar").progressbar({ value: 0 });

		// select buttons
		$('#' + cycle.getWaterLevel()).addClass('selected');
		$('#' + cycle.getWaterTemp()).addClass('selected');
		$('#' + cycle.getDryTemp()).addClass('selected');
		$('#setDryTime li.' + cycle.getDryTime()).addClass('selected');
		$('#setWashTime li.' + cycle.getWashTime()).addClass('selected');

		// display timer and name
		$('#cycleTimer').html("-" + ((cycle.getTimer().minutes < 10 ? '0' : '') + cycle.getTimer().minutes ) + ":" + ((cycle.getTimer().seconds < 10 ? '0' : '') + cycle.getTimer().seconds ));
		$('#cycleName').html(cycle.getName());

		// display preview icons
		$('#dryChoice').css('background-position', $('#' + cycle.dryTemp).css('background-position'));
		$('#washChoice').css('background-position', $('#' + cycle.waterTemp).css('background-position'));
		
		// highlight power button
		$('#powerControl').addClass('selected');

		// highlight stop button
		$('#cycleStop').addClass('selected');	
	}

	var toggleButton = function(t) {
		// disable highlighted buttons in list
		$(t).siblings().removeClass('selected');

		// hightlight button pressed
		$(t).addClass('selected');
	}
	var buttonPress = function() { 
		toggleButton(this);
		try {
			beep.play();
		} catch(err) {

		}
		// update WashDryCycle object data members
		if ($(this).parent().attr('id') === 'setWashTime' || $(this).parent().attr('id') === 'setDryTime') {
			cycle[$(this).parent().attr('id')]( $(this).attr('class').split(' ')[0]);
		} else {
			cycle[$(this).parent().attr('id')]($(this).attr('id'));

		}

		if ($(this).parent().attr('id') === 'setWaterTemp') {
			$('#washChoice').css('background-position', $(this).css('background-position'));
		} else if ($(this).parent().attr('id') === 'setDryTemp') {
			$('#dryChoice').css('background-position', $(this).css('background-position'));
		}


		// update touch screen info
		$('#cycleTimer').html("-" + cycle.getTimer().minutes + ":" + ((cycle.getTimer().seconds < 10 ? '0' : '') + cycle.getTimer().seconds ));
		
		printTestInfo();
	}
	var initHandlers = function() {	
		// setup physical button event handlers
		$('#setWaterLevel li, #setWashTime li, #setDryTime li, #setWaterTemp li, #setWaterLevel li, #setDryTemp li').click(buttonPress);
		$('#cycleStart').click(function() {
			toggleButton(this);
			$('#setWaterLevel li, #setWashTime li, #setDryTime li, #setWaterTemp li, #setWaterLevel li, #setDryTemp li, #cycleChoice li').off('click');
			cycle.startWash();
			try {
				if (mySound.pause === true) {
					mySound.resume();
				} else { 
					mySound.play({
  					loops: 10
					});
				}
			} catch(err) {

			}

			$('#washChoice').css('background-color', '#A32500'); 
			updateTimer = function() {
				if (cycle.getStatus() === "stopped") {
					try {
						mySound.stop();
						mySound2.stop();
						buzzer.play(1);
					} catch(err) {

					}
					
					clearTimeout(updateTimer);
					$('#cycleTimer').html("DONE");
				} else {
					$('#cycleTimer').html("-" + ((cycle.getTimer().minutes < 10 ? '0' : '') + cycle.getTimer().minutes ) + ":" + ((cycle.getTimer().seconds < 10 ? '0' : '') + cycle.getTimer().seconds ));
					var numSecondsLeft = (cycle.getTimer().minutes * 60) + cycle.getTimer().seconds;
					var progress = (1 - (numSecondsLeft / ((cycle.getWashTime() + cycle.getDryTime()) * 60))) * 100;
					$('#cycleProgressBar').progressbar({ value: progress });
					if (progress > 75) {
						$('#dryChoice').css('background-color', '#A32500'); 
						$('#washChoice').css('background-color', '#F7F5FF'); 
					}
					setTimeout(updateTimer, 1000);
				}
			}			

			updateTimer();
			printTestInfo();
		});
		$('#cyclePause').click(function() {
			mySound.pause();
			toggleButton(this);
			clearTimeout(updateTimer);
			cycle.pauseWash();
			printTestInfo();
		});
		$('#cycleStop').click(function() {
			try {
					mySound.stop();
					mySound2.stop();
				} catch(err) {
				
				}
			
			toggleButton(this);
			clearTimeout(updateTimer);
			cycle.stopWash();
			$('#setWaterLevel li, #setWashTime li, #setDryTime li, #setWaterTemp li, #setWaterLevel li, #setDryTemp li').click(buttonPress);
			setupPresetButtonHandlers();
			printTestInfo();
			$('#washChoice').css('background-color', '#F7F5FF'); 
			$('#dryChoice').css('background-color', '#F7F5FF'); 
			$('#cycleControls li').removeClass('selected');
			$('#cycleStop').addClass('selected');
		});

		
		
		// setup test/debug controls
		$('#fastForward').mousedown(function() {
			if (cycle.getStatus() === 'running') {
				try {
						mySound.pause();
						mySound2.play();
					} catch(err) {

					}
				
			}
		}).mouseup(function() {
			if (cycle.getStatus() === 'running') {
				try {
					mySound2.stop();
					mySound.play();
				} catch(err) {
				
				}
			}
		}).mousehold(10, function(i){ 
			var minutesIn = cycle.getTimer().minutes, secondsIn = cycle.getTimer().seconds;
			if (cycle.getStatus() === 'running') {
		 		if (secondsIn <= 0) {
					if (minutesIn > 0) {
						var m = --minutesIn;
						var s = 59;
						cycle.setTimer(m, s);
					} else {
						cycle.stopWash();
						try {
							mySound.stop();
							mySound2.stop();
						} catch(err) {
				
						}
						toggleButton(this);
						clearTimeout(updateTimer);
						cycle.stopWash();
						$('#setWaterLevel li, #setWashTime li, #setDryTime li, #setWaterTemp li, #setWaterLevel li, #setDryTemp li').click(buttonPress);
						setupPresetButtonHandlers();
						printTestInfo();
						$('#washChoice').css('background-color', '#F7F5FF'); 
						$('#dryChoice').css('background-color', '#F7F5FF'); 
						$('#cycleControls li').removeClass('selected');
						$('#cycleStop').addClass('selected');

					}
				} else {
					var m = minutesIn;
					var s = secondsIn -= 2;
					cycle.setTimer(m, s);
				}
		 		$('#cycleTimer').html("-" + ((cycle.getTimer().minutes < 10 ? '0' : '') + cycle.getTimer().minutes ) + ":" + ((cycle.getTimer().seconds < 10 ? '0' : '') + cycle.getTimer().seconds ));
	 		}
	 	});
	}
	var printTestInfo = function() {
		$('#testInfo').html('washTime : ' + cycle.getWashTime() + '<br />dryTime : ' + cycle.getDryTime() + '<br />waterTemp : ' + cycle.getWaterTemp() + '<br />waterLevel : ' + cycle.getWaterLevel() + '<br />dryTemp : ' + cycle.getDryTemp() + '<br />status : ' + cycle.getStatus());
	}
}

$(main);

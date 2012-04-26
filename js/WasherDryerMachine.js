WashDryCycle = function() {
	// setup data members
	var id, name, washTime, dryTime, waterLevel, waterTemp, dryTemp, presets;
	var status = "stopped";
	var timeout = null;
	var timer = {
		minutes : 0,
		seconds : 0
	}
	var updateTimer = function () {
	    timer.minutes = washTime + dryTime;
	    timer.seconds = 0;
	}

	// setup presets
	presets = [
		{
			name : "Custom",
			washTime : 30,
			dryTime : 30,
			waterTemp : "waterTempCold",
			waterLevel : "waterLevelHigh",
			dryTemp : "dryTempHigh",
		},
		{
			name : "Whites",
			washTime : 30,
			dryTime : 30,
			waterTemp : "waterTempHot4",
			waterLevel : "waterLevelHigh",
			dryTemp : "dryTempHigh",
		},
		{
			name : "Colors",
			washTime : 45,
			dryTime : 30,
			waterTemp : "waterTempCold",
			waterLevel : "waterLevelHigh",
			dryTemp : "dryTempMedium",
		}
	]

	// accessors
	this.getName = function () {
    	return name;
	}
	this.getWaterLevel = function () {
	    return waterLevel;
	}
	this.getWaterTemp = function () {
	    return waterTemp;
	}
	this.getDryTemp = function () {
	    return dryTemp;
	}
	this.getWashTime = function () {
	    return washTime;
	}
	this.getDryTime = function () {
	    return dryTime;
	}
	this.getStatus = function () {
	    return status;
	}
	this.getTimer = function () {
	    return timer;
	}
	this.getPresets = function () {
	    return presets;
	}

	// setters
	this.setName = function (n) {
	    name = n;
	}
	this.setWaterLevel = function (w) {
	    waterLevel = w;
	}
	this.setWaterTemp = function (w) {
	    waterTemp = w;
	}
	this.setDryTemp = function (d) {
	    dryTemp = d;
	}
	this.setWashTime = function (w) {
	    washTime = Number(w);
	    updateTimer();
	}
	this.setDryTime = function (d) {
	    dryTime = Number(d);
	    updateTimer();
	}
	this.setStatus = function (s) {
	    status = s;
	}

	this.setTimer = function (m, s) {
	    timer.minutes = m;
	    timer.seconds = s;
	}
	this.setPreset = function(preset, i) {
		id = i; 
		name = preset.name;
		washTime = preset.washTime;
		dryTime = preset.dryTime;
		waterTemp = preset.waterTemp;
		waterLevel = preset.waterLevel;
		dryTemp = preset.dryTemp;
		timer.minutes = washTime + dryTime;
	}
	this.setCustomPreset = function(washTimeIn, dryTimeIn, waterTempIn, waterLevelIn, dryTempIn) {
		presets[0] = {
			name : "Custom",
			washTime : Number(washTimeIn),
			dryTime : Number(dryTimeIn),
			waterTemp : waterTempIn,
			waterLevel : waterLevelIn,
			dryTemp : dryTempIn
		}
	}

// washer/dryer actions
	var countdown = function() {
    	if (timer.seconds === 0) {
    		if (timer.minutes > 0) {
				timer.minutes--;
				timer.seconds = 59;
			} else {
				status = "stopped";
				clearTimeout(timeout);
			}
		} else {
			timer.seconds = --timer.seconds;
		}
		timeout = setTimeout(countdown, 1000);	
	}
	this.cycleForward = function() {
		var i = (id + 1) % presets.length;
		this.setPreset(presets[i], i);
	}
	this.cycleBack = function() {
		if (id === 0) {
			this.setPreset(presets[presets.length - 1], presets.length -1);
		} else {
			this.setPreset(presets[id - 1], id -1);
		}
	}
	this.startWash = function() {
		status = "running";
		if (status === "stopped") {
			timer.minutes = washTime + dryTime;
		}
		countdown();
	}
	this.pauseWash = function() {
		status = "paused";
		clearTimeout(timeout);
	}
	this.stopWash = function() {
		status = "stopped";
		clearTimeout(timeout);
		updateTimer();
	}

	// setup WashDryCycle object with custom preset
	this.setPreset(presets[0], 0);
}



WashDryCycle.prototype.startWash = function () {
	//$('#cycleStop').removeClass('selected');
	//$('#cycleStart').addClass('selected');
	//this.status = "running";
	//this.countdown();
	//this.seconds = this.washTime + this.dryTime;
	
}

WashDryCycle.prototype.pauseWash = function () {
    
}

WashDryCycle.prototype.stopWash = function () {
	//this.status = "stopped";
	//$('#cycleControls').removeClass('selected');
	//$("#cycleProgressBar").progressbar({ value: 0 });
    //clearTimeout(this.timeout);
    //initControls();
    //printTestInfo();
    //$('#cycleStop').addClass('selected');
    //this.timer.minutes = 0;
    //this.timer.seconds = 0;
}

WashDryCycle.prototype.countdown = function () {
    // countdown one second
    // 
    /*if (this.timer.seconds === 0) {
    	console.log(this.timer.seconds + " = 0")
    	if (this.timer.minutes > 0) {
    		console.log(this.timer.minutes + " > 0")
    		this.timer.minutes--;
			this.timer.seconds = 59;
			console.log(this.timer.minutes);
			console.log(this.timer.seconds);
		} else {
			console.log("stop");
			this.stopWash();
		}
	} else {
		this.timer.seconds--;
	}
	*/
		//this.seconds--;
		//this.timeout = setTimeout(this.countdown, 1000);

		//var numSecondsLeft = (this.timer.minutes * 60) + this.timer.seconds;
		//var progress = (1 - (numSecondsLeft / ((this.washTime + this.dryTime) * 60))) * 100;

		//$('#cycleProgressBar').progressbar({ value: progress });
		//$('#cycleTimer').html("-" + this.timer.minutes + ":" + this.timer.seconds);
}
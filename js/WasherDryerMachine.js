WashDryCycle = function() {
	// setup cycle options
	var id, name, washTime, dryTime, waterLevel, waterTemp, dryTemp, presets;
	
	// setup timer info
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

	// setup presets
	var presets = [
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
	WashDryCycle.prototype.getName = function () { return name; }
	WashDryCycle.prototype.getWaterLevel = function () { return waterLevel; }
	WashDryCycle.prototype.getWaterTemp = function () { return waterTemp; }
	WashDryCycle.prototype.getDryTemp = function () { return dryTemp; }
	WashDryCycle.prototype.getWashTime = function () { return washTime; }
	WashDryCycle.prototype.getDryTime = function () { return dryTime; }
	WashDryCycle.prototype.getStatus = function () { return status; }
	WashDryCycle.prototype.getTimer = function () { return timer; }
	WashDryCycle.prototype.getPresets = function () { return presets; }

	// setters
	WashDryCycle.prototype.setName = function (n) { name = n; }
	WashDryCycle.prototype.setWaterLevel = function (w) { waterLevel = w; }
	WashDryCycle.prototype.setWaterTemp = function (w) { waterTemp = w; }
	WashDryCycle.prototype.setDryTemp = function (d) { dryTemp = d; }
	WashDryCycle.prototype.setWashTime = function (w) {
	    washTime = +w;
	    updateTimer();
	}
	WashDryCycle.prototype.setDryTime = function (d) {
	    dryTime = +d;
	    updateTimer();
	}
	WashDryCycle.prototype.setStatus = function (s) { status = s; }

	WashDryCycle.prototype.setTimer = function (m, s) {
	    timer.minutes = m;
	    timer.seconds = s;
	}
	WashDryCycle.prototype.setPreset = function(preset, i) {
		id = i; 
		name = preset.name;
		washTime = preset.washTime;
		dryTime = preset.dryTime;
		waterTemp = preset.waterTemp;
		waterLevel = preset.waterLevel;
		dryTemp = preset.dryTemp;
		timer.minutes = washTime + dryTime;
	}
	WashDryCycle.prototype.setCustomPreset = function(washTimeIn, dryTimeIn, waterTempIn, waterLevelIn, dryTempIn) {
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
	WashDryCycle.prototype.startWash = function() {
		status = "running";
		if (status === "stopped") {
			timer.minutes = washTime + dryTime;
		}
		countdown();
	}
	WashDryCycle.prototype.pauseWash = function() {
		status = "paused";
		clearTimeout(timeout);
	}
	WashDryCycle.prototype.stopWash = function() {
		status = "stopped";
		clearTimeout(timeout);
		updateTimer();
	}
	WashDryCycle.prototype.cycleForward = function() {
		var i = (id + 1) % presets.length;
		this.setPreset(presets[i], i);
	}
	WashDryCycle.prototype.cycleBack = function() {
		if (id === 0) {
			this.setPreset(presets[presets.length - 1], presets.length -1);
		} else {
			this.setPreset(presets[id - 1], id -1);
		}
	}

	// setup WashDryCycle object with custom preset
	this.setPreset(presets[0], 0);
}
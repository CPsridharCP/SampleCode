misty.Debug("Centering Head");
misty.MoveHeadPosition(0, 0, 0, 100);
misty.Pause(3000);

//Register Cap Touch to trigger events
misty.AddReturnProperty("Touched", "sensorName");
misty.RegisterEvent("Touched", "TouchSensor", 250 ,true);

//Register Bump Sensor events
misty.AddReturnProperty("Bumped", "sensorName",);
misty.AddReturnProperty("Bumped", "IsContacted");
misty.RegisterEvent("Bumped", "BumpSensor", 50 ,true);

// -----------------------------Cap Touch--------------------------------------------------------

misty.Set("touchTimeout", 3);

function _Touched(data) {

	var sensor = data.AdditionalResults[0];
	misty.Debug(sensor);

	switch(sensor) {
		case "CapTouch_HeadFront":
			misty.ChangeLED(0,0,255); //Blue
			misty.ChangeDisplayImage("Happy.png");
			misty.Set("touchTimeout", 6);
			misty.SetHeadPosition("roll", -4.5, 100);
			break;
		case "CapTouch_HeadBack":
			misty.ChangeLED(218,165,20); //Gold
			misty.PlayAudioClip("head_amp.wav");
			misty.ChangeDisplayImage("Wonder.png");
			misty.Set("touchTimeout", 6);
			misty.SetHeadPosition("roll", 4.5, 100);
			break;
		case "CapTouch_HeadRight":
            misty.ChangeLED(255,255,255); //White
			misty.PlayAudioClip("head_amp.wav");
			misty.ChangeDisplayImage("Wonder.png");
			misty.Set("touchTimeout", 6);
			misty.SetHeadPosition("roll", 4.5, 100);
			break;
        case "CapTouch_HeadLeft":
            misty.ChangeLED(169,169,169); //Silver
			misty.PlayAudioClip("head_amp.wav");
			misty.ChangeDisplayImage("Wonder.png");
			misty.Set("touchTimeout", 6);
			misty.SetHeadPosition("roll", 4.5, 100);
			break;
        case "CapTouch_Scruff":
            misty.ChangeLED(255,0,0); //Red
			misty.PlayAudioClip("head_amp.wav");
			misty.ChangeDisplayImage("Wonder.png");
			misty.Set("touchTimeout", 6);
			misty.SetHeadPosition("roll", 4.5, 100);
			break;
        default:
			misty.ChangeLED(0,255,0) //Green
            misty.PlayAudioClip("043-Bbbaaah.wav");
			misty.ChangeDisplayImage("Angry.png");
			misty.Set("blinkStartTime",(new Date()).toUTCString());
			misty.Set("timeBetweenBlink",3);
			misty.Set("touchTimeout", 3);
		}
}

//--------------------------------------Bump Sensor----------------------------------------------------------------

function _Bumped(data) {

    var sensor = data.AdditionalResults[0];
	misty.Debug(sensor);
	// misty.Drive(0,0,0, 200);

    if (sensor === "Bump_FrontRight") {
        misty.Debug("Bump_FrontRight");
		misty.ChangeLED(255,80,0) //Orange
        // misty.DriveTime(-35, 0, 2500);
		// misty.Pause(1000);
		misty.DriveTime(0, 52, 2500);
		misty.Pause(2500);
	} else if (sensor === "Bump_FrontLeft") {
        misty.Debug("Bump_FrontLeft");
        misty.ChangeLED(180,105,255) //Pink
		// misty.DriveTime(-35, 0, 2500);
		// misty.Pause(1000);
		misty.DriveTime(0, -52, 2500);	
		misty.Pause(2500);
	} else if (sensor === "Bump_RearLeft") {
        misty.Debug("Bump_RearRight");
        misty.ChangeLED(148,0,211) //Purple
		// misty.DriveTime(35, 0, 2500);
		// misty.Pause(1000);
		misty.DriveTime(0, -52, 2500);
		misty.Pause(2500);
	} else {
		// Bump_RearLeft
        misty.ChangeLED(255,255,0) //Yellow
        misty.Debug("Bump_RearLeft");
		// misty.DriveTime(35, 0, 2500);
		// misty.Pause(1000);
		misty.DriveTime(0, 52, 2500);	
		misty.Pause(2500);
	}       
 }

 //-------------------------Blink--------------------------------------------------------
misty.Set("eyeMemory", "Homeostasis.png");
misty.Set("blinkStartTime",(new Date()).toUTCString());
misty.Set("timeBetweenBlink",5);

function blink_now(){
    misty.Set("blinkStartTime",(new Date()).toUTCString());
    misty.Set("timeBetweenBlink",getRandomInt(2, 8));
    misty.DisplayImage("blinkMisty.png");
    misty.Pause(200);
    misty.DisplayImage(misty.Get("eyeMemory"));
}

//--------------------------Red LED Gradient----------------------------------------------------

function red_up(){
    var red = misty.Get("red")/10.0;
    var green = misty.Get("green")/10.0;
    var blue = misty.Get("blue")/10.0;
    for (var i = 10; i >=0 ; i=i-1) { 
        misty.ChangeLED(Math.floor(i*red),Math.floor(i*green),Math.floor(i*blue));
        misty.Pause(50);
    }
    for (var i =0; i <=10 ; i=i+1) { 
		misty.ChangeLED(Math.floor(i*20),0,0);
		misty.Pause(50);
    }
    misty.Set("red", 200);
    misty.Set("green", 0);
    misty.Set("blue", 0);
}
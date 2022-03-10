img = "";
alarm = "";

function preload()
{
    alarm = loadSound("alarm_clock_old.mp3");
}

objects = [];
status = "";
person="";

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
    person = results[0].label;
}

function draw()
{
    image(video, 0, 0, 380, 380);

        if(status != "")
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status: Object Detected";

                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            if(person == "person")
            {
                document.getElementById("detection").innerHTML = "Baby is Detected";
            }
            else
            {
                document.getElementById("detection").innerHTML = "Baby is Not Detected";
            }
        }
}

_status = "";
img = "";
objects = [];
objectDetector = "";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}
function draw() {
  image(video, 0, 0, 380, 380);
  if (_status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (let a = 0; a < objects.length; a++) {
      document.getElementById("status").innerHTML = "Status:Objects Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected are:" + objects.length;
      fill(r, g, b);
      percent = floor(objects[a].confidence * 100);
      x = objects[a].x;
      y = objects[a].y;
      label = objects[a].label;
      width = objects[a].width;
      height = objects[a].height;
      textSize(20);
      textStyle("bold");
      text(label + " " + percent + " %", x + 15, y + 20);
      noFill();
      stroke(r,g,b);
      rect(x, y, width, height);
    }
  }
}
function modelLoaded() {
  console.log("Model Loaded");
  _status = "true";
}
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

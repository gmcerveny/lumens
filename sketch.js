var payments = [];
var logs = []

// var white = color(255);
// var gray = color(151);
// var orange = color(237,129,23);
// var yellow = color(238,187,24);

function setup() {
  createCanvas(640, 480);
}

function draw() {
  var darkColor = color(91, 106, 114);
  background(darkColor);

  for (var i=0; i<payments.length; i++) {
    payments[i].fade();
    payments[i].display();
  }
  var i = payments.length;
  while (i--) {
    if (payments[i].diameter <= 0) {
      payments.splice(i, 1)
    }
  }

  for (var i=0; i<logs.length; i++) {
    logs[i].fade();
    logs[i].display();
  }
  var i = logs.length;
  while (i--) {
    if (logs[i].alpha <= 0) {
      logs.splice(i, 1)
    }
  }
}

function Dot(amount) {
  var lightColor = color(220, 242, 249);
  var whiteColor = color(255);
  this.x = random(width);
  this.y = random(height);
  this.start = map(amount,0,5000,20,150,true);
  this.progress = 1

  this.fade = function() {
    this.progress -= 0.002
    this.diameter = lerp(0, this.start, this.progress)
  }

  this.display = function() {
    fill(lightColor)
    stroke(whiteColor)
    strokeWeight(2)
    ellipse(this.x, this.y, this.diameter, this.diameter)
  }
}

function Log() {
  var orange = color(237,129,23);
  this.x = 5
  this.y = height - 36
  this.text = ""
  this.color = orange
  this.progress = 1

  this.fade = function() {
    this.progress -= 0.005
    var alpha = lerp(0, 256, this.progress)
    this.color.setAlpha(alpha)
  }

  this.scroll = function() {
    this.y -= 48
  }

  this.display = function() {
    fill(this.color)
    strokeWeight(0)
    textSize(12)
    text(this.text, this.x, this.y)
  }
}

function keyPressed() {
  if (keyCode === 32) {
    gotPayment();
  } 
}

function gotPayment(from = "", to = "", amount = 0) {
  for (var i=0; i<logs.length; i++) {
    logs[i].scroll();
  }
  var log = new Log()
  log.text = "FROM: " + from + "\n" + "TO: " + to + "\n" + "AMOUNT: " + amount;
  logs.push(log)
  payments.push(new Dot(amount))
}
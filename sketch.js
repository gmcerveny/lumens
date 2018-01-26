var payments = [];

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
}


function Dot() {
  var lightColor = color(220, 242, 249);
  this.x = random(width);
  this.y = random(height);
  this.start = random(25,50);
  this.progress = 1

  this.fade = function() {
    this.progress -= 0.01
    this.diameter = lerp(0, this.start, this.progress)
  }

  this.display = function() {
    fill(lightColor)
    ellipse(this.x, this.y, this.diameter, this.diameter)
  }

}

function gotPayment() {
  payments.push(new Dot())
}
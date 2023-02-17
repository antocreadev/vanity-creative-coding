const circles = [];
const total = 250;
let img;
function setup() {
  createCanvas(408, 612);
  loadImage("img1.png", function (img2) {
    background(30);
    img = img2;
    for (let i = 0; i < total; i++) {
      circles[i] = {};
      circles[i].prevPos = { x: width / 2, y: height / 2 };
      circles[i].pos = { x: width / 2, y: height / 2 };
      circles[i].dir = random() > 0.5 ? 1 : -1;
      circles[i].radius = random(3, 10);
      circles[i].angle = 0;
    }
  });
}
function draw() {
  if (!img) {
    background(30);
    if (frameCount % 2) text("loading", width / 2, height / 2);
    return;
  }
  for (let i = 0; i < total; i++) {
    let circle = circles[i]; // current circle
    circle.angle += (1 / circle.radius) * circle.dir; // angle change
    circle.pos.x += cos(circle.angle) * circle.radius; // x position change
    circle.pos.y += sin(circle.angle) * circle.radius; // y position change
    if (
      random(100) < 10 || // 10% chance to change direction
      circle.pos.x < 0 || // if circle is out of canvas
      circle.pos.x > width || // change direction and radius
      circle.pos.y < 0 || // and angle
      circle.pos.y > height // to make it look more natural
    ) {
      circle.dir *= -1; // change direction
      circle.radius = random(3, 10); // change radius
      circle.angle += PI; // change angle
    }
    stroke(img.get(circle.pos.x, circle.pos.y)); // get color from image
    line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y); // draw line
    circle.prevPos.x = circle.pos.x; // update previous position
    circle.prevPos.y = circle.pos.y; // update previous position
  }
}
// mouse hover remove circles and draw image instead of circles
function mouseMoved() {
  for (let i = 0; i < total; i++) {
    circles[i].pos.x = mouseX;
    circles[i].pos.y = mouseY;
  }
}

// mouse click inverse the color of the image, opacity random 0-255
function mouseClicked() {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i] = 200 - img.pixels[i];
    img.pixels[i + 1] = 200 - img.pixels[i + 1];
    img.pixels[i + 2] = 200 - img.pixels[i + 2];
  }
  img.updatePixels();
}

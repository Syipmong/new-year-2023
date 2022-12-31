let canvas;
let c;

window.onload = function(){
const daysElement = document.querySelector('.days .time-value');
const hoursElement = document.querySelector('.hours .time-value');
const minutesElement = document.querySelector('.minutes .time-value');
const secondsElement = document.querySelector('.seconds .time-value');
const targetDate = new Date('January 1, 2023 00:00:00');
const interval = setInterval(() => {
  const currentDate = new Date();
  const timeRemaining = targetDate.getTime() - currentDate.getTime();
  if (timeRemaining < 0) {
    clearInterval(interval);
    showFirework();
    return;
  }
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  const daysString = days.toString().padStart(2, '0');
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  daysElement.textContent = daysString;
  hoursElement.textContent = hoursString;
  minutesElement.textContent = minutesString;
  secondsElement.textContent = secondsString;
}, 1000);


function showFirework() {
    console.log('firworks working...')
  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3', 'orange','pink'];

   canvas = document.getElementById('canvas');
   canvas.width = window.innerWidth -10
   canvas.height = window.innerHeight/2
  console.log(canvas.height)
  
  

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 20 + 1;
    this.velocity = {
      x: Math.random() * 5 - 1.5,
      y: Math.random() * 5 - 1.5
    };
    this.friction = 0.9;
    this.gravity = 0.01;
  }

  Particle.prototype.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    
    if (this.x > canvas.width + this.radius || this.x < 0 - this.radius || this.y > canvas.height) {
      this.x = canvas.width / 2;
      this.y = canvas.height / 4;
      this.velocity = {
        x: Math.random() * 5 - 2.5,
        y: Math.random() * 5 - 1
      };
    }
  }

  
  Particle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.fill
  }

  canvas.innerHTML = '';
  //const c = canvas.getContext('2d');
    c = canvas.getContext('2d')
  const particles = [];
  for (let i = 0; i < colors.length; i++) {
    particles.push(new Particle(canvas.width / 2, canvas.height, colors[i]));
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    c.font = "50px Arial";
    c.fillStyle = "white";
    c.textAlign = "center";
    c.fillText("Happy New Year!",canvas.width / 2, canvas.height / 2);
    c.font = "20px Arial";
    c.fillStyle = "white";
    c.textAlign = "center";
    c.fillText("YIPMONG", canvas.width /2, canvas.height);
    

  }

  
  animate();
  
}

}

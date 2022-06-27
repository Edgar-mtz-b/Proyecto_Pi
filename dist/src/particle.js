var Particle = /** @class */ (function () {
    /*
    constructor(width: number, height: number,
      screenCanvas: CanvasRenderingContext2D,
      mapImg: number[][][]) {
      this.width = width;
      this.height = height;
      this.ctx = screenCanvas;
      this.x = Math.random() * width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 2.5;
      this.size = Math.random() * 1.5 + 1;
      this._2PI = Math.PI * 2;
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.mappedImage = mapImg;
    }
  */
    function Particle(width, height, screenCanvas, mapImg) {
        this.width = width;
        this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * 2.5 + 0.2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.angle = 0;
        this.counter = 0;
        this.switcher = 1;
        this.random = Math.random();
        this.mappedImage = mapImg;
    }
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        if ((this.mappedImage[this.position1]) && (this.mappedImage[this.position1][this.position2])) {
            this.speed = this.mappedImage[this.position1][this.position2][0];
        }
        var movement = (2.5 - this.speed) + this.velocity;
        this.angle += this.speed / 20;
        this.size = this.speed * 2.5;
        this.y -= movement;
        this.x += movement + Math.sin(this.angle) * 2;
        if (this.y <= 0) {
            this.y = this.height;
            this.x = Math.random() * this.width;
        }
        if (this.x >= this.width) {
            this.x = 0;
            this.y = Math.random() * this.height;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        if ((this.mappedImage[this.position1]) && (this.mappedImage[this.position1][this.position2])) {
            this.ctx.fillStyle = this.mappedImage[this.position1][this.position2][1];
            this.ctx.strokeStyle = this.mappedImage[this.position1][this.position2][1];
        }
        //ctx.fillStyle = gradient1;
        //ctx.strokeRect(this.x, this.y, this.size * 3, this.size * 3);
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    };
    Particle.prototype.init = function () {
    };
    /*
      public update() {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        let movement = 0;
        if (this.y < this.height) {
          this.speed = this.mappedImage[0][this.position1][this.position2];
          movement = (2.5 - this.speed) + this.velocity;
        }
    
        this.y += movement;
        
        if (this.y >= this.height) {
          this.y = 0;
          this.x = Math.random() * this.width;
        }
      }
    */
    /*
      public draw() {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
      }
    */
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };

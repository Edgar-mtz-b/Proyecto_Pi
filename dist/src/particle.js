var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
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
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    /*
    constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
      mapImg?: number[][][]) {
      this.ctx = screenCanvas;
      this.x = x;// + 200;
      this.y = y;// - 100,
      this.size = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = ((Math.random() * 30) + 1);
      this._2PI = Math.PI * 2;
      this.mappedImage = mapImg;
    }
  */
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.mappedImage = mapImg;
        this.x = x;
        this.y = y;
        this.size = 10;
        this.weight = 2;
        this.directionX = 1;
    }
    ParticleText.prototype.update = function (mouse) {
        this.weight += 0.01;
        this.y += this.weight;
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = 'rgba(255,255,0.01)';
        var particle1 = new ParticleText(100, 50);
        function animate() {
            particle1.update(MouseEvent);
            particle1.draw();
            requestAnimationFrame(animate);
        }
    };
    return ParticleText;
}());
export { ParticleText };

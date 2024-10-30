import p5 from "p5";

// Начальные параметры квадрата
const square = {
  x: 0, // начальная позиция X
  y: 0, // начальная позиция Y
  size: 20, // размер стороны квадрата
  velocityX: 5, // скорость по X
  velocityY: 5, // скорость по Y
  angle: 0, // начальный угол (в радианах)
  spin: 0.8, // скорость вращения (положительная или отрицательная)
  friction: 0.99, // коэффициент трения для уменьшения скорости
  magnusEffect: 0.01, // сила Магнуса
};

function updateSquare() {
  // Эффект Магнуса
  let magnusForceX = square.magnusEffect * square.spin * square.velocityY;
  let magnusForceY = square.magnusEffect * square.spin * -square.velocityX;

  // Обновление скорости с учетом эффекта Магнуса
  square.velocityX += magnusForceX;
  square.velocityY += magnusForceY;

  // Обновление позиции квадрата
  square.x += square.velocityX;
  square.y += square.velocityY;

  // Имитация трения от газона
  square.velocityX *= square.friction;
  square.velocityY *= square.friction;
  square.spin *= square.friction;

  // Обновление угла вращения
  square.angle += square.spin;
}

function drawSquare(p: p5) {
  // Трансформация и отрисовка квадрата
  p.push();
  p.translate(square.x, square.y);
  p.rotate(square.angle);

  p.fill(0, 0, 255);
  p.rectMode(p.CENTER);
  p.rect(0, 0, square.size, square.size);

  p.pop();
}

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(document.body.clientWidth, document.body.clientHeight);
  };

  p.draw = () => {
    p.background(220, 220, 220, 50); // Очищаем холст светло-серым цветом

    // Обновление позиции и вращения квадрата
    updateSquare();

    // Отрисовка квадрата
    drawSquare(p);
  };
};

new p5(sketch);

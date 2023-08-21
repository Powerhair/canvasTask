const canvas = document.getElementById("chart");
const context = canvas.getContext("2d");

let data = generateData(); // Генерируем случайные данные

drawChart();

canvas.addEventListener("click", function () {
  data = generateData(); // Перегенерируем данные при клике

  // Очищаем холст и перерисовываем график
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawChart();
});

function drawChart() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  const totalValue = data.reduce(function (acc, item) {
    return acc + item.value;
  }, 0);

  let startAngle = -Math.PI / 2; // Начинаем с 12 часов
  console.log(data);

  data.forEach(function (item) {
    const endAngle = startAngle + (2 * Math.PI * item.value) / totalValue;
    const newRadius = (item.value + 1) * 80;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, newRadius, startAngle, endAngle, false);
    context.closePath();
    context.fillStyle = item.color;
    context.fill();

    startAngle = endAngle;
  });

  context.beginPath();
  context.moveTo(centerX, centerY);
  context.arc(centerX, centerY, 33, 0, Math.PI * 2, true);
  context.closePath();
  context.fillStyle = "#1E1E1E";
  context.fill();
}

function generateData() {
  const colors = [
    "#F2C94C",
    "#EB5757",
    "#F2994A",
    "#6FCF97",
    "#9B51E0",
    "#2F80ED",
    "#56CCF2",
    "#219653",
  ];
  const data = [];

  const numValues = Math.floor(Math.random() * 8) + 1; // Генерируем случайное количество значений

  for (let i = 0; i < numValues; i++) {
    let value = Math.random(); // Генерируем случайную долю сектора
    let color = colors[i];

    data.push({ value: value, color: color });
  }

  return data;
}

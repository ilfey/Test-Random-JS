const ctx = document.getElementById("myChart");
const input = document.getElementById("random_count");
const btn = document.getElementById("btnUpdate");

const generateData = (randomCount = 100) => {
  // Fill array with random numbers
  const randomArr = Array.from({ length: randomCount }, () =>
    Math.floor(Math.random() * 100)
  );

  // Count each number
  const map = new Map();

  randomArr.forEach((v) => {
    map.set(v, map.get(v) + 1 || 1);
  });

  const arr = Array.from(map);

  const axis = {};

  for (var i = 0; i < 100; i++) {
    axis[i] = 0;
  }

  arr.forEach((v) => {
    axis[v[0]] = v[1];
  });

  return [Object.keys(axis), Object.values(axis)];
};

const [x, y] = generateData(100);

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: x,
    datasets: [
      {
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: y,
      },
    ],
  },
  options: {
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Random number",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Random numbers count",
        },
      },
    },
  },
});

btn.addEventListener("click", () => {
  const count = input.value;

  if (count < 1) {
    alert("error: random_count cannot be less than 1");
  }

  const [x, y] = generateData(count);

  chart.data.labels = x;
  chart.data.datasets = [
    {
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: y,
    },
  ];

  chart.update();
});

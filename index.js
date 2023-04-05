function countDup(dups) {
    const map = new Map();

    for (const dup of dups) {
        map.set(dup, map.get(dup) + 1 || 1);
    }

    return map;
}

function randomArray(count) {
    const data = Array();
    
    for (var i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    
    return data;
}

function generateData(randomCount = 100) {
    const arr = Array.from(countDup(randomArray(randomCount)));

    const axis = {};

    for (var i = 0; i < 100; i++) {
        axis[i] = 0
    }

    arr.forEach((v) => {
        axis[v[0]] = v[1]
    });

    return [
        Object.keys(axis),
        Object.values(axis),
    ];
}

function setChart(context, x, y) {
    const data = {
        labels: x,
        datasets: [{
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: y,
        }]
    };

    const config = {
        type: 'line',
        data: data,
    };

    return new Chart(context, config);
}

const ctx = document.getElementById('myChart');

const [x, y] = generateData(100);

const chart = setChart(ctx, x, y);

function onClickUpdate() {
    const count = document.getElementById("random_count").value;

    if (count < 1) {
        alert("error: random_count cannot be less than 1");
    }

    const [x, y] = generateData();

    chart.data.labels = x
    chart.data.datasets = [{
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: y,
    }]
    chart.update();
}


const today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const updateData = (chart, max, min, stepValue, typeChart) => {
  chart.data.datasets.forEach(function(dataset) {
    const x = Date.now();
    const preY = (!dataset.data.slice(-1)[0]) ? (Math.random() * (max - min) + min) : (dataset.data.slice(-1)[0]?.y);
    console.log(preY);
    let nextY = randomValuesFollowArrange(preY, Math.random() * (max - min) + min, stepValue)
    dataset.data.push({
      x: x,
      y: nextY
    });
    const noteToUsers = checkOutOfAverage(typeChart)
    noteToUsers(min, max, nextY)
    if (nextY > max || nextY < min) nextY = preY;
  });
}

const randomValuesFollowArrange = (preValue, nextValue, stepValue) => (preValue > nextValue) ? (preValue - Math.random() * (stepValue - 0)) : (preValue + Math.random() * (stepValue - 0));

const checkOutOfAverage = (typeProblem) => {
  return (minValue, maxValue, currentValue) => {
   (maxValue < currentValue || minValue > currentValue) && alert(`Your ${typeProblem} is: ${currentValue.toFixed(2)} \n It so ${maxValue <= currentValue? "high" : "low"}. Now please contact the Hospital for help!`) 
  }
}

const temporaryData = {
  datasets: [{
    label: `Biểu đồ nhiệt độ cơ thể ngày ${date}`,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }]
};
const heartRateData = {
  datasets: [{
    label: `Biểu đồ nhịp tim ngày ${date}`,
    backgroundColor: 'rgb(178, 196, 211)',
    borderColor: 'rgb(178, 196, 211)',
    data: []
  }]
};
const sp02Data = {
  datasets: [{
    label: `Biểu đồ số Oxy trong máu ngày ${date}`,
    backgroundColor: 'rgb(196, 195, 154)',
    borderColor: 'rgb(196, 195, 154)',
    data: []
  }]
};
  
const temporaryConfig = {
  type: 'line',
  data: temporaryData,
  options: {
    plugins: {
      // Change options for ALL axes of THIS CHART
      streaming: {
        duration: 20000
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        },
        type: 'realtime',
        realtime: {
          duration: 20000,  // data in the past 20000 ms will be displayed
          refresh: 1000,    // onRefresh callback will be called every 1000 ms
          delay: 1000,      // delay of 1000 ms, so upcoming values are known before plotting a line
          pause: false,     // chart is not paused
          ttl: undefined,   // data will be automatically deleted as it disappears off the chart
          frameRate: 40, 
          onRefresh: chart => updateData(chart, 38, 36, 0.1, "Body Temporary")
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  }
};


var myChart = new Chart(
document.getElementById('myChart1'),
temporaryConfig
);

const heartRateConfig = JSON.parse(JSON.stringify(temporaryConfig));
heartRateConfig.data = heartRateData
heartRateConfig.options.scales.x.realtime.onRefresh = myChart2 => updateData(myChart2, 100, 60, 3, "Heart Rate");
var myChart2 = new Chart(
document.getElementById('myChart2'),
heartRateConfig
);

const sp02Config = JSON.parse(JSON.stringify(temporaryConfig));
sp02Config.data = sp02Data
sp02Config.options.scales.x.realtime.onRefresh = myChart3=> updateData(myChart3, 1, 0.95, 0.003, "Blood Oxygen Levels")
var myChart3 = new Chart(
document.getElementById('myChart3'),
sp02Config
);


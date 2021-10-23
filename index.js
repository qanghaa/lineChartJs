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

const createChart = function (idElement, config ) {
  new Chart(
  document.getElementById(idElement),
  config
)}

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


const realtimeTemperatureChart = createChart('realtime-chart-one', temporaryConfig)

const heartRateConfig = JSON.parse(JSON.stringify(temporaryConfig));
heartRateConfig.data = heartRateData
heartRateConfig.options.scales.x.realtime.onRefresh = myChart2 => updateData(myChart2, 100, 60, 3, "Heart Rate");
const realtimeHeartRateChart = createChart('realtime-chart-two', heartRateConfig)

const sp02Config = JSON.parse(JSON.stringify(temporaryConfig));
sp02Config.data = sp02Data
sp02Config.options.scales.x.realtime.onRefresh = myChart3=> updateData(myChart3, 1, 0.95, 0.003, "Blood Oxygen Levels")
const realtimeSp02Chart = createChart('realtime-chart-three', sp02Config)

const labels = ['7 Ngày trước', '6 Ngày trước', '5 Ngày trước','4 Ngày trước','3 Ngày trước','Hôm kia','Hôm qua'];

const normalTemperatureConfig = {
  labels: labels,
  datasets: [{
    label: 'Nhiệt độ trung bình theo ngày',
    data: [36.9, 37.1, 36.7, 36.9, 38, 39, 37.5],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(20, 48, 76, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(117, 105, 193)'
    ],
    borderWidth: 1
  }]
};

const normalSp02Config = {
  labels: labels,
  datasets: [{
    label: 'Tỉ số Oxy trong máu trung bình',
    data: [90, 91, 91.5, 92, 94, 88, 90],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(20, 48, 76, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(117, 105, 193)'
    ],
    borderWidth: 1
  }]
};

const normalHeartRateConfig = {
  labels: labels,
  datasets: [{
    label: 'Nhịp tim theo phút trung bình',
    data: [86, 78, 79, 90, 85, 80, 77],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(20, 48, 76, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(117, 105, 193)'
    ],
    borderWidth: 1
  }]
};
// const normalHeartRateConfig = {

// }
// const normalSp02Config = {

// }

const createNormalObjectConfig = (objectRange, data) =>  normalConfig = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: objectRange
    }
  }
};

const normalTemperatureConfigObject = createNormalObjectConfig({
  min:30,
  max:45,
  title: {
    display: true,
    text: 'Nhiệt độ'
  }
}, normalTemperatureConfig)
const normalTemperatureChart = createChart('normal-chart-one', normalTemperatureConfigObject);

const normalHeartRateConfigObject = createNormalObjectConfig({min:50, max:120,title: {
  display: true,
  text: 'Nhịp tim trên phút'
}}, normalHeartRateConfig)
const normalHeartRateChart = createChart('normal-chart-two', normalHeartRateConfigObject);

const normalSp02ConfigObject = createNormalObjectConfig({
  min:0, 
  max:100, 
  title: {
  display: true,
  text: 'Tỉ số Oxy trong máu'
}}, normalSp02Config)
const normalSp02Chart = createChart('normal-chart-three', normalSp02ConfigObject);
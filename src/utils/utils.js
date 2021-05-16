import Papa from 'papaparse'
import ApexCharts from 'apexcharts'

var networks = [];
var chart = null;
var options = {
    series: [],
    chart: {
    type: 'bar',
    height: 430
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  xaxis: {
    categories: [''],
  },
  };

export function upload(file) {
  let chartData = null;
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event) {
    let csvData = event.target.result;
    // The header:true leads to ugly workaround in perf-chart.js line 39
    chartData = Papa.parse(csvData, {header : true});
    let chartData1 = Papa.parse(csvData);
    fillNetworkBlocks(chartData1);
    updateChart(chartData);
    // let inputFileUploaded = true;
  };
  reader.onerror = function() {
    alert('Unable to read ' + file.fileName);
  };
}

function fillNetworkBlocks(chartData) {
  console.log("fillNetworkBlocks")

  var networkNameArr = [];
  chartData.data.forEach((networkData) => {
    if (networkData[0] != "") {
      networkNameArr.push(networkData[0]);
    }
  });
  var SPM_PATTERN = /^(NJ|MI)/ ;
  var filteredSpmNetworkArr = networkNameArr.filter(function (str) { return SPM_PATTERN.test(str); });

  filteredSpmNetworkArr.sort();
  var networkBlocks = [];
  filteredSpmNetworkArr.forEach((spmNetworkName) => {
    networkBlocks.push({name : spmNetworkName, value : spmNetworkName});
  });

  //addNetwork();
}

var createNetworkTimings = function(data, network) {
  return new Promise(function(resolve, reject){
    var startBlocks = network['startBlocks'];
    var endBlocks = network['endBlocks'];
    console.log("html 4 - createNetworkTimings");
    console.log(startBlocks);
    // Ugly solution following from the CSV file format
    var startTimes = []
    var endTimes = []
    data.forEach(blockResult => {
      const keys = Object.keys(blockResult);
      var blockName = '';
      keys.forEach((key, index) => {
        if (index == 0){
          blockName = blockResult[key];
        }
        else if(index == 2) {
          var startTime = parseFloat(blockResult[key]);
          if(startBlocks.includes(blockName)){
            startTimes.push(startTime);
          }
        }
        else if(index == 3) {
          var endTime = parseFloat(blockResult[key]);
          if(endBlocks.includes(blockName)) {
            endTimes.push(endTime);
          }
        }
      });
    });
    if (startTimes.length > 0 && endTimes.length > 0) {
      var timings = {startTimes: startTimes, endTimes: endTimes};
      resolve(timings);
    }
    else {
      reject(Error("No data"));
    }
  });
}

var createTimeSeries = function(data,networks) {
  return new Promise(function(resolve, reject){
    networks.forEach((network, index) => {
      createNetworkTimings(data,network).then((timings) => {
        var firstBlockStartTime = Math.min(...timings.startTimes);
        var lastBlockEndTime = Math.max(...timings.endTimes);
        var executionTime =  lastBlockEndTime - firstBlockStartTime;
        return parseFloat(executionTime.toFixed(8));
      }).then((executionTime) => {
        var networkData = {name: network['name'], data: [executionTime*1e6]};
        options.series.push(networkData);
        if (index == networks.length - 1){ 
          if (options.series.length > 0) {
            resolve(options);
          }
          else {
            reject(Error("No data"));
          }
        }
      });
    });
  });
}
  
function updateChart(chartData) {
  console.log("updateChart")

  if(chartData) {
    var chartNetworks = []
    if (networks.length > 0) {
      //var chartNetworks = []
      networks.forEach((network) => {
        if (network.hasOwnProperty('startBlocks') && network.hasOwnProperty('endBlocks')) {
          chartNetworks.push(network);
          console.log(">>>> chartNetworks")
          console.log(chartNetworks)
        }
      });
      perfChart(chartData.data, chartNetworks);
    }
  }
}

function perfChart(data, networks) {
  options.series = [];
  createTimeSeries(data,networks)
  .then((options) => {
    if (chart) {
      chart.updateOptions(options)
    }
    else {
      chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
  });
}
   
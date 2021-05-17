import React, { useState } from 'react'
import Papa from 'papaparse'
import { Button, TextField } from '@material-ui/core'


import Title from './components/title'
import Configuration from './components/configuration'
import DBNetwork from './components/DBNetwork'
import SelectField from './components/selectfield'
import data from './data/networksDataBase.json'
import { updateChart, fillNetworkBlocks, networks } from './utils/utils'

function App() {
  const [ testBenchSelected, setTestBenchSelected ] = useState([])
  const [ measurementFile, setMeasurementFile ] = useState('')
  const [ networkBlocks, setNetworkBlocks ] = useState([])
  const [ inputNetworkBlock, setInputNetworkBlock ] = useState([])
  const [ outputNetworkBlock, setOutputNetworkBlock ] = useState([])
  const [ chartData, setChartData ] = useState({})
  const [ networksCount, setNetworksCount ] = useState([])
  // console.log("networkblocks app", networkBlocks)
  console.log(networksCount)

  const handleChange = async file => {
    setMeasurementFile(file)
    if(file){
      upload(file)
    }
  }

  const handleAddNetwork = () => {
    setNetworksCount(prev => [...prev, { name: "" , inputBlocks: [] , outputBlocks: []}])
  }

  const handleChangeSelect = (field,value,num) => {
    const newArray = networksCount.map( (el,index) => {
      if(num === index){
        return {
          name: field === "name" ? value : el.name,
          inputBlocks: field === "input" ? value : el.inputBlocks ,
          outputBlocks: field === "output" ? value : el.outputBlocks,
        }
      }else{
        return el
      }
    })
    setNetworksCount(newArray)
  }

  function upload(file) {
    let reader = new FileReader();
    let networkBlocks
    reader.readAsText(file);
    reader.onload = function(event) {
      let csvData = event.target.result;
      // The header:true leads to ugly workaround in perf-chart.js line 39
      setChartData(Papa.parse(csvData, {header : true}))
      let chartData1 = Papa.parse(csvData);
      networkBlocks = fillNetworkBlocks(chartData1);
      updateChart(chartData);
      setNetworkBlocks(networkBlocks)
    };
    reader.onerror = function() {
      alert('Unable to read ' + file.fileName);
    };
  }

  
  function pushNetwork() {
    updateChart(chartData, networksCount);
  }

 
  return (
    <div className="App">
      <Title />
      <Configuration measurementFile={measurementFile} setMeasurementFile={handleChange} testBenchSelected={testBenchSelected} setTestBenchSelected={setTestBenchSelected} />
      <DBNetwork network={data.networks[0]} chartData={chartData} />
      <DBNetwork network={data.networks[1]} chartData={chartData} />
      <Button onClick={handleAddNetwork}>Add Network</Button>
      <Button onClick={() => pushNetwork()}>Refresh graph</Button>
      {measurementFile && 
      networksCount.map((el, index) => 
      <div key={index}>
        <SelectField label="Select input blocks" options={networkBlocks} value={networksCount[index].inputBlocks} setValue={(value) => handleChangeSelect("input", value, index)}/>
        <SelectField label="Select output blocks" options={networkBlocks} value={networksCount[index].outputBlocks} setValue={(value) => handleChangeSelect("output", value, index)}/>
        <TextField type="text" lable="name" value={networksCount[index].name} onChange={(e) => handleChangeSelect("name", e.target.value, index) }/>
      </div>
      )
      }
      <div id="chart"></div>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import Papa from 'papaparse'

import Title from './components/title'
import Configuration from './components/configuration'
import DBNetwork from './components/DBNetwork'
import SelectField from './components/selectfield'
import data from './data/networksDataBase.json'
import { updateChart, fillNetworkBlocks } from './utils/utils'

function App() {
  const [ testBenchSelected, setTestBenchSelected ] = useState([])
  const [ measurementFile, setMeasurementFile ] = useState('')
  const [ networkBlocks, setNetworkBlocks ] = useState([])
  const [ inputNetworkBlock, setInputNetworkBlock ] = useState([])
  const [ outputNetworkBlock, setOutputNetworkBlock ] = useState([])
  console.log("networkblocks app", networkBlocks)
  console.log(networkBlocks)

  const handleChange = async file => {
    setMeasurementFile(file)
    if(file){
      upload(file)
    }
  }

  function upload(file) {
    let chartData = null;
    let reader = new FileReader();
    let networkBlocks
    reader.readAsText(file);
    reader.onload = function(event) {
      let csvData = event.target.result;
      // The header:true leads to ugly workaround in perf-chart.js line 39
      chartData = Papa.parse(csvData, {header : true});
      let chartData1 = Papa.parse(csvData);
      networkBlocks = fillNetworkBlocks(chartData1);
      updateChart(chartData);
      // let inputFileUploaded = true;
      console.log("app", networkBlocks)
      setNetworkBlocks(networkBlocks)
    };
    reader.onerror = function() {
      alert('Unable to read ' + file.fileName);
    };
  }
 
  return (
    <div className="App">
      <Title />
      <Configuration measurementFile={measurementFile} setMeasurementFile={handleChange} testBenchSelected={testBenchSelected} setTestBenchSelected={setTestBenchSelected} />
      <DBNetwork network={data.networks[0]} />
      <DBNetwork network={data.networks[1]} />
      {measurementFile && 
      <>
        <SelectField label="Select input blocks" options={networkBlocks} value={inputNetworkBlock} setValue={setInputNetworkBlock}/>
        <SelectField label="Select output blocks" options={networkBlocks} value={outputNetworkBlock} setValue={setOutputNetworkBlock}/>
      </>
      }
    </div>
  );
}

export default App;

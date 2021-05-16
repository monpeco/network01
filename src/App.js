import React, { useState } from 'react'

import Title from './components/title'
import Configuration from './components/configuration'
import DBNetwork from './components/DBNetwork'
import SelectField from './components/selectfield'
import data from './data/networksDataBase.json'
import { upload } from './utils/utils'

import Papa from 'papaparse'

function App() {
  const [ testBenchSelected, setTestBenchSelected ] = useState([])
  const [ measurementFile, setMeasurementFile ] = useState('')
  const handleChange = file => {
    setMeasurementFile(file)
    if(file){
      upload(file)
    }
  }
 
  return (
    <div className="App">
      <Title />
      <Configuration measurementFile={measurementFile} setMeasurementFile={handleChange} testBenchSelected={testBenchSelected} setTestBenchSelected={setTestBenchSelected} />
      <DBNetwork network={data.networks[0]} />
      <DBNetwork network={data.networks[1]} />
      {measurementFile && 
      <>
        <SelectField label="Select input blocks" options={[1,2,3,4]} value={testBenchSelected} setValue={setTestBenchSelected}/>
        <SelectField label="Select output blocks" options={[1,2,3,4]} value={testBenchSelected} setValue={setTestBenchSelected}/>
      </>
      }
    </div>
  );
}

export default App;

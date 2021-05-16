import React, { useState } from 'react'

import Title from './components/title'
import Configuration from './components/configuration'
import DBNetwork from './components/DBNetwork'
import data from './data/networksDataBase.json'

function App() {
  const [ testBenchSelected, setTestBenchSelected ] = useState([])
  const [ measurementFile, setMeasurementFile ] = useState('')
  console.log(data)
  return (
    <div className="App">
      <Title />
      <Configuration measurementFile={measurementFile} setMeasurementFile={setMeasurementFile} testBenchSelected={testBenchSelected} setTestBenchSelected={setTestBenchSelected} />
      <DBNetwork network={data.networks[0]} />
      <DBNetwork network={data.networks[1]} />
    </div>
  );
}

export default App;

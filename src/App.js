import React, { useState } from 'react'

import Title from './components/title'
import Configuration from './components/configuration'

function App() {
  const [ testBenchSelected, setTestBenchSelected ] = useState([])
  const [ measurementFile, setMeasurementFile ] = useState('')
  return (
    <div className="App">
      <Title />
      <Configuration measurementFile={measurementFile} setMeasurementFile={setMeasurementFile} testBenchSelected={testBenchSelected} setTestBenchSelected={setTestBenchSelected} />
    </div>
  );
}

export default App;

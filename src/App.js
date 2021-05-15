import React, { useState } from 'react'

import Title from './components/title'
import Configuration from './components/configuration'

function App() {
  const [ testBenchSelected, setTestBenchSelected ] = useState([])
  console.log(testBenchSelected)
  return (
    <div className="App">
      <Title />
      <Configuration testBenchSelected={testBenchSelected} setTestBenchSelected={setTestBenchSelected} />
    </div>
  );
}

export default App;

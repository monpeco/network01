import React, { useState } from 'react'
import { Container, Typography, Button, FormControl, InputLabel, Select, Chip, Input, MenuItem } from '@material-ui/core'
import SelectField from './selectfield'

const availableTestbenches = [
    'mBT84',
    'mAI92',
    'mKR34'
];

function Configuration(props) {
  const { testBenchSelected, setTestBenchSelected, measurementFile, setMeasurementFile } = props

  return (
    <Container>
      <SelectField label="Select Testbenches" options={availableTestbenches} value={testBenchSelected} setValue={setTestBenchSelected}/>
      <label htmlFor="txtFileUpload">
        <input
          style={{ display: 'none' }}
          id="txtFileUpload"
          name="txtFileUpload"
          type="file"
          onChange={(e) => setMeasurementFile(e.target.files[0])}
        />
        <Button variant="contained" component="span">
            Upload measurement file
        </Button>
        <Typography variant="body2">{ measurementFile ? measurementFile.name : "No file"}</Typography>
      </label>
    </Container>
  );
}

export default Configuration;
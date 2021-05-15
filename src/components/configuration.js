import React, { useState } from 'react'
import { Container, Typography, Button, FormControl, InputLabel, Select, Chip, Input, MenuItem } from '@material-ui/core'

const availableTestbenches = [
    'mBT84',
    'mAI92',
    'mKR34'
];

function Configuration(props) {
  const { testBenchSelected, setTestBenchSelected, measurementFile, setMeasurementFile } = props

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="demo-mutiple-chip-label">Select testbenches</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={testBenchSelected}
          onChange={(e) => setTestBenchSelected(e.target.value)}
          input={<Input />}
        >
          {availableTestbenches.map((name) => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
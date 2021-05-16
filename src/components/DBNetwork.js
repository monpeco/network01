import React from 'react';
import { Container, Button } from '@material-ui/core'

function DBNetwork (props) {
    const { network, chartData } = props

    function pushNetwork() {
      networks.push(network);
    }

    return(
        <div>
            <h3>Network from data base: {network.name}</h3>
            <h4>Input Blocks:</h4>
            {network.inputBlocks.map(block => <div key={block}>{block}</div>)}
            <h4>Output Blocks:</h4>
            {network.outputBlocks.map(block => <div key={block}>{block}</div>)}
            <Button variant="contained" onClick={() => {pushNetwork()}}>
              Add {network.name} to chart
            </Button>
            <Button variant="contained">
              Save
            </Button>     
        </div>
    );
}

export default DBNetwork
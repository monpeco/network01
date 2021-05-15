import React, { PureComponent, Component } from 'react';
import { Container, Typography } from '@material-ui/core'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

class Title extends Component {
    render() { 
        return (
            <Container>
                <Typography variant="h4">CARM network performance test GUI - 0.2a</Typography>
                <Typography variant="body1" color="textSecondary">
                    <EmojiObjectsIcon />
                    Ask MPSM team
                </Typography>
            </Container>
        );
    }
}

export default Title;
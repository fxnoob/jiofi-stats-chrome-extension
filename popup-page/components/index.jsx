import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { PopupMessenger } from '../../src/utils/message'
const message = new PopupMessenger()

class  MediaControlCard extends React.Component{
    state = {
       isDeviceConnected: false ,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        message.listen((msg)=>{
            if (msg === null) {
                if (msg !== this.state.isDeviceConnected) {

                }
            }
        })
    }
    render() {
        const { classes, theme } = this.props;
        const percentage = 66;
        return (
          <div style={{width: '200px', height: '200px'}}>
              <CircularProgressbar
                percentage={percentage}
                text={`${percentage}% ⚡`}
                styles={{
                    path: { stroke: `rgba(62, 152, 199, ${percentage / 100})` },
                    text: { fill: '#f88', fontSize: '16px' },
                }}
              />
          </div>
        );
    }
}

export default MediaControlCard;

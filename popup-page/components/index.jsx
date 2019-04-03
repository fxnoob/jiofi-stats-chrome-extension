import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { PopupMessenger } from '../../src/utils/message'
const message = new PopupMessenger()

class  MediaControlCard extends React.Component{
    state = {
       isDeviceConnected: false ,
      percentage: 0,
      isDeviceCharging: '',
    };
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        message.listen((msg)=>{
            if (msg === false) {
                if (msg !== this.state.isDeviceConnected) {
                  this.setState({isDeviceConnected: false});
                }
            } else {
              /** parse response json*/
              const response = JSON.parse(msg);
              const isDeviceCharging = false;
              this.setState({
                isDeviceConnected: true ,
                percentage: 10,
                isDeviceCharging: '⚡'
              });
            }
        })
    }
    render() {
        return (
          <div style={{width: '200px', height: '200px'}}>
              <CircularProgressbar
                percentage={this.state.percentage}
                text={`${this.state.percentage}% ${this.state.isDeviceCharging}`}
                styles={{
                    path: { stroke: `rgba(62, 152, 199, ${this.state.percentage / 100})` },
                    text: { fill: '#f88', fontSize: '16px' },
                }}
              />
          </div>
        );
    }
}

export default MediaControlCard;

import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { PopupMessenger } from '../../src/utils/message'
const message = new PopupMessenger()

class  MediaControlCard extends React.Component {
    state = {
       isDeviceConnected: true ,
      percentage: 0,
      isDeviceCharging: '',
    };
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        message.listen((msg)=>{
            if (msg === false) {
                if (this.state.isDeviceConnected !== false) {
                  this.setState({isDeviceConnected: false});
                }
            } else {
              /** parse response*/
              const response = msg;
              console.log(response);
              let isDeviceCharging = '';
              if ( response.battery_status !== "Discharging")
                isDeviceCharging = "⚡";
              this.setState({
                isDeviceConnected: true ,
                percentage: Number(response.battery_level),
                isDeviceCharging: isDeviceCharging
              });
            }
        })
    }
    render() {
        return (
          <div style={{width: '200px', height: '200px'}}>
            {this.state.isDeviceConnected? (<CircularProgressbar
              percentage={this.state.percentage}
              initialAnimation={true}
              text={`${this.state.percentage}% ${this.state.isDeviceCharging}`}
              styles={{
                path: { stroke: `rgba(62, 152, 199, ${this.state.percentage / 100})` },
                text: { fill: '#f88', fontSize: '16px' },
              }}
            />):(
              <div>
                <h2>Device is not connected!</h2>
              </div>
            )}
          </div>
        );
    }
}

export default MediaControlCard;

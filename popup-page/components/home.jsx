import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import LinearProgress from './linearProgress'
import Db  from '../../src/utils/db'

const db = new Db()

class HomeComponent extends React.Component {
    state = {
      isDeviceConnected: true ,
      percentage: 0,
      isDeviceCharging: '',
      selectedModelNofromHelp: '',
      showLinearProgressBar: true,
    };
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.loopPointer = null
    }
  componentDidMount () {
    this.start()
  }
  componentWillUnmount () {
    this.stop()
  }
  start() {
    this.loopPointer = setInterval(this.init, 2000)
  }
  stop() {
      clearInterval(this.init)
  }
   init () {
     db.get(["jiofiStats"])
       .then(res => {
         console.log({res})
         const {jiofiStats} = res
         if (jiofiStats.status === "INIT") {
           this.setState({
             showLinearProgressBar: true
           })
         } else if (jiofiStats.status === "ERROR") {
           this.setState({
             showLinearProgressBar: false,
             isDeviceConnected: false
           })
         } else if (jiofiStats.status === "SUCCESS") {
           this.setState({
             showLinearProgressBar: false,
             isDeviceConnected: true,
             percentage: Number(jiofiStats.battery_level),
             isDeviceCharging: jiofiStats.battery_status === "Discharging"?"":"⚡",
           })
         }
       })
       .catch(e => {console.log({e:e})})
  }
  render() {
        return (
            <div style={{width: '200px', height: '200px',paddingLeft: '50px',textAlign: 'center',marginTop: '24px'}}>
              {this.state.showLinearProgressBar?(
                <LinearProgress/>
              ):(this.state.isDeviceConnected? (<CircularProgressbar
                  percentage={this.state.percentage}
                  initialAnimation={true}
                  text={`${this.state.percentage}% ${this.state.isDeviceCharging}`}
                  styles={{
                    textAlign: 'center',
                    path: { stroke: `rgba(62, 152, 199, ${this.state.percentage / 100})` },
                    text: { fill: '#f88', fontSize: '16px' },
                  }}
                  />):(
                  <div>
                  <h2>Device is not connected!</h2>
                    <p>
                      Make sure you have selected right version of your JioFi device
                      Check out <a style={{textDecoration: 'underline', cursor: 'hand'}} onClick={this.props.gotoHelpTab}>Here</a>
                    </p>
                  </div>
                  )
              )}
          </div>
        );
    }
}

export default HomeComponent;

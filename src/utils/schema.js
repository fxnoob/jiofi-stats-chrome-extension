export default class Schema {
  constructor () {
    this.data = {
      /** model number of jiofi there are six: 1,2,3,4,5,6 */
      modelNo: 4, // model: jiofi 4
      /** jiofi stats object */
      jiofiStats: {
        status: "ERROR",//connection status -> 'INIT|SUCCESS|ERROR'
        battery_level: 0,//remaining battery power
        battery_status: "Discharging"//charging status
      }
    }
  }
}

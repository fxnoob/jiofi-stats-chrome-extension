import { Sound } from './sound'

const sound = new Sound()

export class Notification {

  constructor (){
    this.notifiedOneTime = false;
  }
  listen(json) {
    if ( json.battery_level < 11) {
      if(this.notifiedOneTime === false) {
        sound.play()
        this.notifiedOneTime = true;
      }
    } else {
      this.notifiedOneTime = false;
    }
  }
}

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
        notify()
        this.notifiedOneTime = true;
      }
    } else {
      this.notifiedOneTime = false;
    }
  }
}

/**
 * chrome notifications
 * https://developer.chrome.com/extensions/desktop_notifications
 * */
const notify = () => {
  const noti = webkitNotifications.createNotification(
    'images/low_battery.png',
    'Please connect Jiofi to Power!',  // notification title
    'remaining power is less than 10 %'  // notification body text
  );
}

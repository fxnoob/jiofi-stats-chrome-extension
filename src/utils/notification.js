import { Sound } from './sound'

const sound = new Sound()

export class Notification {
  constructor () {
    this.notifiedOneTime = false
    this.prev_battery_level = 100;
  }
  listen (json) {
    if(json.status === "SUCCESS") {
      if ( this.prev_battery_level > json.data.battery_level ) {
        this.prev_battery_level = json.data.battery_level
        chrome.browserAction.setBadgeText({text: `${this.prev_battery_level}%`});
      }
      if (json.battery_level < 11) {
        if (this.notifiedOneTime === false) {
          sound.play()
          notify()
          this.notifiedOneTime = true
        }
      } else {
        this.notifiedOneTime = false
      }
    }
  }
}

/**
 * chrome notifications
 * https://developer.chrome.com/extensions/desktop_notifications
 * */
const notify = () => {
  chrome.notifications.create(
    'id1',
    {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('images/low_battery.png'),
      title: 'Please connect you JioFi to Power',
      message: 'Remaining power is less than 10%',
      priority: 1,
      buttons: [{
        title: 'Close'
      }
      ],
      isClickable: true
    },
    () => {
      console.log(chrome.runtime.lastError)
    }
  )
}

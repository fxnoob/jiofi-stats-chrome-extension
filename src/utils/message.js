/** Communicate with popup page and send message from it */
export class PopupMessenger {
  constructor () {
    this.port = chrome.extension.connect({
      name: 'JioFi extension'
    })
  }
  listen (callback) {
    this.port.onMessage.addListener((json) => {
      callback(json)
    })
  }
  sendMessage (json) {
    this.port.postMessage(json)
  }
}

/** Communicate with background page and send message from it */
export class BackgroundMessenger {
  constructor () {
    this.port = null
  }
  listen (callback) {
    chrome.extension.onConnect.addListener((port) => {
      this.port = port
      callback(port)
      console.log('Connected .....')
    })
  }
  sendMessage (json) {
    if (this.port !== null) {
      try {
        this.port.postMessage(json)
      } catch (e) {
        this.port = null
      }
    }
  }
}

import '@babel/polyfill'
import listener from './utils/loader'
import { BackgroundMessenger } from './utils/message'
import { Notification } from './utils/notification'

const message = new BackgroundMessenger()
const notification = new Notification()
message.listen((json) => {
  console.log({json: json})
})
listener((res) => {
  console.log({backgroundRes: res})
  try {
    if (res) {
      notification.listen(res)
    }
    message.sendMessage(res)
  } catch (e) {
    //console.log(e)
  }
})

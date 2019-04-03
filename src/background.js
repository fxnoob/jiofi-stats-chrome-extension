import '@babel/polyfill'
import listener from './utils/api'
import { BackgroundMessenger } from './utils/message'
import { Notification } from './utils/notification';

const message = new BackgroundMessenger()
const notification = new Notification()

message.listen((json) => {
  console.log(json);
})

listener((res)=>{
  console.log(res);
  try {
    if(res) {
      notification.listen(res);
    }
    message.sendMessage(res)
  } catch (e) {
    console.log(e)
  }
})


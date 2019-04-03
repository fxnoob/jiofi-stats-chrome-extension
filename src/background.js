import '@babel/polyfill'
import listener from './utils/api'
import { BackgroundMessenger } from './utils/message'

const message = new BackgroundMessenger()

message.listen((json) => {
  console.log(json);
})
listener((res)=>{
  console.log(res);
  try {
    message.sendMessage(res)
  } catch (e) {
    console.log(e)
  }
})

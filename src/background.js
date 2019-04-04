import '@babel/polyfill'
import listener from './utils/api'
import Db, { Schema } from './utils/db'
import { BackgroundMessenger } from './utils/message'
import { Notification } from './utils/notification';

const message = new BackgroundMessenger()
const notification = new Notification()
const SchemaController = new Schema()
const db = new Db()

/** when extension is loaded first time */
db.get('isThisFirstTimeLoaded')
  .then((res) => {
    if (res === undefined) {
      db.set(SchemaController.data)
        .then(() => {
          db.set({ 'isThisFirstTimeLoaded': true })
        })
    }
  })
  .catch((e) => {})

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


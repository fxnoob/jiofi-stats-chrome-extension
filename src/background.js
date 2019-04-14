import '@babel/polyfill'
import listener from './utils/api'
import Db, { Schema } from './utils/db'
import { BackgroundMessenger } from './utils/message'
import { Notification } from './utils/notification'

const message = new BackgroundMessenger()
const notification = new Notification()
const SchemaController = new Schema()
const db = new Db()

/** when extension is loaded first time */
const dbInit = async () => {
  try {

    const FirstTimeLoad = await db.get('FirstTimeLoad')
    console.log("FirstTimeLoad", FirstTimeLoad)
    await db.set({ ...SchemaController.data, 'FirstTimeLoad': true })
  } catch (e) {

    console.log(e);
    await db.set({ ...SchemaController.data, 'FirstTimeLoad': true })
  }
}
/*  initialize db */
dbInit()
  .then(res => {
    console.log("dbInit", res);
  })
  .catch(e => {})

message.listen((json) => {
  console.log(json)
})

listener((res) => {
  console.log(res)
  try {
    if (res) {
      notification.listen(res)
    }
    message.sendMessage(res)
  } catch (e) {
    console.log(e)
  }
})

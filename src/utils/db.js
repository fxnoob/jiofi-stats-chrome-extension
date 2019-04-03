export class Schema {
  constructor () {
    this.data ={};
  }
}
export default class Db {
  constructor () {}
  /*
   * set values in db
   * input - {key: value}
   * */
  set (params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set(params, () => {
          resolve(params)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  /*
    * get values from db
    * input - [key1,key2]
    * */
  get (params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(params, (items) => {
          if (items === undefined) { reject('Error') } else { resolve(items) }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  /*
    * delete key from db
    * input - [key1,key2] or string
    * */
  remove (key_str) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.remove(key_str, (res) => {
          resolve(key_str)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

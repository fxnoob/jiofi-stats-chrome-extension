import Schema from './schema'

export default class Db extends Schema {

  constructor () {
    super()
    this.get = this.get.bind(this)
  }
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
  getFromDb (params) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(params, (items) => {
          if (items === undefined) {
            reject('Error')
          } else if (items.hasOwnProperty()) {

          } else { resolve(items) }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
  async get (params) {
    const res= {}
    const response = await this.getFromDb(params)
    for (const prop of params) {
      res[prop] = response.hasOwnProperty(prop)?response[prop]:this.data[prop]
    }
    return res
  }
/**
* delete key from db
* input - [key1,key2] or string
*/
  remove (keyStr) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.remove(keyStr, (res) => {
        resolve(keyStr)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

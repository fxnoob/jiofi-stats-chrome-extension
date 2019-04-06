import Db from './db'

const db = new Db()

export class Util {
  constructor () {
    this.versionList = ['Jiofi 1', 'Jiofi 2', 'Jiofi 3', 'Jiofi 4', 'Jiofi 5', 'Jiofi 6']
    this.url = [
      { url: '', data: {} },
      { url: '', data: {} },
      { url: '', data: {} },
      { url: 'http://jiofi.local.html/cgi-bin/qcmap_web_cgi', data: { 'credentials': 'omit', 'headers': { 'accept': 'text/plain, */*; q=0.01', 'accept-language': 'en-US,en;q=0.9,hi;q=0.8,te;q=0.7', 'cache-control': 'no-cache', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'gfhfg': 'ghjhgjhgj', 'pragma': 'no-cache', 'x-requested-with': 'XMLHttpRequest', 'ytyty': 'fdghf' }, 'referrer': 'http://jiofi.local.html/', 'referrerPolicy': 'no-referrer-when-downgrade', 'body': 'Page=GetDeviceDetails&mask=0&token=0', 'method': 'POST', 'mode': 'cors' } },
      { url: '', data: {} },
      { url: 'http://jiofi.local.html/Device_info_ajax.cgi', data: {"credentials":"omit","headers":{ 'accept': 'text/plain, */*; q=0.01',"accept-language":"en-US,en;q=0.9,hi;q=0.8,te;q=0.7","cache-control":"no-cache", 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',"gfhfg":"ghjhgjhgj","pragma":"no-cache","x-requested-with":"XMLHttpRequest","ytyty":"fdghf"},"referrer":"http://jiofi.local.html/Device_info.cgi","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"} }
    ]
    this.parsedResponse = {
      battery_status: null,
      battery_level: 0
    }
    this.version = { url: '', data: {} }
  }
  async parser(dataToParse, callback) {
    console.log(dataToParse)
    const  parsedResponse = this.parsedResponse;
    const data = await db.get("modelNo") || 4;
    if (dataToParse === false) {
      callback(false)
    } else {
      if (data.modelNo === 6) {
        parsedResponse.battery_level = Number(dataToParse.batterylevel.replace(' %', ''))
        parsedResponse.battery_status = dataToParse.batterystatus
      } else if (data.modelNo === 5) {

      } else if (data.modelNo === 4) {
        parsedResponse.battery_level = dataToParse.battery_level
        parsedResponse.battery_status = dataToParse.battery_status
      } else if (data.modelNo === 3) {

      } else if (data.modelNo === 2) {

      } else if (data.modelNo === 1) {

      } else {

      }
      callback(parsedResponse)
    }
  }
}

const util = new Util()

const getJioFiDeviceDetails = () => {
  return db.get('modelNo')
    .then((res) => {
      const url = util.url[res.modelNo - 1].url
      const configParam = util.url[res.modelNo - 1].data
      return fetch(url, configParam)
    })
    .then( res => {
      if (res.status === 200) {
        console.log(res)
        return res
      }
      throw new Error(String(res.status))
    })
    .then(  response => response.json())
}
/** sleep in apis call request */
const sleep = (paramsToreturn, miliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(paramsToreturn)
    }, miliseconds)
  })
}
/** listener for change after wait of  1 sec */
export default (callback) => {
  const asyncIterable = {
    [Symbol.asyncIterator] () {
      return {
        i: 0,
        next () {
          return getJioFiDeviceDetails()
            .then(res => {
              console.log(res)
              return sleep(res, 1000)
            })
            .then(res => {
              return Promise.resolve({ value: res, done: false })
            })
            .catch(async e => {
              console.log('not connected', e)
              await sleep({}, 1000)
              return Promise.resolve({ value: false, done: false })
            })
        }
      }
    }
  };
  (async () => {
    for await (let num of asyncIterable) {
      await util.parser(num === null ? false : num, (res) => {
        callback(res)
      })
    }
  })()
}

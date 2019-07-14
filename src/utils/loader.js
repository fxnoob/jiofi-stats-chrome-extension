import Db from './db'
import JioFi_lib from './core/jiofi'
import JioFi_5 from './core/jiofi_5'
import JioFi_4 from './core/jiofi_4'

const nullF = () => {console.log("Null function")}
const JioFi = [nullF, nullF, nullF, nullF, JioFi_4, JioFi_5, nullF]
const db = new Db()
const jiofiLib = new JioFi_lib()
const sleep = jiofiLib.sleep

/** listener for change after wait of  5 sec */
export default (callback) => {
  const asyncIterable = {
    [Symbol.asyncIterator] () {
      return {
        i: 0,
        next () {
          return db.get(["modelNo"])
            .then(async modelNo => {
              const res = await JioFi[modelNo.modelNo]()
              return sleep(res, 4000)
            })
            .then(res => {
              return Promise.resolve({ value: res, done: false })
            })
            .catch(async e => {
              //console.log('not connected', e)
              await sleep({}, 4000)
              return Promise.resolve({ value: false, done: false })
            })
        }
      }
    }
  };
  (async () => {
    for await (let res of asyncIterable) {
      callback(res)
    }
  })()
}

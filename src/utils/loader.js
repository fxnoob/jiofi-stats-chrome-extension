import Db from './db'
import JioFi_lib from './core/jiofi'
import JioFi_5 from './core/jiofi_5'
import JioFi_4 from './core/jiofi_4'

const nullF = () => {console.log("Null function")}
const JIOFI = [nullF, nullF, nullF, nullF, JioFi_4, JioFi_5, nullF]
const db = new Db()
const jiofiLib = new JioFi_lib()
const sleep = jiofiLib.sleep

const LogResponse = async(responseJson) => {
  await db.set({
    jiofiStats: {
      status: responseJson.status,
      battery_level: responseJson.battery_level,//remaining battery power
      battery_status: responseJson.battery_status//charging status
    }
  })
  return true;
}

/** listener for change after wait of  5 sec */
export default (callback) => {
  const asyncIterable = {
    [Symbol.asyncIterator] () {
      return {
        i: 0,
        next () {
          return db.get(["modelNo"])
            .then(async modelNo => {
              const logRes = {
                status: "INIT",
                battery_level: 0,//remaining battery power
                battery_status: "Discharging"//charging status
              };
              try {
                const res = await JIOFI[modelNo.modelNo]()
                logRes.status = "SUCCESS"
                logRes.battery_level = res.data.battery_level//remaining battery power
                logRes.battery_status = res.data.battery_status//charging status
              } catch (e) {
                logRes.status = "ERROR"
                logRes.battery_level = 0//remaining battery power
                logRes.battery_status = "Discharging"//charging status
              }
              const newModelNo = await db.get(['modelNo'])
              if (newModelNo.modelNo === modelNo.modelNo) {
                await LogResponse(logRes)
              }
              await sleep({}, 4000)
              return Promise.resolve({ value: {}, done: false })
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

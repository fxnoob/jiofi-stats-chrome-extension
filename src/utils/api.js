
export class Util {
  constructor () {
    this.versionList = ['Jiofi 1', 'Jiofi 2', 'Jiofi 3', 'Jiofi 4', 'Jiofi 5', 'Jiofi 6'];
    this.url = [
      { url: '', data: {} },
      { url: '', data: {} },
      { url: '', data: {} },
      { url: 'http://jiofi.local.html/cgi-bin/qcmap_web_cgi', data: {"credentials":"omit","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9,hi;q=0.8,te;q=0.7","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","gfhfg":"ghjhgjhgj","pragma":"no-cache","x-requested-with":"XMLHttpRequest","ytyty":"fdghf"},"referrer":"http://jiofi.local.html/","referrerPolicy":"no-referrer-when-downgrade","body":"Page=GetDeviceDetails&mask=0&token=0","method":"POST","mode":"cors"} },
      { url: '', data: {} },
      { url: '', data: {} }
    ]
    this.version = {url: '', data: {} }
  }
  getVersion () {

  }
  getUrl () {
  }
}

const getJioFiDeviceDetails = () => {
  return fetch('http://jiofi.local.html/cgi-bin/qcmap_web_cgi', {"credentials":"omit","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9,hi;q=0.8,te;q=0.7","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","gfhfg":"ghjhgjhgj","pragma":"no-cache","x-requested-with":"XMLHttpRequest","ytyty":"fdghf"},"referrer":"http://jiofi.local.html/","referrerPolicy":"no-referrer-when-downgrade","body":"Page=GetDeviceDetails&mask=0&token=0","method":"POST","mode":"cors"})
    .then(res => {
      if (res.status === 200) {
        return res
      }
      throw new Error(String(res.status))
    })
    .then(response=>response.json())
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
    [Symbol.asyncIterator]() {
      return {
        i: 0,
        next() {
          return  getJioFiDeviceDetails()
            .then(res=>{
              return sleep(res,1000)
            })
            .then(res=>{
              return Promise.resolve({value: res, done: false });
            })
            .catch(async e=>{
              console.log("not connected" , e)
              await sleep({}, 1000)
              return Promise.resolve({ value: false, done: false });
            })
        }
      };
    }
  };
  (async () => {
    for await (let num of asyncIterable) {
      callback(num=== null?false:num);
    }
  })();
}

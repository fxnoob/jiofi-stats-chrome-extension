/***
* returns =  {
 *  status: 'SUCCESS||ERROR'
 *    data: {
 *      battery_status: null,
 *      battery_level: 0
 *    }
 *  }
*
* */
const getData = async () => {
  const res = {
    status: 'SUCCESS',
    data: {
      battery_status: null,
      battery_level: 0
    }
  }
  const url = "http://jiofi.local.html/cgi-bin/qcmap_web_cgi"
  try {
    const raw = await fetch(url, { 'credentials': 'omit', 'headers': { 'accept': 'text/plain, */*; q=0.01', 'accept-language': 'en-US,en;q=0.9,hi;q=0.8,te;q=0.7', 'cache-control': 'no-cache', 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'gfhfg': 'ghjhgjhgj', 'pragma': 'no-cache', 'x-requested-with': 'XMLHttpRequest', 'ytyty': 'fdghf' }, 'referrer': 'http://jiofi.local.html/', 'referrerPolicy': 'no-referrer-when-downgrade', 'body': 'Page=GetDeviceDetails&mask=0&token=0', 'method': 'POST', 'mode': 'cors' })
    const jsonResponse = await raw.json()
    res.data.battery_level = jsonResponse.battery_level
    res.data.battery_status = jsonResponse.battery_status
    res.status = "SUCCESS"
  } catch (e) {
    res.status = "ERROR"
  }
  return res
}

export default getData;

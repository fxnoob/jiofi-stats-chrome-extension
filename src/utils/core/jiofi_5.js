const cheerio = require('cheerio')

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
  const url = "http://jiofi.local.html/cgi-bin/en-jio/mStatus.html"
  try {
    const raw = await fetch(url, {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3","accept-language":"en-US,en;q=0.9,hi;q=0.8,te;q=0.7","cache-control":"no-cache","gfhfg":"ghjhgjhgj","pragma":"no-cache","upgrade-insecure-requests":"1","ytyty":"fdghf"},"referrer":"http://jiofi.local.html/cgi-bin/en-jio/mStatus.html","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
    const html = await raw.text()
    const $ = cheerio.load(html)
    const BatteryLevel = $('#lDashBatteryQuantity').text().replace('%','')
    const ChargingStatus = $('#lDashChargeStatus').text()
    res.data.battery_level = Number(BatteryLevel)
    res.data.battery_status = ChargingStatus
    res.status = "SUCCESS"
  } catch (e) {
    res.status = "ERROR"
  }
  return res
}

export default getData;

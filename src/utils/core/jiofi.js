class JioFi {
  constructor () {}
  /** sleep in apis call request */
  sleep(paramsToReturn, milliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(paramsToReturn)
      }, milliseconds)
    })
  }

}


export default JioFi

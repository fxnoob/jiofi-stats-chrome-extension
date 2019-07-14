export class Sound {
  constructor () {
    this.resource = chrome.runtime.getURL('alert.mp3')
    this.audio = new Audio(this.resource)
    this.isPlaying = false
  }
  play () {
    this.isPlaying = true
    this.audio.play()
      .then(res => {
        this.isPlaying = false
      })
      .catch(e => {
        this.isPlaying = false
      })
  }
  pause () {
    if (this.isPlaying) {
      this.audio.pause()
      this.isPlaying = false
    }
  }
}

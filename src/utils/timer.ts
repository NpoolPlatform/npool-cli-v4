import { date } from 'quasar'

const remain = (timestamp: number): string => {
  const now = Math.ceil(new Date().getTime() / 1000)

  if (timestamp <= now) {
    return '00:00:00'
  }

  let remainSeconds = timestamp - now
  const remainHours = Math.floor(remainSeconds / 60 / 60)
  const remainMins = Math.floor(remainSeconds / 60) % 60
  remainSeconds = remainSeconds % 60

  return ('0' + remainHours.toString()) + ':' +
         (remainMins > 9 ? remainMins.toString() : '0' + remainMins.toString()) + ':' +
         (remainSeconds > 9 ? remainSeconds.toString() : '0' + remainSeconds.toString())
}

const formatTime = (timestamp: number): string => {
  return date.formatDate(timestamp * 1000, 'YYYY-MM-DDTHH:mm:ss')
}

export {
  remain,
  formatTime
}

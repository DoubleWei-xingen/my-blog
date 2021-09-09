export default function (timestamp, showTime = false) {
    const date = new Date(+timestamp)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    let str = `${date.getFullYear()}-${month}-${day}`
    if (showTime) {
      const weekarrary = ['一','二','三','四','五','六','天']
      const hour = date.getHours().toString().padStart(2, "0")
      const minute = date.getMinutes().toString().padStart(2, "0")
      const second = date.getSeconds().toString().padStart(2, "0")
      const week = date.getDay()
      str += ` ${hour}:${minute}:${second} 星期${weekarrary[week]}`
    }
    return str
  }
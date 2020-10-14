/**
 * 打印数据
 * @param [anything]
 * @return [anything]
 */
function p (param) {
  console.log(param)
}

/**
 * 设置本地缓存
 * @name [string] 缓存名称
 * @value [string] 缓存值
 * @return null
 */
function s (name, value) {
  localStorage.setItem(name, value)
}

/**
 * 获取本地缓存
 * @name [string] 缓存名称
 * @return [string] 缓存值
 */
function g (name) {
  let r = ''
  if (name) {
    r = localStorage.getItem(name) ? localStorage.getItem(name) : ''
  }
  return r
}

/**
 * 清楚本地缓存
 * @[name] 清除的缓存键名
 * @return null
 */
function c (name) {
  if (name) {
    localStorage.removeItem(name)
  } else {
    for (var i in localStorage) {
      localStorage.removeItem(i)
    }
  }
}

/**
 * 路由跳转
 * @param [string] 路由
 * @return [null]
 */
function r (param) {
  this.$router.push(param, () => {})
}

/**
 * 滚动至锚点
 * @param [string] Dom节点的Ref名称
 * @return [null]
 */
function j (node) {
  if (this.$refs[node]) {
    this.$refs[node].scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * 成功操作提示
 */
function success (param) {
  let msg = '操作成功'
  if (param) {
    msg = param
  }
  this.$message({
    type: 'success',
    message: msg
  })
}

/**
 * 失败操作提示
 */
function error (param) {
  let msg = '操作失败'
  if (param) {
    msg = param
  }
  this.$message({
    type: 'error',
    message: msg
  })
}

/**
 * 获取随机数
 * @param [length] 随机数位数，默认6位
 * @return [string] 返回的随机数字符串
 */
function getRandomNumber (length) {
  let thisLength = 6
  if (length) {
    thisLength = length
  }
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  var res = ''
  for (var i = 0; i < thisLength; i++) {
    var id = Math.ceil(Math.random() * 9)
    res += chars[id]
  }
  return res
}

/**
 * 获取随字符串
 * @length [number] 随机数位数(6)
 * @return string 随机字符串
 */
function getRandomString (length) {
  let result = ''
  let thisLength = 6
  if (length) {
    thisLength = length
  }
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (var i = 0; i < thisLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * 复制文本
 * @text [string] 需要复制的文本
 * @return [null] true | false
 * 注意：苹果浏览器中无效
 */
function copyText (text) {
  let oInput = document.createElement('textarea')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand('Copy')
  oInput.className = 'oInput'
  oInput.style.display = 'none'
}

/**
 * 转数字为人民币大写
 * @param [num] 数字
 * @return [string] 结果
 */
function getRmbUppercase (num) {
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let IsNum = Number(num)
  if (!isNaN(IsNum)) {
    var head = num < 0 ? '欠' : ''
    num = Math.abs(num)
    var s = ''
    for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(num * 100 / 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    num = Math.floor(num)
    for (i = 0; i < unit[0].length && num > 0; i++) {
      var p = ''
      for (var j = 0; j < unit[1].length && num > 0; j++) {
        p = digit[num % 10] + unit[1][j] + p
        num = Math.floor(num / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
  } else {
    return ''
  }
}

/**
 * 文件大小转化
 * @size [number] 尺寸单位字节
 * @return string 转化后单位
 */
function getFileSize (size) {
  if (size < 1024) {
    return size + 'Bytes'
  } else if (size < (1024 * 1024)) {
    let temp = size / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (size < (1024 * 1024 * 1024)) {
    let temp = size / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else if (size < (1024 * 1024 * 1024 * 1024)) {
    let temp = size / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  } else {
    let temp = size / (1024 * 1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'TB'
  }
}

/**
 * 确认弹框
 * @title [string] 确认弹框标题
 * @content [string] 确认信息
 * @callback [function] 确认后回调方法
 */
function confirm (param, callback) {
  let t = '删除提示'
  let c = '此操作将永久删除该文件, 是否继续?'
  if (param.title) {
    t = param.title
  }
  if (param.content) {
    c = param.content
  }
  this.$confirm(c, t, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callback()
  }).catch(() => {})
}

/*
* 获取元素绝对距离
* @dom [object] Dom元素
* @type [string] 类型
* @return [number] 值
*/
function getDomPosition (dom, type) {
  let offset = 0
  switch (type) {
    case 'l':
      offset = dom.offsetLeft
      break
    case 't':
      offset = dom.offsetTop
      break
    case 'r':
      offset = dom.offsetRight
      break
    case 'b':
      offset = dom.offsetBottom
      break
  }
  if (dom.offsetParent != null) {
    offset += this.getDomPosition(dom.offsetParent, type)
  }
  return offset
}

/**
 * 是否为字符串
 * @param [str] 字符串
 * @return [boolean] true | false
 */
 function isString (str) {
  if (str.constructor === String) {
    return true
  } else {
    return false
  }
}

/**
 * 是否为数字
 * @param [num] 数字
 * @return [boolean] true | false
 */
function isNumber (num) {
  if (num.constructor === Number) {
    return true
  } else {
    return false
  }
}

/**
 * 是否为数组
 * @param [arr] 数组
 * @return [boolean] true | false
 */
function isArray (arr) {
  if (arr.constructor === Array) {
    return true
  } else {
    return false
  }
}

/**
 * 是否为对象
 * @param [obj] 数组
 * @return [boolean] true | false
 */
function isObject (obj) {
  if (obj.constructor === Object) {
    return true
  } else {
    return false
  }
}

/**
 * 是否为布尔值
 * @param [boo] 布尔值
 * @return [boolean] true | false
 */
function isBoolean (boo) {
  if (boo.constructor === Boolean) {
    return true
  } else {
    return false
  }
}

/**
 * 是否为汉字
 * @param [char] 汉字
 * @return [boolean] true | false
 */
 function isHanzi (char) {
  if (char !== '') {
    var judge = /^[u4e00-u9fa5]+$/
    if (judge.test(char)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 是否为小写字母
 * @param [strgin] 字符串
 * @return [boolean] true | false
 */
function isLowercase (str) {
  if (this.isString(str)) {
    var judge = /^[a-z]+$/
    if (judge.test(str)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 是否为大写字母
 * @param [strgin] 字符串
 * @return [boolean] true | false
 */
function isUppercase (str) {
  if (this.isString(str)) {
    var judge = /^[A-Z]+$/
    if (judge.test(str)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 是否为英文字母
 * @param [strgin] 字符串
 * @return [boolean] true | false
 */
function isLetter (str) {
  if (this.isString(str)) {
    var judge = /^[A-Za-z]+$/
    if (judge.test(str)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 检测手机号码格式
 * @param [phone] 手机号
 * @return [boolean] true || false
 */
function isPhone (phone) {
  if (this.isNumber(phone)) {
    var judge = /^[1]{1}[2,3,4,5,6,7,8,9]{1}[0-9]{9}$/
    if (judge.test(phone)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 检测邮箱格式
 * @param [email] 邮箱
 * @return [boolean] true || false
 */
function isEmail (email) {
  if (this.isString(email)) {
    var judge = /^([a-zA-Z]|[0-9])(w)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/
    if (judge.test(email)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 检测日期格式
 * @param [email] 日期，如：2020-12-23
 * @return [boolean] true || false
 */
function isFormatDate (date) {
  if (date) {
    var judge = /^(d{4})(-)(d{2})(-)(d{2})$/
    if (judge.test(date)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 获取当前时间戳
 * @param null
 * @return number
 */
function getTimestamp () {
  return Date.parse(new Date()).toString().substr(0, 10) * 1
}

/**
 * 获取当前星期
 * @param null
 * @return string
 */
function getWeekName () {
  var now = new Date()
  var day = now.getDay()
  var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var week = weeks[day]
  return week
}

/**
 * 获取某个日期的星期
 * @param date 日期：如2020-12-20
 * return string 星期，如：周三
 */
function dateToWeek (date) {
  let weekArray = ['日', '一', '二', '三', '四', '五', '六']
  let week = ''
  if (this.isFormatDate(date)) {
    week = '周' + weekArray[new Date(date).getDay()]
    return week
  } else {
    return false
  }
}

/**
 * 获取系统时间
 * @param param && string (Y-m-d h:i:s)
 * @return date 0000-00-00
 */
function getDateTime (form, offset) {
  var date = new Date()
  if (offset >= 0 || offset <= 0) {
    date = new Date(date.getTime() + (offset * 24 * 60 * 60 * 1000))
  }
  var n = date.getFullYear()
  var y = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  var r = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  var s = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  var f = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  var m = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  if (form) {
    form = form.replace(/Y/g, n)
    form = form.replace(/y/g, n)
    form = form.replace(/m/g, y)
    form = form.replace(/d/g, r)
    form = form.replace(/H/g, s)
    form = form.replace(/h/g, s)
    form = form.replace(/i/g, f)
    form = form.replace(/s/g, m)
    return form
  }
}

/**
 * 计算某个日期的前一天或后一天
 * @date [string] 日期，如：2019-02-12
 * @type [string] 类型，prev前一天，next后一天
 * @return [string] 日期
 */
function getPrevNextDay (date, offset) {
  let result = ''
  if (this.isFormatDate(date)) {
    let dateTime = new Date(date)
    if (offset < 0) {
      dateTime = dateTime.setDate(dateTime.getDate() - offset)
    } else if (offset > 0) {
      dateTime = dateTime.setDate(dateTime.getDate() + offset)
    } else {
      return false
    }
    dateTime = new Date(dateTime)
    let year = dateTime.getFullYear()
    let month = (dateTime.getMonth() + 1) >= 10 ? (dateTime.getMonth() + 1) : '0' + (dateTime.getMonth() + 1)
    let day = dateTime.getDate() >= 10 ? dateTime.getDate() : '0' + dateTime.getDate()
    result = year + '-' + month + '-' + day
    return result
  } else {
    return false
  }
}

/**
 * 获取问候语
 * @param null
 * @return string
 */
function getGreeting () {
  var result = ''
  var now = new Date()
  var hour = now.getHours()
  if (hour < 6 && hour > 0) {
    result = '凌晨好！'
  } else if (hour < 9) {
    result = '早上好！'
  } else if (hour < 12) {
    result = '上午好！'
  } else if (hour < 14) {
    result = '中午好！'
  } else if (hour < 17) {
    result = '下午好！'
  } else if (hour < 19) {
    result = '傍晚好！'
  } else if (hour < 22) {
    result = '晚上好！'
  } else {
    result = '夜里好！'
  }
  return result
}

/**
 * 计算同一天两个时间之间的差值
 * @startTime [string] 开始时间
 * @endTime [string] 结束时间
 * @return string 差值，如：4时13分59秒
 */
function getTimeOffset (startTime, endTime) {
  let sec = ''
  let min = ''
  let hour = ''
  let startArr = startTime.split(':')
  let endArr = endTime.split(':')
  let startHour = startArr[0] * 1
  let startMin = startArr[1] * 1
  let startSec = startArr[2] * 1
  let endHour = endArr[0] * 1
  let endMin = endArr[1] * 1
  let endSec = endArr[2] * 1
  if (endSec >= startSec) {
    sec = endSec - startSec
    if (endMin >= startMin) {
      min = endMin - startMin
      hour = endHour - startHour
    } else {
      min = (endMin + 60) - startMin
      hour = endHour - 1 - startHour
    }
  } else {
    sec = (endSec + 60) - startSec
    if ((endMin - 1) >= startMin) {
      min = endMin - 1 - startMin
      hour = endHour - startHour
    } else {
      min = endMin - 1 + 60 - startMin
      hour = endHour - 1 - startHour
    }
  }
  return hour + '时' + min + '分' + sec + '秒'
}

/**
 * 计算两个日期之间的天数
 * @startDate [string] 开始日期，如：2020-09-12
 * @param [strign] 结束日期，如：2020-12-12
 * @return number 相差值
 */
function getDateOffset (startDate, endDate) {
  let dateSpan = ''
  let offset = ''
  startDate = Date.parse(startDate)
  endDate = Date.parse(endDate)
  dateSpan = endDate - startDate
  if (dateSpan > 0 || dateSpan === 0) {
    dateSpan = Math.abs(dateSpan)
    offset = Math.floor(dateSpan / (24 * 3600 * 1000))
  } else {
    dateSpan = Math.abs(dateSpan)
    offset = '-' + Math.floor(dateSpan / (24 * 3600 * 1000))
  }
  return offset
}

/**
 * 计算过去时间
 * @timestamp [number] 时间戳
 * @return string 返回值，如：4分钟前
 */
function getTimeAgo (timestamp) {
  var now = Math.ceil(Date.now() / 1000)
  var diff = now - timestamp
  var moment = ''
  if (diff < 0) {
    return
  }
  if (diff >= 0 && diff < 60) {
    moment = '刚刚'
  }
  if (diff >= 1 * 60 && diff < 60 * 60) {
    moment = Math.ceil(diff / 60) + '分钟前'
  }
  if (diff >= 1 * 3600 && diff < 24 * 3600) {
    moment = Math.ceil(diff / 3600) + '小时前'
  }
  if (diff >= 1 * 3600 * 24 && diff <= 30 * 3600 * 24) {
    moment = Math.ceil(diff / 3600 / 24) + '天前'
  }
  if (diff >= 1 * 3600 * 24 * 30 && diff < 12 * 3600 * 24 * 30) {
    moment = Math.ceil(diff / 3600 / 24 / 30) + '个月前'
  }
  if (diff >= 3600 * 24 * 30 * 12) {
    moment = '很久以前'
  }
  return moment
}

/**
 * 转Datetime为时间戳
 * @datetime object
 * @return string
 */
function datetimeToTimestamp (datetime) {
  let res = ''
  res = new Date(datetime).getTime() / 1000
  return res
}

/*
* 时间戳转日期时间
* @timestamp [number] 时间戳，10位，精确到秒
* @return [string] 日期时间，如：2020-12-20 09:23:20
*/
function  timestampToDatetime(timestamp) {
  var time = new Date(timestamp * 1000)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var i = time.getMinutes()
  var s = time.getSeconds()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  i = i < 10 ? '0' + i : i
  s = s < 10 ? '0' + s : s
  return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
}

/**
 * 转化对象为字符串
 * @param object
 * @return string
 */
function o2s (param) {
  var result = ''
  if (typeof (param) === 'object') {
    result = JSON.stringify(param)
  } else {
    result = null
  }
  return result
}

/**
 * 转化字符串为对象
 * @param string
 * @return object
 */
function s2o (param) {
  var result = ''
  if (typeof (param) === 'string') {
    result = JSON.parse(param)
  } else {
    result = null
  }
  return result
}

module.exports.j = j
module.exports.r = r
module.exports.c = c
module.exports.p = p
module.exports.s = s
module.exports.g = g
module.exports.o2s = o2s
module.exports.s2o = s2o
module.exports.error = error
module.exports.success = success
module.exports.isEmail = isEmail
module.exports.isEmail = isEmail
module.exports.isHanzi = isHanzi
module.exports.isPhone = isPhone
module.exports.confirm = confirm
module.exports.isArray = isArray
module.exports.isLetter = isLetter
module.exports.isObject = isObject
module.exports.copyText = copyText
module.exports.isString = isString
module.exports.isNumber = isNumber
module.exports.isBoolean = isBoolean
module.exports.dateToWeek = dateToWeek
module.exports.getTimeAgo = getTimeAgo
module.exports.getDateTime = getDateTime
module.exports.getGreeting = getGreeting
module.exports.getWeekName = getWeekName
module.exports.isLowercase = isLowercase
module.exports.getFileSize = getFileSize
module.exports.isFormatDate = isFormatDate
module.exports.getTimestamp = getTimestamp
module.exports.getDateOffset = getDateOffset
module.exports.getTimeOffset = getTimeOffset
module.exports.getPrevNextDay = getPrevNextDay
module.exports.getDomPosition = getDomPosition
module.exports.getRmbUppercase = getRmbUppercase
module.exports.getRandomString = getRandomString
module.exports.getRandomNumber = getRandomNumber
module.exports.datetimeToTimestamp = datetimeToTimestamp
module.exports.timestampToDatetime = timestampToDatetime

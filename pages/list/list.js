// pages/list/list.js
const dayMap = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  0: '星期日',
}
const weatherIconUrlMap = {
  'cloudy': '/images/cloudy-icon.png',
  'heavyrain': '/images/heavyrain-icon.png',
  'lightrain': '/images/lightrain-icon.png',
  'overcast': '/images/cloudy-icon.png',
  'snow': '/images/snow-icon.png',
  'sunny': '/images/sunny-icon.png',
}
Page({
  data: {
    weekWeather: []
  },
  onLoad: function (options) {
    this.getFutureWeather()
  },
  onPullDownRefresh() {
    this.getFutureWeather(() => {
      wx.stopPullDownRefresh()
    })
  },
  getFutureWeather(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        time: new Date().getTime(),
        city: '广州市'
      },
      success: res => {
        let data = res.data.result
        this.setWeekWeather(data)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setWeekWeather(data) {
    let weekWeather = data.map(item => {
      let id = item.id
      let date = new Date()
      date.setDate(date.getDay() + id)
      return {
        id: id,
        day: dayMap[date.getDay()],
        weather: item.weather,
        temp: `${item.minTemp}° ~ ${item.maxTemp}°`,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        iconPath: weatherIconUrlMap[item.weather]
      }
    })
    this.setData({ weekWeather: weekWeather })
  },
})
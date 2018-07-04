const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

const weatherIconUrlMap = {
  'cloudy': '/images/cloudy-icon.png',
  'heavyrain': '/images/heavyrain-icon.png',
  'lightrain': '/images/lightrain-icon.png',
  'overcast': '/images/cloudy-icon.png',
  'snow': '/images/snow-icon.png',
  'sunny': '/images/sunny-icon.png',
}
const weatherBgUrlMap = {
  'cloudy': '/images/cloudy-bg.png',
  'heavyrain': '/images/heavyrain-bg.png',
  'lightrain': '/images/lightrain-bg.png',
  'overcast': '/images/overcast-bg.png',
  'snow': '/images/snow-bg.png',
  'sunny': '/images/sunny-bg.png',
}

const nowBaseUrl = 'https://test-miniprogram.com/api/weather/now'

Page({
  onLoad() {
    this.getNow()
  },
  data: {
    nowTemp: '',
    nowWeather: '',
    todayDate: '',
    todayTemp: '',
    forecastWeather: ''
  },
  onPullDownRefresh() {
    this.getNow(() => {wx.stopPullDownRefresh()})
  },
  getNow(callback) {
    wx.request({
      url: nowBaseUrl,
      data: { city: '广州市' },
      success: (res) => {
        this.setNow(res)
        this.setForecast(res)
        this.setToday(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNow(res) {
    const tempData = res.data.result
    this.setData({
      nowTemp: tempData.now.temp + '°',
      nowWeather: weatherMap[tempData.now.weather],
      nowBackgroundImage: weatherBgUrlMap[tempData.now.weather]
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[tempData.now.weather]
    })
  },
  setToday(res) {
    const data = res.data.result.today
    let date = new Date()
    this.setData({
      todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`,
      todayTemp: `${data.minTemp}° ~ ${data.maxTemp}°`,
    })
  },
  setForecast(res) {
    const forecast = res.data.result.forecast
    let nowHour = new Date().getHours()
    let hourlyWeather = []
    for (let i = 0; i < 7; i++) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + '时',
        iconPath: weatherIconUrlMap[forecast[i].weather],
        temp: forecast[i].temp
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({ forecastWeather: hourlyWeather })
  },
  onTapDayWeather() {
    wx.showToast()
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
})
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
const futureBaseUrl = 'https://test-miniprogram.com/api/weather/future'

Page({
  onLoad() {
    this.getNow()
  },
  data: {
    nowTemp: '',
    nowWeather: ''
  },
  onPullDownRefresh() {
    this.getNow(() => {wx.stopPullDownRefresh()})
  },
  getNow(callback) {
    wx.request({
      url: nowBaseUrl,
      data: { city: '广州市' },
      success: (res) => {
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

        const forecast = tempData.forecast
        console.log(forecast)
        let nowHour = new Date().getHours()
        let hourlyWeather = []
        for(let i = 0; i < 24; i += 3) {
          hourlyWeather.push({
            time: (i + nowHour) % 24 + '时',
            iconPath: weatherIconUrlMap[forecast[i / 3].weather],
            temp: forecast[i / 3].weather.temp
          })
        }
        this.setData({ forecastWeather: hourlyWeather })

      },
      complete: () => {
        callback && callback()
      }
    })
  },
  getFuture() {
    wx.request({
      url: futureBaseUrl,
      data: {
        city: '广州市',
        time: Date.parse(new Date()),
      },
      success: (res) => {
        const data = res.data.result
        this.setData({futureWeather: data})
      }
    })
  },

})
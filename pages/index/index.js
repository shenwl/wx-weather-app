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
        console.log(res.data)
        const tempData = res.data.result

        this.setData({
          nowTemp: tempData.now.temp + '°',
          nowWeather: weatherMap[tempData.now.weather]
        })

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[tempData.now.weather]
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})
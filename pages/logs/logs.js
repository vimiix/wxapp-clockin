//logs.js
const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    count: 0,
    logs: [],
    userInfo: null
  },
  // 清除历史事件响应
  clearCache: function() {
    wx.clearStorageSync(),
    wx.showToast({
      title: '清除成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    }),
    app.globalData.recordStatus = false,
    this.onShow()
  },
  onLoad: function () {
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      count: app.globalData.recordCount,
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '加班打卡',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindRecord: function() {
    if (app.globalData.recordStatus){
      wx.showToast({
        title: '今日已打过卡',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else {
      var logs = wx.getStorageSync('logs') || []  
      app.globalData.recordCount = logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      app.globalData.recordStatus = true,
      this.setData({
        motto: '已打卡',
      })
      wx.showToast({
        title: '打卡成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    if (app.globalData.recordStatus){
      this.setData({
        motto: "已打卡"
      })
    } else {
      this.setData({
        motto: "加班打卡"
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

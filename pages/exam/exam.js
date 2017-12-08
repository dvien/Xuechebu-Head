var Zan = require('../../dist/index');
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;

Page(Object.assign({}, Zan.Tab, {
  data: {
    tab1: {
      list: [{
        id: 'all',
        title: '考试次数'
      }, {
        id: 'topay',
        title: '考试预约'
      }, {
        id: 'tosend',
        title: '考试通过率'
      }],
      selectedId: 'all',
      scroll: false
    },
    show: 'film_favorite',
    dateArray: [
      {
        date: '最近一天',
        changeColor: 'selected'
      },
      {
        date: '近七天',
        changeColor: 'normal'
      },
      {
        date: '近一个月',
        changeColor: 'normal'
      }
    ],
    classifyArray: [
      '考试次数',
      '通过人数',
      '未通过人数'
    ],
    kemuArray:[
      '科目一',
      '科目二',
      '科目三',
      '科目四',
    ]
  },

  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      show: 'film_favorite',

      [`${componentId}.selectedId`]: selectedId
    });
  },

  setDate(e) {
    var that = this;
    var txtArray = [];
    for (var i = 0; i < that.data.dateArray.length; i++) {
      if (e.currentTarget.dataset.date == that.data.dateArray[i].date) {
        txtArray.push({ date: that.data.dateArray[i].date, changeColor: 'selected' });
      } else {
        txtArray.push({ date: that.data.dateArray[i].date, changeColor: 'normal' });
      }
    }
    that.setData({
      dateArray: txtArray
    });
  },

  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        // title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  }

}));

const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const time = require("dayjs")().format("YYYY-M-D HH:mm:ss")
const copyWebpackPlugin = require('copy-webpack-plugin')
const bannerPlugin = new webpack.BannerPlugin(
`@desc ${ pkg.description }
@version ${ pkg.version }
@author ${ pkg.author + ' ' + pkg.email }
@time ${ time }

@desc 日期(默认)、时间、其他(城市)选择器
@param {Object} options
@param {String} options.type               date(默认日期)/time(时间)/other(城市/地址)
@param {String|Array} options.cur          初始化字符串,默认'','2019-06-01'或者'17:45'或者'福建省-厦门市-思明区'
@param {Number} options.level              联动级数,默认三级
@param {Number} options.maxWidth           选择器最大显示宽度

@desc  日期字段，优先级：minDate/maxDate > range
@param {Number} options.range              日期显示的年的范围，默认是当前日期的前后十年
@param {Number} options.minDate            初始化可选的最小日期
@param {Number} options.maxDate            初始化可选的最大日期

@desc 自定义(城市地址)参数
@param {Array} options.data
@desc data = [{
  name : {code : 1002, text : '福建省'},
  list : [{
    name : {code : 2001, text : '厦门市'},
    list : [{code : 3001, text : '思明区'}]
  }]
}]
@desc 自定义(城市)对象参数对应的键值key
@param {String} options.nameKey
@param {String} options.listKey
@param {String} options.textKey

@desc 选择器语言设置
@param {Object} lang
@param {String} lang.range                范围文案
@param {String} lang.cancel               取消按钮文案
@param {String} lang.confirm              确认按钮文案

@example
/** time-picker **/
new MultiFuncPicker({
  type : 'time'
}).then((res)=>{
    console.log('single-time-result:', res);
});
new MultiFuncPicker({
  type : 'time',
  cur : ['08:08', '16:06']
}).then((res)=>{
    console.log('multiple-time-result:', res);
});

/** date-picker **/
new MultiFuncPicker({
  type : 'date'
}).then((res)=>{
    console.log('single-date-result:', res);
});
new MultiFuncPicker({
  type : 'date',
  cur : ['2020-08-08', '2021-06-09']
}).then((res)=>{
    console.log('multiple-date-result:', res);
});

/** custom-picker **/
new MultiFuncPicker({
  type : 'custom',
  data: data
}).then((res)=>{
    console.log('custom-result:', res);
});
`
)

module.exports = {
  mode : 'production',
  // target : ['web', 'es5'],
  entry : {
    'multi-func-picker' : path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget : 'umd',
    library : 'MultiFuncPicker'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins : [
    bannerPlugin,
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/css/multi-func-picker.css'),
          to: path.resolve(__dirname, './dist')
        }
      ]
    })
  ]
}
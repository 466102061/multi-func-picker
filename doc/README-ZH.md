### multi-func-picker
一个多功能的选择器，可以是时间(time-picker)选择器、日期(date-picker)选择器或者自定义(custom-picker)选择器。

#### 注意事项 | [版本更新](https://github.com/466102061/multi-func-picker/blob/main/doc/update.md) | [English](https://github.com/466102061/multi-func-picker#readme)
+ 目前仅支持：web-h5
+ 选择器换皮肤：可以通过【重写】CSS来更改皮肤

#### Install
```
npm i multi-func-picker  or yarn add multi-func-picker
```

#### Useage
```
import 'multi-func-picker/dist/multi-func-picker.css'
import MultiFuncPicker from 'multi-func-picker'

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
```
#### examples
+ [examples/index.html](https://github.com/466102061/multi-func-picker/tree/main/examples)

#### Configuration

+ let picker = new MultiFuncPicker(options, lang)
+ options
+ time-picker | date-picker | custom-picker

| 参数 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| options.type | String | -- | date | 选择器类型，默认日期选择器， eg.time, date or custom. |
| options.level | Number | -- | 3 | 选择器的联动级数(默认三级联动). |
| options.cur | String or Array | -- | -- | 初始化选中的状态。如果它有两个初始值，是(多选)选择器，否则就是(单选)选择器. |
| options.maxWidth | Number | -- | 487 | 选择器最大显示宽度. | 

+ date-picker

| 参数 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| options.range | Number | -- | 10 | 日期选择器的日期范围，默认显示当前的前后10年. |
| options.minDate | String or Array | -- | -- | 日期的起始范围值. |
| options.maxDate | String or Array | -- | -- | 日期的最终范围值. |

+ custom-picker

| 参数 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| options.data | Array | -- | -- | 自定义选择器的数据源. |
| options.nameKey | String | -- | name | 当前联动的对象-字段key. |
| options.textKey | String | -- | text | 当前联动的字符串-字段key. |
| options.listKey | String | -- | list | 下一个联动的(列表)-字段key. |

```
level === 1
@example
let data = [
    {code : 1002, text : '男'},
    {code : 1002, text : '女'}
]

//or
let data = ['男', '女']
```
```
level === 3
@example
let data = [
    {
      name : {code : 1002, text : '福建省'},
      list : [
          {
            name : {code : 2001, text : '厦门市'},
            list : [{code : 3001, text : '思明区'}]
          }
      ]
    }
]

//or
let data = [
    {
        name : '福建省',
        list : [
            {name : '厦门市', list : ['思明区']}
        ]
    }
]
```

+ picker

| 方法 | 描述 |
| :----:| :---- |
| picker.then(callback) | 选择器选中结果回调. |

+ lang

| 参数 | 类型 | 是否必须 | 默认值 | 描述 |
| :----: | :----: | :----: | :----: | :---- |
| range | String | -- | 至 | 范围文案. | 
| cancel | String | -- | 取消 | 取消按钮文案. | 
| confirm | String | -- | 确定 | 确定按钮文案. | 


### multi-func-picker
A multi-functional picker that can be time-picker, date-picker or custom-picker.

#### Notes | [简体中文](https://github.com/466102061/multi-func-picker/blob/main/doc/README-ZH.md)
+ support：web-h5
+ picker skin: You can change the  skin by change the CSS.

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

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| options.type | String | -- | date | picker type. eg.time, date or custom. |
| options.level | Number | -- | 3 | picker level. |
| options.cur | String or Array | -- | -- | Initializes the selected state. If it has two initial values, it could be multiple picker, otherwise is single picker. |
| options.maxWidth | Number | -- | 487 | picker max-width. | 

+ date-picker

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| options.range | Number | -- | 10 | before and after 10 years of the date-picker. |
| options.minDate | String or Array | -- | -- | the begin of the date-picker. |
| options.maxDate | String or Array | -- | -- | the end of the date-picker. |

+ custom-picker

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| options.data | Array | -- | -- | data that show in the custom-picker. |
| options.nameKey | String | -- | name | current level object-fields key. |
| options.textKey | String | -- | text | current level string-fields key. |
| options.listKey | String | -- | list | next level list-fields key. |

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

| method | desc |
| :----:| :---- |
| picker.then(callback) | picker result callback. |

+ lang

| param | type | require | default | desc |
| :----: | :----: | :----: | :----: | :---- |
| range | String | -- | 至 | text of range to. | 
| cancel | String | -- | 取消 | text of cancel btn. | 
| confirm | String | -- | 确定 | text of confirm btn. | 


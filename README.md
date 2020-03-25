# supermall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###时间戳 转成 时间格式化
时间戳：1535694719（秒）
1、将时间戳转成Date对象
const date = new Date(1535694719)
2、将date进行格式化，转成对应的字符串
*date.getYear() + date.getMonth()+1

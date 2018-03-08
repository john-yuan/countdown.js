本项目是一个误差极小的倒计时工具函数，解决了iOS等平台定时器冻结问题。

倒计时是开发中常见的需求，常见于发送验证码、抢购倒计时等场景。使用 `setInertval` 来设计倒计时，在某些平台（如iOS和MIUI）可能会受到系统优化时冻结后台定时器的影响，从而导致倒计时暂停的情况。本项目使用日期对象 `Date` + `setTimeout` 来计算间隔时间，在每次倒计时的时候，对时间进行了校准，将误差控制在允许范围内（此举会带来额外的开销，但是性能影响小到可以忽略不计）。

[点此查看演示页面。][demo]

[demo]: http://john-yuan.github.io/countdown.js/index.html "查看演示页面"

## 接口说明

```javascript
/**
 * 执行倒计时
 *
 * @param {Number} seconds 倒计时秒数
 * @param {Function} onUpdate 每秒回调
 * @param {Function} onDone 完成回调
 * @throws {TypeError} 仅在参数类型错误时抛出类型错误
 * @returns {Timer} 返回定时器句柄
 */
countdown(seconds, onUpdate, onDone);
```

## 使用示例

```javascript
// 创建一个 10 秒钟的倒计时
var timer = countdown(10, function(remaningSeconds) {
    console.log('剩余时间 ' + remaningSeconds + ' 秒');
}, function() {
    console.log('倒计时完成!');
});

// 销毁定时器
timer.destroy();
console.log('定时器已销毁!');

// 其它接口说明:

/**
 * 获取开始时间
 *
 * @returns {Date}
 */
var startTime = timer.getStartTime();

/**
 * 获取倒计时时间
 *
 * @returns {Number}
 */
var totalSeconds = timer.getTotalSeconds();

/**
 * 获取剩余时间
 *
 * @returns {Number}
 */
var remainingSeconds = timer.getRemainingSeconds();
```

## License

* [MIT](LICENSE "License")
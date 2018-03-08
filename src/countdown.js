(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.countdown = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    /**
     * 执行倒计时
     *
     * @param {Number} seconds 倒计时秒数
     * @param {Function} onUpdate 每秒回调
     * @param {Function} onDone 完成回调
     * @throws {TypeError} 仅在参数类型错误时抛出类型错误
     * @returns {Timer} 返回定时器句柄
     */
    var countdown = function(seconds, onUpdate, onDone) {
        var timer = new Timer(seconds);
        var toString = {}.toString;
        var start = function() {
            var remainingSeconds;
            if (!timer._destroyed) {
                remainingSeconds = timer.getRemainingSeconds();
                if (remainingSeconds > 0) {
                    onUpdate(remainingSeconds);
                    setTimeout(start, timer.getTimeToNextSeconds());
                } else {
                    onDone();
                }
            }
        };
        if (toString.call(seconds) !== '[object Number]') {
            throw new TypeError('seconds must be a number.');
        }
        if (toString.call(onUpdate) !== '[object Function]') {
            throw new TypeError('onUpdate must be a function.');
        }
        if (toString.call(onDone) !== '[object Function]') {
            throw new TypeError('onDone must be a function.');
        }
        start();
        return timer;
    };

    /**
     * Timer 类：用于记录定时器信息
     *
     * @class
     * @param {Number} seconds 倒计时时间数
     * @returns {Timer}
     */
    var Timer = function(seconds) {
        this._seconds = seconds;
        this._destroyed = false;
        this._start = new Date();
    };

    /**
     * 销毁当前定时器
     */
    Timer.prototype.destroy = function() {
        this._destroyed = true;
    };

    /**
     * 获取开始时间点
     *
     * @returns {Date}
     */
    Timer.prototype.getStartTime = function() {
        return this._start;
    };

    /**
     * 获取倒计时秒数
     *
     * @returns {Number}
     */
    Timer.prototype.getTotalSeconds = function() {
        return this._seconds;
    };

    /**
     * 获取剩余时间
     *
     * 注：通过这种方式计算剩余时间是为了防止 iOS 冻结定时器
     *
     * @returns {Number}
     */
    Timer.prototype.getRemainingSeconds = function() {
        var passed = ((new Date()).getTime() - this._start.getTime()) / 1000;

        // 时间不是绝对准确，即使过去了 2.9 秒，我们在此也算作 2 秒
        passed = Math.floor(passed);

        return this._seconds - passed;
    };

    /**
     * 计算到下一秒所需的毫秒数
     *
     * @returns {Number}
     */
    Timer.prototype.getTimeToNextSeconds = function() {
        var passed = (new Date()).getTime() - this._start.getTime();
        var nextTick = (Math.floor(passed / 1000) + 1) * 1000;
        return nextTick - passed;
    };

    // 挂载内部类 Timer
    countdown.Timer = Timer;

    return countdown;
}));
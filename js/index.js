window.onload = function () {
    searchScroll();
    downTime();
    slideAnimation();

}

// 搜索框滚动变色
function searchScroll() {
    var topbar = document.querySelector('#topbar');
    window.addEventListener('scroll', function () {
        var scrollTop = document.body.scrollTop;
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollTop < slideHeight) {
            var opcity = scrollTop / slideHeight;
            topbar.style.backgroundColor = 'rgba(201,22,35,' + opcity + ')';
        } else {
            topbar.style.backgroundColor = 'rgba(201,22,35,1)';
        }
    })
}

// 计时器 倒计时秒杀
function downTime() {
    // 设置目标时间
    var aheadTime = new Date("Aug 12 2017 22:00:00").getTime();
    // 获取当前时间
    var currentTime = new Date().getTime();
    // console.log(aheadTime);
    // console.log(currentTime);   
    // console.log(spans);
    var time = (aheadTime - currentTime) / 1000;
    var timerId = setInterval(function () {
        // 当时间为0时，停止计时器 并退出
        if (time < 0) {
            clearInterval(timerId);
            return;
        }
        time--;
        var hour = Math.floor(time / 3600);
        var minute = Math.floor(time % 3600 / 60);
        var second = Math.floor(time % 60);
        // 获取所有的span标签
        var spans = document.querySelectorAll(".seckill-timing span");
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);
    }, 1000)
}

// 轮播图 手指滑动
function slideAnimation() {
    var slide = document.querySelector("#slide");
    var slideWidth = slide.offsetWidth;
    var slideUl = document.querySelector("#slide ul:first-of-type");
    var indictors = document.querySelectorAll("#slide ul:last-of-type li");
    var index = 1;
    var timerId;
    // 假设过渡完成了
    var flag = true;
    // 封装一个开启时钟的函数
    function setTime() {
        timerId = setInterval(function () {
            index++;
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            slideUl.style.transition = 'all 0.3s';
            flag = false;
        }, 1000)
    }
    setTime();
    // 过渡完成事件的添加 transitionend 过渡完成事件
    slideUl.addEventListener('transitionend', function () {
        // 过渡完成事件都已经触发了表示过渡就完成了
        flag = true;
        if (index == 9) {
            index = 1;
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            slideUl.style.transition = 'none';
        }
        if (index == 0) {
            index = 8;
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            slideUl.style.transition = 'none';
        }
        for (var i = 0; i < indictors.length; i++) {
            indictors[i].classList.remove('active');
        }
        indictors[index - 1].classList.add('active');
    });
    var startX = 0,
        moveX = 0,
        distanceX = 0;
    slideUl.addEventListener('touchstart', function (e) {
        // 获取开始的位置
        startX = e.touches[0].clientX;
        // 滑动清除时钟
        clearInterval(timerId);
    })
    slideUl.addEventListener('touchmove', function (e) {
        // 当过渡完成了才执行滑动操作
        if (flag == true) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
            slideUl.style.transition = 'none';
        }
    });
    slideUl.addEventListener('touchend', function () {
        if (flag == true) {
            // 因为距离有可能是负值 取绝对值来和轮播图宽度来进行判断
            if (Math.abs(distanceX) > (slideWidth / 3)) {
                if (distanceX > 0) {
                    // 从左往右滑动
                    index--;
                    slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
                    slideUl.style.transition = 'all 0.3s';
                    flag = false;
                } else {
                    // 从右往左滑动
                    index++;
                    slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
                    slideUl.style.transition = 'all 0.3s';
                    flag = false;
                }
            } else {
                // 回弹
                slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
                slideUl.style.transition = 'all 0.3s';
                flag = false;
            }
        }
        // 滑动结束 重新开启时钟
        setTime();
    });
}


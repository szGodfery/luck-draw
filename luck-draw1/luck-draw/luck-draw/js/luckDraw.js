;
(function ($, window, document, undefined) {
  var LuckDraw = function (ele, opt) {
    this.$element = ele,
      this.defaults = {
        row: 4, //行
        column: 4, //列
        spacing: 0,
        click: null,
        time: 3,
        target: 1,
        end: function (e) {}
      },
      this.target,
      this.options = $.extend({}, this.defaults, opt);
  }
  LuckDraw.prototype = {
    init: function () {
      var $this = this.$element;
      var row = this.options.row;
      var col = this.options.column;
      var spacing = this.options.spacing;
      var click = this.options.click;
      var allNumber = 2 * (row + col) - 4;
      var line = row - 2; //除去上下de行数
      var length = $this.children('li').length;
      var options = this.options;

      if (length < allNumber && allNumber == options.goods.length) {
        for (var i = length; i < (allNumber - length); i++) {
          $this.append("<li><img src=" + options.goods[i].src + " alt='奖品'/></li>");
        }
      }
      var children = $this.children('li');
      var width = children.eq(0).width() || 0;
      var height = children.eq(0).height() || 0;

      //元素初始化
      $this.css({
        position: 'relative',
        width: col * width + (col - 1) * spacing,
        height: row * height + (row - 1) * spacing
      });
      children.css({
        position: 'absolute'
      });


      if (line == 0) {
        initOne();
      } else {
        initTwo();
      }

      //初始化函数
      //此时分成4个部分，上、右、下、左
      //上： 0  ~  col-1
      //右： col ~ col+line
      //下： col+line+1 ~ 2*col+line-1
      //左： else
      //如果只有两行
      //此时分成4个部分，上、右、下、左

      function initOne() {
        children.each(function (index) {
          if (index >= 0 && index <= (col - 1)) {
            $(this).css({
              top: 0,
              left: index * width + index * spacing
            });
          } else {
            $(this).css({
              bottom: 0,
              right: index % col * width
            });
          }
        });
      }
      //如果大于两行
      function initTwo() {
        children.each(function (index) {
          if (index >= 0 && index <= (col - 1)) {
            $(this).css({
              top: 0,
              left: index * width + index * spacing
            });
          } else if (index >= col && index <= (col + line - 1)) {
            $(this).css({
              top: ((index + 1 - col)) * (height + spacing),
              right: 0
            });
          } else if (index >= (col + line) && index <= (2 * col + line - 1)) {
            $(this).css({
              bottom: 0,
              right: (index - ((col + line))) * (width + spacing)
            });
          } else {
            $(this).css({
              left: 0,
              bottom: (index - (2 * col + line - 1)) * (height + spacing)
            });
          }
        });
      }


      var target = options.target || Math.floor(Math.random() * allNumber + 1) == 8 ? target=3 : Math.floor(Math.random() * allNumber + 1); //目标，指定或随机
      var ix = 0; //位置
      var stop;
      var flg = false; //抽奖是否正在运行
      /*
      	加速度公式
      	v1 = v0 + a*t;注意加速度的v代表时间
      	此时的t可以我们自己定义，所以是常量，所以只需要求a的值
      */
      var a = -25.0;
      var v0 = 500.0;
      var t = 0.0,
        v;
      var time = this.options.time * 1000; //匀速运行的时间，单位秒

      $(click).on('click', function () {

        if (!flg && sginNum != 0) {
          $('.time-minus').stop(true, false).show()
            .animate({
              top: '0px',
              right: '0px'
            }, 'fast', 'linear', function () {
              // 动画执行完毕的回调
              $(this).css({
                top: '5px',
                right: '5px',
                display: 'none'
              });
              // 记录抽奖次数
              sginNum = $("#start-sgin").text() * 1;
              if (sginNum == 0) {
                sginNum = 0;
              } else {
                sginNum -= 1;
              }
              $("#start-sgin").text(sginNum);
              localStorage.setItem('sginNum', sginNum);
            });
          flg = true;
          target = target || Math.floor(Math.random() * allNumber + 1) == 8 ? target = 3 : Math.floor(Math.random() * allNumber + 1); //目标，指定或随机
          speedUp();
        } else {
          if (sginNum == 0) {
            alert('已无抽奖次数了')
            $('#turn-table li').removeClass('on');
          }
          return;

        }
      });



      //加速
      function speedUp() {
        runner(ix);
        if (v <= 50) {
          clearTimeout(stop);
          v = 50;
          t = 0.0;
          uniform(); //跳转到匀速
        } else {
          t++;
          v = v0 + a * t;
          stop = setTimeout(speedUp, v);
        }
        // target=null;
      }
      //匀速
      function uniform() {
        stop = setTimeout(uniform, v);
        if (t == time / 50) {
          clearTimeout(stop);
          t = 0.0;
          speedDown();
        } else {
          t++;
        }
        runner(ix);
      }
      //减速
      function speedDown() {
        var stop3 = setTimeout(speedDown, v);
        if (v >= 500) {
          v = 500;
          if (ix == target - 1) {
            clearTimeout(stop3);
            options.end(options.goods[target - 1]);
            flg = false;
            target == 5 ? target = 7 : target = 5;
          }
        } else {
          t++;
          v = v - a * t;
        }
        runner(ix);
      }
      //ix++
      function runner(i) {
        children.removeClass('on').eq(ix).addClass('on');
        i++;
        if (i == allNumber) {
          ix = 0;
        } else {
          ix = i;
        }
      }
    },
    setTarget: function (options) {
      var $this = this.$element;
      this.options.target = options;
    }
  }


  $.fn.myLuckDraw = function (options, target) {
    var Ld = new LuckDraw(this, options);
    Ld.setTarget(target);
    Ld.init();
    return this;
  }
})(jQuery, window, document);
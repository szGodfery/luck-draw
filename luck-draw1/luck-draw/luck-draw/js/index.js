var sginNum = 0; //记录抽奖次数
$(function () {
  $("#start-sgin").text(sginNum);
  var userName = 'zhuguo'
  // 中奖信息文字滚动，默认速度speed为50
  $('.txt-scroll-default').txtscroll({
    'speed': 30
  });
  // 奖品列表 奖品列表数量等于 2 * (row + column) - 4
  var goodList = [{
      id: 1,
      name: "加3元换购一包",
      src: './images/award1.png'
    }, {
      id: 2,
      name: "微信红包8.8元",
      src: './images/award2.png'
    },
    {
      id: 3,
      name: "加3元换购一包",
      src: './images/award1.png'

    },
    {
      id: 4,
      name: "必优商城9折优惠券",
      src: './images/award3.png'
    },
    {
      id: 5,
      name: "谢谢参与",
      src: './images/award5.png'
    },
    {
      id: 6,
      name: "加3元换购一包",
      src: './images/award1.png'
    },
    {
      id: 7,
      name: "谢谢参与",
      src: './images/award5.png'
    },
    {
      id: 8,
      name: "苹果手机iPhoneXR",
      src: './images/award4.png'
    }
  ];

  // 转盘滚动 
  $('.draw-cj').myLuckDraw({
    row: 3, //行
    column: 3, //列
    spacing: 3, //空隙
    click: '.start', //点击触发
    time: 3, //匀速运动的时间
    //奖品列表数量等于 2 * (row + column) - 4
    goods: goodList,
    end: function (e) {
      //抽奖执行完毕的回调函数,参数e为获奖编号
      // 获取随机兑换码
      var recordCode = randomWord(12);
      // 中奖信息展示
      setTimeout(function () {
        $(".record-tip").hide();
        $('.tipsbox').fadeIn();
        $('body, html').css("position", "fixed");
        // 
        if (e.name != '谢谢参与') {
          // 文字无缝滚动，txt-clone也需要添加
          $('.txt').append('<span>' + userName + ' 抽到了<sapn><i class="txt-sgin"> ' + e.name + '</i></sapn></span>');
          $('.txt-clone').append('<span>' + userName + ' 抽到了<sapn><i class="txt-sgin"> ' + e.name + '</i></sapn></span>');

          // tips内容填充
          $('.winner-tip').text('恭喜您，中奖了');
          $('.winner-desc').text("你抽中了“" + e.name + "”");
          $('.winner-code').html("<span>兑换码：</span><span class='winner-color'>" + recordCode + "</span>");
          $('.copy-btn').removeClass('copysure').addClass('copyclick');
          $('.friendship-tip').text('请在公众号及时联系客服兑奖，祝您生活愉快。');
        } else {
          // tips内容填充
          $('.winner-tip').text('好可惜，差一点点就中奖了');
          $('.winner-desc').text('听说，多吃槟榔才能中奖哦~');
          $('.winner-code').text('要不，再来一包？');
          $('.copy-btn').removeClass('copyclick').addClass('copysure');
          $('.friendship-tip').text('谢谢惠顾，祝您生活愉快。');
        }
      }, 1000);
    }
  }); //这里tar是确定想要抽奖的目标是几号,不传这是随机，目前是第一次随机，以后都是到8



  // 点击确认事件
  $('.sure').on('click', function () {

    $(this).addClass('down')
    var sureUp = setTimeout(function () {
      $('.sure').removeClass('down')
    },200)

    // 获取抽奖码
    var lotteryCode = $('.lotteryCode').val();
    if (!isEmpty(lotteryCode)) {


      setTimeout(function () {
        $('.lotteryCode').val(''); //清空抽奖码
        // 模拟请求后台
        // +1的动画显示
        $('.time-plus').stop(true, false).show()
          .animate({
            top: '0px',
            right: '0px'
          }, 'fast', 'linear', function () {
            // 动画运动完毕后的回调
            $(this).css({
              top: '5px',
              right: '5px',
              display: 'none'
            });
            // 记录抽奖次数
            sginNum = $("#start-sgin").text() * 1;
            sginNum += 1
            $("#start-sgin").text(sginNum);
            localStorage.setItem('sginNum', sginNum);
          })

      }, 1000);
    } else {
      alert('请输入抽奖码')
    }


  });

  // 点击中奖纪录事件
  $('#record-btn').on('click', function () {
    $('body, html').css("position", "fixed");
    $(".record-tip").show();
  });
  // 点击关闭事件
  $('#close-btn,#close-tip-btn').on('click', function () {
    $(".record-tip").hide();
    $('.tipsbox').hide();
    $('body, html').css("position", "");
  });
  // 点击中奖纪录事件的复制链接
  $('.record-container').on('click', '.copy-color', function () {
    var recordListVal = $(this).prev().text()
    Clipboard.copy(recordListVal);
    setTimeout(function () {
      $(".record-tip").hide();
      $('body, html').css("position", "");
    }, 10);
  });

  // 点击未中奖确定按钮事件
  $('.copy-btn').on('click', function () {
    if ($(this).hasClass('copysure')) { //如果是确认按钮，那么就隐藏
      $('.tipsbox').hide();
      $('body, html').css("position", "");
    } else {
      //使用函数
      var val = $(".winner-code .winner-color").text();
      Clipboard.copy(val);
      setTimeout(function () {
        $('.tipsbox').hide();
        $('body, html').css("position", "");
      }, 10);
    }
  })

  // 中奖纪录区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: true,
    startY: 0
  });

})

/*
 ** randomWord 产生任意长度随机字母数字组合
 ** min-任意长度最小位[固定位数]
 */

function randomWord(min) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
/**
 * 判断是否为空
 * @param {Object} val
 */
function isEmpty(val) {
  if (val == null || typeof (val) == 'undefined' ||
    (typeof (val) == 'string' && trim(val) == '')) {
    return true;
  } else {
    return false;
  }
}
/**
 * 去掉字符串前后空格
 */
function trim(val) {
  return val.replace(/(^\s*)|(\s*$)/g, '');
}
/**
 * Created by 张铭纹 on 2017/1/11.
 */
$(function () {//start

//tab标签1
    $('.newsBoxTab>h3').hover(function () {//给tab标签绑定点击事件
        $(this).addClass('curr').siblings().removeClass('curr');
        //点击后给点击的对象添加tab样式,其他对象移除tab样式
//        console.log($('.newsMsg_newsBox').index());
        $('.tabDiv>.newsMsg_newsBox').eq($(this).index()).show(250).siblings().hide(250);
        //点击后显示点击的对象对应的div,其他div隐藏【eq（）为索引遍历】
    });

//滑动超过1屏后显示返回顶部 start
    $(window).scroll(function () {
        if ($(window).height() / 2 < $(window).scrollTop()) {
            $('.iconTop').fadeIn(250);
        } else {
            $('.iconTop').fadeOut(250);
        }
    });
//滑动超过1屏后显示返回顶部 end

//返回顶部 start
    $('.iconTop').click(function () {
        $('body,html').stop().animate({scrollTop: 0}, 300);
//        return false;
    });
//返回顶部 end

// 动态设置列表导航高度和列表高度
 var NavH = $('.leftNavBox').height();
 var listH = $('.contentListBox').height();
 if(NavH < listH){
     $('.leftNavBox').height(listH-93);
 }else {
     $('.contentList').height(NavH-41);
 }

});//over


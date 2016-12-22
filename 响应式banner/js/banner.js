/**
 * Created by 张铭纹 on 2016/12/22.
 */
//页面初始化
$(function(){
    resizeImg();
});
//窗口变化时
$(window).resize(function(){
    resizeImg();
});
/*首页banner高度*/
function resizeImg() {
    var imgWidth = 1920;
    var imgHeight = 840;//定义图片默认宽高
    var winWidth = $(window).width();
    var winHeight = $(window).height() - $(".box").height();
    var widthRatio = winWidth / imgWidth;//window宽度与图片宽度之比
    var heightRatio = winHeight / imgHeight;//window高度与图片高度之比
    var widthDiff = heightRatio * imgWidth;
    var heightDiff = widthRatio * imgHeight;
    $(".banner").height(winHeight);

    if (heightDiff > winHeight) {
        $("#bannerImg").css({
            width: '100%',
            height: heightDiff + 'px'
        });
    } else {
        $("#bannerImg").css({
            width: widthDiff + 'px',
            height: winHeight + 'px'
        });
    }
}
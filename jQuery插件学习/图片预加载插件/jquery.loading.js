/**
 * Created by 张铭纹 on 2016/12/29.
 */
jQuery.fn.beforeload= function(options) {
    options = $.extend({
        src: ""
    }, options);
    var self = this;
    self.hide();
    var img = new Image();//创建一个img对象 等同于$('<img>')
    // console.log(img);
    $(img).load(function() {
        self.attr("src", options.src);
        self.fadeIn("slow");
    }).attr("src", options.src);
    return self;
};
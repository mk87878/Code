/**
 * Created by 张铭纹 on 2016/12/2.
 */
window.onload = function () {
    waterFall('main','pin');//调用瀑布流方式显示

    var dataInt = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '3.jpg'}, {'src': '4.jpg'}]};//模拟获取到的数据

    window.onscroll = function () {
        if (checkScrollSlide('main','pin')) {
            var oParent = document.getElementById('main');//定位到id为main的div
            //将数据渲染到页面尾部
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className= 'pin';
                oParent.appendChild(oBox);//放入main父元素内部最后面
                var oPic = document.createElement('div');
                oPic.className= 'box';
                oBox.appendChild(oPic);//放入pin父元素内部
                var oImg = document.createElement('img');
                oImg.src = './images/' + dataInt.data[i].src;//拼接图片地址
                oPic.appendChild(oImg);
            }
            waterFall('main','pin');//调用瀑布流方式显示
        }

    }
};



/*
 瀑布流显示
 parend 父级id
 pin 元素id
 */
function waterFall(parent,box) {
    var oParent = document.getElementById(parent);//定位到id为main的div
    var oBoxs = getByClass(oParent, box);//获取到所有的的瀑布流盒子div元素
    // console.log(oBoxs.length);
    //计算整个页面可以摆下多少列
    var oboxW = oBoxs[0].offsetWidth;//获取瀑布流每个元素块的宽度
    // console.log(oboxW);
    var cols = Math.floor(document.documentElement.clientWidth / oboxW);//计算整个页面可以摆下多少列（并取整数
    // console.log(cols);
    oParent.style.cssText = 'width:' + oboxW * cols + 'px;margin: 0 auto;';//设置瀑布流盒子的宽度，并居中
    //整理瀑布流盒子位置
    var hArr = [];//存入第一行每个盒子高度
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);//存入第一行每个盒子高度
        } else {
            var minH = Math.min.apply(null, hArr);//获取高度最小值
            // console.log(minH);
            var index = getMinIndex(hArr, minH);//获取高度最小值索引
            // console.log(index);

            //把下一行第一张图放到第一行高度最小值盒子的下方
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';

            hArr[index] += oBoxs[i].offsetHeight;//替换第一行高度最小值=高度最小值盒子高度+新拼接在下方的盒子的高度
        }
    }
    // console.log(hArr);//显示盒子每列高度
}

//获取到所有的的瀑布流盒子div元素
function getByClass(parent, clsName) {
    var boxArr = [];
    oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
//获取高度最小值索引
function getMinIndex(arr, val) {
    console.log(arr);
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}


/*
 检查是否滚动到可以加载数据内容的位置
 parend 父级id
 pin 元素id
 */
function checkScrollSlide(parent,box) {
    var oParent = document.getElementById(parent);//定位到id为main的div
    var oBoxs = getByClass(oParent, box);//获取到所有的的瀑布流盒子div元素
    var lastBox = oBoxs.length - 1;//获取当前div显示的最后一个box的索引
    var lastBoxH = oBoxs[lastBox].offsetTop + Math.floor(oBoxs[lastBox].offsetHeight/2);//获取当前div显示的最后一个box的高度一半+当前盒子到最顶部的高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//当前页面滑动后隐藏掉的内容的高度（兼容性写法
    // console.log(scrollTop);
    var height = document.body.clientHeight || document.documentElement.clientHeight;//当前窗口可视区域的高度（兼容性写法
    // console.log(height);
    return (lastBoxH < scrollTop + height) ? true : false;//到达指定高度后 返回true，触发waterFall()函数
}

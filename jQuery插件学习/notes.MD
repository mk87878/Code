jQuery插件制作
==========

###支持链式调用 

我们都知道jQuery一个时常优雅的特性是支持链式调用，选择好DOM元素后可以不断地调用其他方法。 
要让插件不打破这种链式调用，只需return一下即可。 

    $.fn.myPlugin = function() {    
    //在这里面,this指的是用jQuery选中的元素    
    this.css('color', 'red');  
      
    return this.each(function() {        
    //对每个元素进行操作        
    $(this).append(' ' + $(this).attr('href'));    
    });
    } 

###让插件接收参数 

一个强劲的插件是可以让使用者随意定制的，这要求我们提供在编写插件时就要考虑得全面些，尽量提供合适的参数。 

比如现在我们不想让链接只变成红色，我们让插件的使用者自己定义显示什么颜色，要做到这一点很方便，只需要使用者在调用的时候传入一个参数即可。同时我们在插件的代码里面接收。另一方面，为了灵活，使用者可以不传递参数，插件里面会给出参数的默认值。 

在处理插件参数的接收上，通常使用jQuery的extend方法，上面也提到过，但那是给extend方法传递单个对象的情况下，这个对象会合并到jQuery身上，所以在这次介绍中就在jQuery身上调用新合并对象里包含的方法了，像上面的例子。当给extend方法传递一个以上的参数时，它会将所有参数对象合并到第一个里。同时，如果对象中有同名属性时，合并的时候后面的会覆盖前面的。 

利用这一点，我们可以在插件里定义一个保存插件参数默认值的对象，同时将接收来的参数对象合并到默认对象上，最后就实现了用户指定了值的参数使用指定的值，未指定的参数使用插件默认值。 

为了演示方便，再指定一个参数fontSize，允许调用插件的时候设置字体大小。 

    $.fn.myPlugin = function(options) {
        var defaults = {        
        'color': 'red',        
        'fontSize': '12px'    
        };    
        var settings = $.extend(defaults, options);    
        return this.css({        
        'color': settings.color,        
        'fontSize': settings.fontSize    
        });
        } 
现在，我们调用的时候指定颜色，字体大小未指定，会运用插件里的默认值12px。 

    $('a').myPlugin({    
    'color': '#2C9929'
    }); 

同时指定颜色与字体大小： 

    $('a').myPlugin({    
    'color': '#2C9929',    
    'fontSize': '20px'
    }); 


###保护好默认参数 

注意到上面代码调用extend时会将defaults的值改变，这样不好，因为它作为插件因有的一些东西应该维持原样，另外就是如果你在后续代码中还要使用这些默认值的话，当你再次访问它时它已经被用户传进来的参数更改了。 

一个好的做法是将一个新的空对象做为$.extend的第一个参数，defaults和用户传递的参数对象紧随其后，这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。 

    $.fn.myPlugin = function(options) {
        var defaults = {
                'color': 'red',
                'fontSize': '12px'
                };    
        var settings = $.extend({},defaults, options);//将一个空对象做为第一个参数    
        return this.css({        
        'color': settings.color,        
        'fontSize': settings.fontSize    
        });
    }
                 
到此，插件可以接收和处理参数后，就可以编写出更健壮而灵活的插件了。若要编写一个复杂的插件，代码量会很大，如何组织代码就成了一个需要面临的问题，没有一个好的方式来组织这些代码，整体感觉会杂乱无章，同时也不好维护，所以将插件的所有方法属性包装到一个对象上，用面向对象的思维来进行开发，无疑会使工作轻松很多。 

###面向对象的插件开发 

为什么要有面向对象的思维，因为如果不这样，你可能需要一个方法的时候就去定义一个function，当需要另外一个方法的时候，再去随便定义一个function，同样，需要一个变量的时候，毫无规则地定义一些散落在代码各处的变量。 

还是老问题，不方便维护，也不够清晰。当然，这些问题在代码规模较小时是体现不出来的。 

如果将需要的重要变量定义到对象的属性上，函数变成对象的方法，当我们需要的时候通过对象来获取，一来方便管理，二来不会影响外部命名空间，因为所有这些变量名还有方法名都是在对象内部。 

接着上面的例子，我们可以把这个插件抽象成一个美化页面的对象，因为他的功能是设置颜色啊字体啊什么的，当然我们还可以加入其他功能比如设置下划线啊什么的。当然对于这个例子抽象成对象有点小题大做，这里仅作演示用。以后我可能会介绍我编写的一个jQuery插件SlipHover,其中代码就比较多，这样的模式就用得上了。 

所以我们新建一个对象命名为Beautifier，然后教大家在插件里使用这个对象来编码。 

    
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration':'none'
        };
        this.options = $.extend({}, this.defaults, opt)};
        /*
        把$.fn.hilight.defaults的属性和options的属性复制到一个空的对象里,并返回这个对象.
        (浅度复制,后面的同名属性会覆盖前面的). 
        */
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }};
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体    
        var beautifier = new Beautifier(this, options);
        //调用其方法    
        return beautifier.beautify();
    };
    
通过上面这样一改造，我们的代码变得更面向对象了，也更好维护和理解，以后要加新功能新方法，只需向对象添加新变量及方法即可，然后在插件里实例化后即可调用新添加的东西。 

插件的调用还是一样的，我们对代码的改动并不影响插件其他地方，只是将代码的组织结构改动了而以。 


    $(function() {    
        $('a').myPlugin({        
            'color': '#2C9929',        
            'fontSize': '20px'    
        });
    });

指定文字带下划线（我们在Beautifier对象中新加的功能，默认不带下划线，如上面的例子）的调用： 

    $(function() {    
        $('a').myPlugin({        
            'color': '#2C9929',        
            'fontSize': '20px',        
            'textDecoration': 'underline'    
        });
    });

到这里，你可以更好地编写复杂的插件同时很好地组织代码了。当我们回头去看上面的代码时，其实也还是有改进空间的。也就是下面介绍的关于命名空间及变量各什么的，一些杂项。 

###关于命名空间 

不仅仅是jQuery插件的开发，我们在写任何JS代码时都应该注意的一点是不要污染全局命名空间。因为随着你代码的增多，如果有意无意在全局范围内定义一些变量的话，最后很难维护，也容易跟别人写的代码有冲突。 

比如你在代码中向全局window对象添加了一个变量status用于存放状态，同时页面中引用了另一个别人写的库，也向全局添加了这样一个同名变量，最后的结果肯定不是你想要的。所以不到万不得已，一般我们不会将变量定义成全局的。 

一个好的做法是始终用自调用匿名函数包裹你的代码，这样就可以完全放心，安全地将它用于任何地方了，绝对没有冲突。 

用自调用匿名函数包裹你的代码 

我们知道JavaScript中无法用花括号方便地创建作用域，但函数却可以形成一个作用域，域内的代码是无法被外界访问的。如果我们将自己的代码放入一个函数中，那么就不会污染全局命名空间，同时不会和别的代码冲突。 

如上面我们定义了一个Beautifier全局变量，它会被附到全局的window对象上，为了防止这种事情发生，你或许会说，把所有代码放到jQuery的插件定义代码里面去啊，也就是放到$.fn.myPlugin里面。这样做倒也是种选择。但会让我们实际跟插件定义有关的代码变得臃肿，而在$.fn.myPlugin里面我们其实应该更专注于插件的调用，以及如何与jQuery互动。 



> [文章出处传送门][1] 文章为方便自己，有部分修改

[1]: http://www.iteye.com/topic/1144813
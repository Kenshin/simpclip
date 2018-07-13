webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Notify) {'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(6);
	
	console.log("=== simpclip contentscripts load ===");
	
	var root = 'simpclip',
	    $body = $('body'),
	    google = '<svg t="1531450684775" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1048" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M518.848 449.152l414.272 0q6.848 38.272 6.848 73.152 0 124-52 221.44t-148.288 152.288-220.864 54.848q-89.728 0-170.848-34.56t-140-93.44-93.44-140-34.56-170.848 34.56-170.848 93.44-140 140-93.44 170.848-34.56q171.424 0 294.272 114.848l-119.424 114.848q-70.272-68-174.848-68-73.728 0-136.288 37.152t-99.136 100.864-36.576 139.136 36.576 139.136 99.136 100.864 136.288 37.152q49.728 0 91.424-13.728t68.576-34.272 46.848-46.848 29.44-49.728 12.864-44.576l-249.152 0 0-150.848z" p-id="1049" fill="#ffffff"></path></svg>',
	    bing = '<svg t="1531450907872" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3129" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M153.813333 0L358.4 71.936V791.893333l288.128-166.186666-141.226667-66.346667-89.173333-221.866667 453.973333 159.488v231.893334L358.528 1024l-204.672-113.92V0z" fill="#ffffff" p-id="3130"></path></svg>',
	    baidu = '<svg t="1531450985988" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3618" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z" p-id="3619" fill="#ffffff"></path></svg>',
	    wiki = '<svg t="1531451085368" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4153" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M638.72 808.533333 529.493333 551.253333C485.973333 636.16 438.186667 725.333333 397.226667 808.533333 396.8 808.96 377.173333 808.533333 377.173333 808.533333 314.453333 661.333333 249.6 516.266667 186.453333 370.346667 171.946667 334.506667 120.746667 277.333333 85.333333 277.333333 85.333333 273.066667 85.333333 263.68 85.333333 258.133333L301.226667 258.133333 301.226667 277.333333C275.626667 277.333333 232.106667 294.4 243.2 322.133333 273.92 387.84 381.44 642.56 410.88 707.413333 430.933333 667.306667 487.68 561.493333 512 516.693333 492.8 479.146667 432.213333 338.346667 414.293333 303.36 400.64 280.32 366.08 277.333333 339.626667 277.333333 339.626667 270.933333 340.053333 266.666667 339.626667 258.56L529.92 258.986667 529.92 276.053333C503.893333 277.333333 479.573333 286.293333 490.666667 311.04 516.266667 363.946667 531.2 401.92 554.666667 450.986667 561.92 436.48 600.32 357.546667 618.666667 316.16 629.76 288.426667 613.12 277.333333 567.04 277.333333 567.466667 272.213333 567.466667 263.253333 567.466667 258.986667 626.773333 258.56 715.946667 258.56 731.733333 258.133333L731.733333 276.053333C701.44 277.333333 670.293333 293.546667 654.08 318.293333L576 482.133333C583.68 503.893333 659.626667 672.426667 667.733333 691.2L832 314.453333C819.2 283.733333 782.506667 277.333333 768 277.333333 768 271.786667 768 264.533333 768 258.133333L938.666667 259.413333 938.666667 260.266667 938.666667 277.333333C901.12 277.333333 877.653333 298.666667 864 330.666667 829.866667 407.04 725.333333 650.24 657.066667 808.533333 657.066667 808.533333 638.72 808.533333 638.72 808.533333Z" p-id="4154" fill="#ffffff"></path></svg>',
	    baike = '<svg t="1531451135912" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4457" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M959.562409 923.105079 862.333994 248.89672c-5.554506-38.291095-25.688055-72.128761-56.69014-95.277994-31.004131-23.149233-69.165266-32.838919-107.457384-27.285436s-72.129784 25.687032-95.279017 56.69014c-11.220552 15.027252-19.268856 31.739888-23.961738 49.330522l0-26.857694c0-79.874165-64.98199-144.856156-144.856156-144.856156-46.315862 0-87.621617 21.852704-114.15697 55.785537-26.535353-33.932834-67.841108-55.785537-114.15697-55.785537-79.874165 0-144.856156 64.98199-144.856156 144.856156l0 722.06225c0 2.119267 0.214894 4.188392 0.623193 6.186909 2.862187 13.988596 15.240099 24.512277 30.075992 24.512277l228.313939 0 228.313939 0 379.860471 0c0.833995 0 1.657756-0.042979 2.474354-0.10847 8.388041-0.38374 16.277732-4.185322 21.801539-10.562567C958.213691 940.854325 960.833355 931.921885 959.562409 923.105079zM652.104945 219.757053c13.33675-17.862833 32.832779-29.462009 54.895261-32.660864s44.048215 2.38328 61.910025 15.72003c17.862833 13.33675 29.462009 32.831756 32.658817 54.869678l92.164073 639.102816-160.566976 0-96.804766-615.279225C633.210619 259.500219 638.798894 237.576907 652.104945 219.757053zM671.022807 896.858298l-92.077092 0L578.945715 311.621297 671.022807 896.858298zM122.317837 205.495234c0-46.01808 37.438681-83.457784 83.457784-83.457784s83.457784 37.438681 83.457784 83.457784l0 691.363064L122.317837 896.858298 122.317837 205.495234zM350.631776 896.858298 350.631776 205.495234c0-46.01808 37.438681-83.457784 83.457784-83.457784s83.457784 37.438681 83.457784 83.457784l0 691.363064L350.631776 896.858298z" p-id="4458" fill="#ffffff"></path></svg>',
	    copy = '<svg t="1531451244469" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5231" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M704 640l256 0 0 355.968C960 1011.392 947.392 1024 931.968 1024L476.032 1024C460.608 1024 448 1011.392 448 995.968L448 412.032C448 396.608 460.608 384 479.168 384L704 384 704 640zM768 389.376 768 576l192 0-182.464-186.624L768 389.376zM448 69.376 448 192l128 0L457.536 69.376 448 69.376zM384 320l192 0L576 256 384 256 384 64 95.168 64C76.608 64 64 76.608 64 92.032l0 644.8c0 15.424 12.608 28.032 28.032 28.032L384 764.864 384 320z" p-id="5232" fill="#ffffff"></path></svg>';
	
	$body.on("click", clickEventHandler);
	
	/**
	 * mouse up event handler
	 */
	function clickEventHandler(event) {
	    var m_word = String(window.getSelection());
	    m_word = m_word.replace(/^\s*/, "").replace(/\s*$/, "");
	    if (m_word == "") $body.find('simpclip').length > 0 && remove();else {
	        $body.find('simpclip').length > 0 && $(root).remove();
	        create(event, m_word);
	    }
	}
	
	/**
	 * create search box
	 */
	function create(event, m_word) {
	    var _dict_x = event.clientX + window.scrollX + 5,
	        _dict_y = event.clientY + window.scrollY + 10,
	        tmpl = '<simpclip style="left: ' + _dict_x + 'px; top: ' + _dict_y + 'px;">\n                        <simpclip-a data-href="https://www.google.com/search?q=">' + google + '</simpclip-a>\n                        <simpclip-a data-href="https://cn.bing.com/search?q=">' + bing + '</simpclip-a>\n                        <simpclip-a data-href="https://www.baidu.com/s?wd=">' + baidu + '</simpclip-a>\n                        <simpclip-a data-href="https://zh.wikipedia.org/wiki/">' + wiki + '</simpclip-a>\n                        <simpclip-a data-href="https://baike.baidu.com/item/">' + baike + '</simpclip-a>\n                        <simpclip-a data-href="copy">' + copy + '</simpclip-a>\n                    </simpclip>';
	
	    //add dict icon box to body
	    $body.append(tmpl);
	    setTimeout(function () {
	        return $(root).animate({ opacity: 1 }, { duration: 100 });
	    }, 100);
	    $(root).on('click', 'simpclip-a', function (event) {
	        var tag = event.target.tagName.toLowerCase(),
	            href = event.target.dataset.href,
	            target = event.target;
	        while (tag != 'simpclip-a') {
	            target = target.parentElement;
	            tag = target.tagName.toLowerCase();
	            href = target.dataset.href;
	        }
	        if (href == "copy") {
	            var _copy = function _copy(text) {
	                var $temp = $("<textarea>"),
	                    brRegex = /<br\s*[\/]?>/gi;
	                $body.append($temp);
	                $temp.val(text.replace(brRegex, "\r\n")).select();
	                var result = document.execCommand("copy");
	                $temp.remove();
	                return result;
	            };
	            var result = _copy(m_word);
	            result && new Notify().Render("已成功复制到剪切板。");
	        } else {
	            var $a = $('<a style="display:none" href="' + (href + encodeURI(m_word)) + '" target="_blank"></a>').appendTo("body");
	            $a[0].click();
	            $a.remove();
	        }
	    });
	}
	
	/**
	 * remove dict box
	 */
	function remove() {
	    $(root).animate({ opacity: 0 }, { duration: 300, complete: function complete() {
	            $(root).remove();
	        } });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	/*
	* Options:
	* - title   ( string, optional, if value is "" not show.)
	*
	* - content ( string, required)
	*
	* - type    ( int, NORMAL/SUCCESS/WARING/ERROR)
	*           ( optional, default is NORMAL )
	*
	* - mode    ( string, toast/modal/snackbar)
	*           ( optional, default is toast )
	*
	* - delay   ( boolean, optional )
	*           ( default is 1000 * 5 )
	*
	* - icon    ( string,  optional )
	*
	* - action  ( string,  optional )
	* - callback( func,    optional )
	*           ( when action != "" must set callback )
	*
	* Param:
	* - string：
	*   - 1：content
	*   - 2：type content or title content
	*
	* - object
	*   - { type: xxx, title: xxx, content: xxx, mode: xxx, icon: xxx, delay: 500, action: xxx, callback:()=>{xxxx} }
	*
	* Example:
	* new Notify().Render( "一个参数的 toast" );
	* new Notify().Render( 0, "两个参数的 toast" );
	* new Notify().Render( 1, "两个参数的 toast" );
	* new Notify().Render( 2, "两个参数的 toast" );
	* new Notify().Render( 3, "两个参数的 toast" );
	* new Notify().Render( "snackbar", "两个参数的 snackbar" );
	* new Notify().Render( "三个参数的 callback", "undo", ()=>{console.log("bbbbbb")} );
	* new Notify().Render( "snackbar", "四个参数的 snackbar callback", "undo", ()=>{console.log("rrrrrr")} );
	* new Notify().Render( "SimpTab 版本提示", `已更新到最新版本，详细请看 <a>CHANGELOG</a>` );
	* new Notify().Render({ content: "带 icon 的 toast", icon: "<path>/weight_icon.png" } );
	* new Notify().Render({ content: "带 delay 的 toast", delay: 10000 } );
	* new Notify().Render({ content: "带 icon 的 snackbar", icon: "<path>/fontsize_icon.png" });
	* new Notify().Render({ content: "带 callback 的 toast", icon: "<path>/icon.png", mode: "snackbar", action: "提交", callback: ()=>{console.log("dddddddd")}} );
	* new Notify().Render( "错误的 callback", "undo", '()=>{console.log("eeeeeeee")}' );
	* new Notify().Render({ content: "带确认的 toast", action: "提交", cancel: "取消", callback: type => {
	     console.log( "current type is", type )
	  }});
	  new Notify().Render({ content: "一直存在带 close 的 toast", state: "holdon" });
	*
	  const notify = new Notify().Render({ content: "加载中，请稍等...", state: "loading" });
	  setTimeout( ()=>{
	    notify.complete();
	    new Notify().Render("加载完成！");
	  }, 2000);
	* Notify.Position = rt( default ) | rb | lt | lb
	*
	*/
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Notify = function () {
	    var VERSION = "2.0.1",
	        name = "notify",
	        root = "notify-gp",
	        roottmpl = "<" + root + ">",
	        num = 0,
	        NORMAL = 0,
	        SUCCESS = 1,
	        WARNING = 2,
	        ERROR = 3,
	        MODE = {
	        toast: "toast",
	        modal: "modal",
	        snackbar: "snackbar"
	    },
	        STATE = {
	        loading: "loading",
	        holdon: "holdon"
	    },
	        POSITION = {
	        lefttop: "lt",
	        leftbottom: "lb",
	        rightbottom: "rb"
	    },
	        options = {
	        version: VERSION,
	        title: "",
	        content: "",
	        type: NORMAL,
	        mode: MODE.toast,
	        state: undefined,
	        flat: false,
	        delay: 1000 * 5,
	        icon: "",
	        action: "",
	        cancel: "",
	        callback: undefined,
	        complete: undefined
	    },
	        timer = {},
	        $root,
	        TMPL = '\
	        <notify>\
	            <notify-a href="javascript:;"><notify-span></notify-span></notify-a>\
	            <notify-i></notify-i>\
	            <notify-title></notify-title>\
	            <notify-content></notify-content>\
	            <notify-action></notify-action>\
	            <notify-cancel></notify-cancel>\
	        </notify>',
	        loading = '\
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling">\
	                <circle stroke="#fff" stroke-width="10" cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" r="30" stroke-dasharray="141.37166941154067 49.12388980384689" transform="rotate(102 50 50)">\
	                    <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>\
	                </circle>\
	            </svg>',
	        prefix = function prefix(value) {
	        return name + "-" + value;
	    },
	        registyElement = function registyElement(name, elements) {
	        elements.forEach(function (item) {
	            document.createElement(prefix(item));
	        });
	    },
	        closeHandle = function closeHandle(event) {
	        $root.off("click", "." + event.data + " notify-a", closeHandle);
	        hidden($(this).parent());
	    },
	        delayHandler = function delayHandler(item) {
	        clearTimeout(timer[item]);
	        delete timer[item];
	        hidden(this);
	    },
	        callbackHander = function callbackHander(event) {
	        event.data[1] && event.data[1](event.data[2]);
	        $root.off("click", "." + event.data[0] + " notify-action", callbackHander);
	        hidden($(this).parent());
	    },
	        completeHandler = function completeHandler() {
	        hidden(this);
	    },
	        hidden = function hidden(target) {
	        target.addClass("notify-hide").slideUp(500, function () {
	            target.remove();
	            if ($root.children().length === 0) $root.css("z-index", 0);
	        });
	    },
	        render = function render() {
	        var $target = $(TMPL),
	            $title = $target.find(prefix("title")),
	            $content = $target.find(prefix("content")),
	            $close = $target.find(prefix("a")),
	            $icon = $target.find(prefix("i")),
	            $action = $target.find(prefix("action")),
	            $cancel = $target.find(prefix("cancel")),
	            item = "notify-item-" + num++,
	            position = this.constructor.Position;
	
	        this.title ? $title.text(this.title) : $title.hide();
	        this.content ? $content.html(this.content) : $content.hide();
	
	        if (this.mode === MODE.modal) {
	            $target.addClass("notify-modal");
	            $content.addClass("notify-modal-content");
	            $root.on("click", "." + item + " notify-a", item, closeHandle);
	        } else {
	            $close.hide();
	            this.mode == MODE.snackbar && $target.addClass("notify-snackbar");
	        }
	
	        this.mode !== MODE.modal && this.icon !== "" && $icon.css({ "background-image": "url(" + this.icon + ")", "display": "block" });
	
	        switch (this.type) {
	            case 1:
	                $content.addClass("notify-success");
	                break;
	            case 2:
	                $content.addClass("notify-warning");
	                break;
	            case 3:
	                $content.addClass("notify-error");
	                break;
	        }
	
	        if (this.action !== "" && this.callback && typeof this.callback == "function") {
	            $content.css("width", "100%");
	            $action.text(this.action).css("display", "block");
	            $root.on("click", "." + item + " notify-action", [item, this.callback, "action"], callbackHander);
	        }
	
	        if (this.cancel !== "" && this.callback && typeof this.callback == "function") {
	            $content.css("width", "100%");
	            $cancel.text(this.cancel).css("display", "block");
	            $root.on("click", "." + item + " notify-cancel", [item, this.callback, "cancel"], callbackHander);
	        }
	
	        this.mode !== MODE.modal && this.state !== STATE.loading && this.state !== STATE.holdon && (this.action == "" || !this.callback || typeof this.callback != "function") && (timer[item] = setTimeout(delayHandler.bind($target, item), this.delay));
	
	        if (this.state == STATE.loading) {
	            $icon.html(loading);
	            $icon.css({ display: "block" });
	            this.complete = completeHandler.bind($target);
	        }
	
	        if (this.state == STATE.holdon) {
	            $icon.css({ display: "block" }).addClass("holdon");
	            $cancel.after($icon[0].outerHTML);
	            $target.find("notify-i:first").remove();
	            $root.on("click", "." + item + " notify-i", [item, this.callback, "holdon"], callbackHander);
	            if (!this.action || !this.cancel) $content.css({ width: "100%" });
	        }
	
	        if (this.flat) {
	            $target.css({ "box-shadow": "none", "border-radius": "2px" });
	        }
	
	        if (position == POSITION.rightbottom || position == POSITION.leftbottom) {
	            $target.css({ "transform-origin": "left bottom 0px" });
	            $root.addClass("notify-position-" + position + "-corner");
	        } else if (position == POSITION.lefttop) {
	            $root.addClass("notify-position-" + position + "-corner");
	        }
	
	        $target.addClass(item);
	        $root.append($target).css("z-index", 2147483647);
	        this.mode == MODE.snackbar && $target.css("margin-left", "-" + $target.width() / 2 + "px");
	        setTimeout(function () {
	            $target.addClass("notify-show");
	        }, 200);
	    };
	
	    function Notify() {
	        registyElement(name, ["gp", "div", "a", "span", "title", "content", "i"]);
	        if ($("html").find(root).length == 0) {
	            $("html").append(roottmpl);
	            $root = $(root);
	        }
	    }
	
	    Notify.prototype.title = options.title;
	    Notify.prototype.content = options.content;
	    Notify.prototype.type = options.type;
	    Notify.prototype.mode = options.mode;
	    Notify.prototype.state = options.state;
	    Notify.prototype.delay = options.delay;
	    Notify.prototype.icon = options.icon;
	    Notify.prototype.flat = options.flat;
	    Notify.prototype.action = options.action;
	    Notify.prototype.cancel = options.cancel;
	    Notify.prototype.callback = options.callback;
	    Notify.prototype.complete = options.complete;
	    Notify.Position = undefined;
	
	    Notify.prototype.Render = function () {
	
	        var self = this;
	
	        if (arguments.length === 1 && _typeof(arguments[0]) === "object") {
	            options = arguments[0];
	
	            Object.keys(options).forEach(function (item) {
	                self[item] = options[item];
	            });
	
	            render.bind(self)();
	        } else if (_typeof(arguments[0]) !== "object" && arguments.length > 0 && arguments.length < 5) {
	            switch (arguments.length) {
	                case 1:
	                    this.content = arguments[0];
	                    break;
	                case 2:
	                    if (arguments[0] == MODE.snackbar) {
	                        this.mode = arguments[0];
	                    } else if (typeof arguments[0] == "number") {
	                        this.type = arguments[0];
	                    } else {
	                        this.mode = MODE.modal, this.title = arguments[0];
	                    }
	                    this.content = arguments[1];
	                    break;
	                case 3:
	                    this.content = arguments[0];
	                    this.action = arguments[1];
	                    this.callback = arguments[2];
	                    break;
	                case 4:
	                    if (arguments[0] == MODE.snackbar) {
	                        this.mode = arguments[0];
	                        this.content = arguments[1];
	                        this.action = arguments[2];
	                        this.callback = arguments[3];
	                    }
	                    break;
	            }
	            render.bind(self)();
	        } else {
	            console.error("Arguments error", arguments);
	        }
	        return self;
	    };
	
	    Notify.prototype.Clone = function () {
	        return new Notify();
	    };
	
	    return Notify;
	}();
	
	module.exports = Notify;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./main.styl", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./main.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Golbal style\n */\n.simpclip-font {\n  font: 300 16px/1.8 -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\n  color: #333;\n  text-rendering: optimizelegibility;\n  -webkit-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n}\nsimpclip {\n  position: absolute;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: box;\n  display: flex;\n  -webkit-box-align: center;\n  -moz-box-align: center;\n  -o-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  margin: 5px;\n  padding: 0 5px;\n  color: rgba(255,255,255,0.9);\n  background-color: #323232;\n  font-size: 15px;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 2px 5px rgba(0,0,0,0.26);\n  box-shadow: 0 2px 5px rgba(0,0,0,0.26);\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n}\nsimpclip-a {\n  margin: 5px;\n  color: inherit;\n  cursor: pointer;\n}\n", ""]);
	
	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./notify.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./notify.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "\n/*\n* Notify Group\n*/\nnotify-gp {\n    font: 300 14px -apple-system, PingFang SC, Microsoft Yahei, Lantinghei SC, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;\n    text-rendering: optimizelegibility;\n    -webkit-text-size-adjust: 100%;\n    -webkit-font-smoothing: antialiased;\n\n    display: -webkit-flex;\n    flex-flow: column nowrap;\n    align-items: flex-end;\n\n    position: fixed;\n\n    top: 0;\n    right: 0;\n\n    margin: 0 15px 0 0;\n    padding: 0;\n\n    text-transform: none;\n\n    pointer-events: none;\n}\n\nnotify-gp notify {\n    display: -webkit-flex;\n    align-items: center;\n\n    margin: 0;\n    margin-top: 15px;\n    padding: 14px 24px;\n\n    min-width: 288px;\n    max-width: 568px;\n\n    height: 48px;\n    max-height: 48px;\n\n    color: rgba(255, 255, 255, .7);\n    background-color: rgba(50, 50, 50, 1);\n\n    box-sizing: border-box;\n    border-radius: 4px;\n    pointer-events: auto;\n    user-select: none;\n\n    opacity: 0;\n    transform: scaleY(0);\n    transform-origin: left top 0px;\n    transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;\n\n    box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149);\n}\n\nnotify-gp notify-title {\n    font-size: 13px;\n    font-weight: bold;\n}\n\nnotify-gp notify-content {\n    display: block;\n\n    font-size: 14px;\n    text-align: left;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\nnotify-gp notify-content a,\nnotify-gp notify-content a:link,\nnotify-gp notify-content a:visited,\nnotify-gp notify-content a:active {\n    margin: inherit;\n    padding-bottom: 5px;\n\n    color: #fff;\n    font-size: inherit;\n\n    text-decoration: none;\n\n    transition: color .5s;\n}\n\nnotify-gp notify-content a:hover {\n    margin: initial;\n    padding: initial;\n\n    color: inherit;\n    font-size: inherit;\n\n    text-decoration: none;\n}\n\nnotify-gp notify-i {\n    display: none;\n\n    margin: 0 10px 0 0;\n\n    width: 24px;\n    height: 24px;\n\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\nnotify-gp notify-action,\nnotify-gp notify-cancel {\n    display: none;\n\n    margin: 0 0 0 24px;\n\n    max-width: 80px;\n    min-width: 56px;\n\n    color: #8ab4f8;\n\n    font-weight: 500;\n    font-size: inherit;\n    text-transform: uppercase;\n    text-align: right;\n\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    cursor: pointer;\n}\n\nnotify-gp notify-cancel {\n    margin: 0;\n}\n\nnotify-gp notify-a {\n    display: block;\n    position: absolute;\n\n    top: 5px;\n    right: 5px;\n\n    cursor: pointer;\n}\n\nnotify-gp notify-a notify-span {\n    display: block;\n    width: 16px;\n    height: 16px;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABpFBMVEUAAADl5eXj4+NSVFRTVVVaXFxLTU1hY2NdX18pLCwhJCSdnp5sbm6HiYmjpKSDhYX///+rrKytrq6XmJgzNTUoKyt3eXlydHRlZ2dbXV1ucHB4enrv7++KjIyIiort7e1oamosLy8aHR0VGBgUFxcbHh4rLi5oamprbGwgIyMKDQ0KDQ0iJSVjZWWfoaEkJiYICwsLDg4KDQ0MDw8iJSWMjo41ODgMDw8JDAw2OTkvMTELDg4LDg4xMzM1NzcJDAwLDg40NjYeISEHCgoeISFkZmYtLy8yNDRvcXEWGRkHCgoaHR3///8RFBQHCgohJCShoqLIyMgaHR0HCgoZGxv4+PgRFBQLDg4xMzOWl5eam5ssLi4bHh7///8fIiIJDAwwMzNzdHQXGhoeISFlZmYsLi4KDQ0gIiI6PDwOEREuMDAXGhoHCgodHx8pLCwNEBA1ODj///8nKSkICwsICwsJDAwnKSnZ2dl9fn4pKysNDw8OEREpLCxyc3ORkpIzNTUjJSUVGBgUFxcgIyM5PDyanJwEBwcDBwcDBgYFCAgGCQn///+5RDDmAAAAhnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUFAQU+i7S0jkAGEYrw8Y8SBIn++Pr3jQQ67fx8dvX6iWr27z+B/YsOcoMPdPiEAaL7iAgEcfWsA6D7iAkGcawDef2LDnOFD3T4gTLnfHb6iWrqNQJ4+ff7fQILd+ToewsCLHWZmXUwAyFsKwcAAAABYktHRBCVsg0sAAAAzElEQVQY02NgwAoYZWTl5JngXGYFRSVlFVU1dRYIn1VDU6sNCLR1dNlAfHY9fQNDw/YOI2MDE1MOoACnmbmFpZW1ja2dvYMjFwMDN4NTp7OLq5u7h6dXpzcDDwOvj29bm59/QGBQcFtbSCgfA79AWFtHeERkVLR1W1tMrCCDEENcZ3xCYlJySmpaZzqDMAODSEamRVZ2cE5unn1+gSjQFrHCIqNir7a2nJLSsnJxkEMkKiqrutrauqpraiUhTpWqq29obGpuaZVmIAYAAO06McffKEk8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTA0LTAzVDE3OjE4OjAzKzA4OjAwRdgB9wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMS0wNS0xOFQyMDowMTowMCswODowMB0r3XkAAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTcgUTE2IHg4Nl82NCAyMDE0LTAyLTI4IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnWaRffwAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTI4Q3xBgAAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxMjjQjRHdAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzMDU3MjAwNjArP9HVAAAAE3RFWHRUaHVtYjo6U2l6ZQAxLjAzS0JCZtQvXwAAAFx0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvZnRwLzE1MjAvZWFzeWljb24uY24vZWFzeWljb24uY24vY2RuLWltZy5lYXN5aWNvbi5jbi9wbmcvMTcvMTc4Ni5wbmcRsze7AAAAAElFTkSuQmCC);\n}\n\nnotify-gp notify-i.holdon {\n    display: block;\n    margin: 0 0 0 24px;\n\n    width: 20px;\n    height: 20px;\n\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAATUlEQVR4AWMYSuB/4P+V/1lRRFiBIoEYCoGC//+vAypFKFsHFFkJV4AsAVGKzsOjFFUZHqUElCGUwpRRrpCw1YQ9Qzh4SA5wwlE4hAAAiFGQefYhNJkAAAAASUVORK5CYII=);\n    cursor: pointer;\n}\n\nnotify-gp .notify-show {\n    opacity: 1;\n    transform: scaleY(1);\n}\n\nnotify-gp .notify-hide {\n    opacity: 0;\n    transform: scaleY(0);\n}\n\nnotify-gp .notify-success {\n    color: rgba(118, 255, 3, .8);\n}\n\nnotify-gp .notify-warning {\n    color: rgba(255, 238, 88, 1);\n}\n\nnotify-gp .notify-error {\n    color: rgba(239, 83, 80, 1);\n}\n\nnotify-gp .notify-modal {\n    flex-flow: column nowrap;\n    align-items: flex-start;\n\n    height: auto;\n    max-height: 200px;\n\n    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\n}\n\nnotify-gp .notify-modal .notify-modal-content {\n    margin-top: 5px;\n    font-size: 13px;\n    white-space: normal;\n}\n\nnotify-gp .notify-modal .notify-modal-content a {\n    margin: 0;\n    padding: 0;\n\n    color: inherit;\n\n    font-size: inherit;\n    text-decoration: underline;\n    \n    cursor: pointer;\n}\n\nnotify-gp .notify-modal .notify-modal-content a:hover,\nnotify-gp .notify-modal .notify-modal-content a:active,\nnotify-gp .notify-modal .notify-modal-content a:visited,\nnotify-gp .notify-modal .notify-modal-content a:focus {\n    color: inherit;\n}\n\nnotify-gp .notify-snackbar {\n    position: fixed;\n    bottom: 0;\n    left: 50%;\n    margin-bottom: 5px;\n    transform-origin: left bottom 0px;\n}\n\n.notify-position-lt-corner {\n    align-items: flex-start;\n\n    margin: 0 0 0 15px;\n\n    left: 0;\n    right: initial;\n}\n\n.notify-position-lb-corner {\n    flex-flow: column-reverse wrap-reverse;\n\n    margin: 0 0 15px 15px;\n\n    right: initial;\n    top: initial;\n\n    left: 0;\n    bottom: 0;\n}\n\n.notify-position-rb-corner {\n    flex-flow: column-reverse wrap-reverse;\n    align-items: flex-start;\n\n    margin: 0 15px 15px 0;\n\n    top: initial;\n    left: initial;\n\n    bottom: 0;\n    right: 0;\n}\n", ""]);
	
	// exports


/***/ })
]);
//# sourceMappingURL=contentscripts.js.map
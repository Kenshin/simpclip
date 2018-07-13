//当前是否鼠标为按下状态
var m_is_drag = true;
var m_word;
var m_is_dict_box_show = false;

//监听mousedown、mouseup event
$( "body" ).on( "mousedown", mousedownEventHandler );
$( "body" ).on( "mouseup", mouseupEventHandler );

/**
 * mouse down event handler
 */
function mousedownEventHandler( event ) {
	m_is_drag = true;
	if ( !m_is_dict_box_show ) removeDictIconBox();
}

/**
 * mouse up event handler
 */
function mouseupEventHandler( event ) {
	if ( m_is_dict_box_show ) return;
	if ( m_is_drag ) {
		createDictIconBox( event );
		m_is_drag = false;
	}
}

/**
 * create dict box
 */
function createDictIconBox( event ) {
	//获取选中的文字
	m_word = String( window.getSelection() );
	m_word = m_word.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	//m_word为空，退出
	if ( m_word == "" ) return;
	//获取当前鼠标位置
	var _dict_x = event.clientX + window.scrollX + 5;
	var _dict_y = event.clientY + window.scrollY + 10;
	//dict icon box html
	var dict_icon_box = '<div class="dict_icon_box" style="left: ' + _dict_x + 'px; top: ' + _dict_y + 'px; ">' + 
							'<img class="dict_icon" src="' + chrome.extension.getURL( "icon19.png" ) + '"/>' + 
						'</div>';

	//add dict icon box to body
	$( "body" ).append( dict_icon_box );
	//listener mouse out event
	$( ".dict_icon" ).on( "mouseout", function() {
		removeDictIconBox();
	});
	//listener mouse down event
	$( ".dict_icon" ).on( "mousedown", function() {
		m_is_dict_box_show = true;
		crateDictBox( _dict_x, _dict_y );
	});
}

/**
 * crate dict box
 * @param  {[String]} dict_x [鼠标的横向坐标]
 * @param  {[String]} dict_y [鼠标的纵向坐标]
 */
function crateDictBox( dict_x, dict_y ) {
	$.ajax( {
		type       : "GET",
		timeout    : 2000,
		url        : "http://fanyi.youdao.com/openapi.do",
		dataType   : "json",
		data       : "keyfrom=KS-Blog&key=263150855&type=data&doctype=json&version=1.1&q=" + encodeURIComponent( m_word ),
		beforeSend : function () {
			//remove dict icon box
			$( '.dict_icon_box' ).remove();
			//dict html
			var dict_box = '<div class="dict_box" style="left: ' + dict_x + 'px; top: ' + dict_y + 'px; " >' + 
								'<div id="dict_box_content">' + 
									'<center class="dict_box_top"><img src="' + chrome.extension.getURL( "stylesheets/loading.gif" ) + '" align="absmiddle"/>翻译中...</center>' + 
									'<div class="dict_box_middle"></div>' + 
								'</div>' + 
						   '</div>';
			//add dict icon box to body
			$( "body" ).append( dict_box );
		},
		success    : function( data ) {
			//print console log
			console.log( data )
			//set phonetic
			var phonetic = data.basic == undefined || data.basic.phonetic == undefined ? "" :  ' 【 ' + data.basic.phonetic + ' 】 ';
			//判断翻译内容是否为中文
			var trans;
			var reg = /[\u4E00-\u9FA5\uf900-\ufa2d]/ig;
			if ( reg.test( m_word )) trans = data.translation;
			else                     trans = m_word;
			//set aduio html
			var audio = '<div class="dict_audio_box"><embed wmode="transparent" src="http://cidian.youdao.com/chromeplus/voice.swf" loop="false" menu="false" quality="high" bgcolor="#ffffff" width="15" height="15" allowscriptaccess="sameDomain" flashvars="audio=http://dict.youdao.com/speech?audio=' + trans + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></div>';
			//dict_box_middle html
			var dict_box_middle =   '<div>' + 
										'<div class="dict_box_tabs">' + 
											'<span class="dict_box_tab">翻译</span>' + 
										'</div>' + 
										'<div class="dict_box_tab_trans">' + 
											data.translation + phonetic + audio + 
										'</div>' + 
									'</div>' +
									'<div>' + 
										'<div class="dict_box_tabs">' + 
											'<span class="dict_box_tab">百科</span>' + 
										'</div>' + 
										'<div class="dict_box_tab_trans">' + 
											'<a href="http://www.hudong.com/wiki/' + m_word + '" target="_blank">互动百科</a>' + 
											' | ' + 
											'<a href="http://zh.wikipedia.org/wiki/' + m_word + '" target="_blank">维基百科</a>' + 
											'<span id="baike"></span>' + 
										'</div>' + 
									'</div>' +
									'<div>' + 
										'<div class="dict_box_tabs">' + 
											'<span class="dict_box_tab">其他</span>' + 
										'</div>' + 
										'<div class="dict_box_tab_trans">' + 
											'<a href="http://dict.cn/' + m_word + '" target="_blank">详细翻译</a>' + 
											' | ' + 
											'<a href="http://www.baidu.com/s?wd=' + m_word + '" target="_blank">百度搜索</a>' + 
											' | ' + 
											'<a href="http://www.google.com.hk/search?sourceid=chrome&ie=UTF-8&q=' + m_word + '" target="_blank">谷歌搜索</a>' + 
										'</div>' + 
									'</div>';

			//fade dict_dox_top and show dict_box_middle
			$( '.dict_box_top' ).fadeOut( "slow", function () {
				//add dict icon box to body
				$( ".dict_box_middle" ).append( dict_box_middle );
				//listener mouse leave event
				$( ".dict_box" ).on( "mouseleave", function() {
					removeDictBox();
				});
				//show dict_box_middle
				$( ".dict_box_middle" ).fadeIn( "slow", function () {
					//get baidu baike result
					$.get( "http://www.youdao.com/search?lq=hel&ue=utf8&T1=1330239012129&keyfrom=web.top&q=" + encodeURIComponent( m_word ), function ( data ) {
						//去掉?hold=redirect
						data      = data.replace( /\?hold=redirect/g, '' );
						//获取http://baike.baidu.com/view/的起始位置
						var tmp   = data.search( /http:\/\/baike.baidu.com\/view\// );
						//从起始位置开始截取
						data      = data.substr( tmp );
						//获取" id="hitURL的位置
						var tmp2  = data.search( /" id="hitURL/ );
						//从起始位置开始截取
						var baike = data.substring( 0, tmp2 );

						var baike_html = "";

						if ( baike !== "" ) {
							baike_html = ' | <a href="' + baike + '" target="_blank">百度百科</a>';
							$( "#baike" ).html( baike_html );
						}
					});
				});
			})

		},
		error : function( XMLHttpRequest, textStatus, errorThrown ) {
			if (  textStatus == "parsererror" ) {
				$( ".dict_box_top" ).html( '翻译『' + m_word + '』时发生错误，请重新查询！' );
				$( ".dict_box" ).on( "mouseleave", function() {
					removeDictBox();
				});
			}
		}
	});

}

/**
 * remove dict icon box
 */
function removeDictIconBox() {
	$( '.dict_icon_box' ).remove();
	m_is_dict_box_show = false;
}

/**
 * remove dict box
 */
function removeDictBox() {
	$( '.dict_box' ).remove();
	m_is_dict_box_show = false;
}
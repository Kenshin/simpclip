console.log( "=== simpclip popup load ===" )

import './popup.styl';

import md5 from 'md5';

import TextField from 'textfield';

searchRender();

/**
 * Search Render
 */
function searchRender() {
    const textfield = <div>
                        <TextField 
                            placeholder="请输入需要翻译的内容，支持中英文" 
                            onKeyDown={ e=>onChange(e) }
                        />
                      </div>,
          onChange = event => {
            if ( event.keyCode == '13' ) {
                translation( event.target.value );
            }
          };
    ReactDOM.render( textfield, $( ".search" )[0] );
    $( '.search' ).find( 'input' ).focus();
}

/**
 * Translate
 * 
 * @param {sring} m_word 
 */
function translation( m_word ) {
    const err_icon = '<svg t="1531720355604" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1893" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40"><defs><style type="text/css"></style></defs><path d="M575.986694 832.039919C575.986694 867.356032 547.316113 896.026613 512 896.026613 476.683887 896.026613 448.013306 867.356032 448.013306 832.039919 448.013306 796.723806 476.683887 768.048156 512 768.048156 547.316113 768.048156 575.986694 796.64777 575.986694 832.039919ZM512 255.997465C476.683887 255.997465 448.013306 284.668046 448.013306 319.984159L448.013306 639.998733C448.013306 675.314846 476.683887 703.990496 512 703.990496 547.316113 703.990496 575.986694 675.314846 575.986694 639.998733L575.986694 319.984159C575.986694 284.668046 547.316113 255.997465 512 255.997465ZM1023.979724 896.026613C1023.979724 966.729805 966.709529 1024.005069 896.006336 1024.005069L127.993664 1024.005069C57.290471 1024.005069 0.020276 966.658839 0.020276 896.026613 0.020276 874.868373 5.216059 854.931776 14.39105 837.311737L14.320083 837.24077 398.250384 69.304133 398.392317 69.304133C419.626593 28.133261 462.455047 0.040552 512 0.040552 561.544953 0.040552 604.373407 28.209297 625.67865 69.3751L1008.311272 834.711311C1018.348003 852.838256 1023.979724 873.783595 1023.979724 896.026613ZM959.99303 896.026613C959.99303 885.123073 957.392604 874.868373 952.191753 865.404445L951.613881 864.319667 951.112044 863.239958 568.621355 98.405584C557.499847 77.171308 535.834701 64.027246 512 64.027246 488.023365 64.027246 466.282184 77.318311 455.160675 98.765487L452.12938 104.544211 92.175714 824.527578 92.677551 825.034483 71.154339 866.778159C66.389426 875.948082 64.00697 885.842879 64.00697 896.097579 64.00697 931.413692 92.748517 960.089342 127.993664 960.089342L896.006336 960.089342C931.322449 960.013306 959.99303 931.342726 959.99303 896.026613Z" p-id="1894" fill="#333333"></path></svg>';
    const appid = '3c5c325ba13b51cf',
          key   = 'JxOi8aEX3TiopG7g7xv0oSw1OzusMNkN',
          salt  = new Date().getTime(),
          query = m_word,
          str1  = appid + query + salt + key,
          sign  = md5( str1 );
    $.ajax({
        url: 'https://openapi.youdao.com/api',
        type: 'get',
        dataType: 'json',
        data: {
            q     : m_word,
            appKey: appid,
            salt  : salt,
            from  : 'auto',
            to    : 'auto',
            sign  : sign
        },
        beforeSend : () => {
            $( '.result' )
                .removeClass( 'translate' )
                .addClass( 'show' )
                .html( '<div class="three-dots-pulse"></div>' );
        },
        success: result => {
            console.log( result )
            if ( result && result.errorCode != "0" ) $( '.result' ).addClass( 'error' ).html( `${err_icon}翻译发生错误，请稍后再测试。` );
            else transRender( result );
        },
        error : ( XMLHttpRequest, textStatus, errorThrown ) => {
            $( '.result' ).html( `${err_icon}&nbsp;翻译发生错误，请稍后再测试。` );
        }
    });
}

/**
 * Translate Render
 * 
 * @param {object} data 
 */
function transRender( data ) {
    const trans = `<div style="padding-right: 10px;width: 100%">
                    <div class="sub">翻译</div>
                    <div class="box">${data.translation.join(',')}</div>
                    <div class="sub">音标</div>
                    <div class="box">${ data.basic && data.basic.phonetic ? data.basic.phonetic : '暂无' }</div>
                    <div class="sub">释义</div>
                    <div class="box">${ data.basic && data.basic.explains ? data.basic.explains.join('<br>') : '暂无' }</div>
                    <div class="sub">网络释义</div>
                    <div class="box">${ data.web && data.web.lenght > 0 ? data.web[0].value.join('<br>') : '暂无' }</div>
                   </div>`;
    $( '.result' ).addClass( 'translate' ).html( trans );
    $( '.footer' ).addClass( 'footer-border' );
}
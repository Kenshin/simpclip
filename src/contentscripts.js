console.log( "=== simpclip contentscripts load ===" )

import './assets/css/main.styl';
import 'notify_css';

import md5 from 'md5';
import TurndownService from 'markdown';

let is_translate  = false, selection = {};
const root        = 'simpclip',
      $body       = $( 'body' ),
      trans_icon  = '<svg t="1531470351234" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1545" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M736.548571 603.428571l64 80.018286a18.285714 18.285714 0 1 1-28.525714 22.820572L713.142857 632.685714l-58.88 73.581715a18.285714 18.285714 0 1 1-28.525714-22.820572l64-80.018286-18.834286-23.515428a18.285714 18.285714 0 0 1 28.562286-22.857143l13.677714 17.115429 35.108572-43.885715H621.714286a18.285714 18.285714 0 1 1 0-36.571428h73.142857V475.428571a18.285714 18.285714 0 1 1 36.571428 0v18.285715h73.142858a18.285714 18.285714 0 1 1 0 36.571428h-9.508572l-58.514286 73.142857zM271.616 470.857143l-35.291429 84.736a18.285714 18.285714 0 0 1-33.792-14.043429l91.428572-219.428571a18.285714 18.285714 0 0 1 33.755428 0l91.428572 218.843428a18.285714 18.285714 0 0 1-33.718857 14.116572l-35.181715-84.224h-78.628571z m15.250286-36.571429h48.091428l-24.064-57.636571-24.027428 57.636571zM128 603.428571H329.142857a18.285714 18.285714 0 1 1 0 36.571429H109.714286a18.285714 18.285714 0 0 1-18.285715-18.285714V256a18.285714 18.285714 0 0 1 18.285715-18.285714h457.142857a18.285714 18.285714 0 1 1 0 36.571428h-438.857143v329.142857z m768-182.857142H694.857143a18.285714 18.285714 0 1 1 0-36.571429h219.428571a18.285714 18.285714 0 0 1 18.285715 18.285714v365.714286a18.285714 18.285714 0 0 1-18.285715 18.285714H457.142857a18.285714 18.285714 0 1 1 0-36.571428h438.857143v-329.142857z m-179.785143-247.844572a18.285714 18.285714 0 1 1 30.427429 20.260572l-438.857143 658.285714a18.285714 18.285714 0 0 1-30.427429-20.260572l438.857143-658.285714z" p-id="1546" fill="#ffffff"></path></svg>',
      load_icon   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="width: 20px;"><circle stroke="#fff" stroke-width="10" cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" r="30" stroke-dasharray="141.37166941154067 49.12388980384689" transform="rotate(102 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>',
      err_icon    = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1531374978902" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2422" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M994 798.2L605.9 117.5c-9.6-16.8-23.5-30.7-40.3-40.3-25.1-14.3-54.2-18-82-10.3-27.8 7.6-51 25.6-65.3 50.7L30.2 798.2C20.9 814.4 16 832.9 16 851.6c0 59.6 48.4 108 108 108h776.1c18.7 0 37.2-4.9 53.5-14.2 25.1-14.3 43.1-37.5 50.7-65.3s3.9-56.9-10.3-81.9z m-59.1 63c-2.5 9.3-8.5 17-16.9 21.8-5.4 3.1-11.6 4.7-17.8 4.7H124c-19.9 0-36-16.1-36-36 0-6.2 1.6-12.4 4.7-17.8l388.1-680.6c4.8-8.4 12.5-14.4 21.8-16.9 3.2-0.9 6.4-1.3 9.6-1.3 6.2 0 12.3 1.6 17.8 4.7 5.6 3.2 10.2 7.8 13.4 13.4l388.1 680.6c4.7 8.4 5.9 18.1 3.4 27.4z" p-id="2423" fill="#ffffff"></path><path d="M512 722c-22.1 0-40 17.9-40 40v12c0 22.1 17.9 40 40 40s40-17.9 40-40v-12c0-22.1-17.9-40-40-40z m0-412c-22.1 0-40 17.9-40 40v268c0 22.1 17.9 40 40 40s40-17.9 40-40V350c0-22.1-17.9-40-40-40z" p-id="2424" fill="#ffffff"></path></svg>',
      google_icon = '<svg t="1531450684775" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1048" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M518.848 449.152l414.272 0q6.848 38.272 6.848 73.152 0 124-52 221.44t-148.288 152.288-220.864 54.848q-89.728 0-170.848-34.56t-140-93.44-93.44-140-34.56-170.848 34.56-170.848 93.44-140 140-93.44 170.848-34.56q171.424 0 294.272 114.848l-119.424 114.848q-70.272-68-174.848-68-73.728 0-136.288 37.152t-99.136 100.864-36.576 139.136 36.576 139.136 99.136 100.864 136.288 37.152q49.728 0 91.424-13.728t68.576-34.272 46.848-46.848 29.44-49.728 12.864-44.576l-249.152 0 0-150.848z" p-id="1049" fill="#ffffff"></path></svg>',
      bing_icon   = '<svg t="1531450907872" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3129" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M153.813333 0L358.4 71.936V791.893333l288.128-166.186666-141.226667-66.346667-89.173333-221.866667 453.973333 159.488v231.893334L358.528 1024l-204.672-113.92V0z" fill="#ffffff" p-id="3130"></path></svg>',
      baidu_icon  = '<svg t="1531450985988" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3618" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z" p-id="3619" fill="#ffffff"></path></svg>',
      wiki_icon   = '<svg t="1531451085368" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4153" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M638.72 808.533333 529.493333 551.253333C485.973333 636.16 438.186667 725.333333 397.226667 808.533333 396.8 808.96 377.173333 808.533333 377.173333 808.533333 314.453333 661.333333 249.6 516.266667 186.453333 370.346667 171.946667 334.506667 120.746667 277.333333 85.333333 277.333333 85.333333 273.066667 85.333333 263.68 85.333333 258.133333L301.226667 258.133333 301.226667 277.333333C275.626667 277.333333 232.106667 294.4 243.2 322.133333 273.92 387.84 381.44 642.56 410.88 707.413333 430.933333 667.306667 487.68 561.493333 512 516.693333 492.8 479.146667 432.213333 338.346667 414.293333 303.36 400.64 280.32 366.08 277.333333 339.626667 277.333333 339.626667 270.933333 340.053333 266.666667 339.626667 258.56L529.92 258.986667 529.92 276.053333C503.893333 277.333333 479.573333 286.293333 490.666667 311.04 516.266667 363.946667 531.2 401.92 554.666667 450.986667 561.92 436.48 600.32 357.546667 618.666667 316.16 629.76 288.426667 613.12 277.333333 567.04 277.333333 567.466667 272.213333 567.466667 263.253333 567.466667 258.986667 626.773333 258.56 715.946667 258.56 731.733333 258.133333L731.733333 276.053333C701.44 277.333333 670.293333 293.546667 654.08 318.293333L576 482.133333C583.68 503.893333 659.626667 672.426667 667.733333 691.2L832 314.453333C819.2 283.733333 782.506667 277.333333 768 277.333333 768 271.786667 768 264.533333 768 258.133333L938.666667 259.413333 938.666667 260.266667 938.666667 277.333333C901.12 277.333333 877.653333 298.666667 864 330.666667 829.866667 407.04 725.333333 650.24 657.066667 808.533333 657.066667 808.533333 638.72 808.533333 638.72 808.533333Z" p-id="4154" fill="#ffffff"></path></svg>',
      baike_icon  = '<svg t="1531451135912" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4457" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M959.562409 923.105079 862.333994 248.89672c-5.554506-38.291095-25.688055-72.128761-56.69014-95.277994-31.004131-23.149233-69.165266-32.838919-107.457384-27.285436s-72.129784 25.687032-95.279017 56.69014c-11.220552 15.027252-19.268856 31.739888-23.961738 49.330522l0-26.857694c0-79.874165-64.98199-144.856156-144.856156-144.856156-46.315862 0-87.621617 21.852704-114.15697 55.785537-26.535353-33.932834-67.841108-55.785537-114.15697-55.785537-79.874165 0-144.856156 64.98199-144.856156 144.856156l0 722.06225c0 2.119267 0.214894 4.188392 0.623193 6.186909 2.862187 13.988596 15.240099 24.512277 30.075992 24.512277l228.313939 0 228.313939 0 379.860471 0c0.833995 0 1.657756-0.042979 2.474354-0.10847 8.388041-0.38374 16.277732-4.185322 21.801539-10.562567C958.213691 940.854325 960.833355 931.921885 959.562409 923.105079zM652.104945 219.757053c13.33675-17.862833 32.832779-29.462009 54.895261-32.660864s44.048215 2.38328 61.910025 15.72003c17.862833 13.33675 29.462009 32.831756 32.658817 54.869678l92.164073 639.102816-160.566976 0-96.804766-615.279225C633.210619 259.500219 638.798894 237.576907 652.104945 219.757053zM671.022807 896.858298l-92.077092 0L578.945715 311.621297 671.022807 896.858298zM122.317837 205.495234c0-46.01808 37.438681-83.457784 83.457784-83.457784s83.457784 37.438681 83.457784 83.457784l0 691.363064L122.317837 896.858298 122.317837 205.495234zM350.631776 896.858298 350.631776 205.495234c0-46.01808 37.438681-83.457784 83.457784-83.457784s83.457784 37.438681 83.457784 83.457784l0 691.363064L350.631776 896.858298z" p-id="4458" fill="#ffffff"></path></svg>',
      copy_icon   = '<svg t="1531451244469" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5231" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M704 640l256 0 0 355.968C960 1011.392 947.392 1024 931.968 1024L476.032 1024C460.608 1024 448 1011.392 448 995.968L448 412.032C448 396.608 460.608 384 479.168 384L704 384 704 640zM768 389.376 768 576l192 0-182.464-186.624L768 389.376zM448 69.376 448 192l128 0L457.536 69.376 448 69.376zM384 320l192 0L576 256 384 256 384 64 95.168 64C76.608 64 64 76.608 64 92.032l0 644.8c0 15.424 12.608 28.032 28.032 28.032L384 764.864 384 320z" p-id="5232" fill="#ffffff"></path></svg>',
      md_icon     = '<svg t="1531539167710" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1700" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M895.318 192 128.682 192C93.008 192 64 220.968 64 256.616l0 510.698C64 802.986 93.008 832 128.682 832l766.636 0C930.992 832 960 802.986 960 767.312L960 256.616C960 220.968 930.992 192 895.318 192zM568.046 704l-112.096 0 0-192-84.08 107.756L287.826 512l0 192L175.738 704 175.738 320l112.088 0 84.044 135.96 84.08-135.96 112.096 0L568.046 704 568.046 704zM735.36 704l-139.27-192 84 0 0-192 112.086 0 0 192 84.054 0-140.906 192L735.36 704z" p-id="1701" fill="#ffffff"></path></svg>',
      link_icon   = '<svg t="1531545911286" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1952" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M513 416 512 416l0 0C512.4 416 512.6 416 513 416z" p-id="1953" fill="#ffffff"></path><path d="M737 320 640 320c0 0 52 34 63.2 96L736 416l1 0c35.2 0 63 27.8 63 63l0 64c0 35.2-27.8 65-63 65l-224 0c-35.2 0-65-29.8-65-65L448 480l-96 0 0 63c0 23 5 45 13.8 65 25.2 56.4 81.8 96 147.2 96l224 0c88.4 0 159-72.6 159-161l0-64C896 390.6 825.4 320 737 320z" p-id="1954" fill="#ffffff"></path><path d="M659.2 416c-24.2-56.6-80.2-96-146.2-96l-224 0c-88.4 0-161 70.6-161 159l0 64c0 88.4 72.6 161 161 161L384 704c0 0-51.6-34-64.2-96l-30.8 0c-35.2 0-65-29.8-65-65l0-64c0-35.2 29.8-63 65-63L512 416l1 0c35.2 0 63 27.8 63 63l0 64c0 0.4 0 0.6 0 1l96 0c0-0.4 0-0.6 0-1l0-64C672 456.6 667.4 435.2 659.2 416z" p-id="1955" fill="#ffffff"></path></svg>';

/***********************
 * Event hander( enter )
 ***********************/

$body.on( "click", clickEventHandler );
$body.on( 'mouseenter', 'a, img', mouseEnterEventHandler ); 

/**
 * Mouse up by selection
 */
function clickEventHandler( event ) {
    if ( is_translate ) return;
    selection = getSelection();
    if ( selection.text == "" ) $body.find( 'simpclip' ).length > 0 && remove();
    else {
        $body.find( 'simpclip' ).length > 0 && $( root ).remove();
        create( event, selection.text, 'text' );
    }
}

/**
 * Mouse enter by <a> | <img>
 */
function mouseEnterEventHandler( event ) {
    const type = event.target.tagName.toLowerCase();
    if ( [ 'a', 'img' ].includes( type )) {
        const href = type == 'a' ? event.target.href : event.target.currentSrc;
        if ( !href.startsWith( 'http' ) ) return;
        if ( $body.find( 'simpclip' ).length > 0 ) remove();
        selection = { text: event.target.outerText, html: event.target.outerHTML };
        create( event, href, type );
    }
}

/***********************
 * Common Service
 ***********************/

/**
 * Get secletion
 * 
 * @return {object} text and html
 */
function getSelection() {
    const selector  = { text: '', html: '' },
          selection = window.getSelection();
    selector.text   = selection.toString().replace( /^\s*/, "" ).replace( /\s*$/, "" );
    if ( selection.rangeCount > 0 ) {
        const range = selection.getRangeAt(0),
              clone = range.cloneContents(),
              div   = document.createElement('div');
        div.appendChild( clone );
        selector.html = div.innerHTML;
    }
    return selector;
}

/**
 * Copy to clipboard
 * 
 * @param {string} text 
 */
function copy( text ) {
    const $temp   = $("<textarea>"),
          brRegex = /<br\s*[\/]?>/gi;
    $body.append( $temp );
    $temp.val( text.replace(brRegex, "\r\n") ).select();
    const result = document.execCommand( "copy" );
    $temp.remove();
    return result;
}

/**
 * Create
 * 
 * @param {event}  event
 * @param {string} section.text
 * @param {string} include: text, ( a | img )
 */
function create( event, m_word, type ) {
    const _dict_x = event.clientX + window.scrollX + 5,
          _dict_y = event.clientY + window.scrollY + 10,
          actions = type => {
              if ( type == 'text' ) {
                  return `<simpclip-a data-href="translate">${trans_icon}</simpclip-a>
                          <simpclip-a data-href="https://www.google.com/search?q=">${google_icon}</simpclip-a>
                          <simpclip-a data-href="https://cn.bing.com/search?q=">${bing_icon}</simpclip-a>
                          <simpclip-a data-href="https://www.baidu.com/s?wd=">${baidu_icon}</simpclip-a>
                          <simpclip-a data-href="https://zh.wikipedia.org/wiki/">${wiki_icon}</simpclip-a>
                          <simpclip-a data-href="https://baike.baidu.com/item/">${baike_icon}</simpclip-a>
                          <simpclip-a data-href="copy">${copy_icon}</simpclip-a>
                          <simpclip-a data-href="markdown">${md_icon}</simpclip-a>`;
              }
              else if ( [ 'a', 'img' ].includes( type ) ) {
                  return `<simpclip-a data-href="">${link_icon}</simpclip-a>
                          <simpclip-a data-href="lnk2md">${md_icon}</simpclip-a>`;
              }
          },
          tmpl    = `<simpclip style="left: ${_dict_x}px; top: ${_dict_y}px;">
                       ${actions(type)}
                     </simpclip>`;
    // add template
    $body.append( tmpl );
    setTimeout( ()=>$( root ).animate({ opacity: 1 }, { duration: 100 }), 100 );
    // click event
    $( root ).on( 'click', 'simpclip-a', event => {
        let tag    = event.target.tagName.toLowerCase(),
            href   = event.target.dataset.href,
            target = event.target;
        while ( tag != 'simpclip-a' ) {
            target = target.parentElement;
            tag    = target.tagName.toLowerCase();
            href   = target.dataset.href;
        }
        if ( href == "copy" ) {
            const result = copy( m_word );
            result && new Notify().Render( "已成功复制到剪切板。" );
        } else if ( href == 'markdown' ) {
            markdown( clearMD( selection.html.trim()), $( "head title" ).text().trim() + ".md" );
        } else if ( href == 'translate' ) {
            translation( m_word );
        } else if ( href == 'lnk2md' ) {
            const prefix = type == 'a' ? '' : '!',
                  result = copy( `${prefix}[${selection.text}](${m_word})` );
            result && new Notify().Render( "已成功复制到剪切板。" );
        } else {
            const $a = $( `<a style="display:none" href="${ href + encodeURI( m_word ) }" target="_blank"></a>` ).appendTo( "body" );
            $a[0].click();
            $a.remove();
        }
    });
}

/**
 * Remove
 */
function remove() {
    $( root ).animate({ opacity: 0 }, { duration: 300 ,complete: () => {$( root ).remove();}});
}

/***********************
 * Translate
 ***********************/

/**
 * Translate
 * 
 * @param {sring} m_word 
 */
function translation( m_word ) {
    let from = 'en', to = 'zh';
    if ( /[\u4E00-\u9FA5\uf900-\ufa2d]/ig.test( m_word )) {
        from = 'zh';
        to   = 'en';
    }
    const appid = '20180711000184783',
            key   = '2nSVEc2GPlR0dJmKfPL3',
            salt  = new Date().getTime(),
            query = m_word,
            str1  = appid + query + salt + key,
            sign  = md5( str1 );
    $.ajax({
        url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'json',
        data: {
            q    : m_word,
            appid: appid,
            salt : salt,
            from : from,
            to   : to,
            sign : sign
        },
        beforeSend : () => {
            is_translate = true;
            $( root ).html( `${load_icon}&nbsp;翻译中...` );
        },
        success: result => {
            is_translate = false;
            if ( result && result.error_code ) {
                $( root ).html( `${err_icon}&nbsp;翻译发生错误，请稍后再测试。` );
                setTimeout( () => removeDictBox(), 2000 );
            } else crateDictBox( result );
        },
        error : ( XMLHttpRequest, textStatus, errorThrown ) => {
            is_translate = false;
            $( root ).html( `${err_icon}&nbsp;翻译发生错误，请稍后再测试。` );
            setTimeout( () => remove(), 2000 );
        }
    });
}

/**
* Create dict box
* @param  {[json]} dict_y [翻译结果]
*/
function crateDictBox( data ) {
    const src  = data.trans_result[0].src.replace( /</ig, '&lt;' ).replace( />/ig, '&gt;' ),
          dst  = data.trans_result[0].dst.replace( /</ig, '&lt;' ).replace( />/ig, '&gt;' ),
          tmpl = `<simpclip-dict-box>
                    <simpclip-dict-box-title>${ src }</simpclip-dict-box-title>
                    <simpclip-dict-box-group>
                        <simpclip-dict-box-subtitle>释义</simpclip-dict-box-subtitle>
                        <simpclip-dict-box-trans>${ dst }</simpclip-dict-box-trans>
                    </simpclip-dict-box-group>
                    <simpclip-dict-box-group>
                        <simpclip-dict-box-subtitle>更多解释</simpclip-dict-box-subtitle>
                        <simpclip-dict-box-trans>
                            <simpclip-a data-href="http://dict.cn/">海词</simpclip-a>
                            <simpclip-a data-href="https://cn.bing.com/dict/search?q=">必应词典</simpclip-a>
                            <simpclip-a data-href="https://translate.google.cn/#auto/en/">Google 翻译</simpclip-a>
                            <simpclip-a data-href="https://fanyi.baidu.com/#${data.from}/${data.to}/">百度翻译</simpclip-a>
                            <simpclip-a data-href="https://fanyi.sogou.com/#auto/en/">搜狗翻译</simpclip-a>
                            <simpclip-a data-href="http://www.iciba.com/">金山词霸</simpclip-a>
                        </simpclip-dict-box-trans>
                    </simpclip-dict-box-group>
                  </simpclip-dict-box>`;
    $( root ).html( tmpl );
    /( |\n)/ig.test( src ) && $( 'simpclip-dict-box-title' ).remove();
    offsetHeight();
}

/**
 * Offset height
 */
function offsetHeight() {
    const maxWidth = $('html').width(),
            left     = $(root).position().left,
            width    = $(root).width();
    if ( left + width > maxWidth ) {
        $(root).css({ left: `${ left - ( left + width - maxWidth ) - 20 }px` });
    }
}

/***********************
 * to Markdown
 ***********************/

/**
 * @param {string} data
 * @param {string} name
 * @param {function} 0: base64; 1: error
 */
function markdown( data, name, callback ) {
    try {
        const md     = new TurndownService().turndown( data ),
              base64 = "data:text/plain;charset=utf-8," + encodeURIComponent( md );
        download( base64, name );
    } catch( error ) {
        new Notify().Render( '转换 Markdown 失败。' );
    }
}

/**
 * Clear Html to MD, erorr <tag>
 * 
 * @param {string} convert string
 */
function clearMD( str ) {
    str = str.replace( /<\/?(dl|dt|ins|font|span|div|canvas|noscript|fig\w+)[ -\w*= \w=\-.:&\/\/?!;,%+()#'"{}\u4e00-\u9fa5]*>/ig, "" )
             .replace( /<\/?sr(-[a-z]*)+[\w-\[\]="'.:&;% ]*>|<fab [\S ]*>/ig, "" )
             .replace( /sr-blockquote/ig, "blockquote" )
             .replace( /<\/?style[ -\w*= \w=\-.:&\/\/?!;,+()#"\S]*>/ig, "" )
             .replace( /(name|lable)=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )
    return str;
}

/**
 * @param {string} image base64 code
 * @param {string} name
 */
function download( data, name ) {
    const $a   = $( `<a style="display:none" href=${data} download="${name}"></a>` ).appendTo( "body" );
    $a[0].click();
    $a.remove();
}
console.log( "=== simpclip background load ===" )

/***********************
 * Variable
 ***********************/

const storage = {
    version : "1.0.0",
    popup   : "popup",
    blacklist: []
};

/**
 * Initialize
 */
function initialize() {
    Object.keys( storage ).forEach( key => {
        localStorage[key] == undefined && ( localStorage[key] = storage[key] );
    });
    console.log( localStorage )
}
initialize();

/***********************
 * Browser action
 ***********************/

const popup_url = "popup/popup.html";
let   popup     = {};

chrome.browserAction.onClicked.addListener( function( event ) {
    if ( popup && popup.id ) {
        removeWindow();
    } else {
        createWindow();
    }
});

chrome.windows.onRemoved.addListener( function( windowId ) {
    if ( windowId == popup.id ) popup = {};
});

/**
 * Create popup window
 */
function createWindow() {
    const creating = chrome.windows.create({
        url    : chrome.extension.getURL( "/popup/popup.html" ),
        type   : "popup",
        width  : 410, height : 350,
    });
    creating.then( function( windowInfo ) {
        popup = windowInfo;
    });
}

/**
 * Remove popup window
 */
function removeWindow() {
    chrome.windows.remove( popup.id );
    popup = {};
}

localStorage.popup == "popup" ? chrome.browserAction.setPopup({ popup: popup_url }) : chrome.browserAction.setPopup({ popup: "" });

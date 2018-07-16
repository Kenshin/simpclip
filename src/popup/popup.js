console.log( "=== simpclip popup load ===" )

import './popup.styl';

import TextField from 'textfield';

searchRender();

/**
 * Search Render
 */
function searchRender() {
    const textfield = <div>
                        <TextField 
                            placeholder="请输入需要查询的内容，支持中英文" 
                            onKeyDown={ e=>onChange(e) }
                        />
                      </div>,
          onChange = event => {
            if ( event.keyCode == '13' ) {
                console.log( event.target.value )
            }
          };
    ReactDOM.render( textfield, $( ".search" )[0] );
}

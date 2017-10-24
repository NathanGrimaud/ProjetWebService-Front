import xs from 'xstream'
import {html} from 'snabbdom-jsx'

import {INTENT_URL} from '../constants'
export default function(sources){

    const click$ = sources.DOM.select('#intent').events('change').map(e => e.target.value).startWith('')
    const change$ = sources.DOM.select('.add').events('click').map(e => e.returnValue).startWith(false)
    const URL = INTENT_URL

    const post$ = xs.combine(click$,change$)
        .map((payload) => {
            if(payload[1] === true && payload[0] !== ""){
                // ugly but cyclic router does not offer
                // a redirect 
                setTimeout(()=>{
                    location.pathname = "/"
                },500)
                return {
                    url: URL , // GET method by default
                    category: 'intent',
                    method: 'POST',
                    send : {name: payload[0]}
                }
            }
        }
    )


    return {
        DOM: xs.of(
            <div className="centered">
            <h1 className="mdc-typography--display3">New intents</h1>
            <div className="mdc-textfield"> 
                <input type="text" id="intent" className="mdc-textfield__input"/>
            </div>
            <button className="mdc-button add">
                SEND
            </button>
            </div>
        ),
        HTTP : post$ ,
    }
}

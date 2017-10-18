import xs from 'xstream'
import {html} from 'snabbdom-jsx'
export default function(sources){

    const click$ = sources.DOM.select('#intent').events('change').map(e => e.target.value).startWith('')
    const change$ = sources.DOM.select('.add').events('click').map(e => e.returnValue).startWith(false)
    const URL = 'http://api.hurrycane.fr:9000/intent'

    const post$ = xs.combine(click$,change$)
        .map((payload) => {
            if(payload[1] === true){
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
                <button className="mdc-button add">
                    Add a new intent
                </button>
                <div className="mdc-textfield"> 
                    <input type="text" id="intent" className="mdc-textfield__input"/>
                    <label className="mdc-textfield__label" for="my-textfield">Hint text</label>
                </div>
            </div>
        ),
        HTTP : post$
    }
}
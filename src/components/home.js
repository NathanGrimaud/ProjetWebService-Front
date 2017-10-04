import xs from 'xstream'
import {html} from 'snabbdom-jsx'

export default function(){
    return {
        DOM: xs.of(true).map(()=>
            <div className="centered">
                <h1 className="mdc-typography--display3">home</h1>
                <button attrs-data-link="/users">USERS</button>
            </div>
        )
    }
}

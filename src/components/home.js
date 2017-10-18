import xs from 'xstream'
import {html} from 'snabbdom-jsx'

export default function(){
    return {
        DOM: xs.of(true).map(()=>
            <div className="centered">
                <h1 className="mdc-typography--display3">home</h1>
                <div className="menu-grid">

                    <div className="menu-card users-card" attrs-data-link="/chat">
                       <div className="menu-title"> USERS </div>
                    </div>
                    <div className="menu-card intents-card"  attrs-data-link="/intents">
                       <div className="menu-title"> INTENTS </div>
                    </div>
                </div>
            </div>
        )
    }
}

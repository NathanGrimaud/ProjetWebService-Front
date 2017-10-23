import xs from 'xstream'
import {last} from 'ramda'
import {html} from 'snabbdom-jsx'

export default function(sources){

    const request$ = xs.of({
        url: 'https://api.hurrycane.fr:9000/intent', // GET method by default
        category: 'intent',
    })

    const response$ = sources.HTTP
        .select('intent')
        .flatten()
        .map(val => val.body)
        .startWith([])

    const state = xs.of([])
  
    const vtree$ = response$.map( intents => {
        const messagesDom = (intents || []).map(intent => (
            <li className="mdc-list-item">
                {intent.name}
            </li>
        ))
        return (
            <div className="messages centered">
                <h1 className="mdc-typography--display3">Intents</h1>
            
                <ul className="mdc-list intent-list">
                    {messagesDom}
                </ul>

            <button className='mdc-button' attrs-data-link='/intents/new'> ADD INTENT</button>

            </div>
        )}
    )
    return{
        DOM: vtree$,
        HTTP: request$
    } 
}

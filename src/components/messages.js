import xs from 'xstream'
import {last} from 'ramda'
import {html} from 'snabbdom-jsx'
export default function(sources){

    const _messages = [
        {sender : 'me',message: 'Salut'},
        {sender : 'it',message: 'Hey, ça va'},
        {sender : 'me',message: 'fdp'},
        {sender : 'it',message: 'Beh c\'est pas simpa ça'},
    ]
    const id = last(location.pathname.split('/'))

    const request$ = xs.of({
        url: 'http://api.icndb.com/jokes/random', // GET method by default
        category: 'messages',
    })

    const response$ = sources.HTTP
        .select('messages')
        .flatten()

    const vtree$ = response$.map( messages => {
        const messagesDom = _messages.map(message => (
            <div className={`message ${ message.sender === 'me' ? 'sender':'receiver' }`}>
                <i className="material-icons">account_circle</i>
                <div className="user-message">{message.message}</div>
            </div>
        ))
        const message = messages.body.value.joke;
        return (
        <div className="messages centered">
            {messagesDom}
        </div>
    )})
    return{
        DOM: vtree$,
        HTTP: request$
    } 

}
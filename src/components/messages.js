import xs from 'xstream'
import {last} from 'ramda'
import {html} from 'snabbdom-jsx'
import moment from 'moment'
import {MESSAGES_URL} from '../constants'
export default function(sources, props){

    const {id} = props

    const request$ = xs.of({
        url: MESSAGES_URL, // GET method by default
        category: 'messages',
    })

    const response$ = sources.HTTP
        .select('messages')
        .flatten()
        .map( response => response.body )

    const vtree$ = response$.map( messages => {
        console.log(messages)
        const messagesDom = messages
        .filter( message => message.message.userid === id)
        .sort((before,after) => {
            const beforeDate = moment(new Date(parseInt(before.message.timestamp,10)))
            const afterDate = moment(new Date(parseInt(after.message.timestamp,10)))
            if (beforeDate.isBefore(afterDate))
                return -1
            return 1
        })
        .map(message => <div className={`message ${ message.types === 'Request' ? 'user':'bot' }`}>
                <i className="material-icons">account_circle</i>
                <div className="user-message">{message.message.content}</div>
            </div>
        )
        return (
        <div className="messages centered">
            <h1 className="mdc-typography--display3">Messages</h1>
            {messagesDom}
        </div>
    )})
    return{
        DOM: vtree$,
        HTTP: request$
    } 

}

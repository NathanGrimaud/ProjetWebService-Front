import xs from 'xstream'
import {run} from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { routerify } from 'cyclic-router'
import { makeHistoryDriver } from '@cycle/history'
import { makeHTTPDriver } from '@cycle/http'
import switchPath from 'switch-path'
import {html} from 'snabbdom-jsx'
import Home from './components/home'
import Users from './components/userList'
import Header from './components/header'
import Footer from './components/footer'
import Imports from './imports'
import Chat from './components/messages'
import Intents from './components/intent'
import IntentForm from './components/intentForm'

import './app.css'
// const USER_API = 'http://api.hurrycane.fr:9000/user'


const CHAT_API = 'http://api.icndb.com/jokes/random' 


function main(sources) {

    const match$ = sources.router.define({
        '/': Home,
        '/chat':sources => Users(sources),
        '/chat/:id' :  id => sources => Chat(sources,{id}),
        '/intents': sources => Intents(sources),
        '/intents/new': sources => IntentForm(sources),
    })

    const links$ = sources
        .DOM
        .select('[data-link]')
        .events('click')
        .map((e)=>
            e.ownerTarget.getAttribute('data-link')
        )



    const page$ = match$.map(({path, value}) => {
        return value(Object.assign({}, sources, {
            router: sources.router.path(path),
        }))
    })


    const httpServices$ = page$.map(c => c.HTTP || xs.empty()).flatten()
    const children$ =  page$.map(c =>c.DOM || xs.empty()).flatten()
    const header$ = Header(sources).DOM
    return {
        DOM: xs.combine(header$,children$, Footer, Imports)
            .map(([header,page,footer,imports]) =>
                <div>                
                    {header}
                    <main className="mdc-toolbar-fixed-adjust wrap">
                        {page}
                    </main>
                    {footer}
                    {imports}
                </div>
        ),
        router: xs.merge(
            links$.map(route => route)
        ),
        HTTP: httpServices$ ,
    }
}

const drivers = {
    DOM: makeDOMDriver('#root'),
    history: makeHistoryDriver(),
    HTTP: makeHTTPDriver(),
}
const mainWithRouting = routerify(main, switchPath)
run(mainWithRouting, drivers)

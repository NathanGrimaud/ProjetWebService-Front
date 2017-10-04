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
import Chat from './components/chat'
import {Subject}from 'rxjs'
import './app.css'
const USER_API = 'https://jsonplaceholder.typicode.com/users'
const CHAT_API = 'http://api.icndb.com/jokes/random' 


function main(sources) {

    const match$ = sources.router.define({
        '/': Home,
        '/users':sources => Users(sources),
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

    const userService$ = xs.of({
        url: USER_API,
        category: 'users',
    })



    const services$ =  xs.merge(userService$)
    
    const child$ =  page$.map(c => c.DOM).flatten()
    const header$ = Header(sources).DOM
    return {
        DOM: xs.combine(header$,child$, Footer, Imports)
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
        HTTP: services$,
    }
}

const drivers = {
    DOM: makeDOMDriver('#root'),
    history: makeHistoryDriver(),
    HTTP: makeHTTPDriver(),
}
const mainWithRouting = routerify(main, switchPath)
run(mainWithRouting, drivers)

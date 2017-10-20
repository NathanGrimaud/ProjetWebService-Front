import { html } from 'snabbdom-jsx'
import { MDCRipple } from '@material/ripple'
import xs from 'xstream'

export default function (sources) {
    const USER_API = 'https://api.hurrycane.fr:9000/user'
    // const USER_API = 'https://jsonplaceholder.typicode.com/users'
    const request$ =  xs.of({
        url: USER_API,
        category: 'users',
    })

    const response$ = sources.HTTP
        .select('users')
        .flatten()
        .map(res => {
            setTimeout(() => {
                const surfaces = document.querySelectorAll('.surface')
                Array.from(surfaces).forEach((surface) => {
                    surface.addEventListener('click',()=>{

                    })
                    const ripple = new MDCRipple(surface)
                })
            }, 200)
            return res.body.map(user => user)
        })
        //{user.nom} {user.prenom}

        
    return {
        DOM: response$
            .map((users) => {
                console.log(users)
                const childs = users.map((user) =>
                    <a attrs-data-link={`/chat/${user.userid}`}  id={user.id} className="mdc-list-item surface">
                        <i className="material-icons mdc-list-item__start-detail" >account_circle</i>
                        {user.prenom} {user.nom} 
                    </a>)
                return (
                    <div className="centered">
                        <h1 className="mdc-typography--display3">Users</h1>
                        <nav className="mdc-list">
                            {childs}
                        </nav>
                    </div>
                )
            }
        ),
        HTTP: request$
    }
}

import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { MDCRipple } from '@material/ripple'
import { MDCDialog } from '@material/dialog';
import {Observable, Subject} from 'rxjs'
export default function (sources) {
    const dialog$ = new Subject()

    setTimeout(() => {
        const dialog = MDCDialog.attachTo(document.querySelector('.mdc-dialog'));
        dialog$.next(dialog)
    }, 500)
   
    dialog$
        .map((dialog) => {
            
            const evt$ = sources.DOM.select('a')
            .events('click')
            .subscribe({
                next:(evt)=>{
                    let userId = evt.target.id
                    dialog.show()
                    console.log(userId)
                },
                error:()=> { },
                complete: () => {}
            })
            
        }).subscribe()
    const response$ = sources.HTTP
        .select('users')
        .flatten()
        .map(res => {
            setTimeout(() => {
                const surfaces = document.querySelectorAll('.surface');
                Array.from(surfaces).forEach((surface) => {
                    const ripple = new MDCRipple(surface);
                })
            }, 200)
            return res.body.map(user => user)
        })

    return {
        DOM: response$
            .map((users) => {
                const childs = users.map((user) =>
                    <a id={user.id} className="mdc-list-item surface">
                        <i className="material-icons mdc-list-item__start-detail" >account_circle</i>
                        {user.name}
                    </a>)
                return (
                    <div className="centered">

                        <aside className="mdc-dialog">
                            <div className="mdc-dialog__surface">
                                <footer className="mdc-dialog__footer">
                                    <button type="button"
                                        className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Decline</button>
                                    <button type="button"
                                        className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept mdc-dialog__action">Accept</button>
                                </footer>
                            </div>
                        </aside>

                        <h1 className="mdc-typography--display3">Users</h1>
                        <nav className="mdc-list">
                            {childs}
                        </nav>
                    </div>
                )
            }
            )
    }
}

import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import '../../node_modules/@material/toolbar/dist/mdc.toolbar.min.css'
import '../../node_modules/@material/button/dist/mdc.button.min.css'
import { MDCRipple } from '@material/ripple'
import { MDCToolbar } from '@material/toolbar'

export default function (sources) {
    setTimeout(() => {
        let toolbar = MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'))
        toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust')
        let buttons = document.querySelectorAll('.button-ripple')
        Array.from(buttons).forEach((surface) => new MDCRipple(surface))
    }, 500)
    return {
        DOM: xs.of(
            <header className="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior mdc-toolbar--flexible-space-maximized">
                <div className="mdc-toolbar__row">

                <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
  
                    <span attrs-data-link="/" className="mdc-toolbar__title" attrs-style="font-size: 2.125rem;"> 
                    Thoune
                    </span>
                </section>


                <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
                    <a className="mdc-button" attrs-data-link="/users">
                        USERS
                    </a>
                </section>                
                </div>
            </header>
        )
    }
}
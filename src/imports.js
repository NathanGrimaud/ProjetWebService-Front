import {html} from 'snabbdom-jsx'
import xs from 'xstream'
import '../node_modules/@material/list/dist/mdc.list.min.css'
import '../node_modules/@material/ripple/dist/mdc.ripple.min.css'
import '../node_modules/@material/typography/dist/mdc.typography.min.css'
import '../node_modules/@material/dialog/dist/mdc.dialog.min.css'
const imports = xs.of(
<div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
    <link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.css"/>
    <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.js"></script>
</div>
)
export default imports

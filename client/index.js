/**
 * Created by vnguyen on 8/31/16.
 */
import './global.scss';
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
//React redux, router
import {Provider} from 'react-redux'
import {Router, Route, useRouterHistory, IndexRedirect} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import createHashHistory from 'history/lib/createHashHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';
import {createStore} from './stores';
import {actionTypes} from './constants';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const store = createStore();
const history = syncHistoryWithStore(
    useRouterHistory(createHashHistory)({queryKey: false}),
    store
);
class Container extends Component {
    render() {
        return this.props.children
    }
}
Container.childContextTypes = {
    store: PropTypes.object
};
Container.contextTypes = {
    store: PropTypes.object
};
render(
    <Provider store={store}>
        <Router history={history}>
            {/**
             This wrapper is just so I can force the first route to need  a param
             */}
            <Route path="/" component={App}>
                <Route path=":screen_name" component={App}/>
                <IndexRedirect to="/@NitroHQ"/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("content")
);
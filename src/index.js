import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// redux stuff
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/root"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export const AppProvider = () => {
	return <Provider store={store}></Provider>
}

ReactDOM.render(
	<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

import { combineReducers } from 'redux';
import decklistReducer from './decklistReducer';
import loginReducer from './loginReducer';

export default combineReducers({
	deck: decklistReducer,
	login: loginReducer
})
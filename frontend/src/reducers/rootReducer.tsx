import { combineReducers } from 'redux';
import decklistReducer from './decklistReducer';

export default combineReducers({
	deck: decklistReducer
})
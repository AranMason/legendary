import { GetUser, ClearUser, RetrievingUser } from '../actions/loginActions';

const defaultState = {
	user: null,
	retrievingUser: false
}

export default (state = defaultState, action: any) => {

	console.log(action);

	switch(action.type){
		case GetUser: {
			return {
				...state,
				user: action.user,
				retrievingUser: false
			}
		}
		case ClearUser: {
			return {
				...state,
				user: null,
				retrievingUser: false
			}
		}
		case RetrievingUser: {
			return {
				...state,
				retrievingUser: true
			}
		}
		default: {
			return state
		}
	}
}
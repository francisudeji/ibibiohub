import { SET_POSTS, CREATE_POST } from "../actions/actionCreators"

export default function posts (state = [], action = {}) {
	switch(action.type) {
		case SET_POSTS:
			return [
				...state,
				action.payload
			]
			break;
		case CREATE_POST: 
			return [
				...state,
				action.payload
			]
			break;
		default:
		 return state;
	}
}
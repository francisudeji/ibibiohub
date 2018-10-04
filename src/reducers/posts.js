import { SET_POSTS, CREATE_POST } from "../actions/actionCreators"
export default function posts (state = [], action = {}) {
	// const { CREATE_POST, READ_POST, UPDATE_POST, DELETE_POST } = constants
	switch(action.type) {
		case SET_POSTS:
			return [
				...state,
				action.payload
			]
		case CREATE_POST: 
			return [
				...state,
				action.payload
			]
		default:
		 return state;
	}
}
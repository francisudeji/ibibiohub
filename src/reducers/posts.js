import { SET_POSTS, CREATE_POST, DELETE_POSTS, GET_POSTS } from "../actions/actionCreators"

export default function posts (state = [], action = {}) {
	switch(action.type) {

		case GET_POSTS:
			return [...state]
			break;
		
		case SET_POSTS:
			let i = state.findIndex(el => el.id === action.payload.id)

			if(i === -1) {
				return [...state, action.payload]
			}
			return state
			break;

		case CREATE_POST: 
			return [
				...state,
				action.payload
			]
			break;

		case DELETE_POSTS: 
			return [
				...state.filter(prop => prop !== action.payload),
				action.payload
			]

		default:
		 return state;
	}
}
const constants = {
	CREATE_POST: "ADD_POST",
	READ_POST: 'READ_POST',
	UPDATE_POST: "UPDATE_POST",
	DELETE_POST: "DELETE_POST"
}

export default function posts (state = [], action = {}) {
	// const { CREATE_POST, READ_POST, UPDATE_POST, DELETE_POST } = constants
	switch(action.type) {
		//case CREATE_POST:
			// return [
			// 	...state,
			// 	action.payload
			// ]
		default:
		 return state;
	}
}
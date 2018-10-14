export const SET_POSTS = "SET_POSTS"
export const CREATE_POST = "CREATE_POST"
export const DELETE_POSTS = "DELETE_POSTS"
export const GET_POSTS = "GET_POSTS"

export function deletePosts(emptyPost) {
	return {
		type: DELETE_POSTS,
		payload: emptyPost
	}
}

export function addPosts(post) {
	return {
		type: CREATE_POST,
		payload: post
	}
}

export function setPosts(posts) {
	return {
		type: SET_POSTS,
		payload: posts
	}
}

export function getPosts() {
	return {
		type: GET_POSTS
	}
} 

export function fetchPosts(db) {
	return dispatch => {
		db.collection('blog-posts').orderBy('postCreated').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        //dispatch(deletePosts(""));
        dispatch(setPosts({...doc.data(), id: doc.id}));
      });
    });
	}
}
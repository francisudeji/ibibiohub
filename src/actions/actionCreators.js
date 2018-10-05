export const SET_POSTS = "SET_POSTS"
export const CREATE_POST = "CREATE_POST"

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

export function fetchPosts(db) {
	return dispatch => {
		db.collection('blog-posts').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch(setPosts({...doc.data(), id: doc.id}));
      });
    });
	}
}
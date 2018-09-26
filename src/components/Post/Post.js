import React from "react"
import {Link} from "react-router-dom"

const Post = props => {
	const {postTitle, postAuthor, postBody, postSlug, postCreated} = props.post
	console.log(props.post)
	return(
		<div className="col-xs-12 col-sm-3 col-md-3 mb-3">
			<div className="card">
				<div className="card-header">
					<h4 style={{ fontWeight: 400 }}>{postTitle}</h4> 
					by <strong>{postAuthor}</strong> on {postCreated}
				</div>
				<div className="card-body">
					{postBody}
				</div>
				<div className="card-footer" style={{ backgroundColor: "#fff" }}>
					<Link to={`/blog/${postSlug}`} post={props.post} className="btn btn-danger">
						Read More
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Post;
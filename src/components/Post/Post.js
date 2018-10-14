import React from "react"
import {Link} from "react-router-dom"
import renderHTML from "react-render-html"

const Post = props => {

	const { postTitle, postAuthor, postBody, postSlug, postCreated, id } = props.post

	return (
	
		<div className="col-xs-12 col-sm-4 col-md-4 mb-3 d-flex align-items-stretch">
			<div className="card" style={{ width: "100%" }}>
				<div className="card-header">
					<h6 style={{ fontWeight: 400 }}>{postTitle !== undefined ? postTitle : null}</h6> 
					<span className="text-muted">by <strong>{postAuthor !== undefined ? postAuthor : null}</strong> on {postCreated}</span>
				</div>
				<div className="card-body text-muted">
					{postBody !== undefined ? renderHTML(postBody.substring(0, 100)+ "...") : null}
				</div>
				<div className="card-footer" style={{ backgroundColor: "#fff" }}>
					<Link to={`/blog/${postSlug !== undefined ? postSlug : null }/${id}`} post={props.post} className="btn btn-danger">
						Read More
					</Link>
				</div>
			</div>
		</div>
	)


	
};

export default Post;
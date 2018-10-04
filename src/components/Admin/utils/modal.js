import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const App = {

	modules: {
		toolbar: [
	    [{ header: '1' }, { header: '2' }, { font: [] }],
	    [{ size: [] }],
	    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
	    [{ list: 'ordered' }, { list: 'bullet' }],
	    ['link', 'image', 'video'],
	    ['clean'],
	    ['code-block']
	  ]
	},

	formats: [
	  'header',
	  'font',
	  'size',
	  'bold',
	  'italic',
	  'underline',
	  'strike',
	  'blockquote',
	  'list',
	  'bullet',
	  'link',
	  'image',
	  'video',
	  'code-block'
	]
	
}

const Modal = props => {

	const { modalTitle, postTitle, postAuthor, postBody, change, onTitleAndAuthorChange, onBodyChange, onBlogPostSubmit } = props

	return (
		<div className="modal fade" id="blogModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div style={{ maxWidth: "768px" }} className="modal-dialog" role="document">
	    <div className="modal-content">
	      <div className="modal-header">
	        <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
	        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div className="modal-body">
	        <form onSubmit={onBlogPostSubmit}>
					  <div className="form-group">
					    <label htmlFor="post-title">Post Title</label>
					    <input type="text" className="form-control" id="post-title" placeholder="Enter Post Title" name="postTitle" value={postTitle} onChange={e => onTitleAndAuthorChange(e)}/>   
					  </div>
					  <div className="form-group">
					    <label htmlFor="post-author">Post Author</label>
					    <input type="text" className="form-control" id="post-author" placeholder="Enter Post Author" name="postAuthor" value={postAuthor} onChange={e => onTitleAndAuthorChange(e)}/>   
					  </div>
					  <div className="form-group">
					    <label htmlFor="post-author">Post Body</label>
					    <ReactQuill
					    	value={postBody}
					    	placeholder="Type Post Content"
					    	onChange={e => onBodyChange(e)}
								formats={App.formats}
					    	modules={App.modules}
							/>
					  </div>
					  <button type="submit" className="btn btn-primary btn-block">Publish</button>
					</form>
	      </div>
	    </div>
	  </div>
	</div>)
}


export default Modal;
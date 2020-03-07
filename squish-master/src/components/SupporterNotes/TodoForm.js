import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class TodoForm extends Component {

  doSubmit = (e) => {
    e.preventDefault();
    const task = ReactDOM.findDOMNode(this.refs.task).value.trim();
    if (!task) {
      return
    }
    this.props.onTaskSubmit(task)
    ReactDOM.findDOMNode(this.refs.task).value = '';
    return
  }

  render() {
    return(
      <div className="commentForm vert-offset-top-2">
				<hr />
				<div className="clearfix">
					<form className="todoForm form-horizontal" onSubmit={this.doSubmit}>
						<div className="form-group">
							{/* <label htmlFor="task" className="col-md-2 control-label">Task</label> */}
							<div className="col-xs-10">
								<input type="text" id="task" ref="task" className="form-control" placeholder="What do you need to do?" />
							</div>
              <div className="col-xs-2">
              <center> <input type="submit" value="Add Note" id="note-submit-button" className="btn btn-primary" /> </center>
              </div>
						</div>
						{/* <div className="row">
							<div className="col-md-10 col-md-offset-2 text-right">
								<input type="submit" value="Save Item" className="btn btn-primary" />
							</div>
						</div> */}
					</form>
				</div>
			</div>
    )
  }
}

export default TodoForm
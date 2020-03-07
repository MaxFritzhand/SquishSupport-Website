import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'


class TodoItem extends Component {

  removeNode = (e) => {
    e.preventDefault();
    this.props.removeNode(this.props.nodeId)
  }

  toggleComplete = (e) => {
    e.preventDefault();
    this.props.toggleComplete(this.props.nodeId)
  }
  updateClass = () => {

  }

  render() {
    // Maybe let?
    let classes = "list-group-item clearfix"
    if (this.props.complete === 'true') {
      classes = classes + 'list-group-item-success'
    }
    return(
      <li className={classes}>
        <Row className="notes-row">
          <Col xs={12} sm={12} md={6}>
            {this.props.task}
          </Col>
          <Col xs={12} sm={12} md={6} id="notes-buttons">
            <button type="button" className="btn btn-success notes-button-sizing" onClick={this.toggleComplete}><div>&#x2713;</div></button> 
            <button type="button" className="btn btn-danger notes-button-sizing" id="notes-remove" onClick={this.removeNode}><div>&#xff38;</div></button>
          </Col>
        </Row>
      </li>
    )
  }
}

export default TodoItem
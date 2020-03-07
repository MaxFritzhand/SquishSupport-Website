import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {

  removeNode = (nodeId) => {
    this.props.removeNode(nodeId)
    return;
  }

  toggleComplete = (nodeId) => {
    this.props.toggleComplete(nodeId)
    return;
  }

  render() {
    const listNodes = this.props.data.map(listItem => <TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} /> )
    return (
      <ul className="list-group">
        {listNodes}
      </ul>
    )
  }
}

export default TodoList
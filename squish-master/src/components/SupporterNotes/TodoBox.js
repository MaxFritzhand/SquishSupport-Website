import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

class TodoBox extends Component {
  constructor() {
    super() 
    this.state = {
			data: [
				{"id":"00001","task":"Wake up","complete":"false"},
				{"id":"00002","task":"Eat breakfast","complete":"false"},
        {"id":"00003","task":"Go to work","complete":"false"}
			]
    }
  }

  generateId = () => {
    return Math.floor(Math.random()*90000) + 10000;
  }

  handleNodeRemoval = (nodeId) => {
    let data = this.state.data
    data = data.filter(el => el.id !== nodeId)
    this.setState({
      data: data
    })
    // necessary with arrow?
    return
  }

  handleSubmit = (task) => {
    let data = this.state.data
    let id = this.generateId().toString()
    let complete = 'false'
    data = data.concat([{id, task, complete}])
    this.setState({
      data: data
    })
  }

  handleToggleComplete = (nodeId) => {
    let data = this.state.data
    for (let i in data) {
      if (data[i].id == nodeId) {
        data[i].complete = data[i].complete === 'true' ? 'false' : 'true'
        break
      }
    }
    this.setState({
      data: data
    })
  }


  render() {
    return(
      <div id="patient-notes-module">
        <center> <h1>Patient Notes</h1> </center>
        <TodoList data={this.state.data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete}/>
        <TodoForm onTaskSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default TodoBox
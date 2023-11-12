
import {Component} from 'react'

import{ v4 as uuidv4 } from 'uuid'

import Task from '../Task'

class TodoHome extends Component{
    constructor(){
        super()
        let tasks = localStorage.getItem('tasks')
        tasks = ['read book']
        this.state={ tasks, inputValue:''}
    }

    changeInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }

    addTask = ()=>{
        const {inputValue, tasks } = this.state 
        tasks.push(String(inputValue)) 
        this.setState({tasks, inputValue:''})
        
    }

    render(){
        const {tasks , inputValue} = this.state
        return <div>
        <h1>Todos Application</h1>
        <input value={inputValue} type='text' placeholder='Enter the task ...!' onChange={this.changeInput} />
        <button type='button' className='ml-2 btn btn-primary' onClick={this.addTask}>Add Task</button>


        <h2>Tasks</h2>

        {
            tasks.map((item)=><Task key={uuidv4()} data={item} />)
        }
    </div>
    }
}




export default TodoHome

import {Component} from 'react'

import{ v4 as uuidv4 } from 'uuid'

import Task from '../Task'

class TodoHome extends Component{
    constructor(){
        super()
        let tasks = localStorage.getItem('tasks')
        tasks = [{task:'read book' , id:uuidv4() , completed:false}]
        this.state={ tasks, inputValue:''}
    }

    changeInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }

    addTask = ()=>{
        const {inputValue, tasks } = this.state 
        const newTask = {id:uuidv4() , task:inputValue , completed:false}
        tasks.push(newTask) 
        this.setState({tasks, inputValue:''})
        
    }

    changeStatus = (selectedId)=>{
       
        this.setState((p)=>({
          tasks: p.tasks.map((item)=>{
            if(item.id === selectedId){
                
               
                return {...item , completed : !item.completed}
            }

            return item
          })
             } ))

 
    }

    render(){
        const {tasks , inputValue} = this.state
        
        return <div>
        <h1>Todos Application</h1>
        <input value={inputValue} type='text' placeholder='Enter the task ...!' onChange={this.changeInput} />
        <button type='button' className='ml-2 btn btn-primary' onClick={this.addTask}>Add Task</button>


        <h2>Tasks</h2>

        {
            tasks.map((item)=><Task key={item.id} data={item} func={this.changeStatus} />)
        }
    </div>
    }
}




export default TodoHome
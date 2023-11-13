
import {Component} from 'react'

import{ v4 as uuidv4 } from 'uuid'

import Task from '../Task'

// localStorage.removeItem('tasks')

class TodoHome extends Component{
    constructor(){
        super()
        let tasks = localStorage.getItem('tasks')
        tasks = JSON.parse(tasks)
      
        this.state={ tasks, inputValue:''}
    }

    changeInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }

    addTask = ()=>{
        let {inputValue, tasks } = this.state 
        const newTask = {id:uuidv4() , task:inputValue , completed:false}
        if(tasks === null){
            tasks = []
        }
        tasks.push(newTask) 
       
        this.setState({tasks, inputValue:''})
        
    }

    removeTask = (selectedId)=>{
        const {tasks} = this.state
        function finder(task){
            return task.id === selectedId
        }
      const index = tasks.findIndex(finder)
        tasks.splice(index, 1)
        this.setState({tasks})
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

    savetoLstorage = ()=>{
let {tasks }= this.state 
tasks = JSON.stringify(tasks)
localStorage.setItem('tasks' , tasks)
    }

    render(){
        const {tasks , inputValue} = this.state
        
        return <div>
        <h1>Todos Application</h1>
        <input value={inputValue} type='text' placeholder='Enter the task ...!' onChange={this.changeInput} />
        <button type='button' className='ml-2 btn btn-primary' onClick={this.addTask}>Add Task</button>


        <h2>Tasks</h2>

        { tasks !== null ?
            tasks.map((item)=><Task key={item.id} data={item} changeFunc={this.changeStatus} deleteFunc={this.removeTask} />) : 
            <p>Nothing to show here at the moment</p>
        }
        <button className='btn btn-primary' type='buuton' onClick={this.savetoLstorage}>Save</button>
    </div>
    }
}




export default TodoHome
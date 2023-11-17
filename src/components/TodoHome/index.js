
import {Component} from 'react'

import { TailSpin} from 'react-loader-spinner'

import{ v4 as uuidv4 } from 'uuid'

import Task from '../Task'

// localStorage.removeItem('tasks')

class TodoHome extends Component{
    constructor(){
        super()
        // let tasks = localStorage.getItem('tasks')
        // tasks = JSON.parse(tasks)
      
        this.state={ tasks:[], inputValue:''}
    }

componentDidMount(){

    this.fetchDetails()
}

fetchDetails =async ()=>{
    const url = 'https://todos-node-backend.vercel.app/'
    const options = {
        method:'GET',
        
    }
    const result = await fetch(url , options)
    const parsedResult = await result.json()
    
    this.setState({tasks:parsedResult})

}

    changeInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }

    addTask = ()=>{
        let {inputValue, tasks } = this.state 
        const newTask = {id:uuidv4() , task:inputValue , STATUS:0}
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
                
               
                return {...item , STATUS : !item.STATUS}
            }

            return item
          })
             } ))

 
    }

    savetoDB = async ()=>{
            let {tasks }= this.state 
            // tasks = JSON.stringify(tasks)
            console.log(tasks)
            const url = `https://todos-node-backend.vercel.app/tasks`
            const options = {
                     method:'POST',
                     headers:{
                            'Content-Type':'application/json',
                           

                            },
                     body:JSON.stringify(tasks)

                            }
            const result = await fetch(url , options)
            console.log(result.status)

            //localStorage.setItem('tasks' , tasks)
    }

    render(){
        const {tasks , inputValue} = this.state
        
        return <div>
        <h1>Todos Application</h1>
        <input value={inputValue} type='text' placeholder='Enter the task ...!' onChange={this.changeInput} />
        <button type='button' className='ml-2 btn btn-primary' onClick={this.addTask}>Add Task</button>


        <h2>Tasks</h2>
        {
        tasks.length === 0?
      
      <TailSpin className='p-2' color='black' height={50} width={50} /> : ''
        }
        { tasks !== null ?
            tasks.map((item)=><Task key={item.id} data={item} changeFunc={this.changeStatus} deleteFunc={this.removeTask} />) : 
            <p>Nothing to show here at the moment</p>
        }
        <button className='btn btn-primary' type='buuton' onClick={this.savetoDB}>Save</button>
    </div>
    }
}




export default TodoHome
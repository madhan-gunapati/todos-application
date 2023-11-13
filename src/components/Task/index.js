import {Component} from 'react'

class Task extends Component{
    constructor(props){
        super()
       //constructor will not be initialized in re render
        
    }

   

        render(){
            const {data , changeFunc , deleteFunc} = this.props
            const {id, task ,completed } = data
         
            return <div className="d-flex flex-row align-items-center">
            <input id={id} type='checkbox' checked={completed} onChange={()=>{changeFunc(id)}}  />
             <label htmlFor={id} className={completed?"text-decoration-line-through"  :""}  >{task}</label>
              
               
                <button type='button' className="ml-2 btn btn-primary" onClick={()=>{deleteFunc(id)}}>Delete</button>
                
                </div>
        }
    }





export default Task
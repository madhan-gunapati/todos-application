const Task = (props)=>{
    const {data} = props
   
    return <div className="d-flex flex-row">  <p>{data}</p> <button type='button' className="ml-2 btn btn-primary">Delete</button></div>
}


export default Task
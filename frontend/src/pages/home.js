import axios from 'axios';
import React, { useEffect, useState } from 'react';
import configs from '../config';

export const Home = () => {
    useEffect(() => {
        loadTodos();
    },[]);

    const [todos,setTodos] = useState([]);
    const [create,setCreate] = useState(false);
    const [update,setUpdate] = useState(false);
    const [title,setTitle] = useState('');
    const [detail,setDetail] = useState('');
    const [actionId,setActionId] = useState(null);


    function closePupup(){
        setTitle('');
        setDetail('');
        setCreate(false);
        setUpdate(false);
    }
    
    function loadTodos(){
        axios.get(configs.api_base_url).then(res => {
            if(res.data.status)
            setTodos(res.data.data);
            else
            alert(res.data.message);
        }).catch(er => {
            console.log(er.message);
            alert("something went wrong");
        })
    }

    function createTodo(){
        const payload = {
            "title" : title,
            "text" : detail
        }
        axios.post(configs.api_base_url+'create',payload).then(res => {
            if(res.data.status){
                loadTodos();
                setTitle('');
                setDetail('');
                setCreate(false);
            }
            else
            alert("Failed: "+res.data.message);
        }).catch(er => {
            console.log(er.message);
            alert("Error: Somehting Went Wrong")
        })
    }
    function initiateUpdate(todo){
        setActionId(todo._id);
        setTitle(todo.title);
        setDetail(todo.text);
        setUpdate(true);
    }

    function updateTodo(){
        const payload = {
            "id" : actionId,
            "title" : title,
            "text" : detail
        }
        axios.post(configs.api_base_url+'update',payload).then(res => {
            if(res.data.status){
                loadTodos();
                setTitle('');
                setDetail('');
                setUpdate(false);
            }
            else
            alert("Failed: "+res.data.message);
        }).catch(er => {
            console.log(er.message);
            alert("Error: Somehting Went Wrong")
        })
    }

    function deleteTodo(id){
        if(window.confirm("Are you sure you want to delete?")){
            axios.get(configs.api_base_url+'delete/'+id).then(res => {
                if(res.data.status)
                loadTodos();
                else
                alert("Failed: "+res.data.message);
            }).catch(er => {
                console.log(er.message);
                alert("Error: Somehting Went Wrong")
            })
        }
    }

    return (
        <div className='w-50 mx-auto'>
            {
                todos.length===0?
                    <div className='text-muted text-center'>No Todos Yet</div>
                :todos.map((todo,index) => {
                    return (
                        <div className='single-todo px-4 py-2 bg-dark mb-2 w-100 rounded-3 d-flex justify-content-between'>
                            <div>
                                <h5 className='text-white wb-all'>{todo.title.substring(0,30)}</h5>
                                <p className='text-white mb-0 wb-all'>{todo.text}</p>
                                <p className='text-muted mt-2 mb-0'>{new Date(todo.time).toLocaleString()}</p>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn bg-primary btn-sm mx-1' onClick={()=> initiateUpdate(todo)}>Edit</button>
                                <button className='btn bg-danger btn-sm mx-1' onClick={() => deleteTodo(todo._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            <button className='btn btn-dark mx-auto d-block text-center mt-4' onClick={()=>setCreate(true)}>Add New +</button>
            {
                create || update?
                <div className='popup'>
                    <div style={{"width":"500px"}}>
                        <h4 className='text-center'>{update?"Edit":"New"} Todo</h4>
                        <div className='mt-2'>
                            <input onChange={(event) => setTitle(event.target.value)} value={title} type="text" className='form-control' placeholder='Enter Title'/>
                            <textarea onChange={(event) => setDetail(event.target.value)} value={detail} rows="3" className='form-control mt-2' placeholder='Enter Detail'></textarea>
                            <div className="mt-3 text-center">
                                {
                                    create?<button className="btn bg-success btn-sm mx-1" onClick={() => createTodo()}>Create</button>
                                    :<button className="btn bg-success btn-sm mx-1" onClick={() => updateTodo()}>Update</button>
                                }
                                <button className="btn bg-secondary btn-sm mx-1" onClick={() => closePupup()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                :''
            }
        </div>
    );
}
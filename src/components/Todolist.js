import React, { useEffect, useState } from 'react';
import './Todolist.css';
const getLocalItems = () => {
    let lists = localStorage.getItem('list');
    if (lists) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}
function Todolist() {
    const [inputList, setinputList] = useState();
    const [items, setItems] = useState(getLocalItems());
    const [status,setStatus]=useState('All');
    const [filterTodos,setFilterTodos]=useState([]);
    console.log(items);
    document.body.style.background = "black";
    const theme = () => {
        var image = document.getElementById('change1');
        if (image.src.match("images/icon-sun.svg")) {
            image.src = "images/icon-moon.svg";
        }
        else {
            image.src = "images/icon-sun.svg";
        }
        var imagee = document.getElementById('change2');
        if (imagee.src.match("images/bg-desktop-dark.jpg")) {
            imagee.src = "images/bg-desktop-light.jpg";
        }
        else {
            imagee.src = "images/bg-desktop-dark.jpg";
        }
        if (document.body.style.background === "black") {
            document.body.style.background = "white";
        }
        else {
            document.body.style.background = "black";
        }
    }
    const itemEvents = (event) => {
        setinputList(event.target.value);
    }
    const addList = () => {
        setItems([...items,{text:inputList,completed : false ,id:new Date().getTime()}]);
    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items))
        filterHandler();
    }, [items,status])
    const checkBox = (ind) => {
      const newId =items.map((el) => {
          if(el.id === ind){
              return {...el, completed :!el.completed};
          }
          else{
                return el;
          }
      })
      setItems(newId);
    }
    const deletee = (id) => {
        const updatedItems=items.filter((elem,ind)=>{
            return ind !== id;
        });
            console.log('hi');
            console.log(id);
            setItems(updatedItems);
    }
    const setHandeler = (e) =>{
        setStatus(e.target.textContent);
    }
    const filterHandler = () =>{
        switch(status){
            case 'Completed' :
                setFilterTodos(items.filter(el => el.completed === true));
                break;
            case 'Active' :
                setFilterTodos(items.filter(el => el.completed === false));
                break;
            default:
                setFilterTodos(items);
    }
    }
    return (
        <>
            <div className='image'>
                <img src="images/bg-background-dark.jpg" id="change2" alt="" />
            </div>
            <div className="parent">
                <h1>
                    TODO <span id='light' onClick={theme}
                    ><img src="images/icon-sun.svg" id="change1" alt="" />
                    </span>
                </h1>
                <div className="input">
                    <input type="text" placeh a new placeholder='Create a new todo...' onChange={itemEvents}  id='noo'/>
                    <button onClick={addList}>+</button>
                </div>

            </div>
            <div className="entry">
                <ol className='ol'>

                    {filterTodos.map((itemVal, ind) => {
                        return <li key={ind} className='list-item'>
                            <input  type="checkbox" className='check' value=""  id="check"  
                            checked={itemVal.completed} onClick={() => checkBox(itemVal.id)} /> 
                           
                          
                            <span style={itemVal.completed?{textDecoration:"line-through"}:null}>{itemVal.text}</span>
                            <img src="images/icon-cross.svg" onClick={()=>deletee(ind)} alt="" />
                        </li> 
                    })}
                </ol>

            </div>
            <div className="function">
                <span onClick={setHandeler}>All</span>
                <span onClick={setHandeler}>Active</span>
                <span onClick={setHandeler}>Completed</span>
            </div>
        </>
    )
}

export default Todolist

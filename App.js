import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';

export default function App() {

  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  const getTodosByUserId = (user_id, todos) => {
    return todos.filter(t => t.userId === user_id);
  }

  useEffect( () => {

    Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/todos")
    ])
      .then( res => {
        setUsers( res[0].data );
        setTodos( res[1].data );
      })
      .catch( error => {
        console.log( error );
      })

  }, [] );

  return (
    <div className="App">
      <header className="select-header">
        <div>
          {
            users.map( (user, index) => {
              return <React.Fragment key={index}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                          <div>
                          <h3>Todo list: </h3>
                            {
                              getTodosByUserId(user.id, todos).map( (todo, index) => {
                                return <React.Fragment key={index}>
                                        <li>{todo.title} | <b>Completed:</b> <span style={ { color:  todo.completed === true ? "green" : "red" }  } >{todo.completed.toString()}</span></li>
                                      </React.Fragment>
                              })
                            }
                          </div>
                        <hr />
                      </React.Fragment>
            })
          }
        </div>
      </header>
    </div>
  );
};

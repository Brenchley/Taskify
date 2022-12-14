import React, { useState } from "react";
import { Todo } from "../mode";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { TodoList } from "./TodoList";

interface Props {
  // key: React.Key
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const [edit, setEdit] = useState<boolean>(false)
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e:React.FormEvent,id:number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => 
        todo.id === id ? {...todo, todo:editTodo }: todo
      )
    )
    setEdit(false);
  }

  return (
    <form className="todos__single" onSubmit={(e) => {
      handleEdit(e,todo.id)
    }}>
      {
        edit ? (
          <input className="todos__single--text" type="text" value={editTodo} onChange={
            (e) => setEditTodo(e.target.value)
            
          }/>
        ): (
          todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )
        )
      }
      
      <div className="">
        <span className="icon" onClick={() => {
          setEdit(!edit)
        }
        }>
          <AiOutlineEdit />
        </span>
        <span
          className="icon"
          onClick={() => {
            handleDelete(todo.id);
          }}
        >
          <AiOutlineDelete />
        </span>
        <span
          className="icon"
          onClick={() => {
            handleDone(todo.id);
          }}
        >
          <MdDone />
        </span>
      </div>
    </form>
  )
}

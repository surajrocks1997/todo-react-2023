import { useEffect, useState } from "react";
import {
    deleteToDoAPI,
    retrieveAllTodosForUsernameAPI,
} from "./api/ToDoAPIService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export function ListTodosComponent() {
    const authContext = useAuth();
    const username = authContext.username;
    const [todos, setTodos] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        refreshTodos();
    }, []);

    const refreshTodos = () => {
        retrieveAllTodosForUsernameAPI(username)
            .then((res) => {
                setTodos(res.data);
            })
            .catch((err) => console.log(err));
    };

    const updateToDo = (id) => {
        navigate(`/todo/${id}`);
    };

    const deleteToDo = (id) => {
        deleteToDoAPI(username, id)
            .then(() => {
                setDeleteMessage(`Delete of ToDo with ${id} is Successful`);
                refreshTodos();
                setTimeout(() => {
                    setDeleteMessage(null);
                }, 3000);
            })
            .catch((err) => console.log(err));
    };

    const addNewTodo = () => {
        navigate("/todo/-1")

    }

    return (
        <div className="container">
            <h1 className="m-5">Things you want To Do!!</h1>
            {deleteMessage && (
                <div className="alert alert-warning">{deleteMessage}</div>
            )}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => updateToDo(todo.id)}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => deleteToDo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New ToDo</div>
        </div>
    );
}

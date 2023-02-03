import { useQuery } from "react-query";
import fetchTodoList from "./fetchTodoList";

const Todo = () =>{

    const {data, isSuccess, isError, error, isLoading } = useQuery('todos',fetchTodoList)

    if(isLoading){
        return <span>isLoading...</span>
    }

    if(isSuccess){
        console.log(data);
    }

    if(isError){
        return <span>Error : {error.message}</span>
    }

    return(
        <div>
            <div>My TodoList</div>
            <ul>
                {data.map((todo)=>{
                    return <li id={todo.id}>{todo.title}</li>
                })}
            </ul>
        </div>
    )
}

export default Todo;
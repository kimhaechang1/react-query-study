import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query';

import axios from 'axios';

import fetchTodoList from './fetchTodoList';
import postTodo from './postTodo';

const Todos = () =>{

    // Access the client
    const queryClient = useQueryClient();

    // Queries
    const {data, isLoading, error}  = useQuery('todos', fetchTodoList
    ,{
        onSuccess : data=>{
            console.log(data);
        },
        onError: e=>{
            console.log(e.message);
        }
    });

    // Mutations
    const mutation = useMutation(postTodo, {
        onSuccess : ()=>{
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        }
    })

    return(
        <div>
            <button onClick={fetchTodoList}>dd</button>
            <ul>
                {!isLoading && (data.data.map(todo=>(
                    <li key={todo.id}>{todo.title}</li>
                )))}
            </ul>
            <button
                onClick={()=>{
                    mutation.mutate({
                        id:Date.now(),
                        title:'Do Laundary'
                    })
                }}
            >
                Add Todo
            </button>
        </div>
    )
}

export default Todos;
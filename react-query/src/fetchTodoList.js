import axios from "axios";


const fetchTodoList = () =>{
    const result = axios.get('/api/todos')
    return result;
}

export default fetchTodoList;
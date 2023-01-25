import axios from "axios"

const postTodo = (data) =>{
    const result = axios.post('/api/postTodos',data)
    return result
}

export default postTodo;
import axios from "axios";

/*
    using fetch API, async/await
    const fetchTodoList = async() =>{
        const result = await fetch('http://localhost:4000/todos',{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    
        if(result.status===200){
            const data = await result.json();
            return data;
        }        
    }

*/



const fetchTodoList =  () =>{
    
    /*
    using fetch API, then/catch
    const result =  fetch('http://localhost:4000/todos',{
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(
        (response)=> response.json()
    )*/
    
    const result = axios.get('http://localhost:4000/todos')
    .then(response=>response.data)
    return result;
}

export default fetchTodoList;
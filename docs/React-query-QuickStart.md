## Quick Start

여기서 간단하게 React-Query를 실습할 환경을 구축한다.

사용할 라이브러리

```json

    "axios": "^1.2.4",
    "json-server": "^0.17.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-query": "^3.39.2",
    "react-scripts": "5.0.1",

```
서버의 경우

json-server를 사용한다.

### json-server

```npm run start``` 로 설치하며

설치 한 루트폴더에 db.json을 생성 후

사용할 테이블 이름만 설정 해주면 끝이다.

```json

todos:[

]

```

설치가 끝난 뒤

Todos.js, fetchTodoList.js, deleteTodoList.js, postTodo.js를 생성한다.

그리고 아래의 코드를 Todos.js에 작성 한다.

```javascript
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query';

import axios from 'axios';

import deleteTodoList from './deleteTodoList';
import fetchTodoList from './fetchTodoList';
import postTodo from './postTodo';

const Todos = () =>{
    
    // Access the client
    const queryClient = useQueryClient();

    // Queries
    const { data, 
        isLoading, 
        error
    }  = useQuery('todos', fetchTodoList
    ,{
        onSuccess : data=>{
            console.log(data);
        },
        onError: e=>{
            console.log(e.message);
        }
    });

    // Mutations
    /*
    const mutation = useMutation(postTodo, {
        onSuccess : ()=>{
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        }
    })

    const mutation1 = useMutation(deleteTodoList,{
        onSuccess : ()=>{
            queryClient.invalidateQueries('todos')
        }
    })*/
    return(
        <div>
            <ul>
                {!isLoading && (data.data.map((todo)=>(
                    <>
                    <li key={todo.id}>{todo.title}</li>
                    </>
                )))
                }
            </ul>
        </div>
    )
}
```

마지막으로 App.js에 해당 컴포넌트를 추가하고 

QueryClient 객체 생성 후

해당 객체 변수를 ```<QueryClientProvider/>``` 컴포넌트의 ```client``` 속성에 넣어준다.

```javascript
import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import Todos from './Todos';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos/>
    </QueryClientProvider>
  );
}

export default App;
```

### Queries


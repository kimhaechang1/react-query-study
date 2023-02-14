## Queries

### Query Basics

쿼리는 특별한 키로 묶어져 있는 비동기적인 데이터 소스에 선언적 의존을 가진다. 

쿼리는 서버로부터 데이터를 fetch하기위한 어떠한 Promise 기반 메서드(GET과 POST 메소드들을 포함하고 있는)와도 함께 사용될 수 있다.

만약 너의 메서드가 서버에 있는 데이터를 변조한다면, 

우리는 Mutations를 사용하는것을 추천한다.

너의 컴포넌트 혹은 커스텀 hook에서 쿼리에 구독하기 위해서는

```useQuery``` 훅을 호출해야한다.

- 첫번째 인자 : 쿼리를 위한 유니크 키값을 가진다.

- 두번째 인자 : 프로미스 객체를 리턴하는 함수 :

    - Resolves the data, or

    - Throws an error

유니크 키는 너의 쿼리들을 내부적으로 refetching, 캐싱 그리고 공유하기 위해 사용된다.

우리 코드에서 해당 예제를 실행하기 위해서는

먼저 Todo.js에서 useQuery를 사용하는 부분을 찾으면

```javascript
    const info = useQuery('todos', fetchTodoList)
```
라 되어있고

첫 번째 인자는 ```'todos'```로서 쿼리에 대한 unique key 가 된다.

두 번째 인자는 프로미스 객체를 리턴하는 함수를 정의해야 한다.

해당 함수의 역할은

우리가 만들어놓은 ```json-server```에 있는 ```todos```를 받아와야 하기 때문에

```axios``` 혹은 ```fetch API```를 사용하여 비동기적으로 데이터를 받아온다.

```App.js```와 같은 경로에 ```fetchTodoList.js```파일을 생성하고 아래와 같은 코드를 작성한다.

```javascript
// fetch async/await을 사용 할 경우
const fetchTodoList = async () =>{
    const result = await fetch('http://localhost:4000/todos',{
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    
    if(result.status === 200 && result.ok){
        const data = await result.json();
        return data;
    }
}

// fetch then catch를 사용 할 경우
const fetchTodoList = () =>{
    const result = fetch('http://localhost:4000/todos',{
        method : "GET",
        headers : {
            'Content-type' : 'application/json'
        }
    }).then((response)=>response.json())
    return result;
}

// axios then을 사용 할 경우
const fetchTodoList = () =>{
    const result = axios.get('http://localhost:4000/todos')
    .then(response=>response.data)
    return result;
}
```
위와같은 비동기 API를 가지고 ```useQuery```에 의해 리턴된

쿼리 결과값들은 너가 해당 데이터의 어떠한 다른 사용법 및 템플릿 을 만들 필요 없이

쿼리에 대한 모든 정보를 포함하고 있다.

```info``` 객체는 생산성을 위해 알 필요가 있는 아주 중요한 몇가지 state들을 포함하고 있다.

하나의 쿼리는 어떠한 순간에서도 아래의 state들중 하나가 될 수 있다 :

- ```isLoading``` 혹은 ```status ==='loading'``` : 쿼리가 어떠한 데이터도 가지고 있지 않고 현재 fetching 중일 경우

- ```isError``` 혹은 ```status === 'error'``` : 쿼리가 에러를 맞닥뜨렸을 경우 

- ```isSuccess```혹은 ```status === 'success'``` : 쿼리가 성공적이며 데이터가 사용 가능할 경우

- ```isIdle``` 혹은 ```status === 'idle'``` : 쿼리가 현재 사용 불가능 할 경우

이러한 기본적인 states를 넘어서,

더많은 정보는 쿼리의 state에 따라 이용가능하다.

- ```error``` : 만약 쿼리가 ```isError```상태라면, 에러는 ```error```프로퍼티를 통해 사용 가능하다.

- ```data``` : 만약 쿼리가 ```success```상태라면, 데이터는 ```data```프로퍼티를 통해 사용 가능하다.

- ```isFetching``` : 어떠한 상태여도, 만약 쿼리가 refetching중이라면, ```isFetching``` 값은 ```true```가 된다.

대부분의 쿼리에 대하여,

일반적으로 ```isLoading```상태를 확인 한 다음 isError 상태를 확인하고, 

마지막으로 데이터를 사용 할 수 있다고 가정하고서

성공 상태를 렌더링하는것이 좋다.

따라서 우리의 코드를 깔끔하게 아래와 같이 수정한다.

```javascript
const { data, 
        isLoading, 
        isError,
        error
    }  = useQuery('todos', fetchTodoList);

if(isLoading){
    return <span>Loading</span>;
}

if(isError){
    return <span>Error : {error.message}</span>
}

return (
    <div>
        <div>My TodoList</div>
        <ul>
            {
                data.map((todo)=>{
                    <li key={todo.id}>{todo.title}</li>
                })
            }
        </ul>
    </div>
)
```
## QueryClient

우선 App.js 코드를 살펴보면

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
에서 ```QueryClient```와 ```QueryClientProvider```가 있는데

이러한 것들에 대해 알아 보는 문서이다.

### QueryClientProvider 와 useQueryClient

```QueryClientProvider```는 필요한 컴포넌트에 

```QueryClient```를 연결하고 제공하기 위한 컴포넌트이다.

필수 옵션으로는 ```client```가 있는데, 

자식 컴포넌트에 ```QueryClient```를 사용하기 위해 인스턴스 변수를 넘겨주는 용도로 사용된다. 

따라서 ```client``` 속성값에 QueryClient 인스턴스 변수를 넣어주면

필요한 컴포넌트에서 ```QueryClient```를 사용할 수 있게 된다.

```useQueryClient```는 자식 컴포넌트에서 ```QueryClient```를 꺼낼때 사용한다.

### QueryClient

```QueryClient```는 캐시와 상호작용 하기 위해 사용 된다.

```javascript
import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions : {
        queries : {
            staleTime : Infinity,
        }
    }
})
await queryClient.prefetchQuery('posts', fetchPosts);
```

옵션으로는 ```queryCache```, ```mutationCache```, ```defaultOptions``` 가 있다.

- ```defaultOption``` :
    - ```queryClient```를 사용하는 ```queries```와 ```mutations```대한 기본값을 정의

그러한 기본값들 중 주요 몇가지를 소개한다.

- ```refetchOnMount``` : 
    - default : ```true```
    - 쿼리의 새 인스턴스가 마운트 될때

- ```refetchOnWindowFocus``` :
    - default : ```true```
    - window가 다시 포커스 될 때

- ```refetchOnReconnect``` : 
    - default : ```true```
    - 네트워크가 끊어졌다가 다시 연결 되었을때

- ```staleTime``` : 
    - default : ```0```
    - 데이터가 stale 상태로 간주되는 시간(밀리초)
    - ```Infinity```로 설정하면 데이터는 영원히 stale 상태로 간주되지 않음
    - 데이터가 ```fresh``` 상태라면, 쿼리인스턴스가 새롭게 mount되어도 fetch는 일어나지 않는다.
    - 데이터가 한번 fetch 되고나서 ```staleTime```이 지나지 않았다면 unmount 후 mount 되어도 fetch가 일어나지 않는다.

- ```cacheTime``` : 
    - default : ```5 * 60 * 1000 = 5 minutes```
    - 사용되지않거나 비활성화된 캐시 데이터가 메모리에 남아있는 시간
    - 하나의 쿼리의 캐쉬가 사용되지않거나 비활성화 될때
    - 이 기간 후에 가비지콜렉터에 의해 수집된다.
    - 서로다른 캐쉬시간을 지정하면, 가장 긴 시간이 사용된다.
    - ```Infinity```로 설정하면 가비지 콜랙션을 사용할 수 없다.

- ```retry``` :
    - 만약 ```false```라면, 잘못된 쿼리들을 재시도 안 할 것이다.
    - 만약 ```true```라면, 잘못된 쿼리들을 무한히 재시도 할 것이다.
    - 만약 숫자값을 정해준다면, 잘못된 쿼리들을 잘못된 쿼리 카운트가 그 숫자와 같아질때 까지 재시도한다.

- ```select``` : 
    - 이 옵션은 쿼리 함수에 의해 리턴된 데이터의 일부를 선택하거나 가공하기 위해 사용된다.

- ```enabled``` : 
    - 자동으로 작동하는 쿼리를 사용 못하게 하기 위해서는 이 값을 ```false```로 설정해라.
    - 즉, ```useQuery```를 동기적으로 실행하는데 쓰이는 옵션으로
    - ```enabled : true```때에만 fetch를 진행하게 한다.
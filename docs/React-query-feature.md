## React-Query 특징

### Lagged Query Data

React Query는 다음번째 쿼리가 로드되는 동안 현재 존재하는 쿼리들의 데이터를 보기위한 방법을 제공합니다.

이러한 것은 새로운 쿼리가 요청될때마다 무거운 로딩을 보여주지 않기를 원하는

페이지네이션 UI 혹은 무한 스크롤 UI를 구현할 때 중요합니다.

다른 라이브러리들은 이러한 capability를 가지고 있지 않으며

새로운 쿼리가 로드되는 동안 새로운 쿼리에 대한 무거운 로딩을 렌더링해야 합니다.

### Render Optimization

React Query는 훌륭한 렌더링 성능을 가지고 있습니다.

오직 쿼리가 업데이트 될때만 컴포넌트를 리렌더링 합니다.

React Query는 또한 복수의 컴포넌트들이 같은 쿼리를 사용할 때 

오직 한번만 리렌더링 하도록 업데이트를 함께 배치합니다.

만약 너가 ```data```와 ```error``` 값에만 신경을 쓴다면,

너는 ```notifyOnChangeProps```를 ```['data','error']```로 설정함으로서 렌더링 횟수를 줄일 수 있습니다.

```notifyOnChangeProps : 'tracked'```로 설정하는것은 자동으로 엑세스 할 필드들을 추정하고 만약 그들중 하나만 바뀐다면 리렌더링 합니다.

### Partial query matching

React Query는 결정론적 쿼리키 시리얼라이제이션을 사용하기 때문에,

일치시킬 개별 쿼리키값을 알 필요 없이 쿼리들의 변수 그룹을 조작할 수 있습니다.

예를들면

변수에 관계없이 키값 속 todos가지고 시작하는 모든 쿼리를 가져올 수 있습니다.

변수들이나 혹은 중첩된 속성들을 가지고(혹은 없이) 특정 쿼리들을 지목할 수 있습니다.

필터함수를 사용하여 특정조건을 통과하는 쿼리만 일치시킬 수 있습니다.


### Pre-usage Query Configuration

이것은 사용되기전에 쿼리들과 형태변화들을 어떻게 동작 할 것인지 대해 설정하는것을 목적으로 한 이름입니다.

예를들어, 모든 사용에 대하여 fetcher 또는 옵션들을 전달 해야하는것 대신에,

쿼리는 사전에 기본값들로 구성 할 수 있으며 ```useQuery```만 사용하면 됩니다.

SWR은 기본 fetcher를 사전구성 함으로서 이러한 특징의 부분적인 형태를 가지고 있지만

쿼리 단위가 아니며 상태 변화(mutations)에 대해서도 그렇게 형태를 가지진 못합니다.


### Automatic Refetch after Mutation 

변화(mutations)이 일어날때 자동으로 refetching을 발생하려면

스키마속 개별적인 엔티티와 엔티티 타입들을 식별하는 방법을 알고있는 리이브러리를

필요로 합니다.

### Normalized Caching

React-Query, SWR 그리고 RTK-Query는 현재 high-level 데이터 중복을 피하기 위해 

flat한 아키택쳐에 엔티티를 저장하는것을 설명하는 자동 정규화된 캐싱을 지원하지 못합니다.

### React Router cache persistence

React Router는 현재 일치되는 라우트를 넘어선 데이터를 캐시하지 않습니다.

만약 라우트가 남아있다면, 데이터는 소멸됩니다.




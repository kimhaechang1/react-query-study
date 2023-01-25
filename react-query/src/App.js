import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import Example from './Example';
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

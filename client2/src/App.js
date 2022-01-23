import './App.css';
import { RecoilRoot } from 'recoil'
import Chat from './chat/Chat';

function App() {
  return (
    <RecoilRoot>
      <Chat />
    </RecoilRoot>
  );
}

export default App;

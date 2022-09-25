import './App.css';
import TaskContainer from './Task/TaskContainer';

function App() {
  return (
    <div className="app-component text-center align-middle">
    <h1 className='mb-5'>Employee Database</h1>
      <TaskContainer/>
    </div>
  );
}

export default App;

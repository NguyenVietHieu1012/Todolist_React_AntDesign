import TaskDetail from './components/TaskDetail';
import TaskManager from './components/TaskManager';
import MainLayout from './layouts/MainLayout';
import {Routes, Route} from 'react-router-dom';

function App() {
  return(
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TaskManager/>}></Route>
          <Route path="/detail/:id" element={<TaskDetail/>}></Route>
        </Routes>
      </MainLayout>
    </>
  );
}

export default App

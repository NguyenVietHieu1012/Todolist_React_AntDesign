import TaskDetail from './pages/TaskDetail';
import TaskManager from './pages/TaskManager';
import MainLayout from './layouts/MainLayout';
import {Routes, Route} from 'react-router-dom';

function App() {
  return(
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TaskManager/>}></Route>
          <Route path="/detail/:id" element={<TaskDetail/>}></Route> {/* :id để hiển thị id task trên thanh url */}
        </Routes>
      </MainLayout>
    </>
  );
}

export default App

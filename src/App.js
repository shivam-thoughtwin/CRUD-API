import './App.css';
import TodoList from './components/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/includes/Header';
import Signup from './components/Signup';
import Signin from './components/Signin';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

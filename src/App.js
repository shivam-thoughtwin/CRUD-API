import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/assets/loader.gif'
const TodoList = lazy(() => import('./components/TodoList'));
const Header = lazy(() => import('./components/includes/Header'));
const Signup = lazy(() => import('./components/Signup'));
const Signin = lazy(() => import('./components/Signin'));
// import TodoList from './components/TodoList';
// import Header from './components/includes/Header';
// import Signup from './components/Signup';
// import Signin from './components/Signin';


function App() {
  return (
    <>
      <Suspense fallback={<div className='loder'>
        <img src={Loader} alt="loader" />
      </div>}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<TodoList />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;

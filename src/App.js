import './App.css';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import HeroesTable from './pages/HeroesTable';
import LandingPage from './pages';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/heroes' element={<HeroesTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

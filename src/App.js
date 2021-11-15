import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import './App.css';

// const TestPage = (props) => {
//   let params = useParams();
//   let location = useLocation();
//   let navigate = useNavigate();

//   console.log('params: ', params);
//   console.log('location: ', location);
//   console.log('navigate: ', navigate);
  
//   return (  
//     <div>
//       <h1>TEST PAGE</h1>
//       <Link to={`/${location.pathname}/details`}>To dynamic</Link>
//       <button onClick={() => navigate('/')}>Go to home</button>
//       <button onClick={() => navigate('/hats')}>Go to hats</button>
//       <button onClick={() => navigate(-1)}>Go back</button>
//     </div>
//   );
// };

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
    <Link to="/">To home</Link>
  </div>
);

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop/hats' element={<HatsPage />} />
      </Routes>
    </div>
  );
}

export default App;

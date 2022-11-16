import {React, useState } from 'react';
import {Box} from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//component 
import Login from '../src/components/account/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CreatePost from './components/create/CreatePost'; 
import DetailPost from './components/details/DetailPost';
import UpdatePost from './components/create/updatePost';
import Account from './components/static/Account';
import Contact from './components/static/Contact';

import DataProvider from './context/DataProvider';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  //const token = sessionStorage.getItem('accessToken');
  return isAuthenticated ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/login' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <DataProvider>
        <Box style={{marginTop: 60}}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            {/* Private Routes Only for Authenticated User */}
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} /> }>
              {/* These are the outlets */}
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/details/:id' element={<DetailPost />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/update/:id' element={<UpdatePost />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/about' element={<Account />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </Box>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;

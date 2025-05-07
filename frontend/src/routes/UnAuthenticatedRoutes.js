import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Login from '../authView/Login';
// import Home from '../pages/Home/Home';
import { unAuthenticatedRoutesContant } from '../utils/menu.constant';
import Layout from '../layout/Layout';

function UnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route 
            path={unAuthenticatedRoutesContant.Login}
            element={ <Login /> }
        />
        {/* <Route 
            path={unAuthenticatedRoutesContant.Home}
            element={ <Home /> }
        /> */}
      </Route>
    </Routes>
  )
}

export default UnAuthenticatedRoutes
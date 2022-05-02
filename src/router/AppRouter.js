import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router, Link, Navigate} from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
  
  const dispatch = useDispatch();

  const {checking, uid} = useSelector( state => state.auth );
 // console.log(checking);

  useEffect( () => {

    dispatch( startChecking() );

  }, [dispatch] );

  if( checking ) {
    return (<h2>Loading...</h2>);
  }
  
  return (
    
        
      <div>
          <Routes>

              <Route 
                path="/login" 
                element={
                  <PublicRoute uid={uid} >
                    <LoginScreen/> 
                  </PublicRoute>
                } 
              />
              <Route 
                path="/*" element={ 
                        <PrivateRoute uid={uid}>
                          <CalendarScreen />
                        </PrivateRoute> 
                        }  
              />
             
          </Routes>
          {/* 
          
          // login going to login screen
          //exact / -Calendar going to calendar screen
          //* -Calendar going to calendar screen
          
          */}
      </div>
   
  )
}


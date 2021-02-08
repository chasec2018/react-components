import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Group } from '@material-ui/icons'
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'

//#region Test Components
import { ScreenOne, ScreenTwo, SignInButton, CopyrightFooter }  from './samples';
//#endregion

//#region Reusable Components
import Dashboard, { DashboardLink, DashboardHeader, DashboardFooter, IDashboardTheme } from './components/templates/dashboard';
//import DashboardLink from './components/templates/dashboard/Dashboard';
//#endregion


const App = () => {

  const [count, setCount] = useState(0);
  const [value, setValue] = useState("Pushed");

  const handleValue = () => {
    setCount(count + 1)
    setValue(`Pushed ${count}`)
  }


  return(
    
      <Dashboard brand='Administration Tool' logo={<Group />} >
        <DashboardHeader>
          <Button onClick={handleValue}>{value}</Button>
        </DashboardHeader>

        <DashboardLink routeTo="/screenOne" buttonText="Screen One" buttonIcon={null}  buttonColor="yellow">
          <ScreenOne /> 
        </DashboardLink>
        <DashboardLink routeTo="/screenTwo" buttonText="Screen Two" buttonIcon={null} >
          <ScreenTwo /> 
        </DashboardLink>

        <DashboardFooter>
          <CopyrightFooter companyLink='https://somewhere.org' companyTag='Some Tag'  />
        </DashboardFooter>
      </Dashboard>
  )
}

export default App;

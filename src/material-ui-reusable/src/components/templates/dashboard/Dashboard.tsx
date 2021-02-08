import clsx from 'clsx';
import React, { FC, useState, useMemo, forwardRef, Children, isValidElement, ReactElement } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Drawer, Box, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton, Container, Grid, Paper } from '@material-ui/core';
import { useDashboardStyle } from './DashboardStyle';
import { IDashboardTheme, IDashboard, IDashboardLink, IDashboardHeader, IDashboardFooter } from './types';
import { BrowserRouter as Router, Route, Switch, Link, LinkProps } from 'react-router-dom';

export const DashboardHeader: FC<IDashboardHeader> = ({children}) => <> {children} </>;


export const DashboardFooter: FC<IDashboardFooter> = ({children}) => <> {children} </>;


export const DashboardLink: FC<IDashboardLink> = ({routeTo, buttonText, buttonColor, buttonIcon}) => {

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
        <Link to={routeTo ?? ""} ref={ref} {...itemProps} />
      )),
    [routeTo],
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemIcon>{buttonIcon}</ListItemIcon>
      <ListItemText primary={buttonText} />
    </ListItem>
  );
}

export const Dashboard: FC<IDashboard> = ({children, brand, header, footer, logo, theme}) =>{


  const defaultThem: IDashboardTheme = { };
  const classes = useDashboardStyle(theme ?? defaultThem);
  const [open, setOpen] = useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{brand} </Typography>
          {/* <IconButton color="inherit" > */}
            {header ?? Children.map(children, child=> {
              if(isValidElement(child) && (child).type === DashboardHeader){
                const element = child as ReactElement<IDashboardHeader>
                const props = {...element.props}
              
                return props.children
              }
            })}
          {/* </IconButton> */}
        </Toolbar>
      </AppBar>
      
      <Router>
        <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}} open={open}>
          <div className={classes.toolbarIcon}>
            {logo}
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className={classes.chevronLeftIcon} /> 
            </IconButton>
          </div>

          <Divider className={classes.divider} />
          <List style={{color: classes.list}}>
            {Children.map(children, child => {
              if (isValidElement(child) && (child).type === DashboardLink) {
                  return child as ReactElement<IDashboardLink>;
            }})}  
          </List>
          <Divider className={classes.divider} />
        </Drawer>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Switch>
            {Children.map(children, (child, index) => {
              if(isValidElement(child) && (child).type === DashboardLink) {

                const element = child as ReactElement<IDashboardLink>;
                const props = {...element.props};
                
                return (
                  <Route key={index} path={props.routeTo} >
                    <Container className={classes.container}>
                      {props.children}
                        <Box pt={4}>
                          {footer ?? Children.map(children, child => {
                            if (isValidElement(child) && (child).type === DashboardFooter) {

                              const element = child as ReactElement<IDashboardFooter>;
                              const props = {...element.props};

                              return props.children
                            }
                          })}
                        </Box>
                    </Container>
                  </Route>
                )
            }})}
          </Switch>
        </main>
      </Router>
    </div>
  )
}

export default Dashboard;
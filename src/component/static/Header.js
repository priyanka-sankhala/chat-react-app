//import React,{Component,useEffect,useState} from 'react'
//import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"; //,Nav,NavDropdown
import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const Header = () => {
  const authUser = localStorage.getItem("isLoggedIn");

  const Menu = () => {
    if (authUser) {
      return (
        <>
         <Navbar tabs color="#4baee3" light expand="md">
          <NavbarBrand href="/">Chat</NavbarBrand>
          <NavbarToggler  />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Link className='nav-link' to="/user">User</Link>
              </NavItem>
              <NavItem>
              <Link className='nav-link' to="/user-list">User List</Link>
              </NavItem>
              <NavItem>
              <Link className='nav-link' to="/chat">Chat</Link >
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Todo
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Link className='nav-link' to="/todo-list">List</Link >
                  </DropdownItem>
                  <DropdownItem>
                  <Link className='nav-link' to="/todo-add">Add</Link >
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
         
        </>
      );
    } else {
      return <Link href="/login">Login</Link>;
    }
  };

  return (
    <>
      
              <Menu />

            
    </>
  );
};

export default Header;

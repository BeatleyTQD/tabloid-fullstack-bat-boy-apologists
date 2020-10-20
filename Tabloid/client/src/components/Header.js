import React, { useState, useContext, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PostContext} from "../providers/PostProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const { subscriptions,getSubscriptions } = useContext(PostContext);
  
  const [isOpen, setIsOpen] = useState();
  const toggle = () => setIsOpen(!isOpen);

  
  useEffect(()=>{
    // getSubscriptions();
    
  },[])


  return (
    <div>
      <Navbar expand="md" className="nav__color">
        <NavbarBrand tag={RRNavLink} to="/" className="brand__color">
          TABLOID
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/"
                  exact
                  activeClassName="selected"
                >
                  Home
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <>
                {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') != -1 ?

                <NavItem>
                  <NavLink
                    className="navlink__color"
                    tag={RRNavLink}
                    to="/tags"
                    activeClassName="selected"
                  >
                    Tag Management
                  </NavLink>
                </NavItem>
                : null }

                {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') != -1 ?
                  <NavItem>
                    <NavLink
                      className="navlink__color"
                      tag={RRNavLink}
                      to="/category"
                      activeClassName="selected"
                    >
                      Categories
                </NavLink>
                  </NavItem>
                  : null}

                <NavItem>
                  <NavLink tag={RRNavLink} className="navlink__color" to="/post">All Posts</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavLink} className="navlink__color" to="/post/myposts">My Posts</NavLink>
                </NavItem>

                {(subscriptions.length > 0) && 
                <NavItem>
                 <NavLink tag={RRNavLink} className="navlink__color" to="/post/subscribedPosts">Subscribed</NavLink>
                </NavItem>}

                {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') != -1 ?

                <NavItem>
                  <NavLink
                    className="navlink__color"
                    tag={RRNavLink}
                    to="/userprofiles"
                    activeClassName="selected"
                  >
                    User Profiles
                  </NavLink>
                </NavItem>
                : null }

              </>
            )}
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link" style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

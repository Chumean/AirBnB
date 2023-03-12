import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AirbnbLogo from './Airbnblogo';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-ul'>
      <li>
        <NavLink exact to="/">
          <AirbnbLogo />
        </NavLink>
      </li>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      {sessionUser && (

        <li className='create-spot-link'>
          <NavLink to="/spots/new">Create a New Spot</NavLink>
        </li>
        )}
    </ul>
  );
}

export default Navigation;

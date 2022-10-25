import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Outlet, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd';
import Icon from '../image/icon.png'
import { NavLink, Link } from 'react-router-dom';
import Actions from "../../Redux/actions";

const Layout = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localStorageValues =useSelector((state) => state.validateUserValues)
  console.log('localStorageValues',localStorageValues)

  useEffect(() => {
    dispatch({
      type: Actions.VALIDATE_USER_REQUEST,
      payload: localStorageValues,
      navigate
    })
  },[])


  const handleLogOut = () => {
    dispatch({
      type: Actions.DELETE_USER_REQUEST,
      payload: localStorageValues,
      navigate
    })
  }





  const menu = (
    <Menu
      items={[
        {
          label: <Link to="profile" > Profile</Link>,
          key: '0',
        },
        {
          label: <p onClick={handleLogOut}>LogOut</p>,
          key: '1',
        },
        ]}
    />
  );

  const newStyle = ({ isActive }) => {
    return {
        TextDecoder: 'none',
        fontSize: isActive ? 'large' : 'medium',
        borderBottom: isActive? '8px solid #fff' : 'none',
        color: '#fff'
    }
}



  return (<>

    <div className='blue'>
      <img className="Icon" src ={Icon} alt="Icon"/>    
      <div className='tabList'>
        <nav>
          <NavLink className='card01' style={newStyle} to = {'profile'}>Profile</NavLink>
          <NavLink className='card02' style={newStyle} to = {'dashboard'}>Dashboard</NavLink>
          <NavLink className='card03' style={newStyle} to = {'posts'}>Posts</NavLink>
        </nav>
      
      </div>



  <Dropdown overlay={menu} >
      <div className='avatar'>
        {localStorageValues?.data?.first_name}
        <Avatar src={localStorageValues?.data?.profile_url} style={{marginLeft:'10px'}}/>
      </div>
  </Dropdown>

     
    </div>
     <Outlet />
  </>)
}
export default Layout;

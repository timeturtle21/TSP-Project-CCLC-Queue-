// LoginPage.js
import React, { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

function AppLogin() {
const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || {});
const [ profile, setProfile ] = useState(JSON.parse(localStorage.getItem('profile')) || null);
const coaches = ['msmille3@mtu.edu', 'kmstrick@mtu.edu'];

const login = useGoogleLogin({
  onSuccess: (codeResponse) => {
    setUser(codeResponse)
    localStorage.setItem('user', JSON.stringify(codeResponse));
  },
  onError: (error) => console.log('Login Failed:', error)
});
const logOut = () => {
  googleLogout();
  setProfile(null);
  localStorage.removeItem('user');
  localStorage.removeItem('profile');
};

useEffect(
  () => {
      if (user) {
          axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
      })
      .then((res) => {
        if(coaches.includes(res.data.email)){
          setProfile(res.data);
          localStorage.setItem('profile', JSON.stringify(res.data));
        }
        else{
          logOut(); //fail
        }
      })
      .catch((err) => console.log(err));
      }
  },
  [ user ]
);

return (
    <div>
      <header className='App-header'>
      {profile ? (
        <form className='card p-3 bg-light' style={{minWidth:'300px', minHeight:'200px'}}>
          <h1 className='p-1'>Coach Logged In</h1>
          <div align="left" className="form-group pb-2 text-center" style={{ marginTop: '25px' }}>
              <img src={profile.picture} alt="user" />
              <p style={{ marginTop: '15px' }}>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <button type="button" onClick={logOut} className="btn btn-warning btn-block mt-10" style={{ minWidth:'100px'}}>Logout</button>
          </div>
        </form>
      ) :
      <form className='card p-3 bg-light' style={{minWidth:'300px', minHeight:'200px'}}>
        <h1 className='p-1'>Coach Login</h1>
        <div align="left" className="form-group pb-2 text-center" style={{ marginTop: '25px' }}>
          <button type="button" onClick={login} className="btn btn-warning btn-block mt-10" style={{ minWidth:'100px'}}>Login</button>
        </div>
      </form>
      }
      </header>
    </div>
  );

}
export default AppLogin;
// LoginPage.js
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <header className='App-header'>
      <form class='card p-3 bg-light' style={{minWidth:'400px', maxHeight:'340px'}}>
        <h1 class='p-1'>Coach Login</h1>
        <div align="left" class="form-group pb-2">
          <label for="uname" style={{ fontSize: '20px' }}>Username:</label>
          <input class="form-control"  id="uname" placeholder="Enter your username"></input>
          <label for="pword" style={{ fontSize: '20px' }}>Password:</label>
          <input class="form-control" id="pword" type="password" placeholder="Enter your password"></input>
          <button type="button" class="btn btn-warning btn-block mt-2" style={{ minWidth:'380px'}}>Login</button>
        </div>
      </form>
      </header>
    </div>
  );
};

export default LoginPage;
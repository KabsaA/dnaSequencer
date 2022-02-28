import React from "react";
import Header from './components/Header';
import "./login.css";


export default function App() {
  return (
    <> <Header />
    <div class="form-container">

          <form class="register-form">
              <center><h3>DNSAR Login</h3></center>


              <input
                  id="email"
                  class="form-field"
                  type="text"
                  placeholder="Email Address"
                  name="email" />

              <input
                  id="Password"
                  class="form-field"
                  type="text"
                  placeholder="Password"
                  name="Password" />

              <button class="form-field" type="submit">
                  Submit
              </button>
          </form>
      </div></>
  );
}

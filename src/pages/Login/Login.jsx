import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import logo from "../../assets/logo.png"
import { login, signup } from "../../firebase"
import netflix_spinner from "../../assets/netflix_spinner.gif"

const Login = ({ loggedIn }) => {

  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If we're already logged in, we shouldn't be here. Go forward
  // one page.
  // We can end up here when we go back from the Player because we
  // assume we need to go back 2 pages, which is usually, but not 
  // always right, and it's very difficult to determine if we need 
  // to go back one or two because of iFrame content we don't control.
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate(1);
    }
  }, [])

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
      <div className="login">
        <img src={logo} className='login-logo' alt="" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" ?
              <input type="text" placeholder="Your name" id="name"
                value={name} onChange={(e) => { setName(e.target.value) }} /> :
              <></>}
            <input type="email" placeholder='Email' id="email"
              value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder='Password' id="password"
              value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={userAuth} type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ?
              <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p> :
              <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
            }
          </div>
        </div>
      </div>
  )
}

export default Login

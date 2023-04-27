import { useState } from "react";
import { useCookies} from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] =  useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState("");

  const viewLogin = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  const handleSubmit = async(e, endpoint)=>{
    e.preventDefault();
    if(!isLogIn && password !== confirmPassword){
      setError("Make sure your password match!...")
      return
    }
    
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
    })

    const data = await response.json();

    if(data.detail){
      setError(data.detail)
    }else{
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload();
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? 'Please log in': 'Please sign up!'}</h2>
          <input 
            type="email" 
            placeholder="Enter you email" 
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)}
          />
          {!isLogIn && <input 
            type="password" 
            placeholder="Confirm Password" 
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />}
          <input 
            type="submit" 
            className="create" 
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
        </form>
        <div className="error-info">
          {error && <p>{error}</p>}
        </div>
        <div className="auth-options">
          <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? 'rgb(78, 200, 26)' : 'rgb(255,255,255)', color: !isLogIn ? "white":"black"}}
            >Sign Up</button>
          <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogIn ? 'rgb(78, 200, 26)' : 'rgb(255,255,255)', color: isLogIn ? "white":"black"}}
            >Login</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
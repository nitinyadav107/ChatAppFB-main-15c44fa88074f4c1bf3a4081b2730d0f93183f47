import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router';

const Signup = () => {
    const { authUser,setAuthUser } = useAuth();
    const navigate = useNavigate();
    
    
   
  const [isSignup, setIsSignup] = React.useState(true);

  const handleClick = () => {
    setIsSignup(!isSignup);
  };

  const [formData, setFormData] = React.useState({});
  const [passwordError, setPasswordError] = React.useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    setFormData(formValues);

    if (isSignup && formValues.password !== formValues.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const url = isSignup ? '/api/user/signup' : '/api/user/login';
      const response = await axios.post(url, formValues);
      if(response.data.success){
        toast.success(isSignup ? "User created successfully" : "Login successful");
        localStorage.setItem("email", formValues.email);
        if(response.data.user.isVerified===false){
          navigate('/verify');
          
        }
        else{
          const userData = response.data.user;
          localStorage.setItem("ChatApp", JSON.stringify(userData));
          setAuthUser(userData); 
          console.log(authUser.id);
          navigate('/home');
        }
       
        
      }
      else{
        toast.error(isSignup ? "User already exists" : "Invalid email or password");
      }
     
    
    
     
    
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-center h-screen w-full items-center bg-gray-800 ">
      <div className="border border-white bg-gray-900 md-w-[30%] sm-w p-4 rounded-lg">
        <div className="flex justify-center">  <h1 className="text-3xl font-bold text-white">{isSignup ? "Signup" : "Login"}</h1></div>

        <form className="mt-4" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-4">
            {isSignup && (
              <>
                <label className="text-white" htmlFor="fullname">Fullname</label>
                <input
                  className="bg-transparent border-2 border-white rounded-lg p-2"
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your fullname"
                  required />
              </>
            )}
            <label className="text-white" htmlFor="email">Email</label>
            <input
              className="bg-transparent border-2 border-white rounded-lg p-2"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required />
            <label className="text-white" htmlFor="password">Password</label>
            <input
              className="bg-transparent border-2 border-white rounded-lg p-2"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required />
            {isSignup && (
              <>
                <label className="text-white" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="bg-transparent border-2 border-white rounded-lg p-2"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
              </>
            )}
          </div>
          <div className='flex items-center space-x-10 mt-4'>
            <p>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span className='text-blue-500 cursor-pointer underline' onClick={handleClick}>{isSignup ? "Login" : "Signup"}</span>
            </p>
            <button
              className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg "
              type="submit"
            >
              {isSignup ? "Signup" : "Login"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Signup


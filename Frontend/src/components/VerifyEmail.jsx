import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { userdata, setAuthUser,authUser } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (event) => {
    event.preventDefault();

    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      toast.error('Please enter the OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        '/api/user/verifyemail',
        { code: trimmedOtp, email: localStorage.getItem('email') }, // Send the OTP in JSON format with the key "code"

      );

      if (response.data.success) {
        toast.success(response.data.message || 'OTP verified successfully!');
        localStorage.removeItem('email');
        localStorage.setItem('ChatApp', JSON.stringify(response.data));
        console.log(response.data.user);
        console.log(authUser);
        navigate('/home');

      } else {
        localStorage.removeItem('email');
        toast.error(response.data.message || 'Failed to verify OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred while verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleVerify}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 p-4 text-gray-800 dark:text-white dark:bg-slate-900'
    >
      <h2 className='text-2xl text-gray-400 font-bold'>Verify Your Email</h2>
      <input
        type="text"
        className='w-full px-3 py-2 border border-gray-800 dark:border-white dark:bg-slate-800'
        placeholder='Enter OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        type='submit'
        className={`bg-black text-white font-light px-8 py-2 mt-4 rounded-sm dark:bg-gray-700 dark:text-white ${loading && 'opacity-50 cursor-not-allowed'
          }`}
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  );
};

export default VerifyEmail;

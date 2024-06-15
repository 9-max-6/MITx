import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/protected/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const logOut = async () => {
    navigate('/');
    try {
      await axios.post('/api/logout/', {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      localStorage.removeItem('token');
    } catch {
      console.log('error');
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>{message}</p>

      <button onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

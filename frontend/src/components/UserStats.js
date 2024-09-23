import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStats = () => {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:3001/api/users/stats')
      .then(response => {
        setUserStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Stats by Country</h1>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Average Age</th>
            <th>Total Purchases</th>
          </tr>
        </thead>
        <tbody>
          {userStats.map(stat => (
            <tr key={stat._id}>
              <td>{stat._id}</td>
              <td>{stat.averageAge.toFixed(2)}</td>
              <td>{stat.totalPurchases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserStats;

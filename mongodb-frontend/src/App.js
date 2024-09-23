import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Fetch users from backend
    axios.get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new user
    axios.post('http://localhost:5000/api/users', newUser)
      .then((response) => {
        setUsers([...users, response.data]); // Add new user to the list
        setNewUser({ name: '', email: '', password: '' }); // Reset form
      })
      .catch((error) => {
        console.error('There was an error creating the user!', error);
      });
  };

  return (
    <div className="App">
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;

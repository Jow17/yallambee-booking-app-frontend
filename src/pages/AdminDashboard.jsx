import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProperty, setNewProperty] = useState({ name: '', location: '', description: '', cost: 0 });
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '' });

  // Fetch properties and users from API on component mount
  useEffect(() => {
    fetchProperties();
    fetchUsers();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:4001/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://localhost:4001/properties', newProperty);
      setProperties([...properties, response.data]);
      setNewProperty({ name: '', location: '', description: '', ageRestriction: 0 }); // Reset form
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/properties/${id}`);
      setProperties(properties.filter(property => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:4001/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username:'', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: ''}); // Reset form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/users${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Properties Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Properties</h2>
        <div className="mb-4">
            <input 
            type="text" 
            placeholder="Property Name" 
            value={newProperty.name} 
            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })} 
            className="border rounded p-2 mr-2"
          />
            <input 
            type="text" 
            placeholder="Location" 
            value={newProperty.location} 
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })} 
            className="border rounded p-2 mr-2"
          />
            <input 
            type="text" 
            placeholder="Description" 
            value={newProperty.description} 
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })} 
            className="border rounded p-2 mr-2"
          />
            <input 
            type="text" 
            placeholder="Age Restriction" 
            value={newProperty.ageRestriction} 
            onChange={(e) => setNewProperty({ ...newProperty, ageRestriction: e.target.value })} 
            className="border rounded p-2 mr-2"
          />
            <button onClick={handleAddProperty} className="bg-lime-500 text-white p-2 rounded">
                Add Property
            </button>
        </div>
        <ul className="list-disc pl-5">
          {properties.map(property => (
            <div key={property.id} className="mb-2">
              {property.name} - {property.location.city}
              <button onClick={() => handleDeleteProperty(property.id)} className="text-red-500 ml-4">
                Delete
              </button>
            </div>
          ))}
        </ul>
      </section>

      {/* Users Section */}
      <section className="mt-11">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="mb-4">
            <input 
                type="text" 
                placeholder="Username" 
                value={newUser.username} 
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} 
                className="border rounded p-2 mr-2"
            />  
            <input 
                type="password" 
                placeholder="Password" 
                value={newUser.password} 
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
                className="border rounded p-2 mr-2"
            />
             <input 
                type="text" 
                placeholder="First Name" 
                value={newUser.firstName} 
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} 
                className="border rounded p-2 mr-2"
            />  
            <input 
                type="text" 
                placeholder="Last Name" 
                value={newUser.lastName} 
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} 
                className="border rounded p-2 mr-2"
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={newUser.email} 
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                className="border rounded p-2 mr-2"
            />
            <input 
                type="text" 
                placeholder="Phone Number" 
                value={newUser.phone} 
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
                className="border rounded p-2 mr-2"
            />
            <input 
                type="date" 
                placeholder="Date of Birth" 
                value={newUser.dob} 
                onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })} 
                className="border rounded p-2 mr-2"      
            />
            <input 
                type="text" 
                placeholder="Is Admin" 
                value={newUser.isAdmin} 
                onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.value })} 
                className="border rounded p-2 mr-2"      
            />
            <button onClick={handleAddUser} className="bg-lime-500 text-white p-2 rounded">
                Add User
            </button>
            </div>
        <ul className="list-disc pl-5">
          {users.map(user => (
            <div key={user.id} className="mb-2">
              {user.firstName} {user.lastName} - {user.email}
              <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 ml-4">
                Delete User
              </button>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
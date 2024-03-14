import React, { useState, useEffect } from 'react';
import { getAllProTitles, addProTitle, getProTitleById, updateProTitle, deleteProTitle } from './api';
import './App.css';
function App() {
  const [proTitles, setProTitles] = useState([]);
  const [name, setName] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [title, setTitle] = useState('');
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProTitles();
      setProTitles(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProTitle = { name, cgpa, title };
    if (selectedId) {
      await updateProTitle(selectedId, newProTitle);
      const updatedProTitles = proTitles.map((proTitle) => {
        if (proTitle._id === selectedId) {
          return { ...proTitle, ...newProTitle };
        }
        return proTitle;
      });
      setProTitles(updatedProTitles);
    } else {
      const response = await addProTitle(newProTitle);
      setProTitles([...proTitles, response]);
    }
    setName('');
    setCgpa('');
    setTitle('');
    setSelectedId('');
  };

  const handleDelete = async (id) => {
    await deleteProTitle(id);
    setProTitles(proTitles.filter((proTitle) => proTitle._id !== id));
  };

  const handleEdit = async (id) => {
    const proTitle = await getProTitleById(id);
    setName(proTitle.name);
    setCgpa(proTitle.cgpa);
    setTitle(proTitle.title);
    setSelectedId(id);
  };

  return (
    <div id="mern">
      <h1>MERN CRUD Application</h1>
      <form onSubmit={handleSubmit}>
        <p>Enter Name of the Student:</p>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <p>Enter CGPA of the Student:</p>
        <input type="number" placeholder="CGPA" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
        <p>Enter Title of student's project:</p>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div>
        <button type="submit">{selectedId ? 'Update' : 'Add'}</button>
        </div>
      </form>
      <p>The exsisting records are:</p>
      <div id="exsisting">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>CGPA</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {proTitles.map((proTitle) => (
              <tr key={proTitle._id}>
                <td>{proTitle.name}</td>
                <td>{proTitle.cgpa}</td>
                <td>{proTitle.title}</td>
                <td>
                  <button onClick={() => handleEdit(proTitle._id)}>Edit</button>
                  <button onClick={() => handleDelete(proTitle._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

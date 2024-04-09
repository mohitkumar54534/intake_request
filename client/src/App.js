import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

import dashboardImage from './abc.png'; // Import the image

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  const applyFilter = useCallback(() => {
    if (!filterText) {
      setFilteredBooks(books); // If no filter text, display all books
    } else {
      const filtered = books.filter(
        book =>
          book.Intake_Request_NO.toLowerCase().includes(filterText.toLowerCase()) ||
          book.Employee_name.toLowerCase().includes(filterText.toLowerCase()) ||
          book.Employee_email.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [books, filterText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7001/getbooks');
        const initialBooks = response.data.map(book => ({
          ...book,
          checked: false
        }));
        setBooks(initialBooks);
        setFilteredBooks(initialBooks); // Initialize filteredBooks with all books
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="dashboard">
        <div className="dashboard-header">
          <img src={dashboardImage} alt="Dashboard" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button inquiry">
            <FontAwesomeIcon icon={faBars} /> Intake Request Summary
          </button>
          <button className="nav-button">
            <FontAwesomeIcon icon={faBars} /> Inquiry Request Details
          </button>
        </div>
      </div>
      <div className="content">
        <div className="welcome-message">
          <div className="user-icon">
            <FontAwesomeIcon icon={faUser} />
            <span>Total Intake Request: {books.length}</span>
          </div>
        </div>
        <div className="container">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>Intake Request No.</th>
                <th>Date</th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Intake Request Document</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.Intake_Request_NO}</td>
                  <td>{book.Date || ''}</td>
                  <td>{book.Employee_name || ''}</td>
                  <td>{book.Employee_email || ''}</td>
                  <td>{book.Intake_Request_Document || ''}</td>
                  <td>{book.Assigned_to || ''}</td>
                  <td>{book.Status || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [sampleData, setSampleData] = useState([]);
  const [onesCount, setOnesCount] = useState(0);
  const [zerosCount, setZerosCount] = useState(0);
  const [continuousZerosCount, setContinuousZerosCount] = useState(0);
  const [continuousOnesCount, setContinuousOnesCount] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9090/times');
      setSampleData(response.data.data);
      console.log('Fetched data:', response.data.data);
      
      //all counts are initialized
      let ones = 0;
      let zeros = 0;
      let continuous0s = 0;
      let continuous1s = 0;
      let maxContinuous0s = 0;
      let maxContinuous1s = 0;
  
      
      for (let i = 0; i < response.data.data.length; i++) {
        const current = response.data.data[i];
        const next = response.data.data[i + 1];
  
        
        if (current.machine_status === 1) {
          ones++;
          continuous1s++;
          maxContinuous1s = Math.max(maxContinuous1s, continuous1s);
        } else if (current.machine_status === 0) {
          zeros++;
          continuous0s++;
          maxContinuous0s = Math.max(maxContinuous0s, continuous0s);
        }
  
        
        if (next && current.machine_status !== next.machine_status) {
          continuous1s = 0;
          continuous0s = 0;
        }
      }
  
      //count states are set here
      setOnesCount(ones);
      setZerosCount(zeros);
      setContinuousZerosCount(maxContinuous0s);
      setContinuousOnesCount(maxContinuous1s);
    } catch (error) {
      console.error('Error fetching sample data:', error);
    }

   
  
  };

  const handleHomePage = () => {
    navigate('/'); 
  };

  return (
    <div>
      <h5>Summary</h5>
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ width: "50%" }}>Category</th>
              <th scope="col" style={{ width: "50%" }}>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number of 0s</td>
              <td>{zerosCount}</td>
            </tr>
            <tr>
              <td>Number of 1s</td>
              <td>{onesCount}</td>
            </tr>
            <tr>
              <td>Continuous 0s</td>
              <td>{continuousZerosCount}</td>
            </tr>
            <tr>
              <td>Continuous 1s</td>
              <td>{continuousOnesCount}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={handleHomePage}>Back To Home</button>
      </div>
    </div>
  );
};

export default DataTable;

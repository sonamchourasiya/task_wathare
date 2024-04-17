import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {Routes,Route} from 'react-router-dom';
import HorizontalTimelineBar from './pages/HorizontalTimelineBar';
import DataTable from './pages/DataTable';
import Navbar from './pages/Navbar';
function App() {
  return (
    <div className="App">
       
       <Navbar></Navbar>  &nbsp;&nbsp;
       <div style={{ margin: '20px 0' }}></div>
       
       <Routes>
          <Route path="/" element={<HorizontalTimelineBar></HorizontalTimelineBar>}></Route> 
          <Route path="/table" element={<DataTable></DataTable>}></Route> 
       </Routes>
  
    </div>
  );
}

export default App;


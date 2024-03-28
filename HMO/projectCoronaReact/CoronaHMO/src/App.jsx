import './App.css'
import MemberAdd from './components/MemberAdd'
import MemberList from './components/MemberList'
import Home from './components/Homee'
import {Routes, Route } from 'react-router-dom';
import ShowDetails from './components/ShowDetails'
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/MemberList' element={<MemberList/>}></Route>
        <Route path='/ShowDetails/:id' element={<ShowDetails/>}></Route>
        <Route path='/MemberAdd' element={<MemberAdd />} />
      </Routes>
      
    </>
  )
}

export default App

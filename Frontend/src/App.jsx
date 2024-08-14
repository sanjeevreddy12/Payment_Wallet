import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './mainComponents/SignIn'
import SignUp from './mainComponents/SignUp'
import Dashboard from './mainComponents/Dashboard'
// import SendMoeny from './mainComponents/SendMoney'

import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard/*' element={<Dashboard/>}/> 
          <Route path='*' element={<NoPage/ >}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function  NoPage (){

  return (
    <div className='flex justify-center items-center h-full'>
      <h1 className='text-4xl'>ERR: 404 Page not found</h1>
    </div>
  )
}
export default App

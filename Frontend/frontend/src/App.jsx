import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import UserProfile from './Pages/UserProfie'
import HomePage from './Pages/HomePage'
// import AdminPanelPage from './Pages/AdminPanelPage'
import AddUserPage from './Pages/AddUserPage'
import PrivateRouter from './utils/PrivateRouter'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<PrivateRouter />} ></Route>
        <Route exact path='/' element={<HomePage/>}>  </Route>
        <Route exact path='/profile' element={<UserProfile/>}>  </Route>
        <Route Component={LoginPage} path='/login'/>
        <Route Component={SignupPage} path='/register'/>
        {/* <Route Component={AdminPanelPage} path='/admin' /> */}
        <Route Component={AddUserPage} path='/adduser' />

      </Routes>
    

      </BrowserRouter>
      
    </>
  )
}

export default App
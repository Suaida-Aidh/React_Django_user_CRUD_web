import {useEffect} from 'react'
import { getlocal } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AdminPnalePage from '../Pages/AdminPanelPage'
import HomePage from '../Pages/HomePage'

function PrivateRouter() {
    const response = getlocal('authToken')
    const navigate = useNavigate()

    useEffect(()=>{
        if (!response){
            navigate('/login')
        }
    }, [response, navigate])

    if (response){
        const decoded = jwtDecode(response)
        if (decoded.is_admin){
            console.log('Admin page')
            return(
                <div>
                    <AdminPnalePage  title={'ADMIN PAGE'} />
                </div>
            )
        }
        else if(!decoded.is_admin){
            console.log('Not admin page')

            return (
                <div>
                    <HomePage title={'HOME PAGE'} />
                </div>
            )
        }
    }

    else{
        return null
    }
//   return (
//   )
}

export default PrivateRouter
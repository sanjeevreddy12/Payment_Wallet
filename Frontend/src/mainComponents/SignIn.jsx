import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
export default function SignIn(){

    const navigate = useNavigate()
    const [number, setNumber] = useState()
    const [password, setPassword] = useState('')

    async function handleSignIn(e){
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:3000/user/signIn',{
                number,
                password
            })
            console.log(response.data)
            alert('SignIn  Successful!')
            localStorage.setItem('token', response.data.jwt)
            navigate('/dashboard/')
        }
        catch(err){
            // console.log(err)
            // alert(err.response.data.msg)
            alert('Username or Password is wrong')
        }
    }

    return (
        <div className="flex  h-full items-center justify-center">
            <div className="shadow-2xl w-[350px] rounded-lg px-6 py-4">
                <h1 className="text-3xl font-semibold text-center mb-2">Sign In</h1>
                <p className="text-center text-zinc-600 text-[16px]">Enter your credentials to acces your account</p>
                <form className="mt-4 mb-2" onSubmit={handleSignIn}>
                    <label className="signup-label">Phone Number</label><br/><input type="tel" pattern="[0-9]{10}" maxLength='10' required className="signup-input" onChange={(e) => setNumber(e.target.value)}/><br/>
                    <label className="signup-label">Password</label><br/><input type="password" required className="signup-input"  onChange={(e) => setPassword(e.target.value)}/><br/>
                    <button type="submit" className="w-full bg-black rounded-md text-white py-1 mt-2">Sign In</button>
                </form>
                <p className="text-sm text-center">Don't have an account? <Link to='/signup' className='underline font-semibold'>SignUp</Link></p>
            </div>
        </div>
    )
}
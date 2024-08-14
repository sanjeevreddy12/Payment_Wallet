import axios from 'axios'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'


export default function SignUp(){
    const navigate = useNavigate()

    const [firstname, setFirst] = useState('')
    const [lastname, setLast] = useState('')
    const [number, setNumber] = useState()
    const [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')

    async function formSubmit(e){
        e.preventDefault()
        try{
            let response = await axios.post('http://localhost:3000/user/signUp',{
                firstname,
                lastname,
                number,
                username,
                password   
            })
            console.log(response.data)
            alert('User Signed In')
            localStorage.setItem("token", response.data.token);
            navigate('/dashboard')
        }
        catch(err){
            if(err.response.data.msg.startsWith('E11000')){
                alert('User with same number already exits')
            }
        }
        // console.log(response.data)
    }

    return (
        <div className="flex  h-full items-center justify-center">
            <div className="shadow-2xl w-[350px] rounded-lg px-6 py-4">
                <h1 className="text-3xl font-semibold text-center mb-2">Sign Up</h1>
                <p className="text-center text-zinc-600 text-[16px]">Enter your information to create an account</p>
                <form className="mt-4 mb-2" onSubmit={formSubmit}>
                    <label className="signup-label">First Name</label><br/><input type="text" required className="signup-input" onChange={(e) => setFirst(e.target.value)}/><br/>
                    <label className="signup-label">Last Name</label><br/><input type="text" required className="signup-input" onChange={(e) => setLast(e.target.value)}/><br/>
                    <label className="signup-label">Phone Number</label><br/><input type="tel" pattern='[0-9]{10}' maxLength='10' required className="signup-input" onChange={(e) => setNumber(e.target.value)}/><br/>
                    <label className="signup-label">username</label><br/><input type="text"  required className="signup-input" onChange={(e) => setUsername(e.target.value)}/><br/>
                    <label className="signup-label">Password</label><br/><input type="password" required className="signup-input" onChange={(e) => setPassword(e.target.value)}/><br/>
                    <button type="submit" className="w-full bg-black rounded-md text-white py-1 mt-2">Sign Up</button>
                </form>
                <p className="text-sm text-center">Already have an account? <Link to='/signin' className='underline font-semibold'>SignIn</Link></p>
            </div>
        </div>
    )
}
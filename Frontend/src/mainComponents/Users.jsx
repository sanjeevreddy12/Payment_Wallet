import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react";
import TableRow  from './TableRow'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users({setBalance, username}) {
  const { toast } = useToast()
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])
 const navigate = useNavigate()

  async function getData(){
   try{
    const jwt = localStorage.getItem("token") || '';
    const response = await axios.get(`http://localhost:3000/user/search?filter=${filter}`, {
      headers : {
        Authorization: `Bearer ${jwt}`
      }
    })
    
    if(response.data.msg == 'Invalid Token'){
      navigate('/signIn')
    }
    else{

      setData(response.data.msg);
    }
    // console.log(response.data.msg)
   }
   catch(err){
    console.log(err)
   }
  }
  useEffect(()=>{
    getData();
  }, [filter])

  return (
    <div>   
      <input
        type="text"
        placeholder="Search "
        className="signup-input w-full"
        onChange={(e) => setFilter(e.target.value)}
      />
      
      <div className="h-[350px] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>{data && data.map((d,i) => d.username!=username && <TableRow d={d} setBalance={setBalance} key={i}/>)}</tbody>
        </table>
      </div>
    </div>
  );
}

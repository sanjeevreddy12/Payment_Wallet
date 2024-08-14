import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Transactions() {

  const [data, setData] = useState()
  const navigate = useNavigate()

  async function getData(){

    try{
      const jwt = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/account/transactions',{
        headers : {
          Authorization : `Bearer ${jwt}`
        }
      })
      const reversedData = response.data.transactions.reverse()
      setData(reversedData)
      // console.log(response.data.transactions)
      // if(response.data.msg.startsWith('Invalid')){
      //   navigate('/signIn')
      // }
    }
    catch(err){
      console.log(err.name + 'hello')
    }
  }

  useEffect(() => {
    // console.log('transactionc component')
    getData()
  }, [])

  return (
    <div>
      <input
        type="text"
        placeholder="Search "
        className="signup-input w-full"
      />
      <div className="h-[350px]  overflow-y-auto">
        <table className="p-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="">
            <tr className="underline text-3xl text-black ">
              <th className="pl-6">
                Username
              </th>
              <th>
                Status
              </th>
              <th>
                Date
              </th>
              <th>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="w-full ">
           { data && data.map((d,i) => <TransRow username={d.username} amount={d.amount} type={d.mode} date={d.trans_date}key={i}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TransRow({username, type, amount, date}) {
  return (
    <tr className="bg-white rounded-md border-b px-4  w-full hover:bg-gray-100  ">
      <td className="px-6 py-4" >
        <p className="text-black text-lg">{username}</p>
      </td>
      <td>
        <p className="text-black text-lg">{type}</p>
      </td>
      <td>
        <p className="text-black text-lg">{date.substring(0,10).split('-').reverse().join('-')}</p>
      </td>
      <td className="">
        <p className="text-black text-lg">{amount} ₹</p>
      </td>
    </tr>
  );
}

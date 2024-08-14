import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";
import {useState} from 'react'

export default function SendMoney({id, username, setBalance}) {
    const { toast } = useToast()
    const [amount, setAmount] = useState('')

    async function sendMoney(){
      try{
        const jwt = localStorage.getItem("token") || '';
        const response = await axios.post('http://localhost:3000/account/transfer',{
          to : id,
          amount : amount
        },{
          headers : {
            Authorization: `Bearer ${jwt}`
          }
        })
        const updatedBalanceResponse = await axios.get('http://localhost:3000/account/balance', {
          headers : {
            Authorization: `Bearer ${jwt}`
          }
        })
        setBalance(updatedBalanceResponse.data.balance);
        toast({
          description: "Transaction successfull ✅",
          
        });
        console.log(response.data)
      }
      catch(err){
        toast({
          description: "Transaction failed ❌",
          style: {
            background: "#ef4444", // Change the background color here
            color: "white", // Optionally, change the text color
          },
        });
        console.log(err)
      }
    }

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="my-2 text-2xl">Send Money</DialogTitle>
        <DialogDescription>
          <div className="flex gap-2 items-center my-2">
            <div className="rounded-full h-8 w-8 bg-zinc-200 text-lg flex justify-center items-center font-semibold">
              {username[0].toUpperCase()}
            </div>
            <p className="text-lg">{username}</p>
          </div>
          <form>
            <label className="signup-label">Amount in (Rs.)</label>
            <br />
            <input
              className="signup-input"
              type="number"
              min="1"
              placeholder="Enter Amount"
              required
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <br />
            <button
            id={id}
              type="submit"
              className="w-full bg-black rounded-md text-white py-1 mt-2"
              onClick={(e) => {
                e.preventDefault()
                console.log(amount)
                if (amount === "" || amount <= 0) {
                    alert("Please enter an amount.");
                } else {
                  sendMoney()
                }
                setAmount('')
              }}
            >
              Send Money
            </button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </div>
  );
}

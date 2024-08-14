import {
    Dialog,
    DialogContent,

    DialogTrigger,
  } from "@/components/ui/dialog";
import SendMoney from './SendMoney'

export default function TableRow({d, setBalance}){

    return (
        <tr className="bg-white rounded-md border-b px-4  hover:bg-gray-100  flex justify-between items-center">
            <td className="px-6 py-4">
              <div className="flex  gap-2 items-center">
                <div className="flex justify-center items-center bg-gray-200 text-lg text-gray-900 w-10 h-10 rounded-full">
                  {d.username[0].toUpperCase()}
                </div>
                <p className="text-black text-lg">{d.username}</p>
              </div>
            </td>
            <td>
              <p className="text-black text-lg">{d.number}</p>
            </td>
            <td>
              <Dialog>
                <DialogTrigger className="bg-black text-white p-2 px-4 rounded-md">
                  Send Money
                </DialogTrigger>
                <DialogContent>
                  <SendMoney  id={d._id} username={d.username} setBalance={setBalance}/>
                </DialogContent>
              </Dialog>
            </td>
          </tr>
    )
}
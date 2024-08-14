import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState, useEffect } from "react";
import Transactions from "./Transactions";
import Users from "./Users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import SheetBody from "./SheetBody";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState();

  async function getUserData() {
    try {
      const jwt = localStorage.getItem("token") || "";
      const response = await axios.get(
        "http://localhost:3000/account/balance",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // console.log(response.data)
      setUsername(response.data.username);
      setBalance(response.data.balance);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="h-full">
      <div className="flex w-full h-16 items-center p-4 justify-between shadow-md">
        <h1 className="text-2xl font-bold">Wallet App</h1>
        <div className="flex  gap-4 h-12 px-2 justify-between items-center">
          <h3 className="text-lg">{username}</h3>
          <Sheet>
            <SheetTrigger className="bg-gray-100 border-[1px] border-black rounded-full w-12 h-full flex justify-center items-center font-semibold text-2xl">
              {username && username[0].toUpperCase()}
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl">Profile</SheetTitle>
                <SheetDescription>
                  <div>
                    <h1 className="text-xl">{username}</h1>
                  </div>
                </SheetDescription>
              </SheetHeader>
              <SheetBody />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="p-4 my-4">
        <p className="text-lg font-semibold">Your Balance: {balance} ₹</p>   
      </div>
      <div className=" ">
        <Tabs defaultValue="users" className="w-full  p-4">
          <TabsList className="my-2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <Users setBalance={setBalance} username={username} />
          </TabsContent>
          <TabsContent value="transactions">
            <Transactions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

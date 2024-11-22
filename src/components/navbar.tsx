"use client";
import { Phone, ShoppingCart } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function Nav(){
    const { data: session } = useSession();
    const name=session?.user?.name
    const router = useRouter();
    console.log(name);
    
    return(
        <>
        <nav className="border-b-2 border-red-400 ">
            <div className="text-white text-center bg-red-500 py-3 ">
                Free delivery for all orders over $50. Order your food now!
            </div>
           <div className="flex items-center mx-20 my-8  justify-between text-red-500 ">
           <div className="text-sm gap-x-3 flex ">
                <a href="/">HOMEPAGE</a>
                <a href="/menu">MENU</a>
                <a href="/contact">CONTACT</a>
                
            </div>

            <div className="items-center flex  gap-x-2">
                <h1 className="font-bold text-2xl">MASSIMO</h1>
                {!session?
     <button 
     onClick={()=>{signIn()}}
     type="button"
     className="text-black border-2 rounded-md px-3 py-1"
     >Sign in</button>
      : <button
      onClick={()=>{signOut()}} 
      type="button"
      >Sign out</button>
    }
            </div>

            <div className="flex items-center text-sm gap-x-3 ">
            <Phone size={16} />
            <p>countdown</p>
            <a href="">ORDERS</a>
            <ShoppingCart size={16} />
            <a href="">CART (3)</a>
            </div>
           </div>
        </nav>
        </>
    )
}
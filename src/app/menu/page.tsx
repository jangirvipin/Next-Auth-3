
import prisma from "../../../lib/db"

import Button from "@/components/button";

async function Find(){
    await prisma.$connect();
    const post= await  prisma.menu.findMany({
    })  
    return post;
}

function text(text:string){
    if(text==="Pizza"){
       const obj ={
            Description:"Perfect for any occasion, from casual dinners to celebrations, our pizzas are sure to satisfy every craving.",
            imageURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RhAkXrDXaU8_tVgEFovixM6eCSLN3CJl5Q&s"
        }
        return obj;
    }
    else if (text==="Burger"){
        const obj= {
            Description:" This juicy, tender beef patty is grilled to perfection, creating a mouthwatering combination of smoky and savory flavors. ",
            imageURL:"https://img.freepik.com/free-vector/isolated-delicious-hamburger-cartoon_1308-134213.jpg?semt=ais_hybrid"
        }
        return obj
    }
    else{

    
    const obj = {
        Description:"Nothing beats the classic Spaghetti  perfectly cooked strands of pasta tossed in a rich, tangy tomato sauce",
        imageURL:"https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg"
    }
    return obj
}
}
export default async function Page(){
   
    const result = await Find();
    console.log(result);
    
     
    return(<>
     <div className="flex items-center justify-center p-8 bg-gray-50 ">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {result.map((item, index) => (
            <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-red-600 text-white p-4 text-center">
                    <p className="uppercase text-2xl font-semibold">{item.name}</p>
                </div>
                <div className="p-6 space-y-4">
                    {text(item.name) && (
                        <div className="flex flex-col items-center">
                            <p className="text-gray-600 text-base text-center mb-4">{text(item.name).Description}</p>
                            <img
                                className="w-48 h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                                src={text(item.name).imageURL}
                                alt={item.name}
                            />
                        </div>
                        
                    )}
                   
                      
                </div>
                <div className="flex items-center justify-center  mb-3">
                    <a href={`/menu/${item.name}`}
                    className="bg-red-500 px-4 rounded-md text-white py-2 "
                    > Explore </a>
                    </div>
              
            </div>
        ))}
    </div>
</div>

    </>)
}
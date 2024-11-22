"use client"
import { log } from 'console';
import { useParams } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function Category(){
   const [list, setlist]=useState([]);
    const params = useParams();
    const { category } = params;
    console.log(category);
    
    
    useEffect(() => {
        // Define an async function to handle the Axios request
        const fetchData = async () => {
            if (category) {
                try {
                    // Make a POST request with the category in the body
                    const response = await axios.post("http://localhost:3000/api/db", {
                        category, // Send the category in the request body
                    });

                    console.log("Response data:", response.data.items); 
                    setlist(response.data.items); // Update state with the data
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        // Call the async function
        fetchData();
    }, [category]); // Re-run the effect when 'category' changes
    
    return(
        <>
      <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
                Category: <span className="text-red-600">{category}</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {list.length > 0 ? (
                    list.map((item: any, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-red-500"
                        >
                            <div className="relative">
                                {/* Item Name */}
                                <p className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</p>
                                {/* Item Description */}
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                {/* Price and Variation */}
                                <div className="space-y-2">
                                    <p className="text-lg font-bold text-green-600">
                                        {`Price: $${item.price.toFixed(2)}`}
                                    </p>
                                    <p className="text-gray-800 font-semibold">
                                        Variation: <span className="text-blue-500">{item.variations[0].name}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Extra Price: <span className="font-semibold text-red-500">{`$${item.variations[0].price.toFixed(2)}`}</span>
                                    </p>
                                </div>
                                {/* Hover Image or Icon */}
                                <div className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-full bg-white shadow-lg opacity-80 hover:opacity-100 transition-opacity">
                                    <span className="text-red-600 text-xl font-bold">🔥</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500">Loading...</p>
                )}
            </div>
        </div>
        </>
    )
}


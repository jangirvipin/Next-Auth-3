import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { log } from "console";

// Change GET to POST to capture data in the body
export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const { category }: { category: string } = await req.json();

        // Log the category for debugging
        console.log("Category received:", category);
        var id =0;
        if(category==="pasta"){
            id=3;
        }
        else if(category==="pizza"){
            id=1;
        }
        else{
            id=2
        }

        // Query the database for the menu based on the category
        const result = await prisma.menu.findFirst({
            where: {
                id: id,  // Find the menu by name (category)
            },
            include: {
                items: {
                    include: {
                        variations: true,  // Include all variations for each item
                    },
                },
            },
        });

        // If no menu is found, return a 404 response
        if (!result) {
            return NextResponse.json({ error: "Menu not found" }, { status: 404 });
        }

        // Return the result as a JSON response
        console.log(result);
        
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        // Handle any errors and return a 500 response
        console.error("Error occurred:", error);
        return NextResponse.json({ error: "Error processing request" }, { status: 500 });
    }
}

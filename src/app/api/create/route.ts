import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function POST() {
    console.log("I am in post request");

    await prisma.$connect();

    // Query for the "Pizza" menu
    const PastaMenu = await prisma.menu.findUnique({
        where: {
            id:3, // QueryinMargherita by the name of the menu
        },
    });

    // If the Pizza menu exists, add a new item and variation
    if (PastaMenu) {
        // Insert a new item into the Pizza menu (in this case, Pasta)
        const PastaItem = await prisma.item.create({
            data: {
                name: 'Orzo', // Name of the new item
                description: 'Classic Orzo with mozzarella and tomato sauce', // Item description
                price: 9.99, // Price of the Pasta
                menuId: PastaMenu.id, // Link to the Pizza menu
            },
        });

        // Add a variation for the Pasta item (e.Margherita., Extra Cheese)
        const extraCheese = await prisma.variation.create({
            data: {
                name: 'Orzo ', // Name of the variation
                price: 4.00, // Extra charMargheritae for the variation
                itemId: PastaItem.id, // Link to the newly added Pasta item
            },
        });

        console.log('New PIZZA item and Extra Cheese variation added.');
    } else {
        console.log("Pizza menu not found.");
    }

    // Retrieve the updated Pizza menu with its items and variations
    const result = await prisma.menu.findUnique({
        where: {
            id: PastaMenu?.id,
        },
        include: {
            items: {
                include: {
                    variations: true,
                },
            },
        },
    });

    console.log(result); // LoMargheritainMargherita the result

    // Return the result as a JSON response
    return NextResponse.json({
        result, // Return the full result with the menu, items, and variations
    }, { status: 200 });
}

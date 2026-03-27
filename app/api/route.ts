import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
export async function POST(req: Request) {
    try {
        //getting data from frontend here and declareing as a variable
        const body = await req.json() as { title: string; description: string; dueTime: string; dueDate: string; userId: string };
        const { title, description, dueTime, dueDate, userId } = body;
  
 

//query for database
        const result = await sql`INSERT INTO tasks (user_id,title,description,dueTime,dueDate) VALUES (${userId},${title},${description},${dueTime},${dueDate})`
        if (result) {
        
            return NextResponse.json({ message: "Task added successfully" })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to add task" })
    }
}

export async function GET(req: Response) {
    try {
        //for getting only a single user tasks getting user id for server side 
             const { userId } = await auth();
        const result = await sql`SELECT * FROM tasks WHERE user_id = ${userId} ORDER BY created_at DESC`
    
       return  NextResponse.json({ message: "Task fetched successfully", result })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to fetch task" })
    }

}
//for deleting getting id from frontend then matching in database and deleting it 
export async function DELETE(req:Request){
    try {
          const { id } = await req.json() as { id: string }
         
       
     const result = await sql`DELETE FROM tasks WHERE id = ${id}`


    return NextResponse.json({message: "Task deleted succesfully"})
    
    } catch (error) {
        console.error("Delete Error:", error); 
        return NextResponse.json(
            { message: "Task could not be deleted" }, 
            { status: 500 }
        );
    }
}

//for edit and status updating the route is used
export async function PUT(req: Request) {
    try {
        const { id, title, description, dueDate, dueTime,status } = await req.json() as { id: string; title: string; description: string; dueDate: string; dueTime: string;status:string; };
//query which is used like to update every state is getting used for all if any var is update and it get then it will update that only of that id 


//  (COALESCE) is method used in postgresql for updating the new value only and if not then keep old one
      await sql`
        UPDATE tasks 
        SET 
            title = COALESCE(${title}, title),
            description = COALESCE(${description}, description),
            duedate = COALESCE(${dueDate}, duedate),
            duetime = COALESCE(${dueTime}, duetime),
            status = COALESCE(${status}, status)
        WHERE id = ${id}
    `;
        return NextResponse.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

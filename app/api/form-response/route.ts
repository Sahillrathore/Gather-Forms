import { db } from "@/configs/db";
import { formResponses } from "@/configs/schema";
import { generateId } from "@/lib/generateId";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {

        const body = await req.json();
        const { formId, formResponse } = await body;

        // console.log(formId, formResponse)
        
        if (!formId || !formResponse) {
            return NextResponse.json(
                { msg: "FormId and response required" },
                { status: 400 }
            )
        }

        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { msg: "Unauthorized" },
                { status: 401 }
            )
        }

        const id = generateId();
        const userEmail = user?.primaryEmailAddress?.emailAddress

        const res = await db.insert(formResponses).values({
            id: id,
            formId: formId,
            formResponse: formResponse,
            formRef: formId,
            createdBy: userEmail,
            respondedAt: new Date().toISOString(),
        })

        // return NextResponse.json(
        //     { msg: "Response sent" },
        //     { status: 201 }
        // )
        return NextResponse.json({ msg: 'success' }, { status: 200 });

    } catch (error) {
        console.log(error)
    }
}
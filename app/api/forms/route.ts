import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import generateAi from "@/configs/AiModel";
import { generateId } from "@/lib/generateId";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import safeParse from "@/configs/parser";

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (!userEmail) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }

        const { input } = await req.json();
        if (!input || !input.trim()) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const jsonForm = await generateAi(input);

        const id = generateId();
        if (!id) {
            throw new Error("Failed to generate ID");
        }

        const res = await db
            .insert(JsonForms)
            .values({
                id,
                jsonform: jsonForm,
                createdBy: userEmail,
                createdAt: new Date().toISOString(),
            })
            .returning({ id: JsonForms.id });

        return NextResponse.json({ id: res[0].id });

    } catch (error) {
        console.error("FORM API ERROR:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function GET(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (!userEmail) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }

        const formsData = await db
            .select({
                id: JsonForms.id,
                createdAt: JsonForms.createdAt,
                jsonForm: JsonForms.jsonform,
                createdBy: JsonForms.createdBy,
            })
            .from(JsonForms)
            .where(eq(JsonForms.createdBy, userEmail))
            .orderBy(desc(JsonForms.createdAt));

        const forms = formsData.map((form) => ({
            ...form,
            jsonForm:
                typeof form.jsonForm === "string"
                    ? safeParse(form.jsonForm)
                    : form.jsonForm,
        }));

        return NextResponse.json({ forms });

    } catch (error) {
        console.error("FETCH USER FORMS ERROR:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

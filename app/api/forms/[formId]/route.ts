import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq, param } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;
    console.log("FORM ID:", formId);

    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await db
      .select()
      .from(JsonForms)
      .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .limit(1);

    if (!result.length) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ form: result[0] });
  } catch (error) {
    console.error("FETCH FORM ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// form update
export async function PATCH(req: Request, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const body = await req.json();
  const user = await currentUser();

  if (!user) return NextResponse.json({ msg: 'Unauthorized', status: 401 });

  await db.update(JsonForms)
    .set({ jsonform: body })
    .where(and(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress), eq(JsonForms.id, formId)))

  return NextResponse.json({ msg: formId, status: 200 })
}


// form delete
export async function DELETE(req: Request, { params }: { params: Promise<{ formId: string }> }) {

  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { formId } = await params;
    const { index } = await req.json();

    if (index === undefined) {
      return NextResponse.json(
        { error: "index is required" },
        { status: 400 }
      );
    }

    // Fetch existing form
    const form = await db.query.JsonForms.findFirst({
      where: and(
        eq(JsonForms.id, formId),
        eq(
          JsonForms.createdBy,
          user.primaryEmailAddress!.emailAddress!
        )
      ),
    });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    const parsedForm =
      typeof form?.jsonform === "string"
        ? JSON.parse(form.jsonform)
        : form?.jsonform;

    const jsonForm = parsedForm;

    jsonForm.formFields.splice(index, 1);

    await db
      .update(JsonForms)
      .set({ jsonform: jsonForm })
      .where(eq(JsonForms.id, formId));

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE FIELD ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// routes soon
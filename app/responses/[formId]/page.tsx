"use client";

import FormLoading from "@/components/FormLoading";
import HeaderLayout from "@/components/HeaderLayout";
import axios from "axios";
import React, { use, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

const Page = ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = use(params);

  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResponses = async () => {
    try {
      const res = await axios.get(`/api/form-response/${formId}`);
      const data = res?.data?.data || [];

      const parsed = data.map((item: any) => {
        let parsedFormResponse = item.formResponse;

        if (typeof item.formResponse === "string") {
          try {
            parsedFormResponse = JSON.parse(item.formResponse);
          } catch {
            parsedFormResponse = {};
          }
        }

        return { ...item, formResponse: parsedFormResponse };
      });

      setResponses(parsed);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // 🔹 Collect all unique field names across responses
  const allFields = useMemo(() => {
    const fields = new Set<string>();
    responses.forEach((r) =>
      Object.keys(r.formResponse || {}).forEach((k) => fields.add(k))
    );
    return Array.from(fields);
  }, [responses]);

  // 🔹 Export to Excel
  const exportToExcel = () => {
    const rows = responses.map((r, i) => {
      const row: any = {
        "S.No": i + 1,
        "Submitted At": new Date(r.respondedAt).toLocaleString(),
      };

      allFields.forEach((field) => {
        row[field] = r.formResponse?.[field] ?? "";
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    XLSX.writeFile(workbook, `form_responses_${formId}.xlsx`);
  };

  if (loading)
    return <FormLoading />;

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-zinc-50 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-zinc-800">
              Form Responses ({responses.length})
            </h1>

            {responses.length > 0 && (
              <button
                onClick={exportToExcel}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm shadow"
              >
                Export to Excel
              </button>
            )}
          </div>

          {responses.length === 0 ? (
            <div className="text-center text-zinc-500">No responses yet</div>
          ) : (
            <div className="overflow-auto bg-white rounded-xl shadow border">
              <table className="min-w-full border-collapse">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">
                      Submitted At
                    </th>
                    {allFields.map((field) => (
                      <th
                        key={field}
                        className="px-4 py-3 text-left text-sm font-medium text-zinc-600"
                      >
                        {field}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {responses.map((resp, index) => (
                    <tr key={resp.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-zinc-600">
                        {new Date(resp.respondedAt).toLocaleString()}
                      </td>

                      {allFields.map((field) => (
                        <td
                          key={field}
                          className="px-4 py-3 text-sm text-zinc-800 max-w-xs truncate"
                        >
                          {String(resp.formResponse?.[field] ?? "-")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Page;

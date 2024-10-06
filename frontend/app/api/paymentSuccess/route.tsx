import { NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,  // Disable body parsing to handle form-data
  },
};

export async function POST(req: any, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      console.log("Error parsing form data:", err);
      return res.status(500).json({ message: "Error parsing form data" });
    }

    const data = fields;
    console.log("Parsed form data:", data);

    let PayUOrderId;
    try {
      PayUOrderId = await PayUApiCalls.saveData(data);
      // await paymentService.addTransaction(PayUOrderId, data.email, "success");
    } catch (error: any) {
      console.error("Error saving data:", error);
      return res.status(500).json({ message: "Error saving data" });
    }

    return res.redirect(303, `/bookingSucessful/${PayUOrderId}`);
  });
}

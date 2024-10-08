import paymentService from "@/utils/apiCalls/paymentService";
import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function POST(req: any, res: NextApiResponse) {
  const contentType = req.headers.get("content-type") || "";
  console.log({ contentType });

  const formData = await req.formData();

  const data: { [key: string]: any } = {};
  formData.forEach((value: any, key: string) => {
    data[key] = value;
  });
  console.log(data)
  let PayUOrderId
  try {
     PayUOrderId = await PayUApiCalls.saveData(data);
    // await paymentService.addTransaction(PayUOrderId, data.email, "success");
  } catch (error: any) {
    console.log(error);
  }
  redirect(
    `/bookingSucessful/${PayUOrderId}`
  );
}
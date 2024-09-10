import { useEffect, useRef, useState } from "react";
// import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";
import {  PayU } from "@/utils/constants";
// import { IUser } from "@/types/types";
import { generateTxnId } from "@/utils/generateTxnId";
import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";

type props = {
  BookedData: any;
};

const PayUComponent = ({ BookedData }: props) => {
  const [hash, setHash] = useState(null);

  const { username, phone, email } = BookedData.userId;
  console.log({ BookedData });

  const txnidRef = useRef(generateTxnId(8));
  const txnid = txnidRef.current;
  const amount = parseFloat("1000").toFixed(2); // Ensure correct format
  const productinfo = BookedData.tripId;
  const firstname = username;
  const key = PayU.merchantKey;
//   const surl = `${FRONTEND_DOMAIN}/api/paymentSuccess`;
//   const furl = `${FRONTEND_DOMAIN}/api/paymentFailure`;
  const service_provider = "payu_paisa";

  useEffect(() => {
    const data = { txnid, amount, productinfo, firstname, email, phone };

    (async function (data) {
      try {
        const res = await PayUApiCalls.paymentReq(data);
        setHash(res.hash);
      } catch (error: any) {
        console.error("Payment Error: " + error.message);
        alert(error.message);
      }
    })(data);
  }, [amount, email, firstname, productinfo, txnid]);

  return (
    <form action="https://test.payu.in/_payment" method="post">
      <input type="hidden" name="key" value={key} />
      <input type="hidden" name="txnid" value={txnid} />
      <input type="hidden" name="productinfo" value={productinfo} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="firstname" value={username} />
      {/* <input type="hidden" name="surl" value={surl} />
      <input type="hidden" name="furl" value={furl} /> */}
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="hash" value={hash || ""} />
      {hash && (
        <button
          type="submit"
          value="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Pay with PayU
        </button>
      )}
    </form>
  );
};

export default PayUComponent;

"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}linkedin.jpg`;
  const youtubeUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}youtube.jpg`;

  // const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {

  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res1 = await axios.post("/api/user/addEmail", { email });

  //     const successMessage =
  //       res1.data.message || "Our Team will reach out to you soon";

  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: successMessage,
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     setEmail("");

  //     const emailData = {
  //       to: email,
  //       subject: "Thanks for Subscribing to Lumashape!",
  //       body: `
  //       <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
  //         <div style="text-align:center">
  //           <img src="https://aletheia.ai.ml-bench.com/public/images/mailLogo.jpg" alt="Lumashape Logo" width="250" />
  //         </div>
  //         <p style="color:#333333; font-size: 18px; font-weight: 600;">Hi there,</p>
  //         <div style="font-size: 16px;">
  //           <p style="margin-bottom: 30px;">Thank you for subscribing to Lumashape! You’re now on our exclusive list for the latest updates, special announcements, and early access to new features.</p>
  //           <p style="margin-top: 30px;">If you have any questions or need assistance, please contact our founder at <a href="mailto:sam.peterson@lumashape.com" style="color: #266CA8;">sam.peterson@lumashape.com</a></p>
  //         </div>
  //         <p style="margin-top: 60px;">
  //           <a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a>
  //           <span style="color: #000000;">  |  </span>
  //           <a href="mailto:sam.peterson@lumashape.com" style="color: #000000;">sam.peterson@lumashape.com</a>
  //         </p>
  //         <div style="text-align: start; margin-top: 10px;">
  //       <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
  //         <img src=${linkedinUrl} alt="LinkedIn" width="20" />
  //       </a>
  //        <a href="https://www.youtube.com/@Lumashape?app=desktop" style="text-decoration: none; margin-left: 20px;">
  //         <img src=${youtubeUrl} alt="youtube" width="20" />
  //       </a>
  //     </div>
  //       </div>
  //     `,
  //     };

  //     const res = axios
  //       .post(
  //         "https://aletheia.ai.ml-bench.com/api/send-microsoft-email",
  //         emailData
  //       )
  //       .catch(() => {
  //         // Error is caught silently and ignored
  //       });
  //     console.log("res-> ", res);
  //   } catch (err) {
  //     let errorMessage = "Something went wrong";
  //     if (axios.isAxiosError(err) && err.response?.data?.message) {
  //       errorMessage = err.response.data.message;
  //     } else if (err instanceof Error) {
  //       errorMessage = err.message;
  //     }

  //     Swal.fire({
  //       title: "Error!",
  //       text: errorMessage,
  //       icon: "error",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save email to DB via Next.js API
      const res1 = await axios.post("/api/user/addEmail", { email });

      const successMessage =
        res1.data.message || "Our team will reach out to you soon";

      Swal.fire({
        icon: "success",
        title: "Success",
        text: successMessage,
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset input
      setEmail("");

      // Prepare email content
      const emailData = {
        to: email,
        subject: "Thanks for Subscribing to Lumashape!",
        body: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <div style="text-align:center">
              <img src="https://aletheia.ai.ml-bench.com/public/images/mailLogo.jpg" alt="Lumashape Logo" width="250" />
            </div>
            <p style="color:#333333; font-size: 18px; font-weight: 600;">Hi there,</p>
            <div style="font-size: 16px;">
              <p style="margin-bottom: 30px;">
                Thank you for subscribing to Lumashape! You’re now on our exclusive list for the latest updates, special announcements, and early access to new features.
              </p>
              <p style="margin-top: 30px;">
                If you have any questions or need assistance, please contact our founder at 
                <a href="mailto:sam.peterson@lumashape.com" style="color: #266CA8;">sam.peterson@lumashape.com</a>
              </p>
            </div>
            <p style="margin-top: 60px;">
              <a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> 
              <span style="color: #000000;"> | </span>
              <a href="mailto:sam.peterson@lumashape.com" style="color: #000000;">sam.peterson@lumashape.com</a>
            </p>
            <div style="text-align: start; margin-top: 10px;">
              <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
                <img src="${linkedinUrl}" alt="LinkedIn" width="20" />
              </a>
              <a href="https://www.youtube.com/@Lumashape?app=desktop" style="text-decoration: none; margin-left: 20px;">
                <img src="${youtubeUrl}" alt="YouTube" width="20" />
              </a>
            </div>
          </div>
        `,
      };

      // Send email via external API
      await axios.post(
        "https://aletheia.ai.ml-bench.com/api/send-microsoft-email",
        emailData
      );
    } catch (err) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="z-[100000] fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}
      <div className="mx-auto max-w-[90%] md:max-w-[1328px]">
        <h1 className="mt-6 mb-2 font-bold text-[34px] md:text-[40px] text-center leading-[43.3px] md:leading-[50.2px]">
          Get Updated Or Support New Ideas!!
        </h1>
        <p className="mx-auto max-w-[700px] font-medium text-[#00000066] text-[16px] md:text-[20px] text-center">
          Stay in the loop as we get ready to launch Lumashape! Sign up with
          your email below for exclusive updates and early access.
        </p>
        <form onSubmit={handleSignIn}>
          <div className="flex justify-center gap-[8px] mt-4 md:mb-24">
            <input
              className="px-3 border-[1px] rounded-xl outline-none w-full max-w-[477px] h-[42px] md:h-[44px] placeholder:font-foghe md:placeholder:text-[14px] placeholder:text-[13px]"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="bg-[#266CA8] rounded-xl w-[156px] md:w-[130px] h-[42px] md:h-[44px] font-medium text-[13px] text-white md:text-[14px]"
            >
              Get Connected
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

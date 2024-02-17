"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

import desktopSideImg from "../../images/imageD.svg";
import mobileSideImg from "../../images/imageS.svg";

import bigTick from "../../images/icon-success.svg";
import { useMediaQuery } from "react-responsive";

import listTickImg from "../../images/icon-list.svg";
import { useState } from "react";
export default function Home() {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isMediumScreen = useMediaQuery({ minWidth: 641 });

  const liStlye = "flex gap-3";
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(true);
  function validate(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  function emailValidate(event: any) {
    event.preventDefault();
    const email = event.target.value;
    if (validate(email) && email !== "") {
      setOk(true);
      setEmail(email);
    } else {
      setOk(false);
    }
  }

  return (
    <div className="sm:flex h-screen w-full md:justify-center md:items-center text-[#242742] md:bg-[#242742]">
      <title>Newsletter-Subscription</title>
      {page === 1 && (
        <div className="flex flex-col-reverse sm:gap-9 sm:flex-row bg-white rounded-3xl sm:p-6  items-center ">
          <div className="flex flex-col gap-4 sm:gap-7 sm:py-24 py-5 sm:px-9 px-5">
            <h1 className="text-4xl sm:text-5xl font-bold">Stay updated!</h1>
            <p>
              Join 60,000+ product managers receiving monthly
              <br /> updates on:
            </p>
            <ul className="flex flex-col gap-3">
              <li className={liStlye}>
                <Image src={listTickImg} alt="tick" />
                <p>Product discovery and building what matters</p>{" "}
              </li>
              <li className={liStlye}>
                <Image src={listTickImg} alt="tick" />
                <p>Measuring to ensure updates are a success</p>
              </li>
              <li className={liStlye}>
                <Image src={listTickImg} alt="tick" />
                <p>And much more!</p>
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <div className="flex w-full justify-between">
                <span className="text-sm font-semibold">Email address</span>
                {!ok && (
                  <span className="text-sm font-semibold text-[#ff6257]">
                    valid email required
                  </span>
                )}
              </div>
              <input
                onChange={emailValidate}
                type="text"
                placeholder="email@company.com"
                className={
                  ok
                    ? "outline outline-2 outline-gray-300 px-9 py-2 rounded-md focus:outline-gray-500 "
                    : "outline outline-2 outline-red-300 px-9 py-2 rounded-md focus:outline-red-300 bg-red-200 text-[#ff6257] "
                }
              />
            </div>
            <button
              className="bg-[#242742] text-white px-9 py-3 rounded-md hover:bg-gradient-to-r hover:from-red-500  hover:to-orange-400 duration-200"
              disabled={!ok}
              onClick={() => {
                console.log(email);
                setPage(2);
              }}
            >
              Subscribe to monthly newsletter{" "}
            </button>
          </div>
          <div>
            {isSmallScreen && <Image src={mobileSideImg} alt="Hi" />}

            {isMediumScreen && <Image src={desktopSideImg} alt="Hi" />}
          </div>
        </div>
      )}
      {page === 2 && (
        <div className="sm:w-1/4 flex flex-col sm:gap-5  sm:px-14 px-9 bg-white sm:py-9 rounded-3xl justify-center sm:h-auto h-screen gap-80">
          <div className="flex flex-col gap-5 ">
            <Image src={bigTick} alt="tick" height="50" />
            <h1 className="font-bold text-4xl">Thanks for subscribing!</h1>
            <p>
              A confirmation email has been sent to {email}. Please open it and
              click the button inside to confirm your subscription.
            </p>
          </div>
          <button
            className="bg-[#242742] text-white px-9 py-3 rounded-md mt-6 hover:bg-gradient-to-r hover:from-red-500  hover:to-orange-400 duration-200"
            onClick={() => {
              setPage(1);
              setEmail("");
            }}
          >
            {" "}
            Dismiss message
          </button>
        </div>
      )}
    </div>
  );
}

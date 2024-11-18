"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// styles
import styles from "@/styles";
import stylescss from "@/styles/page.module.css";

// components
import { ForgotPasswordForm } from "@/components/forms/forgot-password";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { SmallFooter } from "@/components/small-footer";

export default function Page() {
  return (
    <section
      className={`  relative ${styles.flexCenter}  w-full min-h-screen sm:h-screen`}
    >
      <section className={`  relative ${styles.flexCenter} w-full h-full `}>
        <div
          className={`  relative ${styles.flexBetween} w-full h-full py-8 px-4 flex-col sm:max-w-[500px] space-y-4`}
        >
          {/* Header / Logo */}

          <div className={`h-10 `}>
            <Image
              className={`object-contain w-full h-full`}
              width={24}
              height={24}
              src={"/svgs/logo_light.svg"}
              alt={"disc"}
            ></Image>
          </div>

          {/* Content */}

          <div
            className={`  relative space-y-4 w-full transition-all duration-500 `}
          >
            {/* H1 & p */}
            <div className={`${styles.flexCenter} w-full`}>
              <CircleCheck className=" text-successful h-16 w-16 " />
            </div>
            <div className={`space-y-4 w-full text-center `}>
              <h1 className={` w-full ${styles.H2} font-bold `}>
                Reset password succesful
              </h1>
              <p className={` w-full ${styles.small} `}>
                Successfully changed password. you can enter the main page
              </p>
              <Button className="w-full">
                <Link
                  className="text-sm font-medium text-inherit hover:!no-underline w-full h-full"
                  href={"/login"}
                >
                  Go to home
                </Link>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <SmallFooter />
        </div>
      </section>

      {/* Imagery */}
      <section className={` relative w-full h-full hidden lg:block bg-primary`}>
        <img
          className="object-cover h-full w-full"
          alt="background image"
          src="https://s3-alpha-sig.figma.com/img/5a0d/08aa/eec8ef039ccd249cac58fea2d1b2f0f5?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SzUdmpjJvRoImNkqQyN-NrQqjwbi0k-mjqBXAoim97BoxUTXEAdzDTKfGBnU0O7GuxLgWi8IB71IW2yooDZKfjpEVFA2PKk6fSRhhFj7aTAYBVVolQIVF4dYO2J5nvI7e--EVGatYnpWEtiNRBpaXqLIVE8OdIsCczahH18zTokEMvA-B7b2Ov9SryhPjFkYVTdem2d6J-LBawRm4N0V5jf1PMhiGbqcvz8r4Gbsa8h5kmLjfPbDLLuYZT6kHchnLFI~IYA8mrY5GWq8yx3mLVEe3gv-Efiy3-4YOdMLcjUgoDyC9MpBRBVPpSfC08DiBSqIfnmvNAhdkDQKd1gwnQ__"
        ></img>

        <div
          className={`absolute bottom-14 left-14 space-y-2 w-2/3 text-secondary `}
        >
          <h1 className={` w-full ${styles.H2} font-bold `}>
            Unleash the Power of Our Intuitive Point of Sale Solution
          </h1>
          <p className={` w-full ${styles.small} `}>
            Experience the future of retail with our user-friendly POS platform.
            Increase your sales, streamline operations, and delight your
            customers with a modern and efficient checkout process
          </p>
        </div>
      </section>
    </section>
  );
}

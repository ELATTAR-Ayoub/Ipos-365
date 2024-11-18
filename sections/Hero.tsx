"use client";

import Link from "next/link";

// Styles
import styles from "@/styles";

const Hero = () => {
  return (
    <section
      className={` relative ${styles.flexCenter} w-full h-screen overflow-hidden p-4 `}
    >
      <p className={` ${styles.normal} w-full text-center`}>
        This is the Home page, please try{" "}
        <Link className={`${styles.normal} underline`} href={"/login"}>
          Login Here
        </Link>
        .
      </p>
    </section>
  );
};

export default Hero;

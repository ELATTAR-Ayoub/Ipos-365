"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// styles
import styles from "@/styles";
import { ArrowLeft } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "../Loader";
import { Separator } from "../ui/separator";

// auth
// import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().min(10, {
    message: "Email must be at least 10 characters.",
  }),
});

export function ForgotPasswordForm() {
  //
  // const { user, signin, signinPopup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // inputs
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("sdd");

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      // await signin(values.email, values.password);
      setLoading(false);
      // router.push(`/login/forgot_password/23152ih5ij2g5if325v`);
    } catch (err) {
      const errorMessage = (err as Error).message; // Assert err as Error to access message
      setErr(true);
      setErrMsg(errorMessage);
      setLoading(false);
    }
  }

  return (
    <section className={`  relative ${styles.flexCenter} w-full h-full `}>
      <div
        className={`  relative ${styles.flexBetween} w-full h-full py-8 px-4 flex-col sm:max-w-[500px] space-y-4`}
      >
        {/* logo */}

        <div className={`h-10 `}>
          <Image
            className={`object-contain w-full h-full`}
            width={24}
            height={24}
            src={"/svgs/logo_light.svg"}
            alt={"disc"}
          ></Image>
        </div>

        {/* email form */}

        <div
          className={`  relative space-y-4 w-full transition-all duration-500 `}
        >
          <div className="-space-y-0 w-full ">
            {/* H1 & p */}
            <Button className="mb-4" size={"icon"} variant={"ghost"}>
              <Link className=" underline text-primary" href={"/login"}>
                <ArrowLeft className=" " />
              </Link>
            </Button>
            <div className={`space-y-2 w-full `}>
              <h1 className={` w-full ${styles.H2} font-bold `}>
                Reset password
              </h1>
              <p className={` w-full ${styles.small} `}>
                Input your email address account to receive a reset link
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full "
              >
                <div className="-space-y-1 w-full ">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="yourname@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </form>
            </Form>
          </div>

          {err && (
            <p className={` ${styles.small} text-center text-destructive`}>
              {errMsg}
            </p>
          )}
        </div>

        <div className={`${styles.flexBetween} w-full ${styles.Xsmall}`}>
          <p className={` `}>© 2024 Posive. All rights reserved.</p>

          <div className={`${styles.flexStart} gap-2`}>
            <Link className=" underline" href={"#"}>
              Term & Condition
            </Link>
            <Separator orientation={"vertical"} className="shrink-0 h-4" />
            <Link className=" underline" href={"#"}>
              Privacy & Policy
            </Link>
          </div>
        </div>

        {/* loading */}
        {loading ? <Loader /> : <></>}
      </div>
    </section>
  );
}

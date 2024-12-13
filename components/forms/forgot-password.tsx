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
import { useAuth } from "@/context/AuthContext";
import { SmallFooter } from "../small-footer";

const formSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email address.",
  }),
});

export function ForgotPasswordForm() {
  //
  const { resetPassword } = useAuth();
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
      await resetPassword();
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

        <SmallFooter />

        {/* loading */}
        {loading ? <Loader /> : <></>}
      </div>
    </section>
  );
}

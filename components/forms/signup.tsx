import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// style
import styles from "@/styles";
import { ArrowLeft } from "lucide-react";

// components
import Loader from "../Loader";
import { Button } from "@/components/ui/button";
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
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

// auth
import { useAuth } from "@/context/AuthContext";

// Taiwan phone regex (matches the format: +886 0 936707440 or similar)
const phoneRegex = /^(?:\+886[\s\-]?)?(?:0[\s\-]?)?\d{9}$/;

// The regex will now allow phone numbers like:
// +886 0 936707440
// +886-0-936707440
// +8860936707440
// 0 936707440
// 0936707440

const formSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z.string().email({
      message: "Please provide a valid email address.",
    }),
    phone: z.string().regex(phoneRegex, {
      message:
        "Please enter a valid Taiwan phone number (e.g., +886 0 936707440).",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    rPassword: z.string(),
  })
  .refine((data) => data.password === data.rPassword, {
    message: "Passwords don't match.",
    path: ["rPassword"], // Optional: You can point to rPassword if you want to highlight it specifically in the error message
  });

export function SignupForm() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [emailLogin, setEmailLogin] = useState(false);
  const [userAvatar, setUserAvatar] = useState(
    `https://api.dicebear.com/5.x/lorelei/svg?seed=`
  );
  // ...

  // inputs

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "+886 ",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setUserAvatar(setUserAvatar + values.username);
    setLoading(true);
    try {
      await signup();
      setLoading(false);
    } catch (err) {
      const errorMessage = (err as Error).message; // Assert err as Error to access message
      setErr(true);
      setErrMsg(errorMessage);
      setLoading(false);
    }
  }

  const signupGoogleFunc = async () => {
    try {
      setLoading(true);
      // await signupPopup("google");
    } catch (err) {
      console.log(err);
      const errorMessage = (err as Error).message; // Assert err as Error to access message
      setErr(true);
      setErrMsg(errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
            <div className={`space-y-2 w-full `}>
              <Button className="mb-4" size={"icon"} variant={"ghost"}>
                <Link className=" underline text-primary" href={"/login"}>
                  <ArrowLeft />
                </Link>
              </Button>

              <h1 className={` w-full ${styles.H2} font-bold `}>Register</h1>
              <p className={` w-full ${styles.small} `}>
                Let’s create new account
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Store name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Taiwan (+886) 0 936707440"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="current-password"
                            type="password"
                            placeholder="*******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="current-password"
                            type="password"
                            placeholder="*******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="w-full" type="submit">
                  Register
                </Button>
              </form>
            </Form>
          </div>

          <p className={` ${styles.Xsmall} w-full text-center`}>
            Already have an account?{" "}
            <Link className=" underline" href={"/login"}>
              Login Here
            </Link>
            .
          </p>

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

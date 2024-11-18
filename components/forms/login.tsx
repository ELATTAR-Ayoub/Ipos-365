import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// styles
import styles from "@/styles";
import { EyeOff } from "lucide-react";

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
});

export function LoginForm() {
  const { login } = useAuth();
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
      await login();
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
      // await signinPopup("google");
    } catch (err) {
      const errorMessage = (err as Error).message; // Assert err as Error to access message
      setErr(true);
      setErrMsg(errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`  relative ${styles.flexCenter} w-full h-full overflow-y-auto`}
    >
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
              <h1 className={` w-full ${styles.H2} font-bold `}>Login</h1>
              <p className={` w-full ${styles.small} `}>
                Let’s login into your account first
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
                </div>

                <div className={`${styles.flexBetween} w-full`}>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" />
                    <label
                      htmlFor="rememberMe"
                      className={` text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                    >
                      Remember me
                    </label>
                  </div>

                  <Link className=" underline" href={"/login/forgot_password"}>
                    Forgot Password
                  </Link>
                </div>

                <Button className="w-full" type="submit">
                  Login
                </Button>
              </form>
            </Form>
          </div>

          {/* break line */}

          <div className="flex items-center space-x-2 w-full">
            <Separator className="w-full" />
            <span className={` ${styles.XXsmall} txet-muted`}>Or</span>
            <Separator className="w-full" />
          </div>

          {/* google signup-in */}
          <div
            className={` w-full ${styles.flexCenter} sm:flex-row flex-col gap-2 `}
          >
            <Button
              onClick={signupGoogleFunc}
              variant={"outline"}
              className={`w-full`}
            >
              {" "}
              <Image
                className="mr-2 h-4 w-4"
                width={24}
                height={24}
                src={"/svgs/google.svg"}
                alt={"disc"}
              ></Image>
              Login with Google
            </Button>
          </div>

          <p className={` ${styles.Xsmall} w-full text-center`}>
            Don't have an account?{" "}
            <Link className=" underline" href={"/signup"}>
              Register Here
            </Link>
            .
          </p>

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

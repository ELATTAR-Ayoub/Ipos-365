import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

const formSchema = z
  .object({
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

export function ResetPasswordForm() {
  const { createNewPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // inputs
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("sdd");

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    try {
      await createNewPassword();
      setLoading(false);
    } catch (err) {
      const errorMessage = (err as Error).message; // Assert err as Error to access message
      setErr(true);
      setErrMsg(errorMessage);
      setLoading(false);
    }
  }

  // Add the password strength function
  function getPasswordStrength(password: string): number {
    let strengthLevel = 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strengthLevel += 1;
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
      strengthLevel += 1;
    }

    // Check for special characters
    if (/[@#<!]/.test(password)) {
      strengthLevel += 1;
    }

    return strengthLevel; // Returns strength level between 1 and 4
  }

  // Update password strength when the password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength); // Update the password strength state
  };

  const strengthLabels = ["Weak", "Good", "Strong", "Very Strong"];
  const strengthClasses = [
    "text-destructive", // Level 1
    "text-warning", // Level 2
    "text-successful", // Level 3
    "text-successful", // Level 4
  ];

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
              <Link
                className=" underline text-primary"
                href={"/login/forgot_password"}
              >
                <ArrowLeft className=" " />
              </Link>
            </Button>
            <div className={`space-y-2 w-full `}>
              <h1 className={` w-full ${styles.H2} font-bold `}>
                Create new password
              </h1>
              <p className={` w-full ${styles.small} `}>
                Let's create a new and more secure password
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*******"
                            {...field}
                            onChange={(e) => {
                              handlePasswordChange(e); // Update password strength on change
                              field.onChange(e); // Ensure the form state is updated
                            }}
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
                  Continue
                </Button>
              </form>
            </Form>
          </div>

          <div className={`space-y-2 w-full `}>
            <h2 className={` w-full ${styles.small} `}>
              Min 8 Characters with a combination of letters and numbers
            </h2>
            <div className={` ${styles.flexCenter} gap-4 w-full `}>
              <div className={` ${styles.flexStart} gap-2 w-full `}>
                <PasswordStrengthDisplay passwordStrength={passwordStrength} />
              </div>

              <span
                className={`${
                  strengthClasses[Math.min(passwordStrength, 4) - 1]
                } ${styles.XXsmall} font-bold whitespace-nowrap`}
              >
                {strengthLabels[Math.min(passwordStrength, 4) - 1]}
              </span>
            </div>
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

interface PasswordStrengthBarProps {
  strength: number;
  index: number;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  strength,
  index,
}) => {
  // Determine the background color based on password strength and the index
  let bgColor =
    strength === 1
      ? "bg-destructive"
      : strength === 2
      ? "bg-warning"
      : strength === 3
      ? "bg-successful"
      : strength === 4
      ? "bg-successful"
      : "";

  // Apply muted color when strength is less than the current index
  const isMuted = strength === 0 || strength < index;

  return (
    <div
      className={`w-full h-1 ${bgColor} ${
        isMuted ? "!bg-muted" : ""
      } rounded-full`}
    ></div>
  );
};

const PasswordStrengthDisplay = ({
  passwordStrength,
}: {
  passwordStrength: number;
}) => {
  return (
    <div className={`${styles.flexStart} gap-2 w-full`}>
      {/* Render the PasswordStrengthBar component for each level (1-4) */}
      {[1, 2, 3, 4].map((index) => (
        <PasswordStrengthBar
          key={index}
          strength={passwordStrength}
          index={index}
        />
      ))}
    </div>
  );
};

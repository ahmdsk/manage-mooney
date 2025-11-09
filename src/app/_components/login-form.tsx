"use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { FaGithub } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await signIn("credentials", { email, password });
        console.log("Login response:", response);
    } catch (error) {
        console.error("Login failed", error);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={onSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Welcome back! Please enter your details.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Enter your password"
          />
        </Field>
        <Field>
          <Button type="submit">Sign in</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={() => signIn("github")}
          >
            <FaGithub />
            Login with GitHub
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up for free
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

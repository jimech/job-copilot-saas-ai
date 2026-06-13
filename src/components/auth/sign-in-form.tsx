"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_ROUTES } from "@/lib/constants/app";
import { createBrowserSupabaseClient } from "@/server/supabase/browser";

type FormErrors = {
  email?: string;
  password?: string;
};

type SignInFormProps = {
  initialMessage?: string;
  redirectTo?: string;
};

const AUTH_NOT_CONFIGURED_MESSAGE =
  "Authentication is not configured yet. Add Supabase environment variables to continue.";

function validateForm(email: string, password: string) {
  const errors: FormErrors = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

function getSafeAuthError(error: unknown) {
  if (error instanceof Error && error.message.includes("Supabase public")) {
    return AUTH_NOT_CONFIGURED_MESSAGE;
  }

  return "Invalid email or password.";
}

export function SignInForm({
  initialMessage,
  redirectTo = APP_ROUTES.dashboard,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(
    initialMessage ?? null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(email, password);
    setErrors(nextErrors);
    setFormMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setFormMessage(getSafeAuthError(error));
        return;
      }

      window.location.assign(redirectTo);
    } catch (error) {
      setFormMessage(getSafeAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5">
      {formMessage ? (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {formMessage}
        </div>
      ) : null}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-in-email">Email</Label>
          <Input
            aria-describedby={errors.email ? "sign-in-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            disabled={isSubmitting}
            id="sign-in-email"
            inputMode="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
          {errors.email ? (
            <p className="text-sm text-destructive" id="sign-in-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-in-password">Password</Label>
          <Input
            aria-describedby={
              errors.password ? "sign-in-password-error" : undefined
            }
            aria-invalid={Boolean(errors.password)}
            autoComplete="current-password"
            disabled={isSubmitting}
            id="sign-in-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
          {errors.password ? (
            <p className="text-sm text-destructive" id="sign-in-password-error">
              {errors.password}
            </p>
          ) : null}
        </div>

        <Button className="mt-1 w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          className="font-medium text-foreground underline-offset-4 hover:underline"
          href={APP_ROUTES.signUp}
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

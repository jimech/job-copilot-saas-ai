"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { APP_ROUTES } from "@/lib/constants/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserSupabaseClient } from "@/server/supabase/browser";

type FormErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const AUTH_NOT_CONFIGURED_MESSAGE =
  "Authentication is not configured yet. Add Supabase environment variables to continue.";

function validateForm(
  email: string,
  password: string,
  confirmPassword: string,
) {
  const errors: FormErrors = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match.";
  }

  return errors;
}

function getSafeAuthError(error: unknown) {
  if (error instanceof Error && error.message.includes("Supabase public")) {
    return AUTH_NOT_CONFIGURED_MESSAGE;
  }

  return "Unable to create your account. Check your email and password, then try again.";
}

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(email, password, confirmPassword);
    setErrors(nextErrors);
    setFormMessage(null);
    setSuccessMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const origin = window.location.origin;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${APP_ROUTES.onboarding}`,
        },
      });

      if (error) {
        setFormMessage(getSafeAuthError(error));
        return;
      }

      if (data.session) {
        window.location.assign(APP_ROUTES.onboarding);
        return;
      }

      setSuccessMessage("Check your email to confirm your account.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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

      {successMessage ? (
        <div
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300"
          role="status"
        >
          {successMessage}
        </div>
      ) : null}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-up-email">Email</Label>
          <Input
            aria-describedby={errors.email ? "sign-up-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            disabled={isSubmitting}
            id="sign-up-email"
            inputMode="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
          {errors.email ? (
            <p className="text-sm text-destructive" id="sign-up-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-up-password">Password</Label>
          <Input
            aria-describedby={
              errors.password ? "sign-up-password-error" : undefined
            }
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
            disabled={isSubmitting}
            id="sign-up-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
          {errors.password ? (
            <p className="text-sm text-destructive" id="sign-up-password-error">
              {errors.password}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sign-up-confirm-password">Confirm password</Label>
          <Input
            aria-describedby={
              errors.confirmPassword
                ? "sign-up-confirm-password-error"
                : undefined
            }
            aria-invalid={Boolean(errors.confirmPassword)}
            autoComplete="new-password"
            disabled={isSubmitting}
            id="sign-up-confirm-password"
            name="confirmPassword"
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            value={confirmPassword}
          />
          {errors.confirmPassword ? (
            <p
              className="text-sm text-destructive"
              id="sign-up-confirm-password-error"
            >
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>

        <Button className="mt-1 w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="font-medium text-foreground underline-offset-4 hover:underline"
          href={APP_ROUTES.signIn}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

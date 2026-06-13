"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { APP_ROUTES } from "@/lib/constants/app";
import { createBrowserSupabaseClient } from "@/server/supabase/browser";

export type OnboardingFormValues = {
  fullName: string;
  country: string;
  preferredLanguage: string;
  targetRoles: string;
  experienceLevel: string;
};

type OnboardingFormErrors = Partial<
  Record<keyof OnboardingFormValues, string>
>;

type OnboardingFormProps = {
  initialValues: OnboardingFormValues;
};

const AUTH_NOT_CONFIGURED_MESSAGE =
  "Authentication is not configured yet. Add Supabase environment variables to continue.";

function parseTargetRoles(value: string) {
  return value
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
}

function validateForm(values: OnboardingFormValues) {
  const errors: OnboardingFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!values.preferredLanguage) {
    errors.preferredLanguage = "Preferred language is required.";
  }

  if (parseTargetRoles(values.targetRoles).length === 0) {
    errors.targetRoles = "Add at least one target role.";
  }

  if (!values.experienceLevel) {
    errors.experienceLevel = "Experience level is required.";
  }

  return errors;
}

function getSafeSaveError(error: unknown) {
  if (error instanceof Error && error.message.includes("Supabase public")) {
    return AUTH_NOT_CONFIGURED_MESSAGE;
  }

  return "We could not save your onboarding details. Please try again.";
}

export function OnboardingForm({ initialValues }: OnboardingFormProps) {
  const [values, setValues] = useState<OnboardingFormValues>(initialValues);
  const [errors, setErrors] = useState<OnboardingFormErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<Key extends keyof OnboardingFormValues>(
    key: Key,
    value: OnboardingFormValues[Key],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setFormMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const targetRoles = parseTargetRoles(values.targetRoles);
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: values.fullName.trim(),
          country: values.country.trim(),
          preferred_language: values.preferredLanguage,
          target_roles: targetRoles,
          experience_level: values.experienceLevel,
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString(),
        },
      });

      if (error) {
        setFormMessage(getSafeSaveError(error));
        return;
      }

      window.location.assign(APP_ROUTES.dashboard);
    } catch (error) {
      setFormMessage(getSafeSaveError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex max-w-2xl flex-col gap-5" onSubmit={handleSubmit}>
      {formMessage ? (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {formMessage}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="onboarding-full-name">Full name</Label>
          <Input
            aria-describedby={
              errors.fullName ? "onboarding-full-name-error" : undefined
            }
            aria-invalid={Boolean(errors.fullName)}
            autoComplete="name"
            disabled={isSubmitting}
            id="onboarding-full-name"
            name="fullName"
            onChange={(event) => updateValue("fullName", event.target.value)}
            value={values.fullName}
          />
          {errors.fullName ? (
            <p
              className="text-sm text-destructive"
              id="onboarding-full-name-error"
            >
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="onboarding-country">Country</Label>
          <Input
            aria-describedby={
              errors.country ? "onboarding-country-error" : undefined
            }
            aria-invalid={Boolean(errors.country)}
            autoComplete="country-name"
            disabled={isSubmitting}
            id="onboarding-country"
            name="country"
            onChange={(event) => updateValue("country", event.target.value)}
            value={values.country}
          />
          {errors.country ? (
            <p
              className="text-sm text-destructive"
              id="onboarding-country-error"
            >
              {errors.country}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="onboarding-preferred-language">
            Preferred language
          </Label>
          <Select
            disabled={isSubmitting}
            onValueChange={(value) => updateValue("preferredLanguage", value)}
            value={values.preferredLanguage}
          >
            <SelectTrigger
              aria-describedby={
                errors.preferredLanguage
                  ? "onboarding-preferred-language-error"
                  : undefined
              }
              aria-invalid={Boolean(errors.preferredLanguage)}
              className="w-full"
              id="onboarding-preferred-language"
            >
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
          {errors.preferredLanguage ? (
            <p
              className="text-sm text-destructive"
              id="onboarding-preferred-language-error"
            >
              {errors.preferredLanguage}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="onboarding-experience-level">
            Experience level
          </Label>
          <Select
            disabled={isSubmitting}
            onValueChange={(value) => updateValue("experienceLevel", value)}
            value={values.experienceLevel}
          >
            <SelectTrigger
              aria-describedby={
                errors.experienceLevel
                  ? "onboarding-experience-level-error"
                  : undefined
              }
              aria-invalid={Boolean(errors.experienceLevel)}
              className="w-full"
              id="onboarding-experience-level"
            >
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="entry_level">Entry Level</SelectItem>
              <SelectItem value="mid_level">Mid Level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="career_changer">Career Changer</SelectItem>
            </SelectContent>
          </Select>
          {errors.experienceLevel ? (
            <p
              className="text-sm text-destructive"
              id="onboarding-experience-level-error"
            >
              {errors.experienceLevel}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="onboarding-target-roles">Target roles</Label>
        <Textarea
          aria-describedby={
            errors.targetRoles ? "onboarding-target-roles-error" : undefined
          }
          aria-invalid={Boolean(errors.targetRoles)}
          disabled={isSubmitting}
          id="onboarding-target-roles"
          name="targetRoles"
          onChange={(event) => updateValue("targetRoles", event.target.value)}
          placeholder="Software Engineer, Product Manager, Data Analyst"
          value={values.targetRoles}
        />
        {errors.targetRoles ? (
          <p
            className="text-sm text-destructive"
            id="onboarding-target-roles-error"
          >
            {errors.targetRoles}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Save and continue"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  budgetOptions,
  contactInquirySchema,
  contactTopics,
  fieldErrors,
  projectInquirySchema,
  teamSizeOptions,
  timelineOptions,
  type FieldErrors,
} from "@/lib/inquiry";
import { Icon } from "./icons";
import { cx } from "./ui";

type Option = { value: string; label: string };
type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; reference: string } | { state: "error"; message: string };

const inputClass =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-2 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

function Field({
  name,
  label,
  hint,
  required,
  error,
  children,
  className,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
        <span>
          {label}
          {required && <span className="text-accent"> *</span>}
        </span>
        {!required && <span className="font-mono text-[10px] font-normal uppercase tracking-wider text-muted-2">Optional</span>}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-xs leading-relaxed text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(name: string, hint?: string, error?: string) {
  return [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
}

function TextInput(props: { name: string; label: string; type?: string; required?: boolean; hint?: string; errors: FieldErrors; autoComplete?: string; placeholder?: string; defaultValue?: string; className?: string }) {
  const { name, label, type = "text", required, hint, errors, autoComplete, placeholder, defaultValue, className } = props;
  return (
    <Field name={name} label={label} hint={hint} required={required} error={errors[name]} className={className}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, hint, errors[name])}
        className={cx(inputClass, errors[name] ? "border-red-600" : "border-line")}
      />
    </Field>
  );
}

function TextArea(props: { name: string; label: string; required?: boolean; hint?: string; errors: FieldErrors; placeholder?: string; rows?: number; className?: string }) {
  const { name, label, required, hint, errors, placeholder, rows = 4, className } = props;
  return (
    <Field name={name} label={label} hint={hint} required={required} error={errors[name]} className={className}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, hint, errors[name])}
        className={cx(inputClass, "resize-y", errors[name] ? "border-red-600" : "border-line")}
      />
    </Field>
  );
}

function Select(props: { name: string; label: string; options: readonly Option[]; required?: boolean; hint?: string; errors: FieldErrors; defaultValue?: string; placeholder?: string; className?: string }) {
  const { name, label, options, required, hint, errors, defaultValue, placeholder = "Select…", className } = props;
  return (
    <Field name={name} label={label} hint={hint} required={required} error={errors[name]} className={className}>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={describedBy(name, hint, errors[name])}
        className={cx(inputClass, errors[name] ? "border-red-600" : "border-line")}
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

function SuccessPanel({ reference, title, children }: { reference: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-white p-8" role="status" aria-live="polite">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon name="check" className="h-5 w-5" strokeWidth={2} />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
      <p className="mt-6 font-mono text-xs text-muted">
        Reference: <span className="text-ink">{reference}</span>
      </p>
      <Link href="/workflows" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
        Browse the workflow library <Icon name="arrow-right" className="h-4 w-4" />
      </Link>
    </div>
  );
}

async function submit(payload: Record<string, unknown>) {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string; fieldErrors?: FieldErrors };
  return { ok: res.ok && data.ok === true, ...data };
}

function useFormState() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  return { status, setStatus, errors, setErrors };
}

function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
}

function SubmitBar({ status, label }: { status: Status; label: string }) {
  return (
    <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs leading-relaxed text-muted">
        We use your details only to respond to this inquiry. See our{" "}
        <Link href="/privacy" className="underline hover:text-ink">
          privacy notice
        </Link>
        .
      </p>
      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70"
      >
        {status.state === "submitting" ? "Sending…" : label}
        {status.state !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
      </button>
    </div>
  );
}

function ErrorBanner({ status }: { status: Status }) {
  if (status.state !== "error") return null;
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
      {status.message}
    </div>
  );
}

export function ProjectInquiryForm({ industries, context, defaultIndustry }: { industries: Option[]; context?: string; defaultIndustry?: string }) {
  const { status, setStatus, errors, setErrors } = useFormState();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = { kind: "project", ...Object.fromEntries(new FormData(form)) };
    const parsed = projectInquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus({ state: "error", message: "Please complete the highlighted fields." });
      focusFirstError(form, errs);
      return;
    }
    setErrors({});
    setStatus({ state: "submitting" });
    try {
      const res = await submit(payload);
      if (res.ok && res.reference) setStatus({ state: "success", reference: res.reference });
      else {
        setErrors(res.fieldErrors ?? {});
        setStatus({ state: "error", message: res.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <SuccessPanel reference={status.reference} title="Project inquiry received">
        <p>Thank you. We will review the details you shared and reply within two business days.</p>
        <p>
          If your project looks like a good fit, the next step is a short discovery call to walk through your current process.
          If it is not something we can help with, we will tell you and, where possible, suggest an alternative.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-10 rounded-lg border border-line bg-white p-6 sm:p-8">
      <Honeypot />
      {context && <input type="hidden" name="context" value={context} />}
      <fieldset className="space-y-5">
        <legend className="eyebrow text-accent">01 · Your business</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput name="company" label="Business name" required errors={errors} autoComplete="organization" />
          <Select
            name="industry"
            label="Industry"
            required
            errors={errors}
            defaultValue={defaultIndustry}
            options={[...industries, { value: "other", label: "Other" }]}
          />
          <Select name="teamSize" label="Number of employees" errors={errors} options={teamSizeOptions} />
          <TextInput name="existingSoftware" label="Current software and platforms" errors={errors} placeholder="e.g. Google Workspace, QuickBooks, Jobber" />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="eyebrow text-accent">02 · Contact</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput name="name" label="Your name" required errors={errors} autoComplete="name" />
          <TextInput name="email" label="Email" type="email" required errors={errors} autoComplete="email" />
          <TextInput name="phone" label="Phone" type="tel" errors={errors} autoComplete="tel" />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="eyebrow text-accent">03 · The problem</legend>
        <TextArea
          name="problems"
          label="What operational problems are you facing?"
          required
          errors={errors}
          hint="Describe what happens today. Where does time go? What gets missed or delayed?"
          placeholder="e.g. We miss calls while on jobs, and quote requests sit in the inbox for a day or two before anyone replies."
        />
        <TextArea
          name="tasks"
          label="Which tasks would you like to automate?"
          required
          errors={errors}
          placeholder="e.g. Replying to new inquiries, collecting job details, sending follow-ups on estimates."
        />
        <TextArea name="outcome" label="What would a successful outcome look like?" errors={errors} rows={3} placeholder="e.g. Every inquiry gets a reply within five minutes, and we stop tracking leads in a notebook." />
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="eyebrow text-accent">04 · Scope</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Select name="budget" label="Estimated budget" required errors={errors} options={budgetOptions} hint="A rough range helps us propose the right scope." />
          <Select name="timeline" label="Timeline" errors={errors} options={timelineOptions} hint="When would you like this in place?" />
        </div>
        <TextArea name="details" label="Additional details" errors={errors} rows={3} placeholder="Anything else we should know: constraints, previous attempts, compliance requirements." />
      </fieldset>

      <ErrorBanner status={status} />
      <SubmitBar status={status} label="Submit project inquiry" />
    </form>
  );
}

export function ContactForm({ defaultTopic, context }: { defaultTopic?: string; context?: string }) {
  const { status, setStatus, errors, setErrors } = useFormState();
  const initialTopic = contactTopics.some((t) => t.value === defaultTopic) ? defaultTopic : "consultation";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = { kind: "contact", ...Object.fromEntries(new FormData(form)) };
    const parsed = contactInquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus({ state: "error", message: "Please complete the highlighted fields." });
      focusFirstError(form, errs);
      return;
    }
    setErrors({});
    setStatus({ state: "submitting" });
    try {
      const res = await submit(payload);
      if (res.ok && res.reference) setStatus({ state: "success", reference: res.reference });
      else {
        setErrors(res.fieldErrors ?? {});
        setStatus({ state: "error", message: res.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <SuccessPanel reference={status.reference} title="Message received">
        <p>Thank you for getting in touch. We will reply within two business days.</p>
        <p>For a consultation, we will suggest a few times for a 30-minute call focused on your current process.</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5 rounded-lg border border-line bg-white p-6 sm:p-8">
      <Honeypot />
      {context && <input type="hidden" name="context" value={context} />}
      <Select name="topic" label="What can we help with?" required errors={errors} options={contactTopics} defaultValue={initialTopic} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput name="name" label="Name" required errors={errors} autoComplete="name" />
        <TextInput name="email" label="Email" type="email" required errors={errors} autoComplete="email" />
        <TextInput name="company" label="Business name" errors={errors} autoComplete="organization" />
        <TextInput name="phone" label="Phone" type="tel" errors={errors} autoComplete="tel" />
      </div>
      <TextArea
        name="message"
        label="Message"
        required
        errors={errors}
        rows={5}
        placeholder="Tell us briefly about your business and what you would like to improve."
      />
      <ErrorBanner status={status} />
      <SubmitBar status={status} label="Send message" />
    </form>
  );
}

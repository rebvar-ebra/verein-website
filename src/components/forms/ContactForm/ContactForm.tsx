"use client";
import { useSyncExternalStore, useRef, useState } from "react";
import {
  contactSchema,
  type ContactInput,
} from "@/features/contact/contact.schema";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ContactForm() {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactInput, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const form = useRef<HTMLFormElement>(null);
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      autocomplete: "name",
      max: 100,
    },
    {
      name: "email",
      label: "E-Mail",
      type: "email",
      autocomplete: "email",
      max: 254,
    },
    {
      name: "subject",
      label: "Betreff",
      type: "text",
      autocomplete: "off",
      max: 150,
    },
    {
      name: "message",
      label: "Nachricht",
      type: "text",
      autocomplete: "off",
      max: 5000,
    },
  ] as const;
  return (
    <form
      ref={form}
      aria-label="Kontaktformular"
      aria-describedby="contact-preview"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("idle");
        const result = contactSchema.safeParse(
          Object.fromEntries(new FormData(event.currentTarget)),
        );
        if (!result.success) {
          const nextErrors: Partial<Record<keyof ContactInput, string>> = {};
          for (const issue of result.error.issues) {
            const key = issue.path[0] as keyof ContactInput;
            nextErrors[key] ??= issue.message;
          }
          setErrors(nextErrors);
          const first = fields.find((field) => nextErrors[field.name]);
          if (first)
            (
              form.current?.elements.namedItem(first.name) as HTMLElement | null
            )?.focus();
          return;
        }
        setErrors({});
        setStatus("submitting");
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              ...result.data,
              website: String(
                new FormData(event.currentTarget).get("website") ?? "",
              ),
            }),
          });
          if (!response.ok) throw new Error("Contact request failed");
          form.current?.reset();
          setStatus("success");
        } catch {
          setStatus("error");
        }
      }}
      className="rounded-3xl border border-forest/15 bg-white/60 p-6 sm:p-9"
    >
      <h2 className="text-2xl font-medium tracking-tight">Deine Nachricht</h2>
      <p
        id="contact-preview"
        className="mb-7 mt-3 rounded-xl bg-sage/50 p-4 text-sm leading-6"
      >
        Deine Nachricht wird per E-Mail an Neuer Tag e.V. gesendet.
      </p>
      <fieldset
        disabled={!ready || status === "submitting"}
        className="space-y-5"
      >
        <legend className="mb-5 text-sm text-muted">
          Alle Felder sind Pflichtfelder.
        </legend>
        {fields.map((field) => {
          const props = {
            id: `contact-${field.name}`,
            name: field.name,
            required: true,
            maxLength: field.max,
            autoComplete: field.autocomplete,
            "aria-invalid": Boolean(errors[field.name]),
            "aria-describedby": errors[field.name]
              ? `contact-${field.name}-error`
              : undefined,
            className:
              "mt-2 w-full min-w-0 rounded-xl border border-forest/30 bg-cream px-4 py-3 text-base aria-invalid:border-red-700",
            onChange: () => {
              setStatus("idle");
              setErrors((previous) => ({
                ...previous,
                [field.name]: undefined,
              }));
            },
          };
          return (
            <div key={field.name}>
              <label htmlFor={props.id} className="text-sm font-medium">
                {field.label}
              </label>
              {field.name === "message" ? (
                <textarea
                  {...props}
                  rows={6}
                  className={`${props.className} resize-y`}
                />
              ) : (
                <input {...props} type={field.type} />
              )}
              {errors[field.name] && (
                <p
                  id={`contact-${field.name}-error`}
                  className="mt-2 text-sm text-red-800"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        {Object.values(errors).some(Boolean) && (
          <p role="alert" className="text-sm text-red-800">
            Bitte prüfe die markierten Felder.
          </p>
        )}
        <button type="submit" className="button button-orange w-full sm:w-auto">
          {status === "submitting" ? "Wird gesendet …" : "Nachricht senden"}
        </button>
      </fieldset>
      {!ready && (
        <p className="mt-4 text-sm text-muted">
          Für die lokale Prüfung der Eingaben ist JavaScript erforderlich.
        </p>
      )}
      {status === "success" && (
        <p
          role="status"
          className="mt-5 rounded-xl border border-forest/20 bg-sage/50 p-4 text-sm leading-6"
        >
          Vielen Dank. Deine Nachricht wurde erfolgreich gesendet.
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-800/30 bg-red-50 p-4 text-sm leading-6 text-red-900"
        >
          Die Nachricht konnte gerade nicht gesendet werden. Bitte versuche es
          später erneut oder schreibe direkt an info@neuertag-ev.de.
        </p>
      )}
    </form>
  );
}

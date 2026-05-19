import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z
  .object({
    nombre: z.string().trim().min(2, "Nombre requerido").max(80),
    email: z.string().trim().email("Correo inválido").max(120),
    telefono: z.string().trim().min(6, "Teléfono inválido").max(25),
    edad: z.coerce.number({ invalid_type_error: "Edad inválida" }).min(15, "Edad mínima 15").max(90),
    nivel: z
      .string()
      .min(1, "Selecciona un nivel")
      .refine((v) => ["principiante", "intermedio"].includes(v), "Selecciona un nivel"),
    talla: z
      .string()
      .min(1, "Selecciona talla")
      .refine((v) => ["S", "M", "L"].includes(v), "Selecciona talla"),
    direccion: z.string().trim().min(2, "Dirección requerida").max(120),
    condicion: z
      .string()
      .min(1, "Selecciona una opción")
      .refine((v) => ["si", "no"].includes(v), "Selecciona una opción"),
    condicionDetalle: z.string().trim().max(200).optional(),
    terminos: z.boolean().refine((v) => v === true, "Debes aceptar los términos"),
    imagen: z.boolean().refine((v) => v === true, "Debes autorizar el uso de imagen"),
  })
  .refine((d) => d.condicion !== "si" || (d.condicionDetalle && d.condicionDetalle.length >= 2), {
    message: "Indica cuál condición",
    path: ["condicionDetalle"],
  });

const fieldClass =
  "w-full bg-transparent border-0 border-b border-heritage/25 py-4 text-heritage placeholder:text-heritage/40 focus:outline-none focus:border-[var(--fila-red)] transition-colors";

const MAILCHIMP_URL =
  "https://spwcorp.us3.list-manage.com/subscribe/post-json?u=92672509bc7b68335c65ae498&id=302bd38f23&f_id=0056c1e5f0";

function submitToMailchimp(params: Record<string, string>): Promise<{ result: string; msg: string }> {
  return new Promise((resolve, reject) => {
    const cb = `mc_cb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const qs = new URLSearchParams(params).toString();
    const script = document.createElement("script");
    script.src = `${MAILCHIMP_URL}&${qs}&c=${cb}`;
    const cleanup = () => {
      delete (window as any)[cb];
      script.remove();
    };
    (window as any)[cb] = (data: { result: string; msg: string }) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("network"));
    };
    document.body.appendChild(script);
  });
}

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [condicion, setCondicion] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      nombre: fd.get("nombre"),
      email: fd.get("email"),
      telefono: fd.get("telefono"),
      edad: fd.get("edad"),
      nivel: fd.get("nivel"),
      talla: fd.get("talla"),
      direccion: fd.get("direccion"),
      condicion: fd.get("condicion"),
      condicionDetalle: fd.get("condicionDetalle") ?? "",
      terminos: fd.get("terminos") === "on",
      imagen: fd.get("imagen") === "on",
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!fe[k]) fe[k] = i.message;
      });
      setErrors(fe);
      toast.error("Revisa los campos marcados");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const fullName = parsed.data.nombre.trim();
      const idx = fullName.indexOf(" ");
      const fname = idx === -1 ? fullName : fullName.slice(0, idx);
      const lname = idx === -1 ? "" : fullName.slice(idx + 1);
      const res = await submitToMailchimp({
        EMAIL: parsed.data.email,
        FNAME: fname,
        LNAME: lname,
        ADDRESS: parsed.data.direccion,
        PHONE: parsed.data.telefono,
      });
      if (res.result === "success") {
        toast.success("¡Inscripción confirmada!");
        form.reset();
        setCondicion("");
        setSubmitted(true);
      } else {
        const msg = (res.msg || "").replace(/<[^>]+>/g, "");
        toast.error(msg || "No se pudo completar la inscripción");
      }
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };


  if (submitted) {
    return (
      <div className="border border-heritage/15 p-12 md:p-16 text-center">
        <div className="label-tech text-[var(--fila-red)] mb-6">Confirmación</div>
        <h3 className="text-editorial text-4xl md:text-6xl text-heritage mb-6">
          Nos vemos en la línea de salida.
        </h3>
        <p className="text-heritage/70 max-w-lg mx-auto">
          Gracias por inscribirte. Pronto recibirás la confirmación con todos los detalles del evento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8" noValidate>
      <Field label="Nombre completo" name="nombre" type="text" error={errors.nombre} />
      <Field label="Correo electrónico" name="email" type="email" error={errors.email} />
      <Field label="Número de teléfono" name="telefono" type="tel" error={errors.telefono} />
      <Field label="Edad" name="edad" type="number" error={errors.edad} />

      <div>
        <Label>Nivel de corredor</Label>
        <div className="flex gap-3 mt-3">
          {["principiante", "intermedio"].map((n) => (
            <label key={n} className="flex-1 cursor-pointer group">
              <input type="radio" name="nivel" value={n} className="peer sr-only" />
              <div className="border border-heritage/25 py-4 text-center label-tech text-heritage/80 transition-all duration-200 group-hover:border-heritage/60 group-hover:text-heritage group-hover:bg-heritage/[0.04] peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] peer-checked:text-heritage peer-checked:shadow-[0_0_0_1px_var(--fila-red)]">
                {n}
              </div>
            </label>
          ))}
        </div>
        {errors.nivel && <p className="mt-2 text-xs text-[var(--fila-red)]">{errors.nivel}</p>}
      </div>

      <div>
        <Label>Talla de camiseta</Label>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {["S", "M", "L"].map((s) => (
            <label key={s} className="cursor-pointer group">
              <input type="radio" name="talla" value={s} className="peer sr-only" />
              <div className="border border-heritage/25 py-3 text-center label-tech text-heritage/80 transition-all duration-200 group-hover:border-heritage/60 group-hover:text-heritage group-hover:bg-heritage/[0.04] peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] peer-checked:text-heritage peer-checked:shadow-[0_0_0_1px_var(--fila-red)]">
                {s}
              </div>
            </label>
          ))}
        </div>
        {errors.talla && <p className="mt-2 text-xs text-[var(--fila-red)]">{errors.talla}</p>}
      </div>

      <Field label="Dirección" name="direccion" type="text" error={errors.direccion} className="md:col-span-2" />

      <div className="md:col-span-2">
        <Label>¿Sufre de alguna condición de salud?</Label>
        <div className="flex gap-3 mt-3 max-w-xs">
          {[
            { v: "si", l: "Sí" },
            { v: "no", l: "No" },
          ].map((opt) => (
            <label key={opt.v} className="flex-1 cursor-pointer group">
              <input
                type="radio"
                name="condicion"
                value={opt.v}
                className="peer sr-only"
                onChange={() => setCondicion(opt.v)}
              />
              <div className="border border-heritage/25 py-4 text-center label-tech text-heritage/80 transition-all duration-200 group-hover:border-heritage/60 group-hover:text-heritage group-hover:bg-heritage/[0.04] peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] peer-checked:text-heritage peer-checked:shadow-[0_0_0_1px_var(--fila-red)]">
                {opt.l}
              </div>
            </label>
          ))}
        </div>
        {errors.condicion && <p className="mt-2 text-xs text-[var(--fila-red)]">{errors.condicion}</p>}
      </div>

      {condicion === "si" && (
        <Field
          label="¿Cuál?"
          name="condicionDetalle"
          type="text"
          error={errors.condicionDetalle}
          className="md:col-span-2"
        />
      )}

      <div className="md:col-span-2 space-y-4 pt-4">
        <Checkbox name="terminos" error={errors.terminos}>
          Acepto los{" "}
          <a
            href="https://filalatin.com/pages/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-heritage hover:text-[var(--fila-red)] transition-colors"
          >
            términos y condiciones
          </a>{" "}
          del evento.
        </Checkbox>
        <Checkbox name="imagen" error={errors.imagen}>
          Autorizo el uso de mi imagen para fines comunicacionales de FILA.
        </Checkbox>
      </div>

      <div className="md:col-span-2 pt-6 flex justify-center md:justify-start">
        <button type="submit" disabled={submitting} className="cta-pill cta-pill-red px-10 py-5 disabled:opacity-60 disabled:cursor-not-allowed">
          <span>{submitting ? "Enviando..." : "Confirmar inscripción"}</span>
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="label-tech text-heritage/55">{children}</span>;
}

function Field({
  label,
  name,
  type,
  error,
  className = "",
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input name={name} type={type} className={fieldClass} placeholder=" " />
      {error && <p className="mt-2 text-xs text-[var(--fila-red)]">{error}</p>}
    </div>
  );
}

function Checkbox({
  name,
  children,
  error,
}: {
  name: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex items-start gap-4 cursor-pointer group">
      <input type="checkbox" name={name} className="peer sr-only" />
      <span className="mt-1 inline-block h-4 w-4 border border-heritage/40 peer-checked:bg-[var(--fila-red)] peer-checked:border-[var(--fila-red)] transition-colors shrink-0" />
      <span className="text-sm text-heritage/70 group-hover:text-heritage transition-colors">
        {children}
        {error && <span className="block mt-1 text-xs text-[var(--fila-red)]">{error}</span>}
      </span>
    </label>
  );
}

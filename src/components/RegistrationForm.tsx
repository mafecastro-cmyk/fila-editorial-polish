import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  nombre: z.string().trim().min(2, "Nombre requerido").max(80),
  email: z.string().trim().email("Correo inválido").max(120),
  telefono: z.string().trim().min(6, "Teléfono inválido").max(25),
  edad: z.coerce.number({ invalid_type_error: "Edad inválida" }).min(15, "Edad mínima 15").max(90),
  nivel: z.string().min(1, "Selecciona un nivel").refine((v) => ["principiante", "intermedio"].includes(v), "Selecciona un nivel"),
  talla: z.string().min(1, "Selecciona talla").refine((v) => ["XS","S","M","L","XL","XXL"].includes(v), "Selecciona talla"),
  ciudad: z.string().trim().min(2, "Ciudad requerida").max(60),
  terminos: z.boolean().refine((v) => v === true, "Debes aceptar los términos"),
  imagen: z.boolean().refine((v) => v === true, "Debes autorizar el uso de imagen"),
});

const fieldClass =
  "w-full bg-transparent border-0 border-b border-heritage/25 py-4 text-heritage placeholder:text-heritage/40 focus:outline-none focus:border-[var(--fila-red)] transition-colors";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      nombre: fd.get("nombre"),
      email: fd.get("email"),
      telefono: fd.get("telefono"),
      edad: fd.get("edad"),
      nivel: fd.get("nivel"),
      talla: fd.get("talla"),
      ciudad: fd.get("ciudad"),
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
    setSubmitted(true);
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
        <div className="grid grid-cols-6 gap-2 mt-3">
          {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
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

      <Field label="Ciudad" name="ciudad" type="text" error={errors.ciudad} className="md:col-span-2" />

      <div className="md:col-span-2 space-y-4 pt-4">
        <Checkbox name="terminos" error={errors.terminos}>
          Acepto los términos y condiciones del evento.
        </Checkbox>
        <Checkbox name="imagen" error={errors.imagen}>
          Autorizo el uso de mi imagen para fines comunicacionales de FILA.
        </Checkbox>
      </div>

      <div className="md:col-span-2 pt-6 flex justify-center md:justify-start">
        <button type="submit" className="cta-pill cta-pill-red px-10 py-5">
          <span>Confirmar inscripción</span>
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

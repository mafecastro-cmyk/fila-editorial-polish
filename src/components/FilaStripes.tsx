import { cn } from "@/lib/utils";

interface FilaStripesProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  animated?: boolean;
  variant?: "heritage" | "three";
}

/**
 * FILA stripe system.
 * - "heritage": 7 stripes with thickness variance
 * - "three":    classic 3-stripe Barretta — Red / Navy / Red
 */
export function FilaStripes({
  className,
  orientation = "horizontal",
  animated = false,
  variant = "heritage",
}: FilaStripesProps) {
  const isH = orientation === "horizontal";

  if (variant === "three") {
    const colors = ["var(--fila-red)", "var(--fila-navy)", "var(--fila-red)"];
    return (
      <div
        className={cn("flex", isH ? "flex-row gap-1.5" : "flex-col gap-1.5", className)}
        aria-hidden
      >
        {colors.map((c, i) => (
          <span
            key={i}
            className="block"
            style={
              isH
                ? { backgroundColor: c, height: "100%", flex: 1 }
                : { backgroundColor: c, width: "100%", flex: 1 }
            }
          />
        ))}
      </div>
    );
  }

  const widths = [3, 5, 2, 7, 4, 6, 3];
  return (
    <div
      className={cn("fila-stripes", animated && "stripe-anim", className)}
      style={{ flexDirection: isH ? "row" : "column" }}
      aria-hidden
    >
      {widths.map((w, i) => (
        <span
          key={i}
          style={
            isH
              ? { width: `${w * 6}px`, height: "100%" }
              : { height: `${w * 6}px`, width: "100%" }
          }
        />
      ))}
    </div>
  );
}

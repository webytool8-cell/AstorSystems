/**
 * Hero illustration: inbound channels flow through a central automation layer into the
 * systems a business already uses. Purely illustrative, drawn in SVG so it stays crisp
 * and lightweight.
 */
const inputs = ["Phone calls", "Web forms", "Email", "Text messages"];
const outputs = ["CRM & records", "Calendar", "Team alerts", "Reports"];

export function SystemGraphic() {
  const rowY = (i: number) => 70 + i * 80;
  return (
    <figure className="relative">
      <svg viewBox="0 0 560 380" className="h-auto w-full" role="img" aria-labelledby="sys-title sys-desc">
        <title id="sys-title">How Astor Systems connects a business</title>
        <desc id="sys-desc">
          Inquiries from phone, web forms, email and text messages pass through a central automation layer that classifies,
          routes and records them, then updates the CRM, calendar, team alerts and reports.
        </desc>

        {/* connectors */}
        {inputs.map((_, i) => (
          <path
            key={`in-${i}`}
            d={`M150 ${rowY(i) - 10} C 200 ${rowY(i) - 10}, 200 190, 228 190`}
            stroke="#6b8fff"
            strokeOpacity="0.55"
            strokeWidth="1.25"
            fill="none"
            strokeDasharray="4 4"
            className="animate-dash"
          />
        ))}
        {outputs.map((_, i) => (
          <path
            key={`out-${i}`}
            d={`M332 190 C 360 190, 360 ${rowY(i) - 10}, 410 ${rowY(i) - 10}`}
            stroke="#6b8fff"
            strokeOpacity="0.55"
            strokeWidth="1.25"
            fill="none"
            strokeDasharray="4 4"
            className="animate-dash"
          />
        ))}

        {/* inputs */}
        {inputs.map((label, i) => (
          <g key={label}>
            <rect x="10" y={rowY(i) - 28} width="140" height="36" rx="5" fill="#0d1628" stroke="#24324f" />
            <circle cx="26" cy={rowY(i) - 10} r="3" fill="#6b8fff" />
            <text x="38" y={rowY(i) - 6} fill="#e6e9f0" fontSize="12" fontFamily="var(--font-sans)">
              {label}
            </text>
          </g>
        ))}

        {/* core */}
        <g>
          <rect x="228" y="110" width="104" height="160" rx="8" fill="#142038" stroke="#2c5cff" strokeOpacity="0.7" />
          <text x="280" y="134" textAnchor="middle" fill="#9aa5bd" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">
            AUTOMATION
          </text>
          {["Capture", "Classify", "Route", "Record"].map((s, i) => (
            <g key={s}>
              <rect x="240" y={146 + i * 28} width="80" height="20" rx="3" fill="#0d1628" stroke="#24324f" />
              <circle cx="250" cy={156 + i * 28} r="2.5" fill={i === 1 ? "#b9f04a" : "#6b8fff"} />
              <text x="258" y={160 + i * 28} fill="#ffffff" fontSize="10" fontFamily="var(--font-sans)">
                {s}
              </text>
            </g>
          ))}
        </g>

        {/* outputs */}
        {outputs.map((label, i) => (
          <g key={label}>
            <rect x="410" y={rowY(i) - 28} width="140" height="36" rx="5" fill="#0d1628" stroke="#24324f" />
            <rect x="423" y={rowY(i) - 13} width="6" height="6" rx="1" fill="#ffffff" fillOpacity="0.8" />
            <text x="438" y={rowY(i) - 6} fill="#e6e9f0" fontSize="12" fontFamily="var(--font-sans)">
              {label}
            </text>
          </g>
        ))}
      </svg>

      <figcaption className="mt-6 rounded-md border border-line-dark bg-navy-900/80 p-4 font-mono text-[11px] leading-6 text-muted-dark">
        <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-dark/70">
          <span>Example event log</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-signal" aria-hidden="true" />
            Illustrative
          </span>
        </div>
        <p>
          <span className="text-muted-dark/60">21:40</span> inquiry.received <span className="text-white">sms · &ldquo;water under sink&rdquo;</span>
        </p>
        <p>
          <span className="text-muted-dark/60">21:40</span> classified <span className="text-signal">plumbing · emergency</span>
        </p>
        <p>
          <span className="text-muted-dark/60">21:41</span> on_call.notified <span className="text-white">work order #1042 created</span>
        </p>
      </figcaption>
    </figure>
  );
}

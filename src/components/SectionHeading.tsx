export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div style={{ maxWidth: 640, marginBottom: 32 }}>
      {eyebrow && (
        <p
          style={{
            color: 'var(--accent)',
            fontWeight: 700,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', marginBottom: description ? 10 : 0 }}>
        {title}
      </h2>
      {description && (
        <p style={{ color: 'var(--ink-secondary)', fontSize: 16, lineHeight: 1.6 }}>
          {description}
        </p>
      )}
    </div>
  )
}

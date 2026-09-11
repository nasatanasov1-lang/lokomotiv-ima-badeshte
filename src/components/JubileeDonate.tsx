import { jubileeDonation } from '../data/jubilee'

export default function JubileeDonate() {
  return (
    <div className="card" style={{ padding: 24, borderColor: 'var(--accent)' }}>
      <h3 style={{ fontSize: 16.5, marginBottom: 10 }}>Дарителска сметка</h3>
      <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', marginBottom: 4 }}>{jubileeDonation.organization}</p>
      <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.02em', marginBottom: 4 }}>
        {jubileeDonation.iban}
      </p>
      <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', marginBottom: 14 }}>
        Основание: {jubileeDonation.reference}
      </p>
      <p style={{ fontSize: 13, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{jubileeDonation.note}</p>
    </div>
  )
}

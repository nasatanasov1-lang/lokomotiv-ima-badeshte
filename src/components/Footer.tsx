export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 80 }}>
      <div
        className="container"
        style={{
          paddingBlock: 32,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--ink-muted)',
          fontSize: 14,
        }}
      >
        <p>Локомотив Пловдив — независима инициатива на общността. Не е официален канал на клуба.</p>
        <p>Собственици идват и си отиват. Локомотив остава.</p>
      </div>
    </footer>
  )
}

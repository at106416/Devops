export function Brand({ onClick }) {
  return (
    <button className="brand" type="button" onClick={onClick} aria-label="Go to Luma home">
      <span className="brand-mark" aria-hidden="true">L</span>
      <span>Luma</span>
    </button>
  )
}

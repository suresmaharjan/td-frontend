export default function Loader() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1" >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-secondary fs-5">Searching...</p>
    </div>
  );
}

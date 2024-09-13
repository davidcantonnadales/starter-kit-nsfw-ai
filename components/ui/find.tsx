export default function Find() {
  return (
    <div
      className="offcanvas search-form offcanvas-top"
      tabIndex={-1}
      id="offcanvasTop"
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="close-btn"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="ri-close-line" />
        </button>
      </div>
      <div className="offcanvas-body small">
        <div className="container">
          <form className="src-form">
            <input
              type="text"
              className="form-control"
              placeholder="Search Here..."
            />
            <button type="submit" className="src-btn">
              <i className="ri-search-line" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

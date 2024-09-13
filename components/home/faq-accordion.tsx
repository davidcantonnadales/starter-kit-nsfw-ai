export default function FaqAccordion() {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-fast"
            aria-expanded="true"
            aria-controls="collapse-fast"
          >
            How do I turn text into an AI image?
          </button>
        </h2>
        <div
          id="collapse-fast"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Leo site ultrices donec a volutpat penatibus mind suscipit faucibus
            and duis pharetra name sociosqu phasellus nunce accumsan lectus
            morbi ridiculus.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsesecond"
            aria-expanded="false"
            aria-controls="collapsesecond"
          >
            Will AI replace human artists?
          </button>
        </h2>
        <div
          id="collapsesecond"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Leo site ultrices donec a volutpat penatibus mind suscipit faucibus
            and duis pharetra name sociosqu phasellus nunce accumsan lectus
            morbi ridiculus.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsethird"
            aria-expanded="false"
            aria-controls="collapsethird"
          >
            How do I turn text into an AI image?
          </button>
        </h2>
        <div
          id="collapsethird"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Leo site ultrices donec a volutpat penatibus mind suscipit faucibus
            and duis pharetra name sociosqu phasellus nunce accumsan lectus
            morbi ridiculus.
          </div>
        </div>
      </div>
    </div>
  );
}

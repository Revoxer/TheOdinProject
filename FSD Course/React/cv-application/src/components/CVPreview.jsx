import "../styles/CVPreview.css";

function CVPreview({ personal, education, experience }) {
  const filledExperience = experience.filter((e) => e.company);

  return (
    <div className="cv-wrapper">
      <div className="cv-document">
        {/* ── Header ── */}
        <div className="cv-header">
          <div className="cv-header-accent" />
          <div className="cv-header-content">
            <h1 className="cv-name">
              {personal.name || "Your"} {personal.surname || "Name"}
            </h1>
            <p className="cv-position-title">
              {experience[0]?.position || "Position Title"}
            </p>
            <div className="cv-contacts">
              {personal.email && (
                <span className="cv-contact-item">{personal.email}</span>
              )}
              {personal.phone && (
                <span className="cv-contact-item">{personal.phone}</span>
              )}
              {personal.address && (
                <span className="cv-contact-item">{personal.address}</span>
              )}
            </div>
          </div>
        </div>

        <div className="cv-body">
          {/* ── Left column ── */}
          <div className="cv-col-left">
            <div className="cv-section">
              <h2 className="cv-section-title">Education</h2>
              <div className="cv-section-line" />
              {education.school ? (
                <div className="cv-entry">
                  <p className="cv-entry-title">{education.title}</p>
                  <p className="cv-entry-subtitle">{education.school}</p>
                  <p className="cv-entry-date">
                    {education.dateFrom}
                    {education.dateTo ? ` – ${education.dateTo}` : ""}
                  </p>
                </div>
              ) : (
                <p className="cv-placeholder">No education added yet.</p>
              )}
            </div>

            <div className="cv-section">
              <h2 className="cv-section-title">Contact</h2>
              <div className="cv-section-line" />
              <div className="cv-contact-list">
                {personal.email && (
                  <div className="cv-contact-row">
                    <span className="cv-contact-dot" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="cv-contact-row">
                    <span className="cv-contact-dot" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="cv-contact-row">
                    <span className="cv-contact-dot" />
                    <span>{personal.address}</span>
                  </div>
                )}
                {!personal.email && !personal.phone && !personal.address && (
                  <p className="cv-placeholder">No contact info added yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="cv-col-right">
            <div className="cv-section">
              <h2 className="cv-section-title">Experience</h2>
              <div className="cv-section-line" />

              {filledExperience.length > 0 ? (
                filledExperience.map((e, i) => (
                  <div
                    className="cv-entry"
                    key={i}
                    style={{
                      paddingBottom:
                        i < filledExperience.length - 1 ? "1.2rem" : "0",
                      borderBottom:
                        i < filledExperience.length - 1
                          ? "1px solid #e5e0d8"
                          : "none",
                    }}
                  >
                    <div className="cv-entry-header">
                      <p className="cv-entry-title">{e.position}</p>
                      <p className="cv-entry-date">
                        {e.dateFrom}
                        {e.dateTo ? ` – ${e.dateTo}` : ""}
                      </p>
                    </div>
                    <p className="cv-entry-company">{e.company}</p>
                    {e.responsibilities && (
                      <p className="cv-entry-responsibilities">
                        {e.responsibilities}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="cv-placeholder">No experience added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVPreview;

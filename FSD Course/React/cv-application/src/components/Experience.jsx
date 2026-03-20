import { useState } from "react";
import "../styles/Experience.css";

const emptyEntry = {
  company: "",
  position: "",
  responsibilities: "",
  dateFrom: "",
  dateTo: "",
};

function ExperienceEntry({ entry, index, onSave, onRemove }) {
  const [isEditing, setIsEditing] = useState(true);
  const [form, setForm] = useState(entry);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(index, form);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="experience-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`company-${index}`}>Company Name</label>
            <input
              type="text"
              id={`company-${index}`}
              name="company"
              placeholder="Google"
              value={form.company}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`position-${index}`}>Position Title</label>
            <input
              type="text"
              id={`position-${index}`}
              name="position"
              placeholder="Frontend Developer"
              value={form.position}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`responsibilities-${index}`}>
              Main Responsibilities
            </label>
            <textarea
              id={`responsibilities-${index}`}
              name="responsibilities"
              placeholder="Building UI components, code reviews, performance optimisations..."
              value={form.responsibilities}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`dateFrom-${index}`}>Date From</label>
              <input
                type="text"
                id={`dateFrom-${index}`}
                name="dateFrom"
                placeholder="2022"
                value={form.dateFrom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`dateTo-${index}`}>Date To</label>
              <input
                type="text"
                id={`dateTo-${index}`}
                name="dateTo"
                placeholder="Present"
                value={form.dateTo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            {index > 0 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="experience-card">
      <div className="person-display">
        <div className="person-display-field">
          <span className="person-display-label">Company Name</span>
          <span className="person-display-value">{entry.company}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Position Title</span>
          <span className="person-display-value">{entry.position}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Main Responsibilities</span>
          <span className="person-display-value">{entry.responsibilities}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Period</span>
          <span className="person-display-value">
            {entry.dateFrom} – {entry.dateTo}
          </span>
        </div>
        <div className="form-actions">
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          {index > 0 && (
            <button className="remove-button" onClick={() => onRemove(index)}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Experience({ data, onSave }) {
  const [entries, setEntries] = useState(data);

  const handleSaveEntry = (index, updated) => {
    const next = entries.map((e, i) => (i === index ? updated : e));
    setEntries(next);
    onSave(next);
  };

  const handleRemove = (index) => {
    const next = entries.filter((_, i) => i !== index);
    setEntries(next);
    onSave(next);
  };

  const handleAdd = () => {
    setEntries([...entries, { ...emptyEntry }]);
  };

  return (
    <div className="person-information">
      <div className="experience-header">
        <span className="experience-section-label">Experience</span>
        <button className="add-button" type="button" onClick={handleAdd}>
          + Add
        </button>
      </div>
      {entries.map((entry, index) => (
        <ExperienceEntry
          key={index}
          entry={entry}
          index={index}
          onSave={handleSaveEntry}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default Experience;

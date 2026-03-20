import { useState } from "react";
import "../styles/Education.css";

function Education({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(true);
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="person-information">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="school">School Name</label>
            <input
              type="text"
              id="school"
              name="school"
              placeholder="University of Warsaw"
              value={form.school}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title of Study</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Bachelor of Computer Science"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateFrom">Date From</label>
            <input
              type="text"
              id="dateFrom"
              name="dateFrom"
              placeholder="2020"
              value={form.dateFrom}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTo">Date To</label>
            <input
              type="text"
              id="dateTo"
              name="dateTo"
              placeholder="2024"
              value={form.dateTo}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="person-information">
      <div className="person-display">
        <h2 className="person-display-title">Education</h2>
        <div className="person-display-field">
          <span className="person-display-label">School Name</span>
          <span className="person-display-value">{data.school}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Title of Study</span>
          <span className="person-display-value">{data.title}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Date of Study</span>
          <span className="person-display-value">
            {data.dateFrom} – {data.dateTo}
          </span>
        </div>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default Education;

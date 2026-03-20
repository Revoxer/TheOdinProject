import { useState } from "react";
import "../styles/PersonData.css";

function PersonData({ data, onSave }) {
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jan"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Kowalski"
              value={form.surname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jan@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+48 123 456 789"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street 35, 00-000 City"
              value={form.address}
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
        <h2 className="person-display-title">Person Information</h2>
        <div className="person-display-field">
          <span className="person-display-label">Name</span>
          <span className="person-display-value">
            {data.name} {data.surname}
          </span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Email</span>
          <span className="person-display-value">{data.email}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Phone</span>
          <span className="person-display-value">{data.phone}</span>
        </div>
        <div className="person-display-field">
          <span className="person-display-label">Address</span>
          <span className="person-display-value">{data.address}</span>
        </div>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default PersonData;

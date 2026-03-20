import "./App.css";

import { useState } from "react";

import PersonData from "./components/PersonData";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/CVPreview";

function App() {
  const [personalData, setPersonalData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  });

  const [educationData, setEducationData] = useState({
    school: "",
    title: "",
    dateFrom: "",
    dateTo: "",
  });

  const [experienceData, setExperienceData] = useState([
    {
      company: "",
      position: "",
      responsibilities: "",
      dateFrom: "",
      dateTo: "",
    },
  ]);

  return (
    <>
      <h1 className="header">CV Application</h1>
      <div className="content">
        <div className="forms-column">
          <PersonData data={personalData} onSave={setPersonalData} />
          <Education data={educationData} onSave={setEducationData} />
          <Experience data={experienceData} onSave={setExperienceData} />
        </div>
        <div className="preview-column">
          <CVPreview
            personal={personalData}
            education={educationData}
            experience={experienceData}
          />
        </div>
      </div>
    </>
  );
}

export default App;

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Athlete } from "../models/Athlete";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditResultForm from './EditResultForm';

function EditAthlete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Local editable state for form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [results, setResults] = useState<{ [event: string]: number }>({});

  useEffect(() => {
    if (!id) {
      setError("No athlete ID provided");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/athletes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch athlete");
        return res.json();
      })
      .then((data: Athlete) => {
        setAthlete(data);
        setName(data.name);
        setAge(data.age);
        setCountry(data.country);
        setResults(data.results);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleResultChange = (event: string, value: string) => {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      setResults(prev => ({ ...prev, [event]: parsed }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athlete) return;

    const updatedAthlete: Athlete = {
      ...athlete,
      name,
      age,
      country,
      results
    };

    fetch("http://localhost:8080/athletes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedAthlete)
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update athlete");
      return res.json();
    })
    .then(() => {
      alert("Athlete updated successfully!");
      navigate("/athletes"); // go back to athletes list
    })
    .catch(err => alert("Error: " + err.message));
  };

  if (loading) return <div>Loading athlete...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!athlete) return <div>Athlete not found</div>;

  return (
    <div>
      <h2>Edit Athlete</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          className="form-control mb-2" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />

        <label>Age</label>
        <input 
          type="number" 
          className="form-control mb-2" 
          value={age} 
          onChange={e => setAge(Number(e.target.value))} 
          min={1} 
          required 
        />

        <label>Country</label>
        <input 
          type="text" 
          className="form-control mb-2" 
          value={country} 
          onChange={e => setCountry(e.target.value)} 
          required 
        />

        <h4>Results</h4>
        {Object.entries(results).map(([event, points]) => (
          <div key={event} className="mb-2">
            <label>{event}</label>
            <input
              type="number"
              className="form-control"
              value={points}
              onChange={e => handleResultChange(event, e.target.value)}
              min={0}
              required
              
            />
            
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-3">Save</button>
        <EditResultForm athleteId={Number(id)} />
      </form>
    </div>
  );
}

export default EditAthlete;

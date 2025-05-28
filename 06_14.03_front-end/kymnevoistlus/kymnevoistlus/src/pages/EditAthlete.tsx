import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { Athlete } from "../models/Athlete";
import type { Result } from "../models/result";

function EditAthlete() {
  const { athleteId } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const [athlete, setAthlete] = useState<Athlete>();
  const [results, setResults] = useState<Result[]>([]);

  const [newEvent, setNewEvent] = useState("");
  const [newPointsStr, setNewPointsStr] = useState("");
  const [newResultValue, setNewResultValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/athletes/" + athleteId)
      .then(res => res.json())
      .then(json => {
        setAthlete(json);
        setResults(json.results || []);
      });
  }, [athleteId]);

  const updateAthlete = () => {
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0)
    const updatedAthlete: Athlete = {
      id: Number(athleteId),
      name: nameRef.current?.value || "",
      country: countryRef.current?.value || "",
      age: Number(ageRef.current?.value),
      results: results.map(r => ({
        ...r,
        athlete: { id: Number(athleteId) }  // can be used by backend if needed
      })),
      totalPoints: totalPoints
    };

    fetch("http://localhost:8080/athletes", {
      method: "PUT",
      body: JSON.stringify(updatedAthlete),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          toast.error(json.message);
        } else {
          navigate("/athletes");
        }
      });
  };

  if (!athlete) return <div>Loading athlete...</div>;

  return (
    <div>
      <h2>Edit Athlete</h2>
      <label>Name</label><br />
      <input ref={nameRef} defaultValue={athlete.name} type="text" className="form-control mb-2" />
      <label>Country</label><br />
      <input ref={countryRef} defaultValue={athlete.country} type="text" className="form-control mb-2" />
      <label>Age</label><br />
      <input ref={ageRef} defaultValue={athlete.age} type="number" className="form-control mb-3" />

      <h4>Results</h4>
      {results.map((res, index) => (
        <div key={index} className="mb-3">
          <label>{res.event}</label>
          <input
            type="number"
            className="form-control"
            value={res.points}
            onChange={(e) => {
              const updatedResults = [...results];
              updatedResults[index].points = Number(e.target.value);
              setResults(updatedResults);
            }}
          />
        </div>
      ))}

      <h5>Add New Result</h5>
      <label>Event</label>
      <input
        type="text"
        className="form-control mb-2"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
      />
      <label>Points</label>
      <input
        type="number"
        className="form-control mb-2"
        value={newPointsStr}
        onChange={(e) => setNewPointsStr(e.target.value)}
      />
      <label>Result (performance)</label>
      <input
        type="number"
        className="form-control mb-2"
        value={newResultValue}
        onChange={(e) => setNewResultValue(e.target.value)}
      />

      <button className="btn btn-secondary mb-3"
        onClick={() => {
          if (!newEvent || isNaN(Number(newPointsStr)) || isNaN(Number(newResultValue))) {
            toast.error("Please fill in all fields correctly.");
            return;
          }
          if (results.find(r => r.event === newEvent)) {
            toast.error("Event already exists.");
            return;
          }
          setResults([...results, {
            event: newEvent,
            points: Number(newPointsStr),
            result: Number(newResultValue)
          }]);
          setNewEvent("");
          setNewPointsStr("");
          setNewResultValue("");
        }}>
        Add Result
      </button>

      <br />
      <button className="btn btn-primary" onClick={updateAthlete}>
        Save Changes
      </button>
      <ToastContainer />
    </div>
  );
}

export default EditAthlete;

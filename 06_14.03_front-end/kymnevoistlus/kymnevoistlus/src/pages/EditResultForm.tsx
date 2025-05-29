import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Result {
  id?: number;
  event: string;
  result: number;
  points?: number;
  athlete: {
    id: number;
  };
}

interface Props {
  athleteId: number;
}

const events = [
  "100m", "400m", "110m hurdles", "1500m",
  "Long jump", "Shot put", "High jump",
  "Discus throw", "Pole vault", "Javelin throw"
];

const EditResultForm: React.FC<Props> = ({ athleteId }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [inputResult, setInputResult] = useState<number>(0);
  const [existingResultId, setExistingResultId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<Result[]>('http://localhost:8080/results').then(res => {
      const athleteResults = res.data.filter(r => r.athlete.id === athleteId);
      setResults(athleteResults);
    });
  }, [athleteId]);

  useEffect(() => {
    const existing = results.find(r => r.event === selectedEvent);
    if (existing) {
      setInputResult(existing.result);
      setExistingResultId(existing.id || null);
    } else {
      setInputResult(0);
      setExistingResultId(null);
    }
  }, [selectedEvent, results]);

  const handleSubmit = async () => {
    if (!selectedEvent) return;

    const resultData: Result = {
      event: selectedEvent,
      result: inputResult,
      athlete: { id: athleteId }
    };

    if (existingResultId) {
      // Update existing result
      await axios.put(`http://localhost:8080/results/${existingResultId}`, resultData);
    } else {
      // Add new result
      await axios.post(`http://localhost:8080/results`, resultData);
    }

    // Refresh results
    const refreshed = await axios.get<Result[]>('http://localhost:8080/results');
    setResults(refreshed.data.filter(r => r.athlete.id === athleteId));
    alert('Result saved!');
  };

  return (
    <div className="card p-3 mt-4">
      <h5>Edit or Add Result</h5>

      <div className="mb-2">
        <label>Select Event:</label>
        <select
          className="form-select"
          value={selectedEvent}
          onChange={e => setSelectedEvent(e.target.value)}
        >
          <option value="">-- Select Event --</option>
          {events.map(event => (
            <option key={event} value={event}>{event}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Result:</label>
        <input
          type="number"
          className="form-control"
          value={inputResult}
          onChange={e => setInputResult(Number(e.target.value))}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit} disabled={!selectedEvent}>
        {existingResultId ? 'Update Result' : 'Add Result'}
      </button>
    </div>
  );
};

export default EditResultForm;

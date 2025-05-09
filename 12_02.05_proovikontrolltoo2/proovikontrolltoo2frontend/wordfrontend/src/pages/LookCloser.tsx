import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { type Word } from '../models/Word';

function LookCloser() {
    const { id } = useParams();
    const [word, setWords] = useState<Word | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/words/` + id)
        .then(res => res.json())
        .then(json => setWords(json))
    }, [id]);

    if (!word) return <div>Laen sõna andmeid...</div>;

    return (
        <div>
            <h2>Details on the word</h2>
            <p><strong>Type:</strong> {word.type}</p>
            <p><strong>Description:</strong> {word.description}</p>
        </div>
    );
}

export default LookCloser
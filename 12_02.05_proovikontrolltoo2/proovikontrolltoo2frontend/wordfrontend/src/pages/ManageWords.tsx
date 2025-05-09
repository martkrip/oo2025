import { useEffect, useState, useRef } from 'react'
import { type Word } from '../models/Word.ts';
import { ToastContainer, toast } from 'react-toastify';

function ManageWords() {
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/words")
        .then(res=>res.json())
        .then(json=> setWords(json))
    }, []);

      const deleteWords = (typeid: number) => {
    fetch(`http://localhost:8080/words/${typeid}`, {
      method: "DELETE",
    }).then(() => 
      setWords(words.filter(words => words.typeid !== typeid)));
      ;
      };
    const typeRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const addWords = () => {
        const newWords = {
            type: typeRef.current?.value,
            description: descriptionRef.current?.value
        }

        fetch("http://localhost:8080/words", {
            method: "POST",
            body: JSON.stringify(newWords),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(json=> {
            if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                setWords(json);
                toast.success("Uus word lisatud!");
            } else {
                toast.error(json.message)
            }
        })
    }

  return (
    <div>
        <h2>Manage Words</h2>

        <label>Type</label> <br />
        <input ref={typeRef} type="text" /> <br />
        <label>Description</label> <br />
        <input ref={descriptionRef} type="text" /> <br />

        <button onClick={() => addWords()}>Add product</button>

        <table>
            <thead>
                <tr>
                    <th>TypeID</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word) => (
                    <tr key={word.typeid}>
                    <td>{word.typeid}</td>
                    <td>{word.type}</td>
                    <td>{word.description}</td>
                    <td>
                        <button onClick={() => deleteWords(word.typeid)}>Delete</button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ToastContainer />
    </div>
  );
}

export default ManageWords
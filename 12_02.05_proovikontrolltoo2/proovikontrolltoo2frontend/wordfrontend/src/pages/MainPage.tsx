import { useEffect, useState } from 'react'
import { type Word } from '../models/Word.ts';
import { Link} from 'react-router-dom'

function MainPage() {
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/words")
        .then(res=>res.json())
        .then(json=> setWords(json))
    }, []);
  return (
    <div>
      {words.map(word =>
        <div key={word.typeid}>
          <div>{word.typeid}</div>
          <div>{word.type}</div>
          <Link to={`/word/${word.typeid}`}>
          <button>Vaata lähemalt</button>
          </Link>
          <Link to={"/ManageWords"}>
          <button>Manage Words</button>
          </Link>
          </div>)}
    </div>
  )
}

export default MainPage
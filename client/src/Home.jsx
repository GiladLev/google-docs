import { useNavigate } from 'react-router-dom';
import {v4 as uuidV4} from 'uuid'
const Home = () => {
    let navigate = useNavigate();
  return (
    <div>
        Home
        <button onClick={()=>{navigate(`/documents/${uuidV4()}`)}}>new Docs</button>
    </div>
  )
}

export default Home
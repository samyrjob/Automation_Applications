import Message from './Message';
import ListGroup from './ListGroup';
import Alert from './Alert';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_in from './Sign_in';
import Register from './Register';
import FruitList from './components/Fruits';

let items = ["Paris", "London", "New York", "Tokyo", "Berlin"];
const handle = (item: string) => {
  console.log(item);
};


export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/list" element={<ListGroup items={items} heading="Cities" onSelectItem={handle} />} />
        <Route path="/alert" element={<Alert>Alert</Alert>} />
        <Route path="/sign_in" element={<Sign_in></Sign_in>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/fruits" element={<FruitList/>} />
      </Routes>
    </Router>
  )
  ;
}

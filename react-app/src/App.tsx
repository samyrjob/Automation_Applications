import Message from './Message';
import ListGroup from './ListGroup';
import Alert from './Alert';

let items = ["Paris", "London", "New York", "Tokyo", "Berlin"];
const handle = (item: string) => {
  console.log(item);
};


export default function App() {
  return  <><div> <ListGroup items={items} heading={"cities"} onSelectItem={handle} /> </div> <Alert> Hello World</Alert> </>
  ;
}

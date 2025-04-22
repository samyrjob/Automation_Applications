// import { Fragment } from "react";
import {MouseEvent} from "react";
import {useState} from "react";

interface props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}



function ListGroup({items, heading, onSelectItem}: props) {
    
    const [selectedIndex, setIndexValue] = useState(-1);
    
    const handleClick = (event: MouseEvent, index: number)=>{
    
        setIndexValue(index);// set the selected index to the clicked item
        onSelectItem(items[index]);// call the onSelectItem function with the clicked item
        console.log(event)
    }

    return (
        <>
            <h1>{heading}</h1>
                {items.length === 0 && <p> No item found </p>}
            <ul className="list-group">
                {items.map((item, index) => (
                <li
                    className= {selectedIndex === index ? "list-group-item active" : "list-group-item"}
                    key={item}
                    onClick={(event => handleClick(event, index))}
                    >
                    {" "}
                    {item}{" "}
                </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;

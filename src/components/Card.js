import Button from "./UI/Button";
import Wrapper from "./UI/Wrapper";
import CardForm from "./CardForm";

import './Card.scss'
import { useState } from "react";
import { getData, sendData } from "../api";

const Card = (props) => {
    const [isEdited, setIsEdited] = useState(false)
    let classes = 'card';

    const editCardHandler = () => {
        setIsEdited(true);
    }

    const saveEditedCard = async (card) => {
        await sendData(
            `https://task-board-237ce-default-rtdb.firebaseio.com/lanes/${props.laneIndex}/cards/${props.cardIndex}.json`,
            card,
            'Failed editing card!'
        )
        
        await getData(props.updateBoard)
        setIsEdited(false)
    }

    const deleteCardHandler = async () => {
        const card = {
            title: props.title, 
            description: props.description, 
            id: props.id,
            label: props.label,
            priority: props.priority
        }
        props.onDelete(card)
    }

    if(+props.priority === 1) {
        classes = `${classes} high-priority`
    } else if (+props.priority === 3) {
        classes = `${classes} low-priority`
    } else if (+props.priority === 4) {
        classes = `${classes} completed`
    } else {
        classes = `${classes} normal`
    }

    if(isEdited) {
        return <CardForm  
            title={props.title} 
            description={props.description} 
            id={props.id}
            key={props.id}
            label={props.label}
            priority={props.priority || 2}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
            onSaveCard={saveEditedCard}
        />
    }

    const dragStartHandler = (e) => {
        const card = {
            title: props.title, 
            description: props.description, 
            id: props.id,
            label: props.label,
            priority: props.priority,
            key: props.id
        }
        e.dataTransfer.setData('text/plain', props.laneIndex)
        e.dataTransfer.setData('obj', JSON.stringify(card))
        e.dataTransfer.setData('cardInd', props.cardIndex)
    }


    return ( 
        <Wrapper classes={classes || ''} draggable={true} onDragStart={dragStartHandler} id={props.id}>
            <div className="card-header">
                <h4>{props.title}</h4>
                <span className="deadline">{props.label}</span>
            </div>
            <p>{props.description}</p>
            <div className="helpline">
                <div className="tags"></div>
                <div className="buttons">
                    <Button onClick={editCardHandler}>Edit</Button>
                    <Button onClick={deleteCardHandler}>Delete</Button>
                </div>
            </div>
        </Wrapper>
     );
}

export default Card;
import './Line.scss'
import { useState } from "react";

import Card from "./Card";
import Wrapper from "./UI/Wrapper";
import CardForm from "./CardForm";
import { getData, getInitLaneData, initLaneCards, sendData } from '../api';


const Line = (props) => {
    const [isAdded, setIsAdded] = useState(false)

    const addCardHandler = () => {
        setIsAdded(true)
    }

    const move = (input, from, to) => {
        let numberOfDeletedElm = 1;
        const elm = input.splice(from, numberOfDeletedElm)[0];
        numberOfDeletedElm = 0;
        input.splice(to, numberOfDeletedElm, elm);
    }

    const saveNewCardHandler = async (card, cardOverInd, cardInd) => {
        let cardsCopy = []
        if(!cardOverInd && cardOverInd !== 0 && !cardInd && +cardInd !== 0) {
            // Need this step because of the way firebase works with arrays
            cardsCopy.push(...props.cards)
            cardsCopy.push(card)
            
        } else if(cardInd || +cardInd === 0) {
            cardsCopy.push(...props.cards)
            move(cardsCopy, cardInd, cardOverInd)    
        } else {
            const copy = [...props.cards]
            cardsCopy.push(...copy.slice(0, cardOverInd+1), card, ...copy.slice(cardOverInd+1))
        }
        
        await sendData(
            `https://task-board-237ce-default-rtdb.firebaseio.com/lanes/${props.index}/cards.json`,
            cardsCopy,
            'Failed adding card!'
        )
        
        await getData(props.updateBoard)
        setIsAdded(false)
    }

    const deleteHandler = async (card, laneIndex = props.index) => {
        let updatedCards = null
        if(laneIndex !== props.index) {
            await getInitLaneData(laneIndex)
            updatedCards = initLaneCards.filter(item => item.id !== card.id)
        } else {
            updatedCards = props.cards.filter(item => item.id !== card.id)
        }
        
        await sendData(
            `https://task-board-237ce-default-rtdb.firebaseio.com/lanes/${laneIndex}/cards.json`,
            updatedCards,
            'Failed deleting card!'
        )
        
        await getData(props.updateBoard)
    }

    let OverInd;
    const dragoverHandler = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if(e.target.closest('.card')) {
            OverInd = props.cards.findIndex(card => card.id === e.target.closest('.card').id)
        }
    }

    const dropHandler = e => {
        const initLane = e.dataTransfer.getData("text/plain");
        const cardData = JSON.parse(e.dataTransfer.getData('obj'))
        const cardIndex = e.dataTransfer.getData('cardInd')
        if(props.index === +initLane) {
            saveNewCardHandler(cardData, OverInd, cardIndex)
        } else {
            deleteHandler(cardData, initLane)
            if(!OverInd && OverInd !== 0) {
                saveNewCardHandler(cardData)
            } else {
                saveNewCardHandler(cardData, OverInd)
            }
        }    
    }

    return ( 
        <Wrapper classes="line" onDragOver={dragoverHandler} onDrop={dropHandler} >
            <div className="line-title">
                <h3>{props.title}</h3>
                <div className="extra-buttons">
                    <Wrapper classes={`add-card`} onClick={addCardHandler} />
                    <Wrapper classes="cards-quantity">
                        <span>{props.cards.length}</span>
                    </Wrapper>
                </div>
            </div>
            <div className="line-content">
                {props.cards.map((card, index) => <Card 
                    title={card.title} 
                    description={card.description} 
                    id={card.id}
                    key={card.id}
                    label={card.label}
                    priority={card.priority}
                    laneIndex={props.index}
                    cardIndex={index}
                    updateBoard={props.updateBoard}
                    onDelete={deleteHandler}
                />)}
                
            </div>
            {isAdded && <CardForm onSubmitCard={saveNewCardHandler} isAdded={isAdded} setIsAdded={setIsAdded} />}
        </Wrapper>
     );
}

export default Line;
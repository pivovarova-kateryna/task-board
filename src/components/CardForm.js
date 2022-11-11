import Button from "./UI/Button";
import './CardForm.scss'

import { useRef, useState } from "react";

const CardForm = (props) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const labelRef = useRef()
    const [priority, setPriority] = useState(props.priority || null)
    const [isError, setIsError] = useState(false)

    const priorityChangeHandler = e => {
        setPriority(e.target.value)
    }

    const cardId = props.id || (Math.random().toFixed(4)*10000).toString()

    const titleValidationHandler = () => {
        if (titleRef.current.value.trim() !== '') {
            setIsError(false)
        }
    }

    const cardSubmitHandler = (e) => {
        e.preventDefault();
        if(titleRef.current.value.trim() === '') {
            setIsError(true)
        } else {
            setIsError(false)
            const newCard = {
                id: cardId,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                label: labelRef.current.value,
                priority: priority
            }
            
            if(props.isAdded) {
                props.onSubmitCard(newCard)
            } else if(props.isEdited) {
                props.onSaveCard(newCard)
            } 
        }       
    }

    const cancelHandler = () => {
        if (props.isEdited) {
            props.setIsEdited(false)
        }
        if (props.isAdded) {
            props.setIsAdded(false)
        }
    }

    return (
        <form onSubmit={cardSubmitHandler} onClick={props.onClick} className='card-form'>
            <label htmlFor="title">Title:</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                defaultValue={props.title} 
                autoFocus
                ref={titleRef}
                className={isError ? 'error' : ''}
                onKeyUp={titleValidationHandler}
            />
            <p className={isError ? 'error-notice visible'  :"error-notice"}>Title can't be empty</p>

            <label htmlFor="description">Description:</label>
            <textarea 
                name="description" 
                id="description" 
                defaultValue={props.description} 
                rows='5' 
                ref={descriptionRef}
            />

            <div className="timeframe">
                <label htmlFor="time">Time to complete:</label>
                <input 
                    type="text" 
                    name="time" 
                    id="time" 
                    defaultValue={props.label} 
                    ref={labelRef}
                />
            </div>

            <div className="priority-block">
                <label htmlFor="priority">Priority:</label>
                <select name="priority" id="priority"  defaultValue={priority || 2} onChange={priorityChangeHandler}>
                    <option value="1">High</option>
                    <option value="2">Normal</option>
                    <option value="3">Low</option>
                    <option value="4">Completed</option>
                </select>
            </div>
            
            <div className="card-form-control">
                <Button type='button' classes='cancel-card' onClick={cancelHandler}>Cancel</Button>
                <Button classes='submit-card' >Save</Button>   
            </div>
        </form>
    );
}

export default CardForm ;
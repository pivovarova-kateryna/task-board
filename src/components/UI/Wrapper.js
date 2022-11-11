const Wrapper = (props) => {
    return ( 
        <div 
            className={`wrapper ${props.classes}` || 'wrapper'} 
            onClick={props.onClick} 
            draggable={props.draggable} 
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            id={props.id}
        >
            {props.children}
        </div>
    );
}

export default Wrapper;
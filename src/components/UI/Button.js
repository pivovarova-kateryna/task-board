const Button = (props) => {
    return ( 
        <button type={props.type} className={`btn ${props.classes}`} onClick={props.onClick}>
            {props.children}
        </button>
     );
}

export default Button;
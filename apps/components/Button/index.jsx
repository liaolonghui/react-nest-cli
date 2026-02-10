const Button = (props) => {
    const { className, children, onClick } = props || {};

    return (
        <div className={`button ${className || ''}`} onClick={onClick}>
            {children}
        </div>
    )
}


export default Button;
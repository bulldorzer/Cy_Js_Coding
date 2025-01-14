
const ButtonGroup = ({buttons}) => {
    return (
        <div className="btnGroup">
            {buttons.map(({ label, className, onClick }) => (
                <button
                    key={label}
                    type="button"
                    className={`btn ${className}`}
                    onClick={onClick}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

export default ButtonGroup;
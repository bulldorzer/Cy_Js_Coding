const LiItem = ({label, name, type='text', value = '', onChange, readOnly = false}) => {

    const className = readOnly ? 'readOnly' :'';

    return (
        <li className={className}>
            <span className="labelWrap">{label}</span>
            <span className="dataWrap">
            <input 
                name={name}
                type={type}
                value={value} 
                onChange={onChange} 
                readOnly={readOnly}
            />
        </span>
        </li>
    )
} 

export default LiItem;
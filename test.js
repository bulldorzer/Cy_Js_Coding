// add
const LiField = ({todo, onChange, label, type, name}) =>  (
  <li>
      <span className="labelWrap"> <label>{label}</label> </span>
      <span className="dataWrap">
          <input 
              type={type}
              name={name}
              value={todo[name]}
              onChange={onChange}
          />
      </span>
  </li>
)

// read - 데이티 읽기,  수정x
const LiItem = ({todo, label, type, name}) => {
  
  return (
      <li>
          <span className="labelWrap"> <label>{label}</label> </span>
          <span className="dataWrap">
              <input 
                type={type} 
                name={name} 
                value={todo[name]} 
                readOnly={readOnly}
              /></span>
      </li>
  )}

  // modify

const LiField = ({title, name, value, onChange, type='text', readOnly = false}) =>  (
<li>
<span className="labelWrap">{title}</span>
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
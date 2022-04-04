import styled from "styled-components"

const Switcher = ({onClick, active, disabled}) => {
    return <SwitcherStyled src={active ? "/images/on.svg" : "/images/off.svg"} onClick={!disabled ? onClick : null}/>
}

export default Switcher;

const SwitcherStyled = styled.img`
cursor:pointer;
opacity:1;
`


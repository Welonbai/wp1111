import styled from "styled-components";
import { Button, Input, Tag, message} from 'antd'


const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
h1 {
margin: 0;
margin-right: 20px;
font-size: 3em;
}`;

const AppTitle = ({name}) => (
    <Wrapper><h1>{name? `${name}'s `: "My"}
    Chat Room</h1></Wrapper>
);

export default AppTitle

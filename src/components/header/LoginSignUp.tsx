import { Link } from 'react-router-dom';
import styled from 'styled-components';
const LoginSignUp = () => {
  return (
    <ButtonDiv>
      <Link to="signup">
        <button>로그인</button>
      </Link>
      <Link to="signup">
        <button>회원가입</button>
      </Link>
    </ButtonDiv>
  );
};

export default LoginSignUp;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  padding-right: 3em;
  width: 250px;
  button {
    font-size: 1em;
    height: 2em;
    width: 5em;
    border-radius: 4px;
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.buttonText};
  }
`;

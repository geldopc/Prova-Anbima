import styled, { keyframes, css } from 'styled-components';

export const Title = styled.h1`
  color: #fff;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 50px auto;
  border-top: 2px solid #fcaf17;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: #53c430;
      padding: 2px;
      border: 1px solid #fcaf17;
      color: #eee;
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    & + input {
      margin: 0 5px;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const SearchButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #fcaf17;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 10px;

  li {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.div`
  a {
    margin-left: 10px;
    background: #fcaf17;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    color: #fff;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
  color: rgba(0, 0, 0, 0.7);
`;

export const TableTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Paginator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  color: #53c430;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      color: #fcaf17;
    }
  }
`;

export const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  font-size: 24px;
`;

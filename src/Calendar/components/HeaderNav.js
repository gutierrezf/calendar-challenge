import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import chevronPath from '../../assets/chevron.svg';

const HeaderContainer = styled.div`
  align-items: center;
  background: #cdccdc;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const Chevron = styled.button`
  background: url(${chevronPath}) no-repeat center;
  border: 0;
  cursor: pointer;
  height: 40px;
  width: 40px;

  ${(props) =>
    props.left &&
    css`
      transform: rotate(180deg);
    `}
`;

const Title = styled.b`
  font-size: 2rem;
`;

const HeaderNav = ({ title, prev, next }) => {
  return (
    <HeaderContainer>
      <Chevron left onClick={prev} />
      <Title>{title}</Title>
      <Chevron onClick={next} />
    </HeaderContainer>
  );
};

HeaderNav.defaultTypes = {
  next: () => {},
  prev: () => {},
  title: '',
};

HeaderNav.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  title: PropTypes.string,
};

export default HeaderNav;

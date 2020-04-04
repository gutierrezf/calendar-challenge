import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setDate } from '../../store/reducers/date';
import moment from 'moment';

import chevronPath from '../../assets/chevron.svg';

const HeaderContainer = styled.div`
  align-items: center;
  background: ${(props) => props.theme.vanillaIce};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
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

const HeaderNav = ({ date }) => {
  const dispatch = useDispatch();
  const title = date.format('MMMM YYYY');

  const onPrev = () => {
    dispatch(setDate(date.subtract(1, 'months').clone()));
  };

  const onNext = () => {
    dispatch(setDate(date.add(1, 'months').clone()));
  };

  return (
    <HeaderContainer>
      <Chevron left onClick={onPrev} />
      <Title>{title}</Title>
      <Chevron onClick={onNext} />
    </HeaderContainer>
  );
};

HeaderNav.propTypes = {
  date: PropTypes.instanceOf(moment),
};

export default HeaderNav;

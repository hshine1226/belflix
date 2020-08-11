import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  &:not(:last-child) {
    margin-bottom: 95px;
  }
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const Grid = styled.div`
  position: relative;
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 20px;

  @media (max-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Section = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: Proptypes.string.isRequired,
  children: Proptypes.oneOfType([
    Proptypes.arrayOf(Proptypes.node),
    Proptypes.node,
  ]),
};

export default Section;

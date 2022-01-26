import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #615c9c;
    border-bottom: 2px solid #615c9c;
  }
`;

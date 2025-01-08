import { animated } from "react-spring";
import styled from "styled-components";

export const Headline = styled.h1`
  font-family: Conformable;
  color: #ff4a4a;
`;

export const SubHeadline = styled(animated.h2)`
  font-family: Conformable;
  color: white;
`;
export const MessageContainer = styled(animated.div)`
  font-family: monospace;
  --webkit-line-clamp: 2;
`;

export const ButtonContainer = styled(animated.div)`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

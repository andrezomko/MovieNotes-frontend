import styled from 'styled-components'

export const Container = styled.div`
  font-size: 12px;
  font-weight: 400;

  padding: 6px 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
`

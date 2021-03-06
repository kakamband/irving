import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

// Wrapper around the menu name.
export const NameWrapper = styled.h3`
  display: none;
`;

export const Inner = styled.ol`
  align-items: center;
  display: flex;
  justify-content: center;
  list-style: none;
`;

export const ItemWrapper = styled.li`
  flex: 1 0 auto;
  padding: 0 1.625rem;

  a {
    color: #12121c;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const Dropdown = styled.ol`
  display: none;
`;

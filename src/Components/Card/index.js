import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div({
    boxShadow: '0 0 8px gray',
    borderRadius: '16px',
    width: '100%',
    overflow: 'hidden',
    padding: '32px',
});

/**
 * A React card component for stylistically wrapping UI elements.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The child components wrapped by the card.
 * @returns {ReactComponentElement} - The rendered card component.
 */
const Card = ({ children = null }) => {
    return <StyledCard>{children}</StyledCard>;
};

export default Card;

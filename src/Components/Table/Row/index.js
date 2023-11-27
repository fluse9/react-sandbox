import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.tr({
    borderBottom: '1px solid gray',
});

/**
 * A React table row component for stylistically wrapping table data.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The child components wrapped by the row (these should consist of <td> elements).
 * @returns {ReactComponentElement} - The rendered table row component.
 */
const Row = ({ children = null }) => {
    return <StyledRow>{children}</StyledRow>;
};

export default Row;

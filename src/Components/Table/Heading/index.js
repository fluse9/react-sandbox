import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Row from '../Row';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';

const HeadingCell = styled.th({
    background: '#ECECED',
    border: '1px solid gray',
    cursor: 'pointer',
    width: `${2 / 12}%`,
    textAlign: 'left',
    padding: '4px',
});

const IconContainer = styled(FontAwesomeIcon)({
    float: 'right',
});

/**
 * A React table heading component representing the heading row of a data table.
 *
 * @component
 * @param {Object} props.columns - The list of columns for the table of the structure { name: string, order: string | null }.
 * @param {function} props.sortByColumn - Sorts the table by the specified column's values in ascending or descending order.
 * @returns {ReactComponentElement} - The rendered table heading component.
 */
const Heading = ({ columns = [], sortByColumn = () => {} }) => {
    return (
        <thead>
            <Row>
                {columns?.map(({ name = '', order = null }, index = 0) => (
                    <HeadingCell key={name} onClick={() => sortByColumn(index)}>
                        {name}
                        {order === ASCENDING ? (
                            <IconContainer icon={faSortUp} />
                        ) : order === DESCENDING ? (
                            <IconContainer icon={faSortDown} />
                        ) : (
                            <IconContainer icon={faSort} />
                        )}
                    </HeadingCell>
                ))}
            </Row>
        </thead>
    );
};

export default Heading;

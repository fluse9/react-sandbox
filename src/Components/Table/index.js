import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';
import Row from './Row';

const StyledTable = styled.table({
    width: '100%',
    borderCollapse: 'collapse',
});

const DataCell = styled.td({
    width: `${2 / 12}%`,
    textAlign: 'left',
    border: '1px solid gray',
    padding: '4px',
});

/**
 * @type {Influencer}
 * @property {string} name - The full name of the influencer.
 * @property {string} city - The city in which the influencer works.
 * @property {string} state - The state in which the influencer works.
 * @property {string} position - The job position held by the influencer.
 * @property {string} hospital - The name of the hospital at which the influencer works.
 * @property {number} priority - The relative level of priority the influencer has.
 */

/**
 * A React table component for stylistically presenting a list of information.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Influencer[]} props.data - The list of objects from which to render the data table
 * @param {Object} props.columns - The list of columns for the table of the structure { name: string, order: string | null }.
 * @param {function} props.sortByColumn - Sorts the table by the specified column's values in ascending or descending order.
 * @returns {ReactComponentElement} - The rendered table component.
 */
const Table = ({ data = [], columns = [], sortByColumn = () => {} }) => {
    const renderedData =
        data?.map(
            ({ name = '', city = '', state = '', position = '', hospital = '', priority = 0 }) => (
                <Row key={name}>
                    <DataCell>{name}</DataCell>
                    <DataCell>{city}</DataCell>
                    <DataCell>{state}</DataCell>
                    <DataCell>{position}</DataCell>
                    <DataCell>{hospital}</DataCell>
                    <DataCell>{priority}</DataCell>
                </Row>
            ),
        ) ?? null;

    return (
        <StyledTable>
            <Heading columns={columns} sortByColumn={sortByColumn} />
            <tbody>{renderedData}</tbody>
        </StyledTable>
    );
};

export default Table;

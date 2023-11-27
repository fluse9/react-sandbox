import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Table from './Components/Table';
import Card from './Components/Card';
import rawInfluencers from '../data/influencers.json';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';

const AppContainer = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    marginLeft: 'calc(50vw - 600px)',
});

const Heading = styled.h2({
    width: '100%',
});

const PaginationContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledInput = styled.input({
    width: '16px',
    margin: '0 4px 0 4px',
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
 * The application to render.
 *
 * @component
 * @returns {ReactComponentElement} - The rendered application.
 */
const App = () => {
    const maxRowsPerPage = 20;

    const [columns, setColumns] = useState([
        {
            name: 'Name',
            order: null,
        },
        {
            name: 'City',
            order: null,
        },
        {
            name: 'State',
            order: null,
        },
        {
            name: 'Position',
            order: null,
        },
        {
            name: 'Hospital',
            order: null,
        },
        {
            name: 'Priority',
            order: null,
        },
    ]);
    const [influencers, setInfluencers] = useState(rawInfluencers);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([[]]);

    useEffect(() => {
        /**
         * Removes duplicate influencers from the data.
         *
         * @param {Influencer[]} data - The list of influencers containing duplicates.
         * @returns {Influencer[]} - The list of influencers without duplicates.
         */
        const removeDuplicates = (data = []) => {
            const seenNames = new Set();

            const uniqueInfluencers =
                data?.filter((datum) => {
                    const name = datum?.name ?? '';
                    const hasNotSeenName = !seenNames?.has(name) ?? false;

                    if (hasNotSeenName) {
                        seenNames.add(name);
                    }

                    return hasNotSeenName;
                }) ?? [];

            return uniqueInfluencers;
        };

        /**
         * Groups the influencer data into pages using a 2D array.
         *
         * @param {Influencer[]} uniqueInfluencers - The list of unique influencers with all duplicates removed.
         * @returns {[Influencer[]]} - A 2D array containing the influencers grouped into pages.
         */
        const paginateData = (uniqueInfluencers = []) => {
            const localPaginatedData = [[]];
            let page = 0;

            uniqueInfluencers.forEach((influencer) => {
                const rowsOnPage = localPaginatedData[page]?.length ?? 0;
                const pageIsFull = rowsOnPage === maxRowsPerPage;

                if (pageIsFull) {
                    localPaginatedData.push([]);
                    page += 1;
                }

                localPaginatedData[page].push(influencer);
            });

            return localPaginatedData;
        };

        const uniqueInfluencers = removeDuplicates(influencers);

        const totalRows = uniqueInfluencers?.length ?? 0;
        const localTotalPages = Math.ceil(totalRows / maxRowsPerPage);
        setTotalPages(localTotalPages);

        const localPaginatedData = paginateData(uniqueInfluencers);
        setPaginatedData(localPaginatedData);
    }, [influencers]);

    /**
     * Handles the click event for heading cells in the table, sorting the table by the clicked column in ascending or descending order.
     *
     * @param {number} sortIndex - The index of the column to sort by.
     * @returns {void}
     */
    const sortByColumn = (sortIndex = 0) => {
        /**
         * Clears the order property of all columns except the column at sortIndex.
         *
         * @returns {Object} - The list of columns with all other orders cleared.
         */
        const clearOtherColumnsOrder = () =>
            columns.map(({ name = '', order = null }, index = 0) => {
                const newColumn = { name, order };
                const isNotColumnToSortBy = index !== sortIndex;

                if (isNotColumnToSortBy) {
                    newColumn.order = null;
                }

                return newColumn;
            });

        /**
         * Toggles the order property on the selected column in the table.
         *
         * @param {Object[]} clearedColumns - The list of columns with all order properties cleared except the one to sort by.
         * @returns {Object[]} - The list of columns with the selected column's order property toggled to ascending or descending.
         */
        const toggleSelectedColumn = (clearedColumns = []) => {
            const toggledColumns = [...clearedColumns];
            const { order } = toggledColumns[sortIndex] ?? null;

            if (order === ASCENDING) {
                toggledColumns[sortIndex].order = DESCENDING;
            } else {
                toggledColumns[sortIndex].order = ASCENDING;
            }

            return toggledColumns;
        };

        /**
         * Sorts the influencers data by the selected column in the toggled order.
         *
         * @param {Object[]} toggledColumns - The list of columns with the selected column's order property toggled to ascending or descending.
         * @returns {Influencer[]} - The influencers data sorted by the selected column.
         */
        const sortBySelectedColumn = (toggledColumns = []) => {
            const localInfluencers = [...influencers];
            const { name, order } = toggledColumns[sortIndex] ?? null;
            const propertyToSortBy = name.toLowerCase();

            const sortedInfluencers = localInfluencers.sort((previous = {}, next = {}) => {
                const dataType = typeof previous[propertyToSortBy];

                let sort = 0;
                if (dataType === 'number') {
                    sort =
                        order === ASCENDING
                            ? previous[propertyToSortBy] - next[propertyToSortBy]
                            : next[propertyToSortBy] - previous[propertyToSortBy];
                }
                if (dataType === 'string') {
                    sort =
                        order === ASCENDING
                            ? previous[propertyToSortBy].localeCompare(next[propertyToSortBy])
                            : next[propertyToSortBy].localeCompare(previous[propertyToSortBy]);
                }

                return sort;
            });

            return sortedInfluencers;
        };

        const clearedColumns = clearOtherColumnsOrder();
        const toggledColumns = toggleSelectedColumn(clearedColumns);
        const sortedInfluencers = sortBySelectedColumn(toggledColumns);

        setColumns(toggledColumns);
        setInfluencers(sortedInfluencers);
    };

    /**
     * Handles the change event for the pagination input, enabling users to change the current page of the table.
     *
     * @param {Object} event - The JS event object generated when the input value is changed.
     * @returns {void}
     */
    const handleChange = (event = {}) => {
        const newPage = event?.target?.value ?? 0;
        setCurrentPage(newPage);
    };

    return (
        <AppContainer>
            <Card>
                <Heading>Influencers</Heading>
                <Table
                    data={paginatedData[currentPage - 1]}
                    columns={columns}
                    sortByColumn={sortByColumn}
                />
                <PaginationContainer>
                    <p>Page: </p>
                    <StyledInput value={currentPage} onChange={handleChange} />
                    <p> / {totalPages}</p>
                </PaginationContainer>
            </Card>
        </AppContainer>
    );
};

export default App;

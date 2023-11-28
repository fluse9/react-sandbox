const ASCENDING = 'ascending';
const NUMBER = 'number';
const STRING = 'string';

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
 * Sorts the influencers data by the selected column in the toggled order.
 *
 * @param {Influencer[]} influencers - The list of influencers to sort.
 * @param {Object[]} toggledColumns - The list of columns with the selected column's order property toggled to ascending or descending.
 * @param {number} sortIndex - The index of the column to use for the basis of the sort.
 * @returns {Influencer[]} - The influencers data sorted by the selected column.
 */
const sortBySelectedColumn = (influencers = [], toggledColumns = [], sortIndex = 0) => {
    const copyInfluencers = [...influencers];
    const { name, order } = toggledColumns[sortIndex] ?? null;
    const propertyToSortBy = name.toLowerCase();

    const sortedInfluencers = copyInfluencers.sort((previous = {}, next = {}) => {
        const dataType = typeof previous[propertyToSortBy];

        let sort = 0;
        if (dataType === NUMBER) {
            sort =
                order === ASCENDING
                    ? previous[propertyToSortBy] - next[propertyToSortBy]
                    : next[propertyToSortBy] - previous[propertyToSortBy];
        }
        if (dataType === STRING) {
            sort =
                order === ASCENDING
                    ? previous[propertyToSortBy].localeCompare(next[propertyToSortBy])
                    : next[propertyToSortBy].localeCompare(previous[propertyToSortBy]);
        }

        return sort;
    });

    return sortedInfluencers;
};

export default sortBySelectedColumn;

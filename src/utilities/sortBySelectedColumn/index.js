const ASCENDING = 'ascending';

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
 * Merges the left and right sides of the sorted influencers list together.
 *
 * @param {Influencer[]} sortedLeft - The sorted left side of the influencers list.
 * @param {Influencer[]} sortedRight - The sorted right side of the influencers list.
 * @param {string} propertyToSortBy - The property of the influencer object to sort by.
 * @param {string} order - The order in which to sort the influencers (ascending or descending).
 * @returns {Influencer[]} - The merged sorted list of influencers.
 */
const merge = (sortedLeft = [], sortedRight = [], propertyToSortBy = '', order = ASCENDING) => {
    const numberOfSortedLeft = sortedLeft?.length ?? 0;
    const numberOfSortedRight = sortedRight?.length ?? 0;
    let left = 0;
    let right = 0;
    const merged = [];

    while (left < numberOfSortedLeft && right < numberOfSortedRight) {
        const leftInfluencer = sortedLeft[left] ?? {};
        const rightInfluencer = sortedRight[right] ?? {};

        const leftInfluencerProperty = leftInfluencer[propertyToSortBy] ?? null;
        const rightInfluencerProperty = rightInfluencer[propertyToSortBy] ?? null;

        const leftIsNextInOrder =
            order === ASCENDING
                ? leftInfluencerProperty < rightInfluencerProperty
                : leftInfluencerProperty > rightInfluencerProperty;

        if (leftIsNextInOrder) {
            merged.push(sortedLeft[left]);
            left += 1;
        } else {
            merged.push(sortedRight[right]);
            right += 1;
        }
    }

    return merged.concat(sortedLeft.slice(left), sortedRight.slice(right));
};

/**
 * Recursively sorts and merges the list of influencers using divide and conquer.
 *
 * @param {Influencer[]} influencers - The unsorted list of influencers.
 * @param {string} propertyToSortBy - The property of the influencer object to sort by.
 * @returns {Influencer[]} - The merged sorted list of influencers.
 */
const mergeSort = (influencers = [], propertyToSortBy = '', order = ASCENDING) => {
    const numberOfInfluencers = influencers?.length ?? 0;
    let mergedInfluencers = [...influencers];

    if (numberOfInfluencers > 1) {
        const middle = Math.ceil(numberOfInfluencers / 2);
        const left = influencers?.slice(0, middle) ?? [];
        const right = influencers?.slice(middle, numberOfInfluencers) ?? [];

        const sortedLeft = mergeSort(left, propertyToSortBy, order);
        const sortedRight = mergeSort(right, propertyToSortBy, order);

        mergedInfluencers = merge(sortedLeft, sortedRight, propertyToSortBy, order);
    }

    return mergedInfluencers;
};

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

    const sortedInfluencers =
        mergeSort(copyInfluencers, propertyToSortBy, order) ?? copyInfluencers;

    return sortedInfluencers;
};

export default sortBySelectedColumn;

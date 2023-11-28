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
 * Groups the influencer data into pages using a 2D array.
 *
 * @param {Influencer[]} influencers - The list of unpaginated influencers.
 * @param {number} maxRowsPerPage - The maximum amount of influencers per page in the data table.
 * @returns {[Influencer[]]} - A 2D array containing the influencers grouped into pages.
 */
const paginateData = (influencers = [], maxRowsPerPage = 20) => {
    const paginatedData = [[]];
    let page = 0;

    influencers.forEach((influencer = {}) => {
        const rowsOnPage = paginatedData[page]?.length ?? 0;
        const pageIsFull = rowsOnPage === maxRowsPerPage;

        if (pageIsFull) {
            paginatedData.push([]);
            page += 1;
        }

        paginatedData[page].push(influencer);
    });

    return paginatedData;
};

export default paginateData;

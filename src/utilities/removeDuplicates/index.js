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
 * Removes duplicate influencers from the data.
 *
 * @param {Influencer[]} influencers - The list of influencers containing duplicates.
 * @returns {Influencer[]} - The list of influencers without duplicates.
 */
const removeDuplicates = (influencers = []) => {
    const seenNames = new Set();

    const uniqueInfluencers = influencers.filter((influencer = {}) => {
        const name = influencer?.name ?? '';
        const hasNotSeenName = !seenNames?.has(name) ?? false;

        if (hasNotSeenName) {
            seenNames.add(name);
        }

        return hasNotSeenName;
    });

    return uniqueInfluencers;
};

export default removeDuplicates;

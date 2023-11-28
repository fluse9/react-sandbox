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
 * Determines if the provided string contains the given substring.
 *
 * @param {string} string - The given string to search through.
 * @param {string} substring - The given substring to search for.
 * @returns {bool} - An indication whether the string contains the substring or not.
 */
const determineIfStringContainsSubstring = (string = '', substring = '') => {
    const lengthOfString = string?.length ?? 0;
    const lengthOfSubstring = substring?.length ?? 0;
    let stringContainsSubstring = false;

    for (let i = 0; i < lengthOfString - lengthOfSubstring; i++) {
        const slidingWindow = string?.slice(i, i + lengthOfSubstring) ?? '';
        const slidingWindowMatchesSubstring = slidingWindow === substring;

        if (slidingWindowMatchesSubstring) {
            stringContainsSubstring = true;
        }
    }

    return stringContainsSubstring;
};

/**
 * Filters the influencers shown in the table according to the user entered search term, resetting influencers
 * if the search term is empty.
 *
 * @param {Influencer[]} influencers - The unfiltered list of influencers.
 * @param {string} searchTerm - The substring to be included in the filtered list of influencers.
 * @returns {Influencer[]} - The list of influencers filtered by the search term.
 */
const filterInfluencersBySearchTerm = (influencers = [], searchTerm = '') => {
    let filteredInfluencers = influencers;

    if (searchTerm) {
        const numberOfInfluencers = influencers?.length ?? 0;
        let left = 0;
        let right = numberOfInfluencers - 1;

        while (left < right) {
            const rightInfluencer = influencers[right];
            const leftInfluencer = influencers[left];

            const rightInfluencerName = influencers[right]?.name ?? '';
            const leftInfluencerName = influencers[left]?.name ?? '';

            const rightDoesNotIncludeSearchTerm = !determineIfStringContainsSubstring(
                rightInfluencerName,
                searchTerm,
            );
            const leftIncludesSearchTerm = determineIfStringContainsSubstring(
                leftInfluencerName,
                searchTerm,
            );

            if (rightDoesNotIncludeSearchTerm) {
                right -= 1;
            } else if (leftIncludesSearchTerm) {
                left += 1;
            } else {
                influencers[right] = leftInfluencer;
                influencers[left] = rightInfluencer;
            }
        }

        const matchedInfluencers = left + 1;
        const unmatchedInfluencers = numberOfInfluencers - unmatchedInfluencers;
        filteredInfluencers = influencers.slice(0, matchedInfluencers);
    }

    return filteredInfluencers;
};

export default filterInfluencersBySearchTerm;

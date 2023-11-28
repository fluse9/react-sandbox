import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
    margin: '16px 0 16px 0',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
    padding: '12px 16px 12px 16px',
    borderRadius: '16px',
});

const SearchIcon = styled(FontAwesomeIcon)({
    color: 'gray',
});

const Input = styled.input({
    margin: '0 8px 0 8px',
    border: 'none',
    outline: 'none',
    color: 'gray',
});

/**
 * A React search bar component for searching influencers.
 *
 * @component
 * @param {Object} props - The props object for the component.
 * @param {function} props.setSearchTerm - Sets the term for which to search for in the influencer dataset.
 * @returns {ReactElement} - The rendered search bar component.
 */
const SearchBar = ({ setSearchTerm = () => {} }) => {
    const placeholder = 'Search influencers by name';
    /**
     * Handles the user search event by setting the search term state variable to the user's input when
     * the Enter key is pressed.
     *
     * @param {Object} event - The event object from the onKeyDown event.
     * @returns {void}
     */
    const handleSearch = (event = {}) => {
        const enter = 'Enter';
        const key = event?.key ?? '';
        const value = event?.target?.value ?? '';

        if (key === enter) {
            setSearchTerm(value);
        }
    };

    return (
        <Container>
            <SearchIcon icon={faSearch} />
            <Input placeholder={placeholder} onKeyDown={handleSearch} />
        </Container>
    );
};

export default SearchBar;

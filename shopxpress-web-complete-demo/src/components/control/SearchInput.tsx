import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { FormControl, InputGroup } from 'react-bootstrap';
import { debounce } from 'lodash';

interface SearchInputProps {
    onTextChanged: (searchText: string) => void
    placeHolder?: string;
}


const SearchInput: React.FC<SearchInputProps> = ({ onTextChanged, placeHolder = 'Search...' }) => {
    const [inputValue, setInputValue] = useState<string>('');

    // Debounced to expose the value to event from props
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            onTextChanged(query)
        }, 500), // Delay in milliseconds
        [onTextChanged]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        debouncedSearch(value);
    }, [setInputValue, debouncedSearch]);

    return (
        <InputGroup>
            <FormControl
                placeholder={placeHolder}
                value={inputValue}
                onChange={handleChange}
            />
        </InputGroup>
    );
};

export default SearchInput;

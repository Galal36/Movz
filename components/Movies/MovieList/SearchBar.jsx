import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  initialValue = '',
  placeholder = 'Search movies...'
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  // Sync with external value changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar" role="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search movies"
      />
      <button type="submit" aria-label="Submit search">
        Search
      </button>
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBar;
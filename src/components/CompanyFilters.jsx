import PropTypes from 'prop-types';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const filterClass =
  'block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:opacity-40';

function CompanyFilters({
  filters,
  industries,
  locationOptions,
  onFilterChange,
  disabled = false,
}) {
  const indianStates = locationOptions.states[filters.country] || [];
  const citySuggestions =
    filters.state !== 'all'
      ? locationOptions.cities[filters.state] || []
      : [];
  const selectedCityPostal =
    filters.city && locationOptions.cityLookup[filters.city.toLowerCase()];

  const activeFilters = [
    filters.searchTerm && {
      key: 'searchTerm',
      label: `Name: "${filters.searchTerm}"`,
      resetValue: '',
    },
    filters.industry !== 'all' && {
      key: 'industry',
      label: `Industry: ${filters.industry}`,
      resetValue: 'all',
    },
    filters.country !== 'all' && {
      key: 'country',
      label: `Country: ${filters.country}`,
      resetValue: 'all',
    },
    filters.state !== 'all' && {
      key: 'state',
      label: `State: ${filters.state}`,
      resetValue: 'all',
    },
    filters.city && {
      key: 'city',
      label: `City/Village: ${filters.city}${
        selectedCityPostal ? ` (${selectedCityPostal})` : ''
      }`,
      resetValue: '',
    },
  ].filter(Boolean);

  const handleCountryChange = (value) => {
    onFilterChange('country', value);
    onFilterChange('state', 'all');
    onFilterChange('city', '');
  };

  const handleStateChange = (value) => {
    onFilterChange('state', value);
    onFilterChange('city', '');
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <FunnelIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Filters</p>
            <p className="text-lg font-semibold">Refine results</p>
          </div>
        </div>
        <button
          type="button"
          className="ml-auto text-sm font-semibold text-brand-600 hover:text-brand-500"
          onClick={() => {
            onFilterChange('searchTerm', '');
            onFilterChange('industry', 'all');
            handleCountryChange('all');
            onFilterChange('sortBy', 'name-asc');
          }}
        >
          Reset all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2">
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Search by name
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="search"
              type="search"
              className={`${filterClass} pl-10`}
              placeholder="E.g., Rapid Innovations"
              value={filters.searchTerm}
              onChange={(event) =>
                onFilterChange('searchTerm', event.target.value)
              }
              disabled={disabled}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="industry"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Industry
          </label>
          <select
            id="industry"
            className={filterClass}
            value={filters.industry}
            onChange={(event) => onFilterChange('industry', event.target.value)}
            disabled={disabled}
          >
            <option value="all">All industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Country
          </label>
          <select
            id="country"
            className={filterClass}
            value={filters.country}
            onChange={(event) => handleCountryChange(event.target.value)}
            disabled={disabled}
          >
            <option value="all">All countries</option>
            {locationOptions.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-1 block text-sm font-medium text-slate-600"
          >
            Sort results
          </label>
          <select
            id="sort"
            className={filterClass}
            value={filters.sortBy}
            onChange={(event) => onFilterChange('sortBy', event.target.value)}
            disabled={disabled}
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="size-desc">Employees (high → low)</option>
            <option value="size-asc">Employees (low → high)</option>
          </select>
        </div>

        {filters.country === 'India' && (
          <>
            <div>
              <label
                htmlFor="state"
                className="mb-1 block text-sm font-medium text-slate-600"
              >
                Indian state
              </label>
              <select
                id="state"
                className={filterClass}
                value={filters.state}
                onChange={(event) => handleStateChange(event.target.value)}
                disabled={disabled}
              >
                <option value="all">All states</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="city"
                className="mb-1 block text-sm font-medium text-slate-600"
              >
                City / Village (with PIN)
              </label>
              <input
                id="city"
                list="city-list"
                className={filterClass}
                placeholder="Start typing to search across cities or PIN codes"
                value={filters.city}
                onChange={(event) => onFilterChange('city', event.target.value)}
                disabled={disabled || filters.state === 'all'}
              />
              <datalist id="city-list">
                {citySuggestions.map((city) => (
                  <option
                    key={`${city.name}-${city.postalCode}`}
                    value={city.name}
                  >
                    {city.name} — {city.postalCode}
                  </option>
                ))}
              </datalist>
              <p className="mt-1 text-xs text-slate-400">
                Suggestions update after you pick a state. Search accepts city
                names or PIN codes.
              </p>
            </div>
          </>
        )}
      </div>
      {activeFilters.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/70 px-3 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
              onClick={() => onFilterChange(filter.key, filter.resetValue)}
            >
              {filter.label}
              <span className="rounded-full bg-brand-600/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-brand-700 group-hover:bg-brand-600/20">
                Clear
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

CompanyFilters.propTypes = {
  filters: PropTypes.shape({
    searchTerm: PropTypes.string,
    industry: PropTypes.string,
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  industries: PropTypes.arrayOf(PropTypes.string).isRequired,
  locationOptions: PropTypes.shape({
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    states: PropTypes.object.isRequired,
    cities: PropTypes.object.isRequired,
    cityLookup: PropTypes.object.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CompanyFilters;


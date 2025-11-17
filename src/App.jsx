import { useEffect, useMemo, useState } from 'react';
import CompanyFilters from './components/CompanyFilters';
import CompanyTable from './components/CompanyTable';
import CompanyCardGrid from './components/CompanyCardGrid';
import Pagination from './components/Pagination';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ViewToggle from './components/ViewToggle';

const PAGE_SIZE = 6;
const DATA_URL = '/data/companies.json';

function App() {
  const [companies, setCompanies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadFlag, setReloadFlag] = useState(0);
  const [filters, setFilters] = useState({
    searchTerm: '',
    industry: 'all',
    country: 'all',
    state: 'all',
    city: '',
    sortBy: 'name-asc',
  });
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    const fetchCompanies = async () => {
      setStatus('loading');
      setErrorMessage('');
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error('Failed to load companies. Please try again.');
        }
        const data = await response.json();
        setCompanies(data);
        setStatus('success');
      } catch (error) {
        setErrorMessage(error.message);
        setStatus('error');
      }
    };

    fetchCompanies();
  }, [reloadFlag]);

  const industries = useMemo(() => {
    const set = new Set(companies.map((company) => company.industry));
    return Array.from(set).sort();
  }, [companies]);

  const locationOptions = useMemo(() => {
    const countriesSet = new Set();
    const statesByCountry = {};
    const citiesByState = {};
    const cityLookup = {};

    companies.forEach((company) => {
      const { country, state, city, postalCode } = company;
      if (country) {
        countriesSet.add(country);
        if (!statesByCountry[country]) {
          statesByCountry[country] = new Set();
        }
        if (state) {
          statesByCountry[country].add(state);
        }
      }

      if (state) {
        if (!citiesByState[state]) {
          citiesByState[state] = new Map();
        }
        if (city) {
          citiesByState[state].set(city, postalCode);
          const key = city.toLowerCase();
          if (!cityLookup[key]) {
            cityLookup[key] = postalCode;
          }
        }
      }
    });

    return {
      countries: Array.from(countriesSet).sort(),
      states: Object.fromEntries(
        Object.entries(statesByCountry).map(([country, set]) => [
          country,
          Array.from(set).sort(),
        ]),
      ),
      cities: Object.fromEntries(
        Object.entries(citiesByState).map(([state, map]) => [
          state,
          Array.from(map.entries()).map(([name, postalCode]) => ({
            name,
            postalCode,
          })),
        ]),
      ),
      cityLookup,
    };
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    let output = [...companies];

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      output = output.filter((company) =>
        company.name.toLowerCase().includes(term),
      );
    }

    if (filters.industry !== 'all') {
      output = output.filter(
        (company) => company.industry === filters.industry,
      );
    }

    if (filters.country !== 'all') {
      output = output.filter(
        (company) => company.country === filters.country,
      );
    }

    if (filters.state !== 'all') {
      output = output.filter((company) => company.state === filters.state);
    }

    if (filters.city) {
      const cityTerm = filters.city.toLowerCase();
      output = output.filter(
        (company) =>
          company.city.toLowerCase().includes(cityTerm) ||
          (company.postalCode || '').toLowerCase().includes(cityTerm),
      );
    }

    switch (filters.sortBy) {
      case 'name-desc':
        output.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'size-desc':
        output.sort((a, b) => b.employeeCount - a.employeeCount);
        break;
      case 'size-asc':
        output.sort((a, b) => a.employeeCount - b.employeeCount);
        break;
      case 'name-asc':
      default:
        output.sort((a, b) => a.name.localeCompare(b.name));
    }

    return output;
  }, [companies, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE));

  const paginatedCompanies = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCompanies.slice(start, start + PAGE_SIZE);
  }, [filteredCompanies, page]);

  const hasResults = filteredCompanies.length > 0;
  const totalEmployees = useMemo(
    () =>
      companies.reduce((acc, company) => acc + (company.employeeCount ?? 0), 0),
    [companies],
  );

  const handleFilterChange = (key, value) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRetry = () => {
    setPage(1);
    setFilters({
      searchTerm: '',
      industry: 'all',
      country: 'all',
      state: 'all',
      city: '',
      sortBy: 'name-asc',
    });
    setReloadFlag((value) => value + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950/5">
      <header className="relative overflow-hidden border-b border-slate-900/10 bg-gradient-to-br from-slate-900 via-brand-900 to-brand-600 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-12 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/3 rounded-full bg-sky-400 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Frontlines Media
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Discover and curate high-impact companies
            </h1>
            <p className="mt-4 text-base text-white/80">
              Search, filter, and compare organizations across industries,
              regions, and sizes. Built for rapid scouting and shortlist reviews.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-sm font-semibold backdrop-blur">
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-white/70">
                Companies
              </p>
              <p className="mt-2 text-2xl font-bold">{companies.length}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-white/70">
                Industries
              </p>
              <p className="mt-2 text-2xl font-bold">{industries.length}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-white/70">
                Team size total
              </p>
              <p className="mt-2 text-2xl font-bold">
                {totalEmployees.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <CompanyFilters
          filters={filters}
          industries={industries}
          locationOptions={locationOptions}
          onFilterChange={handleFilterChange}
          disabled={status === 'loading'}
        />

        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Showing
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {filteredCompanies.length} curated companies
            </p>
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>
          </div>
          <ViewToggle view={viewMode} onChange={setViewMode} />
        </div>

        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <ErrorState
            message={errorMessage}
            onRetry={handleRetry}
          />
        )}

        {status === 'success' && (
          <>
            {!hasResults && (
              <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-xl font-semibold text-slate-900">
                  No companies found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try adjusting your filters or clearing the search term.
                </p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={() => {
                    setFilters({
                      searchTerm: '',
                      industry: 'all',
                      country: 'all',
                      state: 'all',
                      city: '',
                      sortBy: 'name-asc',
                    });
                    setPage(1);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {hasResults && (
              <>
                {viewMode === 'table' ? (
                  <section className="mt-10 hidden rounded-3xl border border-slate-100 bg-white/90 shadow-xl ring-1 ring-black/5 md:block">
                    <CompanyTable companies={paginatedCompanies} />
                  </section>
                ) : (
                  <section className="mt-10 flex flex-col gap-6 md:hidden">
                    <CompanyCardGrid companies={paginatedCompanies} />
                  </section>
                )}

                {viewMode === 'cards' && (
                  <section className="mt-10 hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
                    <CompanyCardGrid companies={paginatedCompanies} />
                  </section>
                )}

                {viewMode === 'table' && (
                  <section className="mt-10 md:hidden">
                    <CompanyCardGrid companies={paginatedCompanies} />
                  </section>
                )}

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;



import PropTypes from 'prop-types';
import {
  BuildingOfficeIcon,
  GlobeAmericasIcon,
  MapPinIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { formatIntlNumber } from '../utils/number';

function CompanyCardGrid({ companies }) {
  return (
    <>
      {companies.map((company) => (
        <article
          key={company.id}
          className="group overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
        >
          <header className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 via-brand-500/20 to-brand-500/30 text-brand-700">
                <BuildingOfficeIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {company.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Est. {company.founded}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              #{company.id.toString().padStart(2, '0')}
            </span>
          </header>
          <p className="mt-4 text-sm text-slate-600">{company.tagline}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <dt className="text-xs uppercase text-slate-400">Industry</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {company.industry}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <dt className="text-xs uppercase text-slate-400">Headcount</dt>
              <dd className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                <UsersIcon className="h-4 w-4 text-slate-400" />
                {formatIntlNumber(company.employeeCount)}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <dt className="text-xs uppercase text-slate-400">Country</dt>
              <dd className="mt-1 flex items-center gap-2 font-medium text-slate-900">
                <GlobeAmericasIcon className="h-4 w-4 text-slate-400" />
                {company.country}
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <dt className="text-xs uppercase text-slate-400">City / PIN</dt>
              <dd className="mt-1 flex items-center gap-2 font-medium text-slate-900">
                <MapPinIcon className="h-4 w-4 text-slate-400" />
                {company.city}, {company.state}{' '}
                <span className="text-slate-500">({company.postalCode})</span>
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </>
  );
}

CompanyCardGrid.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      industry: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      employeeCount: PropTypes.number.isRequired,
      founded: PropTypes.number.isRequired,
      tagline: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CompanyCardGrid;


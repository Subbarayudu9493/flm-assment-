import PropTypes from 'prop-types';
import { BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline';
import { formatIntlNumber } from '../utils/number';

function CompanyTable({ companies }) {
  return (
    <table className="w-full border-collapse text-left text-sm text-slate-700">
      <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
        <tr>
          <th className="px-6 py-4 font-semibold">Company</th>
          <th className="px-6 py-4 font-semibold">Industry</th>
          <th className="px-6 py-4 font-semibold">Location</th>
          <th className="px-6 py-4 font-semibold">Employees</th>
          <th className="px-6 py-4 font-semibold">Founded</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr
            key={company.id}
            className="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td className="px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <BuildingOffice2Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{company.name}</p>
                  <p className="text-xs text-slate-500">{company.tagline}</p>
                  <span className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    #{company.id.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-6 py-5">{company.industry}</td>
            <td className="px-6 py-5">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <MapPinIcon className="h-4 w-4 text-slate-400" />
                {company.city}, {company.state}{' '}
                <span className="text-slate-400">
                  ({company.postalCode}) — {company.country}
                </span>
              </span>
            </td>
            <td className="px-6 py-5 font-semibold text-slate-900">
              {formatIntlNumber(company.employeeCount)}
            </td>
            <td className="px-6 py-5">{company.founded}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CompanyTable.propTypes = {
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

export default CompanyTable;


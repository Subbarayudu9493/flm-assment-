import PropTypes from 'prop-types';
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/outline';

const modes = [
  {
    id: 'table',
    label: 'Table view',
    icon: TableCellsIcon,
  },
  {
    id: 'cards',
    label: 'Card view',
    icon: Squares2X2Icon,
  },
];

function ViewToggle({ view, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = view === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            onClick={() => onChange(mode.id)}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}

ViewToggle.propTypes = {
  view: PropTypes.oneOf(['table', 'cards']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViewToggle;


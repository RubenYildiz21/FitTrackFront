import React from 'react';

const FilterSection = ({ activeFilters, setActiveFilters }) => {
  const filters = [
    { id: 'HALTERES', label: 'Haltères' },
    { id: 'BARRE', label: 'Barre' },
    { id: 'TAPIS', label: 'Tapis' },
    { id: 'AUCUN', label: 'Sans équipement' },
    { id: 'ELASTIQUES', label: 'Élastiques' },
    { id: 'MACHINE', label: 'Machine de musculation' }
  ];

  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(f => f !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-2 text-gray-400">Filtre</div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeFilters.includes(filter.id)
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection; 
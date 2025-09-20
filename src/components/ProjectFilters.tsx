"use client";

const ProjectFilters = ({
  activeFilter,
  setFilter,
  filtersT,
}: {
  activeFilter: string;
  setFilter: (filter: string) => void;
  filtersT?: string[];
}) => {
  const filters = [
    { id: "all", label: filtersT ? filtersT[0] : "All Projects" },
    { id: "web", label: filtersT ? filtersT[2] : "Web Development" },
    { id: "42", label: filtersT ? filtersT[1] : "42 Projects" },
  ];

  return (
    <section className="py- bg-white  border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFilters;

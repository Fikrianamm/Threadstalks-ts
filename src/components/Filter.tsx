import { useAppSelector } from '../hooks/store';

interface PropsFilter {
  filter:string
  onSetSelectedFilter:(category:string)=>void
  onUnsetSelectedFilter:()=>void
}

export default function Filter({
  filter,
  onSetSelectedFilter,
  onUnsetSelectedFilter,
}: PropsFilter) {
  const { data } = useAppSelector((state) => state.threads);
  const categories :string[] = data?.reduce((acc:string[], thread) => {
    if (thread.category !== undefined && !acc.includes(thread.category)) {
      acc.push(thread.category);
    }
    return acc;
  }, []);

  return (
    <>
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="flex flex-wrap gap-3 mt-2 mb-6">
        {
              categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => (filter !== category
                    ? onSetSelectedFilter(category) : onUnsetSelectedFilter())}
                  className={`p-2 font-semibold text-xs transition-all border rounded-md ${filter === category ? 'bg-neutral-900 text-white' : 'hover:shadow-lg border-neutral-500'}`}
                >
                  {category}
                </button>
              ))
            }
      </div>
    </>
  );
}

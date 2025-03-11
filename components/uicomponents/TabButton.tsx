type TabButtonProps = {
  activeTab: number;
  id: number;
  label: string;
  setActiveTab: (id: number) => void;
  removeActivTab?: (id: number) => void; // Make removeVenit optional
};

export default function TabButton({
  activeTab,
  id,
  label,
  setActiveTab,
  removeActivTab,
}: TabButtonProps) {
  return (
    <div className='relative'>
      <button
        className={`px-4 py-2 ${
          activeTab === id ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
        onClick={() => setActiveTab(id)}
      >
        {label}
      </button>
      {removeActivTab && ( // Only show remove button if removeVenit is provided
        <button
          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
          onClick={() => removeActivTab(id)}
        >
          ×
        </button>
      )}
    </div>
  );
}

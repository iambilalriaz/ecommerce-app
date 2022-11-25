const Input = ({ label, value, onChange, error, isNumber }) => {
  return (
    <div>
      <label
        for={label}
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        {label}
      </label>
      <input
        type={isNumber ? 'number' : 'text'}
        id={label}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        min={0}
      />
      {error && (
        <p className='text-[#fb5656] text-xs mt-1'>{label} cannot be empty</p>
      )}
    </div>
  );
};

export default Input;

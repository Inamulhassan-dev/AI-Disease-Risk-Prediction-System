export default function HelperInput({
  label,
  name,
  placeholder,
  hint,
  min,
  max,
  onChange
}) {
  const handleChange = (e) => {
    onChange(e);
  };

  const getColor = (value) => {
    if (value === "" || value === undefined) return "text-slate-500";
    const v = parseFloat(value);
    if (isNaN(v)) return "text-danger";
    if (v < min || v > max) return "text-danger";
    if (v < min + (max - min) * 0.25 || v > max - (max - min) * 0.25)
      return "text-warning";
    return "text-success";
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
      />
      <span className={`text-xs mt-1 ${getColor(placeholder)}`}>
        {hint} (Expected: {min} – {max})
      </span>
    </div>
  );
}

export default function HelperInput({
  label,
  name,
  placeholder,
  hint,
  min,
  max,
  value,
  unit,
  convert,
  required,
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
    <div className="flex flex-col card-input fade-up">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        step="any"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="field-input"
      />
      <span className={`text-xs mt-1 ${getColor(value)}`}>
        {hint} ({min} - {max}{unit ? ` ${unit}` : ""})
      </span>
      {required && (value === "" || value === undefined) ? (
        <span className="text-xs text-red-500 mt-1">Required field</span>
      ) : null}
      {convert && value !== "" && !Number.isNaN(parseFloat(value)) ? (
        <span className="text-xs text-skin-muted mt-1">
          {Number(value / convert.factor).toFixed(2)} {convert.alt}
        </span>
      ) : null}
    </div>
  );
}

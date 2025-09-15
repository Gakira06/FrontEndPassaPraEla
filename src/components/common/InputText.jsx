export default function InputText({
  children,
  className,
  id,
  type = "text",
  required = true,
  value,
  onChange,
}) {
  // Define as classes padrão
  let labelClasses = "mb-1 text-lg";
  let inputClasses = "p-2 border-none bg-8 rounded-md";

  // Se a prop 'className' for 'registro', usa os estilos do registro
  if (className === "registro") {
    labelClasses = "block text-gray-700";
    inputClasses = "w-full mt-1 p-2 border rounded";
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelClasses}>
        {children}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClasses}
        required={required}
      />
    </div>
  );
}

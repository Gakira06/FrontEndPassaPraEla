const classNameRegistro = `bg-purple-500 text-white py-3 px-15 rounded-full text-lg font-bold hover:bg-purple-700`;

export default function ButtonForms({
  type = "submiy",
  className = "bg-3 mt-4 text-white text-2xl py-2 px-10 rounded-md hover:bg-purple-800 transition-colors",
  children,
}) {
  if (className == "registro") {
    return (
      <button type={type} className={classNameRegistro}>
        {children}
      </button>
    );
  }

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}

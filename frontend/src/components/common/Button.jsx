// src/components/common/Button.jsx
export default function Button({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-5 font-bold py-3 px-10 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}

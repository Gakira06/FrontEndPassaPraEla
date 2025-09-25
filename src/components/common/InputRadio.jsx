export default function InputRadio({ children }) {
  return (
    <label className="inline-flex items-center">
      <input type="radio" name="contato" className="form-radio" required />
      <span className="ml-2">{children}</span>
    </label>
  );
}

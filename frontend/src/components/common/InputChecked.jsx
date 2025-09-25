export default function InputChecked({
  children,
  className,
  id,
  type = "checkbox",
}) {
  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <input type={type} id={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

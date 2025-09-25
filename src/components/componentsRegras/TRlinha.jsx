export default function TRlinha({
  className = "border-b border-gray-100",
  children1,
  children2,
}) {
  if (className == "gray") {
    return(
      <tr>
        <th className="p-3 text-sm font-semibold uppercase tracking-wider border-b-2 border-gray-200">
          {children1}
        </th>
        <th className="p-3 text-sm font-semibold uppercase tracking-wider text-right border-b-2 border-gray-200">
          {children2}
        </th>
      </tr>
    )
  }
  if (className == "red") {
    return (
      <tr className="border-b border-gray-100">
        <td className="p-3 text-red-600">{children1}</td>
        <td className="p-3 text-right font-medium text-red-600">{children2}</td>
      </tr>
    );
  }
  return (
    <tr className={className}>
      <td className="p-3">{children1}</td>
      <td className="p-3 text-right font-medium">{children2}</td>
    </tr>
  );
}

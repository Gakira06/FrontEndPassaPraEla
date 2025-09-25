

export default function Lista({children}) {
    return(
        <li className="flex items-start">
            <span className="text-green-500 font-bold mr-3 mt-1">
              &#10003;
            </span>
            <span>{children}</span>
        </li>
    )
}
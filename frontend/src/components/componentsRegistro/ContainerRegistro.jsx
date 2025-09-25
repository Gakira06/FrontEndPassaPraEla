
export default function Container({children, className}) {
    return(
        <div className={`p-6 md:p-10 ${className || ''}`}>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {children}
            </div>
        </div>

    )
}
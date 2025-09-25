

export default function SectionRegistro({className}) {
    return(
        <section className={`flex  rounded-lg items-center justify-center p-2 ${className || ''}`}>
          <h2 className="text-5xl font-bold font-['Teko']">
            FORMULÁRIO DE REGISTRO
          </h2>
        </section>
    )
}
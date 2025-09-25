import BannerImage from "../../assets/imagem-team.png";

export default function HeaderTeamPage() {
    return(
        <header className="relative flex h-[50vh] items-center text-white md:h-[60vh]">
        <img
          src={BannerImage}
          alt="Jogadora de futebol"
          className="absolute inset-0 h-full w-full object-cover brightness-50"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8">
          <h1 className="text-5xl font-bold uppercase tracking-wider md:text-8xl">
            Hora de <br />
            Escalar sua <br />
            Equipe
          </h1>
        </div>
      </header>
    )
}
import LogoSpotify from "../../assets/icons/spotify-logo-fill.svg?react";
import LogoYoutube from "../../assets/icons/youtube-logo-fill.svg?react";
import Icon from "../common/Icon";
import ImgPodcast from "../../assets/podcasPassaABola.png";
import YoutubePassaABola from "../../assets/youtubeTri.png";

export default function Canais() {
  const channels = [
    {
      platform: "Spotify",
      icon: LogoSpotify,
      iconColor: "text-green-500",
      image: ImgPodcast,
      description: "Ouça nosso podcast com episódios semanais, análises e convidadas especiais.",
      buttonText: "Ouvir no Spotify",
      buttonStyle: "bg-gray-800 hover:bg-black text-white",
      url: "https://open.spotify.com/show/18H1ysI9zyDIRahuCnZGQr?si=9feb46fb20514638"
    },
    {
      platform: "YouTube",
      icon: LogoYoutube,
      iconColor: "text-red-600",
      image: YoutubePassaABola,
      description: "Assista aos cortes, melhores momentos e programas completos em nosso canal.",
      buttonText: "Assistir no YouTube",
      buttonStyle: "bg-gray-800 hover:bg-black text-white",
      url: "https://www.youtube.com/@passabola"
    }
  ];

  return (
    <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {channels.map((channel) => (
          <a
            key={channel.platform}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group"
          >
            <article className="flex flex-col h-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon svg={channel.icon} className={channel.iconColor} />
                  <h2 className="text-3xl font-bold text-slate-900">{channel.platform}</h2>
                </div>
                <p className="text-slate-500 text-base min-h-[3em]">
                  {channel.description}
                </p>
              </div>
              <div className="mt-auto">
                <img
                  src={channel.image}
                  alt={`Capa do ${channel.platform} do Passa A Bola`}
                  className="w-full pl-2 h-56 object-cover"
                />
                <div className="p-6">
                  <span
                    className={`w-full text-center block py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${channel.buttonStyle}`}
                  >
                    {channel.buttonText}
                  </span>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}
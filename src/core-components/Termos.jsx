import InputChecked from "../components/common/InputChecked";

const legalInfo = {
  terms: {
    title: "Termos de uso e privacidade",
    sections: [
      {
        title: "1. Aceitação dos Termos",
        content:
          "Ao acessar e utilizar o nosso jogo de fantasy, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.",
      },
      {
        title: "2. Contas de Usuário",
        content:
          "Para acessar o jogo, você deve criar uma conta. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.",
      },
      {
        title: "3. Conduta do Usuário",
        content:
          "Você concorda em não usar o serviço para qualquer finalidade ilegal ou proibida. É proibido utilizar o serviço de qualquer forma que possa danificar, desabilitar, sobrecarregar ou prejudicar o jogo ou tentar obter acesso não autorizado a qualquer parte do serviço.",
      },
      {
        title: "4. Propriedade Intelectual",
        content:
          "Todo o conteúdo presente no jogo, incluindo, mas não se limitando a, textos, gráficos, logos e software, é de nossa propriedade ou de nossos licenciadores e é protegido por leis de direitos autorais e outras leis de propriedade intelectual.",
      },
      {
        title: "5. Alterações nos Termos",
        content:
          "Reservamo-nos o direito de modificar ou substituir estes termos a qualquer momento. O uso continuado do serviço após a publicação de quaisquer alterações constitui aceitação desses novos termos.",
      },
      {
        title: "6. Coleta de Informações",
        content:
          "Coletamos informações que você nos fornece diretamente ao criar uma conta, como nome e endereço de e-mail. Também podemos coletar dados de uso do jogo automaticamente.",
      },
      {
        title: "7. Uso das Informações",
        content:
          "Utilizamos as informações para operar, manter e fornecer os recursos do jogo, bem como para nos comunicarmos com você sobre atualizações, promoções e suporte ao cliente.",
      },
      {
        title: "8. Compartilhamento de Informações",
        content:
          "Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para operar o serviço (como provedores de hospedagem) ou quando exigido por lei.",
      },
      {
        title: "9. Segurança",
        content:
          "Tomamos medidas razoáveis para proteger suas informações contra perda, roubo, uso indevido e acesso não autorizado. No entanto, nenhum sistema de segurança é impenetrável.",
      },
      {
        title: "10. Seus Direitos",
        content:
          "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento através das configurações da sua conta ou entrando em contato conosco.",
      },
    ],
  },
};

export default function Termos() {
  return (
    <>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{legalInfo.terms.title}</h2>
        <div className="h-48 overflow-y-scroll border p-4 rounded-lg bg-gray-50">
          {legalInfo.terms.sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{section.title}</h3>
              <p className="text-gray-600 text-sm">{section.content}</p>
            </div>
          ))}
        </div>

        <InputChecked id="terms" className="form-checkbox mt-4">
          Eu li e aceito os Termos de Uso e privacidade.
        </InputChecked>
      </div>

    </>
  );
}

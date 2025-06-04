import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Quais métodos de pagamento vocês aceitam?",
    answer:
      "Aceitamos MB Way, Multibanco e Cartão de Crédito. Todas as transações são seguras e criptografadas para garantir a proteção dos seus dados.",
  },
  {
    question: "Quanto tempo leva para o envio do produto?",
    answer:
      "O envio geralmente leva de 5 a 7 dias úteis para pedidos em Portugal continental.",
  },
  {
    question: "Vocês oferecem envio internacional?",
    answer:
      "Atualmente, não oferecemos envio internacional. Os nossos envios são apenas para Portugal.",
  },
  {
    question: "Como posso saber se um produto está disponível em stock?",
    answer:
      "Todos os produtos listados no site estão disponíveis em stock. Não queremos que nossos clientes percam tempo a aguardar reposição!",
  },
  {
    question: "Posso alterar ou cancelar meu pedido após a confirmação?",
    answer:
      "Após a confirmação do pedido, não é possível realizar alterações. No entanto, se houver algum erro, entre em contato conosco o quanto antes para que possamos tentar resolver.",
  },
  {
    question: "Como posso entrar em contato para suporte?",
    answer:
      "Pode entrar em contato conosco pelo e-mail geral@nrenergias.pt ou pelo chat disponível no nosso site. Nossa equipe está pronta para ajudar!",
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <button
              className="w-full flex justify-between items-center font-semibold text-left text-blue-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-blue-500" />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Quais métodos de pagamento vocês aceitam?",
    answer: "Aceitamos Visa, MasterCard, PayPal e Apple Pay. Todas as transações são seguras e criptografadas para garantir a proteção dos seus dados."
  },
  {
    question: "Quanto tempo leva para o envio do produto?",
    answer: "O envio geralmente leva de 5 a 7 dias úteis para pedidos nacionais e de 10 a 15 dias úteis para pedidos internacionais."
  },
  {
    question: "Vocês oferecem envio internacional?",
    answer: "Sim, enviamos para todo o mundo! Os custos de envio serão calculados no checkout com base na sua localização."
  },
  {
    question: "Posso rastrear o meu pedido?",
    answer: "Com certeza! Assim que o seu pedido for enviado, enviaremos um número de rastreamento junto com um link para você acompanhar a entrega em tempo real."
  },
  {
    question: "Posso alterar ou cancelar meu pedido após a confirmação?",
    answer: "Após a confirmação do pedido, não é possível realizar alterações. No entanto, se houver um erro no pedido, entre em contato conosco o quanto antes para que possamos tentar solucionar o problema."
  },
  {
    question: "Como posso entrar em contato para suporte?",
    answer: "Você pode entrar em contato conosco pelo e-mail suporte@empresa.com ou pelo chat no nosso site. Nossa equipe estará pronta para ajudá-lo."
  }
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
      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
          Fazer uma Pergunta
        </button>
      </div>
    </section>
  );
}

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactPage() {

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto my-12">
      <div className="mb-10">
        <div className="max-w-325 mx-auto shadow-lg">
          <iframe
            className="w-full h-[50vh]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.88850554352!2d28.847373148811315!3d41.00546324292603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1714985888415!5m2!1str!2str"
            // allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-[color:var(--color-primary)]">
            İletişim Adreslerimiz
          </h1>
        </div>

        <ContactInfo />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-wider mb-2.5 text-center text-(--color-primary)">
            Bize Yazın
          </h1>
          <div className=" w-36 h-px bg-(--color-primary) mb-8" />
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

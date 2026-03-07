import * as Yup from "yup";

export const oldcontactFormSchema = Yup.object().shape(
  {
    message: Yup.string()
      .required("Mesajınızı yazınız.")
      .min(15, "Daha uzun bir mesaj yazın."),
    name: Yup.string()
      .required("İsminizi giriniz.")
      .min(2, "İsminizi giriniz.")
      .typeError("İsminizi giriniz"),
    phoneNum: Yup.string()
      .min(10, "Geçerli bir numara giriniz.")
      .typeError("Geçerli bir numara giriniz.")
      .when("mail", {
        is: (val: string) => !val || val.length === 0,
        then: (s) => s.required("Lütfen en az bir iletişim adresi giriniz."),
        otherwise: (s) => s.notRequired(),
      }),
    mail: Yup.string()
      .email("Geçerli bir mail adresi giriniz.")
      .typeError("Geçerli bir mail adresi giriniz.")
      .when("phoneNum", {
        is: (val: string) => !val || val.length === 0,
        then: (s) => s.required("Lütfen en az bir iletişim adresi giriniz."),
        otherwise: (s) => s.notRequired(),
      }),
  },
  [["mail", "phoneNum"]]
);

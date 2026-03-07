// "use client";
// import { sendEmailAction } from "@/lib/actions/mail-actions";
// import { oldcontactFormSchema } from "@/app/validations/oldcontactFormSchema";
// import Input from "@/components/ui/form/Input";
// import { Form, Formik, FormikProps } from "formik";
// import { useRef, useState } from "react";
// import toast from "react-hot-toast";

// export default function oldContactForm() {
//   const [process, setProcess] = useState(false);
//   type FormValues = {
//     name: string;
//     message: string;
//   } & (
//     | { phoneNum: string | number; mail?: string }
//     | { mail: string; phoneNum?: string | number }
//   );
//   const formikRef = useRef<FormikProps<FormValues>>(null);
  
//   const errorControl = async () => {
//     if (!formikRef.current) return;
//     const errors = await formikRef.current.validateForm();
//     const errList = Object.values(errors);
//     if (errList.length > 0) {
//       toast.error(errList[0] as string);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formikRef.current) return;
//     setProcess(true);
//     const formParams = formikRef.current.values;
//     try {
//       const response = await sendEmailAction(formParams);
//       if (response.status === 200) {
//         toast.success("Mesaj Gönderildi.", { duration: 6000 });
//         formikRef.current?.resetForm();
//       } else {
//         toast.error("Mesaj iletilemedi.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Bir hata oluştu.");
//     } finally {
//       setProcess(false);
//     }
//   };
//   return (
//     <Formik
//       innerRef={formikRef}
//       initialValues={{ name: "", mail: "", phoneNum: "", message: "" }}
//       validationSchema={contactFormSchema}
//       onSubmit={handleSubmit}
//     >
//       {
//         <Form className="flex items-center justify-center flex-col gap-4 w-[80%]">
//           <div className="flex justify-center flex-wrap w-[92%] gap-5">
//             <Input name={"name"} label={"İsim"} as={"input"} />
//             <Input name={"phoneNum"} label={"Telefon Numarası"} as={"input"} />
//             <Input name={"mail"} label={"E-Posta"} as={"input"} type={"email"} />
//           </div>
//           <div className="w-[92%]">
//             <Input name={"message"} label={"Mesaj"} as={"textarea"} rows={6} />
//           </div>

//           <button
//             type={!!process ? "button" : "submit"}
//             className={`inline-flex items-center px-5 py-2 mt-1 font-semibold leading-6 text-sm shadow-md 
//               rounded-md text-(--color-secondary) bg-(--color-tertiary)
//               hover:bg-(--color-tertiary) hover:opacity-70 transition-all 
//               ${!!process && "cursor-not-allowed"}`}
//             disabled={!!process}
//             onClick={errorControl}
//           >
//             {!!process ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-(--color-secondary)"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Gönderiliyor...
//               </>
//             ) : (
//               <>Gönder</>
//             )}
//           </button>
//         </Form>
//       }
//     </Formik>
//   );
// }

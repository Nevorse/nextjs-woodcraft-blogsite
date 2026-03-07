import Photo1 from "@/public/images/Photo1.webp";

// Services
export type dummySerivcesProps = {
  serviceId: number;
  serviceTitle: string;
  serviceImages?: string[];
  serviceContent?: string;
};
const dummyServicesData: dummySerivcesProps[] = [
  {
    serviceId: 0,
    serviceTitle: "Hizmet 1",
    serviceImages: [
      Photo1.src,
      Photo1.src,
      Photo1.src,
      Photo1.src,
      Photo1.src,
      Photo1.src,
    ],
    serviceContent:
      "Hizmet 1 uzun içeriği burada yer alacak. Bu alanda hizmet hakkında detaylı bilgi verilebilir. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    serviceId: 1,
    serviceTitle: "Hizmet 2",
    serviceImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src, Photo1.src],
    serviceContent: "Hizmet 2 kısa içeriği burada yer alacak.",
  },
  {
    serviceId: 2,
    serviceTitle: "Hizmet 3",
    serviceImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src],
  },
  {
    serviceId: 3,
    serviceTitle: "Hizmet 4",
    serviceImages: [Photo1.src, Photo1.src, Photo1.src],
  },
  {
    serviceId: 7,
    serviceTitle: "Hizmet 8",
  },
  {
    serviceId: 8,
    serviceTitle: "Hizmet 9",
  },
  {
    serviceId: 9,
    serviceTitle: "Hizmet 10",
  },
  {
    serviceId: 4,
    serviceTitle: "Hizmet 5",
  },
  {
    serviceId: 5,
    serviceTitle: "Hizmet 6",
  },
  {
    serviceId: 6,
    serviceTitle: "Hizmet 7",
  },
];
// sort
export const sortedServicesData = dummyServicesData.toSorted(
  (a, b) => b.serviceId - a.serviceId
);

// Projects
type dummySingleProjectProps = {
  projectId: number;
  projectTitle: string;
  projectContent?: string;
  projectImages?: string[];
};
type dummyProjectFolderProps = {
  folderId: number;
  folderTitle: string;
  folderImage?: string;
  folderData: dummySingleProjectProps[];
};
const dummyProjectsData: dummyProjectFolderProps[] = [
  {
    folderId: 0,
    folderTitle: "Ahşap Çocuk Oyun Evleri 1",
    folderImage: Photo1.src,
    folderData: [
      {
        projectId: 3,
        projectTitle: "Ahşap Çocuk Oyun Evi 4",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 0,
        projectTitle: "Ahşap Çocuk Oyun Evi 1",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 1,
        projectTitle: "Ahşap Çocuk Oyun Evi 2",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 2,
        projectTitle: "Ahşap Çocuk Oyun Evi 3",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 4,
        projectTitle: "Ahşap Çocuk Oyun Evi 5",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src, Photo1.src],
      },
    ],
  },
  {
    folderId: 6,
    folderTitle: "Ahşap Çocuk Oyun Evleri 7",
    folderImage: Photo1.src,
    folderData: [],
  },
  {
    folderId: 7,
    folderTitle: "Ahşap Çocuk Oyun Evleri 8",
    folderImage: Photo1.src,
    folderData: [
      {
        projectId: 0,
        projectTitle: "Ahşap Çocuk Oyun Evi 1",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 1,
        projectTitle: "Ahşap Çocuk Oyun Evi 2",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 2,
        projectTitle: "Ahşap Çocuk Oyun Evi 3",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 3,
        projectTitle: "Ahşap Çocuk Oyun Evi 4",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 4,
        projectTitle: "Ahşap Çocuk Oyun Evi 5",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 5,
        projectTitle: "Ahşap Çocuk Oyun Evi 6",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 6,
        projectTitle: "Ahşap Çocuk Oyun Evi 7",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 7,
        projectTitle: "Ahşap Çocuk Oyun Evi 8",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 8,
        projectTitle: "Ahşap Çocuk Oyun Evi 9",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 9,
        projectTitle: "Ahşap Çocuk Oyun Evi 10",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 10,
        projectTitle: "Ahşap Çocuk Oyun Evi 11",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 11,
        projectTitle: "Ahşap Çocuk Oyun Evi 12",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 12,
        projectTitle: "Ahşap Çocuk Oyun Evi 13",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 13,
        projectTitle: "Ahşap Çocuk Oyun Evi 14",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
      {
        projectId: 14,
        projectTitle: "Ahşap Çocuk Oyun Evi 15",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [],
      },
    ],
  },
  {
    folderId: 8,
    folderTitle: "Ahşap Çocuk Oyun Evleri 9",
    folderImage: Photo1.src,
    folderData: [
      {
        projectId: 3,
        projectTitle: "Ahşap Çocuk Oyun Evi 4",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 0,
        projectTitle: "Ahşap Çocuk Oyun Evi 1",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 1,
        projectTitle: "Ahşap Çocuk Oyun Evi 2",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 2,
        projectTitle: "Ahşap Çocuk Oyun Evi 3",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 4,
        projectTitle: "Ahşap Çocuk Oyun Evi 5",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src, Photo1.src],
      },
    ],
  },
  {
    folderId: 9,
    folderTitle: "Ahşap Çocuk Oyun Evleri 10",
    folderImage: Photo1.src,
    folderData: [
      {
        projectId: 3,
        projectTitle: "Ahşap Çocuk Oyun Evi 4",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 0,
        projectTitle: "Ahşap Çocuk Oyun Evi 1",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 1,
        projectTitle: "Ahşap Çocuk Oyun Evi 2",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 2,
        projectTitle: "Ahşap Çocuk Oyun Evi 3",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 4,
        projectTitle: "Ahşap Çocuk Oyun Evi 5",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
    ],
  },
  {
    folderId: 1,
    folderTitle: "Ahşap Çocuk Oyun Evleri 2",
    folderImage: Photo1.src,
    folderData: [
      {
        projectId: 3,
        projectTitle: "Ahşap Çocuk Oyun Evi 4",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 0,
        projectTitle: "Ahşap Çocuk Oyun Evi 1",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 1,
        projectTitle: "Ahşap Çocuk Oyun Evi 2",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 2,
        projectTitle: "Ahşap Çocuk Oyun Evi 3",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
          Photo1.src,
        ],
      },
      {
        projectId: 4,
        projectTitle: "Ahşap Çocuk Oyun Evi 5",
        projectContent:
          "Doğadan ilham alarak tasarladığımız ahşap çocuk oyun evleri, çocuklarınız için güvenli, sağlıklı ve eğlenceli bir oyun alanı sunar. Doğal ahşap malzemelerden üretilen bu evler, dayanıklı yapısıyla uzun yıllar kullanılabilirken, çevre dostu özellikleriyle de fark yaratır. Çocuklarınızın hayal gücünü destekleyen özgün tasarımlarımız, onların oyun oynarken hem eğlenmesini hem de gelişimlerine katkı sağlamasını hedefler. Her detayda güvenliği ön planda tutuyor; sağlam yapı, pürüzsüz yüzeyler ve kaliteli işçilikle gönül rahatlığıyla tercih edebileceğiniz ürünler sunuyoruz. İster bahçenizde ister açık alanlarda kullanabileceğiniz ahşap çocuk oyun evlerimiz, doğanın sıcaklığını oyun alanlarına taşırken, çocuklarınıza unutulmaz bir oyun deneyimi yaşatır. Sağlamlık, estetik ve fonksiyonellik bir arada! Çocuklarınız için güvenli bir dünya yaratmak istiyorsanız, bizimle iletişime geçebilirsiniz. İstediğiniz ölçülerde, tasarımlarda evlerinizi oluşturuyoruz.",
        projectImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src, Photo1.src],
      },
    ],
  },
  {
    folderId: 2,
    folderTitle: "Ahşap Çocuk Oyun Evleri 3",
    folderImage: Photo1.src,
    folderData: [],
  },
  {
    folderId: 3,
    folderTitle: "Ahşap Çocuk Oyun Evleri 4",
    folderImage: Photo1.src,
    folderData: [],
  },
  {
    folderId: 4,
    folderTitle: "Ahşap Çocuk Oyun Evleri 5",
    folderImage: Photo1.src,
    folderData: [],
  },
  {
    folderId: 5,
    folderTitle: "Ahşap Çocuk Oyun Evleri 6",
    folderImage: Photo1.src,
    folderData: [],
  },
];
// sort
export const sortedProjectsData = dummyProjectsData.toSorted(
  (a, b) => b.folderId - a.folderId
);
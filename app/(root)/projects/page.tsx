import CardComponent from "@/components/ui/cards/CardComponent";
import Photo1 from "@/public/images/Photo1.webp";

export type dummySingleProjectProps = {
  projectId: number;
  projectTitle: string;
  projectContent?: string;
  projectImages?: string[];
};
export type dummyProjectFolderProps = {
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
export default function ProjectsPage() {
  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
            Projelerimiz
          </h1>
          <h5 className="text-center font-medium tracking-wide text-(--color-primary)">
            Projelerimize buradan ulaşabilirsiniz.
          </h5>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {sortedProjectsData.map((project, index) => (
            <CardComponent
              key={index}
              title={project.folderTitle}
              href={`/projects/${project.folderTitle}`}
              image={project.folderImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

# ZenBlog

ZenBlog, **.NET 9** ve **Angular 19** kullanılarak geliştirilmiş modern bir blog platformudur. Bu proje, endüstri standartlarına uygun, sürdürülebilir ve yüksek performanslı web uygulamaları geliştirme deneyimi kazanmak amacıyla oluşturulmuştur.

---

## Proje Hakkında

ZenBlog, tamamen işlevsel bir blog uygulamasıdır.

- **Backend:** .NET 9  
- **Frontend:** Angular 19  

Proje, modern full-stack geliştirme pratiklerini ve güncel teknolojileri uygulamalı olarak deneyimleme imkânı sunar.

Ayrıca, **Hugging Face AI** kullanılarak kullanıcı yorumlarının duygu durumları analiz edilebilmektedir. Süreç şu şekilde işliyor:

1. Kullanıcı yorum girdiğinde önce **Türkçe yorum İngilizce’ye çevrilir**.  
2. İngilizce yorum, **Hugging Face AI** ile analiz edilir.  
3. Yorum, **pozitif, negatif veya nötr** olarak sınıflandırılır ve veritabanındaki yorum tablosuna kaydedilir.  
4. Dashboard üzerinden toplam olumlu, olumsuz ve nötr yorum sayıları görüntülenebilir.

Bu sayede, gerçek zamanlı duygu analizi ve yorum yönetimi sağlanabilir.

---

## Özellikler

### Backend
- **Onion / Clean Architecture:** Katmanlı mimari ile test edilebilir ve bakımı kolay bir yapı.  
- **Mediator Design Pattern (MediatR):** Uygulama içi komut ve sorgu yönetimi.  
- **RESTful API:** Güvenli ve standartlara uygun API endpoint’leri.  
- **Entity Framework Core:** Profesyonel veritabanı işlemleri.  
- **JWT Authentication & Authorization:** Kullanıcı güvenliği.
- https://github.com/Sinantosun/ZenBlogServer

### Frontend
- **Modern Angular Mimarisi:** Component ve service tabanlı yapı.  
- **Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlarla uyumlu.  
- **Backend API Entegrasyonu:** Sorunsuz veri iletişimi.  
- **Single Page Application (SPA):** Kesintisiz ve akıcı kullanıcı deneyimi.
- https://github.com/Sinantosun/ZenBlogClient

---

<img width="1828" height="904" alt="home01" src="https://github.com/user-attachments/assets/add397a9-0da0-4eab-b150-dfd6479f1fe3" />

<img width="1848" height="918" alt="home02" src="https://github.com/user-attachments/assets/d0d6fa60-afa5-485c-a896-0fd8ced16a91" /><img width="1848" height="918" alt="home06" src="https://github.com/user-attachments/assets/fd290c3b-c627-4048-9dd7-b98c8dbd32a9" />

<img width="1855" height="918" alt="home03" src="https://github.com/user-attachments/assets/ec13ec6d-9c57-4a11-9e93-37051fe2831c" />
<img width="1853" height="918" alt="home04" src="https://github.com/user-attachments/assets/b4a6c947-839a-49e7-81f0-fbc885a5042e" />

<img width="1851" height="918" alt="home05" src="https://github.com/user-attachments/assets/5e2764f7-1b03-4e75-8ef7-1e1916235aa1" />

- **Translate To English** butonuyla yapılan yorum türkçeden ingilizceye HugginFace AI modeli ile çevriliyor.

<img width="1848" height="918" alt="home06" src="https://github.com/user-attachments/assets/be9c1feb-5ca5-471b-9cc9-507a5f7a8ff6" />

## Admin Ekranı
## Dashboard

<img width="1848" height="918" alt="admin01" src="https://github.com/user-attachments/assets/0300936b-7e43-421d-ba94-2ce6b8ce9a72" />

Toplam blog, kullanıcı, okunmayan mesajlar ve kategori sayısı widget üzerinde gösteriliyor. <br>
  
Yorum yapılırken Hugging Face AI ile analiz edilen ve analiz sonucunda çıkan duygu durumları widgetler üzerinde gösteriliyor, analiz sadece tekli yorumlarda geçerlidir alt yorumlar için analiz yapılmıyor. <br>
  
En çok yorum alan blog ve en az yorum alan blogların blog başlıkları widget üzerinde gösteriliyor Her iki durum için de alt yorumlar baz alınmıyor. Eğer hiç yorum almayan blog birden fazlaysa ilk karşılaşılan bloğun başlığı dikkate alınıyor. <br>
  
Okunmayan Son Mesajlar tablo formatında listeleniyor. 

<img width="1848" height="918" alt="admin02" src="https://github.com/user-attachments/assets/5d127028-2436-4a05-932e-e83a7e53d479" />
<img width="1848" height="918" alt="admin03" src="https://github.com/user-attachments/assets/4331765b-768a-4b53-9a9e-ef11a82830c0" />
<img width="1848" height="918" alt="admin04" src="https://github.com/user-attachments/assets/42d9f4c4-8daf-47d0-8033-85dcb071e4b9" />
<img width="1864" height="885" alt="admin07" src="https://github.com/user-attachments/assets/9ff03d43-c550-4179-aa84-2063acacc1fb" />


  




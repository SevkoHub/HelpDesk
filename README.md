# Help Desk Uygulaması

Bu proje, kurum içi destek taleplerinin oluşturulması, listelenmesi ve filtrelenmesi gibi işlemleri gerçekleştiren bir Yardım Masası (Help Desk) uygulamasıdır.


## 🚀 Kurulum ve Çalıştırma Talimatları

### Backend

1. Projeyi bir Java IDE'sinde (IntelliJ, Eclipse vb.) açın.
2. Gerekli bağımlılıkları yüklemek için Maven/Gradle yapısını güncelleyin.
3. `application.properties` dosyasındaki veritabanı yapılandırmalarını kontrol edin. Database url , username ve password ünüzü girin.

# src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/helpdeskdb

spring.datasource.username=your-username

spring.datasource.password=your-password

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.jpa.hibernate.ddl-auto=update

spring.data.rest.base-path=/api

bu şekilde ekleyin. 

> 🛡️ Güvenlik Notu: Gerçek veritabanı kullanıcı adı ve şifre bilgileri `.gitignore` ile gizlenmiştir. Projeyi çalıştırmadan önce `src/main/resources/application.properties` dosyasını kendin oluşturmalı ve veritabanı bilgilerini girmelisin.

  
4. Projeyi çalıştırın (`Spring Boot Application`).

### Frontend

1. `frontend` klasörüne terminalden girin.
2. Gerekli paketleri aşağıdaki komutla yükleyin:
   ```bash
   npm install
3. Uygulamayı başlatın 
   ```bash
   npm start

React + Axios ile filtreleme ve ticket ekleme işlemleri yapılabilir.

🛠 Kullanılan Teknolojiler

Java 18

Spring Boot

Spring Data JPA

Spring Web 

Lombok

Maven 

MySql

React

Axios
 
React Router DOM

Postman for endpoint testing


🎯 Ek Açıklamalar
Ticket oluşturma sonrası liste otomatik yenilenir.

Statü ve öncelik bilgilerine göre filtreleme yapılabilir.

Kod modüler şekilde servis/controller katmanlarına ayrılmıştır.

## 🔍 Kapsam Dahilindeki Açıklamalar

- Backend katmanında RESTful API yapısı kullanılarak `GET`, `POST`, `PUT` istekleriyle tam CRUD desteği sağlanmıştır.
- Ticket oluşturma ve güncelleme işlemlerinde `@PostMapping` ve `@PutMapping` endpoint’leri kullanılmıştır.
- Frontend tarafında Axios ile API'lere bağlanılarak form verisi gönderimi ve listeleme yapılmaktadır.
- Ticket filtreleme özelliği `GET /api/tickets/filter?status=...&priority=...` endpoint’i ile gerçekleştirilir. Statü ve öncelik birlikte veya ayrı ayrı kullanılabilir.
- Yeni bir ticket oluşturulduğunda frontend tarafında liste otomatik olarak yenilenmektedir.
- Proje veritabanı olarak MySQL kullanır, ancak Spring Data JPA ile yapılandırıldığı için farklı veritabanlarına kolaylıkla uyarlanabilir.

## Uygulama Ekran Görüntüleri 

UI - ![image](https://github.com/user-attachments/assets/b2b843da-a66d-4b07-9708-18ea028f5bb9)

-Kullanıcı "Yeni Destek Talebi" ni kullanarak rahatlıkla ticket atabilir. 

-Ticketlarının hepsini görüntüleyebilir, farklı kategorilerle sıralama yapabilir veya filtreleyebilir. 

-İsterse bir ticket'ı detaylıca görüntüleyebilir.

Backend ![image](https://github.com/user-attachments/assets/1cc5613f-794b-4ace-a9d2-e79a030c045f)

-Backend' de GET, PUT, POST, DELETE methodları eklenmiştir. 

-Aynı zamanda MySQL database bağlantısı, Ticket model classı ve table ı da burada eklenmiştir. 

Database ![image](https://github.com/user-attachments/assets/87ee2366-a9f8-47ec-8c56-7e366237ee18)

Testing ![image](https://github.com/user-attachments/assets/4c0cf9b5-ac4f-4d3e-a0ef-3120fe0db9cc)

-Postman üzerinden endpointler test edilmiştir. 


Gelecek Çalışmalar

-Şuanda yoğun olduğum için rol bazlı kullanım (Authorization) eklenmemiştir ancak rahatlıkla eklenebilir. 

-Admin paneli/ekranı eklenebilir. 

-Backend'de remove endpointi eklendi frontend' e remove seçeneği eklenebilir.

-Login/Signup işlemleri (Authentication) eklenebilir.

  











# Gaming Gear Shop - E-Commerce Website

Dự án xây dựng website bán các sản phẩm gaming gear (bàn phím, chuột, tai nghe, màn hình...) với đầy đủ các chức năng thương mại điện tử, bao gồm: đăng ký/đăng nhập người dùng, giỏ hàng, thanh toán, quản lý sản phẩm, đơn hàng, tồn kho, vai trò người dùng, và thống kê.

## Công nghệ sử dụng

### Backend
- Java 17 (LTS)
- Spring Boot
- Spring Security (phân quyền, xác thực)
- Spring Data JPA (tương tác cơ sở dữ liệu)
- Hibernate
- MySQL
- JWT (JSON Web Token)
- Maven

### Frontend
- ReactJS
- React Router
- TailwindCSS

## ⚙️ Cài đặt & chạy dự án

### 📦 Backend (Spring Boot)

1. **Cài đặt**
   - Java 17+
   - Maven
   - MySQL

2. **Cập nhật file application.yml**:

spring.datasource.url=jdbc:mysql://localhost:3306/gaming_gear_shop
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=updated

**đổi các url , usernam, password tương ứng với thiết lập trên máy của bạn**

3. **Chạy backend**
mvn spring-boot:run

### 📦 Frontend
1.  **Cài đặt NodeJS**
2. **Cài Đặt dependency**
npm install
3. **Chạy Frontend**
npm run dev

**Account admin**
username: thophan357@gmail.com
password: admin

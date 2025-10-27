-- إنشاء قاعدة البيانات
CREATE DATABASE chalet_system;
USE chalet_system;

-- 1. جدول الملاك
CREATE TABLE owners (
    owner_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. جدول المستخدمين
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. جدول الشاليهات
CREATE TABLE chalets (
    chalet_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    name VARCHAR(100),
    location VARCHAR(255),
    price_per_night DECIMAL(10,2),
    description TEXT,
    status ENUM('available','unavailable') DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
);

-- 4. جدول الصور الخاصة بكل شاليه
CREATE TABLE chalet_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    chalet_id INT,
    image_url VARCHAR(255),
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id)
);

-- 5. جدول لوحة تحكم المالك
CREATE TABLE owner_dashboard (
    dashboard_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    total_chalets INT DEFAULT 0,
    total_bookings INT DEFAULT 0,
    total_income DECIMAL(10,2) DEFAULT 0.00,
    last_login DATETIME,
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
);

-- 6. جدول حجوزات المواقع
CREATE TABLE site_bookings (
    site_booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    chalet_id INT,
    booking_date DATETIME,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id)
);

-- 7. جدول الحجوزات الفعلية
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    chalet_id INT,
    check_in DATE,
    check_out DATE,
    total_price DECIMAL(10,2),
    payment_status ENUM('unpaid','paid','refunded') DEFAULT 'unpaid',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id)
);

-- 8. جدول التحليلات
CREATE TABLE analytics (
    analytics_id INT PRIMARY KEY AUTO_INCREMENT,
    chalet_id INT,
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    inquiries INT DEFAULT 0,
    report_date DATE,
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id)
);

-- 9. جدول الأرباح
CREATE TABLE earnings (
    earning_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    chalet_id INT,
    amount DECIMAL(10,2),
    payout_status ENUM('pending', 'paid') DEFAULT 'pending',
    payout_date DATE,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id)
);

-- 10. جدول الإعدادات
CREATE TABLE settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    language_preference VARCHAR(10) DEFAULT 'en',
    theme_preference VARCHAR(10) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
);

-- 11. جدول الدعم الفني
CREATE TABLE help_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    subject VARCHAR(150),
    message TEXT,
    status ENUM('open', 'resolved', 'closed') DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 12. جدول التقييمات
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    chalet_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 13. جدول المرافق
CREATE TABLE amenities (
    amenity_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    icon VARCHAR(50)
);

-- 14. جدول ربط الشاليهات بالمرافق
CREATE TABLE chalet_amenities (
    chalet_id INT,
    amenity_id INT,
    PRIMARY KEY (chalet_id, amenity_id),
    FOREIGN KEY (chalet_id) REFERENCES chalets(chalet_id),
    FOREIGN KEY (amenity_id) REFERENCES amenities(amenity_id)
);

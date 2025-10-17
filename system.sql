
CREATE database chalet_system;
use chalet_system;
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

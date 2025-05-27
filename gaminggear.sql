-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 27, 2025 lúc 11:32 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `gaminggear`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'Brand name, e.g., Apple, Samsung, Sony',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Asus', '2025-05-27 14:55:09', NULL),
(2, 'Acer', '2025-05-27 14:55:09', NULL),
(3, 'Logitech', '2025-05-27 14:55:09', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `price` float NOT NULL CHECK (`price` >= 0),
  `total_price` float NOT NULL CHECK (`total_price` >= 0),
  `added_at` datetime DEFAULT current_timestamp(),
  `is_selected` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT 'category name, ex: headphone, keyboard ...'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'mouse'),
(2, 'keyboard'),
(3, 'headphone');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `headphone_specs`
--

CREATE TABLE `headphone_specs` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `battery` varchar(50) DEFAULT NULL,
  `warranty` varchar(50) DEFAULT NULL,
  `connection_type` varchar(50) DEFAULT NULL,
  `has_mic` tinyint(1) DEFAULT NULL,
  `noise_cancelling` tinyint(1) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `headphone_specs`
--

INSERT INTO `headphone_specs` (`id`, `product_id`, `battery`, `warranty`, `connection_type`, `has_mic`, `noise_cancelling`, `weight`, `color`) VALUES
(1, 27, '1301 mAh', '3 years', ' wired', 0, 0, 322, 'blue');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `transaction_type` enum('import','export') NOT NULL,
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  `transaction_date` datetime DEFAULT current_timestamp(),
  `product_name` varchar(100) DEFAULT NULL,
  `import_price` double DEFAULT 0,
  `sell_price` double DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `inventory`
--

INSERT INTO `inventory` (`id`, `product_id`, `transaction_type`, `quantity`, `transaction_date`, `product_name`, `import_price`, `sell_price`) VALUES
(1, 2, 'import', 25, '2025-05-27 00:00:00', 'Chuột Logitech G102 LightSync', 420000, 0),
(2, 1, 'import', 27, '2025-05-27 00:00:00', 'Chuột Logitech M170', 210000, 0),
(3, 3, 'import', 21, '2025-05-27 00:00:00', 'Chuột Logitech M331 Silent Plus', 320000, 0),
(4, 4, 'import', 4, '2025-05-27 00:00:00', ' Chuột Logitech MX Master 3S', 2190000, 0),
(5, 5, 'import', 50, '2025-05-27 00:00:00', 'Chuột Logitech Pebble M350', 450000, 0),
(6, 6, 'import', 5, '2025-05-27 00:00:00', 'Chuột Logitech G Pro X Superlight', 2700000, 0),
(7, 7, 'import', 28, '2025-05-27 00:00:00', 'Chuột Logitech B100', 100000, 0),
(8, 8, 'import', 19, '2025-05-27 00:00:00', 'Chuột Logitech M185', 250000, 0),
(9, 9, 'import', 12, '2025-05-27 00:00:00', 'Chuột Logitech MX Anywhere 3', 1600000, 0),
(10, 10, 'import', 8, '2025-05-27 00:00:00', 'Chuột Logitech MX Anywhere 2', 1600000, 0),
(11, 11, 'import', 16, '2025-05-27 00:00:00', 'Chuột Logitech G403 Hero', 800000, 0),
(12, 12, 'import', 12, '2025-05-27 00:00:00', 'Bàn phím Logitech K380', 700000, 0),
(13, 13, 'import', 20, '2025-05-27 00:00:00', 'Bàn phím Logitech MX Keys', 2250000, 0),
(14, 14, 'import', 5, '2025-05-27 00:00:00', 'Bàn phím Logitech K120', 225000, 0),
(15, 15, 'import', 22, '2025-05-27 00:00:00', 'Bàn phím Logitech G213 Prodigy', 1100000, 0),
(16, 16, 'import', 30, '2025-05-27 00:00:00', 'Bàn phím Logitech K480', 820000, 0),
(17, 17, 'import', 11, '2025-05-27 00:00:00', 'Bàn phím Acer KM501', 300000, 0),
(18, 18, 'import', 29, '2025-05-27 00:00:00', 'Bàn phím Acer Predator Aethon 500', 2700000, 0),
(19, 20, 'import', 2, '2025-05-27 00:00:00', 'Bàn phím Acer Slim Touch', 270000, 0),
(20, 21, 'import', 3, '2025-05-27 00:00:00', 'Bàn phím Acer Gaming KB810', 870000, 0),
(21, 21, 'import', 7, '2025-05-27 00:00:00', 'Bàn phím Acer Gaming KB810', 870000, 0),
(22, 22, 'import', 15, '2025-05-27 00:00:00', ' Bàn phím ASUS TUF Gaming K1', 1050000, 0),
(23, 23, 'import', 12, '2025-05-27 00:00:00', 'Bàn phím ASUS ROG Strix Scope', 2150000, 0),
(24, 24, 'import', 22, '2025-05-27 00:00:00', 'Bàn phím ASUS Wireless KW100', 450000, 0),
(25, 25, 'import', 20, '2025-05-27 00:00:00', 'Bàn phím ASUS ROG Falchion', 2250000, 0),
(26, 26, 'import', 5, '2025-05-27 00:00:00', 'Bàn phím ASUS Cerberus Mech RGB', 1750000, 0),
(27, 27, 'import', 25, '2025-05-27 00:00:00', 'Tai nghe Logitech G Series 291', 715000, 0),
(28, 7, 'export', 2, '2025-05-27 00:00:00', 'Chuột Logitech B100', 0, 150000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `keyboard_specs`
--

CREATE TABLE `keyboard_specs` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `battery` varchar(50) DEFAULT NULL,
  `warranty` varchar(50) DEFAULT NULL,
  `connection_type` varchar(50) DEFAULT NULL,
  `num_keys` int(11) DEFAULT NULL,
  `switch_type` varchar(50) DEFAULT NULL,
  `led` tinyint(1) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `keyboard_specs`
--

INSERT INTO `keyboard_specs` (`id`, `product_id`, `battery`, `warranty`, `connection_type`, `num_keys`, `switch_type`, `led`, `weight`, `color`) VALUES
(1, 12, '1000 mAh', '2 years', 'Wireless', 79, 'Membrane', 0, 423, 'Đen'),
(2, 13, '1500 mAh', '3 years', ' Wireless + Bluetooth', 108, 'Scissor', 1, 810, 'Xám không gian'),
(3, 14, 'Không dùng pin', '1 year', 'Wired', 104, 'Membrane', 0, 550, 'Đen'),
(4, 15, 'Không dùng pin', '2 years', 'Wired', 104, 'Mech-Dome', 1, 1000, 'Đen'),
(5, 16, '1000 mAh', '2 years', ' Wireless', 79, 'Membrane', 0, 820, 'Trắng'),
(6, 17, 'Không dùng pin', '1 year', 'Wired', 104, 'Membrane', 0, 480, 'Đen'),
(7, 18, 'Không dùng pin', ' 3 years', 'Wired', 104, 'Kailh Blue', 1, 1200, 'Đen xanh'),
(8, 19, '1000 mAh', '1 year', 'Wireless', 104, 'red', 0, 600, 'Trắng'),
(9, 20, 'Không dùng pin', '1 year', 'Wired', 104, 'Membrane', 0, 450, 'Đen'),
(10, 21, 'Không dùng pin', '2 years', 'Wired', 104, 'Blue switch', 1, 890, 'Đen đỏ'),
(11, 22, 'Không dùng pin', '2 years', 'Wired', 104, 'Tactile Membrane', 1, 950, 'Đen'),
(12, 23, 'Không dùng pin', '3 years', 'Wired', 87, 'Cherry MX Red', 1, 900, 'Đen bạc'),
(13, 24, '1000 mAh', ' 1 year', 'Wireless', 104, 'Membrane', 0, 500, 'Trắng'),
(14, 25, '1500 mAh', '2 years', 'Wireless + USB', 68, ' Cherry MX RGB Red', 1, 600, 'Đen'),
(15, 26, 'Không dùng pin', '2 years', 'Wired', 104, 'Kaihua Red', 1, 1050, 'Đen');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mouse_specs`
--

CREATE TABLE `mouse_specs` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `battery` varchar(50) DEFAULT NULL,
  `warranty` varchar(50) DEFAULT NULL,
  `max_dpi` int(11) DEFAULT NULL,
  `connection_type` varchar(50) DEFAULT NULL,
  `led` tinyint(1) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `mouse_specs`
--

INSERT INTO `mouse_specs` (`id`, `product_id`, `battery`, `warranty`, `max_dpi`, `connection_type`, `led`, `weight`, `color`) VALUES
(1, 1, '1000 mAh', '1 year', 1000, 'Wireless', 0, 70, 'Black'),
(2, 2, 'Không dùng pin (có dây)', '2 years', 8000, 'Wired', 1, 85, 'White'),
(3, 3, '1000 mAh', '3 years', 1000, 'Wireless', 0, 75, 'Red'),
(4, 4, '2000 mAh', '3 years', 8000, 'Wireless + Bluetooth', 1, 141, 'Graphite'),
(5, 5, '1000 mAh', '1 year', 1000, 'Wireless + Bluetooth', 0, 76, 'Pink'),
(6, 6, '1500 mAh', '2 years', 25600, 'Wireless', 1, 63, 'White'),
(7, 7, 'Không dùng pin', '1 year', 800, 'Wired', 0, 85, 'Đen'),
(8, 8, '1000 mAh', '1 year', 1000, 'Wireless', 0, 75, 'Grey'),
(9, 9, '1200 mAh', ' 2 years', 4000, 'Wireless + Bluetooth', 0, 99, 'Rose'),
(10, 10, '1200 mAh', ' 2 years', 4000, 'Wireless + Bluetooth', 0, 99, 'Rose'),
(11, 11, 'Không dùng pin (có dây)', '2 years', 25600, 'Wired', 1, 87, 'Black');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT '',
  `email` varchar(100) DEFAULT '',
  `phone_number` varchar(10) NOT NULL,
  `address` varchar(200) NOT NULL,
  `note` varchar(100) DEFAULT '',
  `order_date` datetime DEFAULT current_timestamp(),
  `total_money` float DEFAULT NULL CHECK (`total_money` >= 0),
  `payment_method` varchar(100) DEFAULT 'cash',
  `shipping_method` varchar(100) DEFAULT NULL,
  `shipping_address` varchar(200) DEFAULT NULL,
  `shipping_date` date DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `number_of_products` int(11) NOT NULL CHECK (`number_of_products` > 0),
  `price` float NOT NULL CHECK (`price` >= 0),
  `total_money` float DEFAULT NULL CHECK (`total_money` >= 0),
  `color` varchar(20) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(350) NOT NULL DEFAULT '' COMMENT 'product name',
  `price` float NOT NULL CHECK (`price` >= 0),
  `thumbnail` varchar(300) DEFAULT '',
  `description` longtext DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `headphone_specs_id` int(11) DEFAULT NULL,
  `keyboard_specs_id` int(11) DEFAULT NULL,
  `mouse_specs_id` int(11) DEFAULT NULL,
  `discount_percent` float DEFAULT NULL,
  `origin_price` double DEFAULT NULL,
  `description_2` text DEFAULT NULL,
  `description_3` text DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`, `stock_quantity`, `brand_id`, `headphone_specs_id`, `keyboard_specs_id`, `mouse_specs_id`, `discount_percent`, `origin_price`, `description_2`, `description_3`, `is_active`) VALUES
(1, 'Chuột Logitech M170', 250000, '469039a3-5ee2-4550-9985-674a12ba291a_31.jpg', 'Thiết kế đơn giản, dễ sử dụng', '2025-05-27 14:58:33', '2025-05-27 16:11:14', 1, 27, 3, NULL, NULL, 1, NULL, 210000, 'Kết nối không dây ổn định', 'Phù hợp cho cả văn phòng và học tập', NULL),
(2, 'Chuột Logitech G102 LightSync', 490000, '2ee7618e-0265-4e37-aaff-253eba015266_34.jpg', 'Chuột gaming RGB siêu nhạy', '2025-05-27 15:02:26', '2025-05-27 16:10:54', 1, 25, 3, NULL, NULL, 2, NULL, 420000, 'Đèn led đổi màu 16.8 triệu sắc', 'DPI lên đến 8000, cực nhạy khi chơi game', NULL),
(3, 'Chuột Logitech M331 Silent Plus', 350000, 'b5d98108-cf94-4561-b590-be87b7e6b534_37.jpg', 'Nhấp chuột êm ái không gây tiếng động', '2025-05-27 15:04:04', '2025-05-27 16:11:26', 1, 21, 3, NULL, NULL, 3, NULL, 320000, 'Thiết kế công thái học', 'Tiết kiệm pin, dùng lâu dài', NULL),
(4, ' Chuột Logitech MX Master 3S', 2490000, 'd64960b4-4939-461e-9eab-26279df4e725_43.jpg', 'Chuột cao cấp dành cho dân thiết kế', '2025-05-27 15:07:25', '2025-05-27 16:11:39', 1, 4, 3, NULL, NULL, 4, NULL, 2190000, 'Cuộn siêu nhanh, điều khiển nhiều thiết bị', 'Tùy chỉnh nút theo ứng dụng', NULL),
(5, 'Chuột Logitech Pebble M350', 500000, '03bee4ab-2acd-4d0b-95e4-7118c26861b9_40.jpg', 'Thiết kế nhỏ gọn, hiện đại', '2025-05-27 15:12:01', '2025-05-27 16:11:52', 1, 50, 3, NULL, NULL, 5, NULL, 450000, 'Kết nối kép Bluetooth + USB', 'Thao tác êm ái, không tiếng ồn', NULL),
(6, 'Chuột Logitech G Pro X Superlight', 3000000, '61a4c45c-33c8-4d81-84cc-90c11ff10ce0_49.png', 'Chuột siêu nhẹ cho game thủ chuyên nghiệp', '2025-05-27 15:13:58', '2025-05-27 16:12:02', 1, 5, 3, NULL, NULL, 6, NULL, 2700000, 'Không dây, phản hồi cực nhanh', 'Cảm biến HERO độc quyền', NULL),
(7, 'Chuột Logitech B100', 150000, '46f60c5f-0107-44f5-aaae-5b0068bcb6a8_61.jpg', 'Chuột đơn giản, bền bỉ', '2025-05-27 15:15:26', '2025-05-27 16:19:11', 1, 26, 3, NULL, NULL, 7, NULL, 100000, 'Cắm vào là dùng, không cần cài đặt', 'Phù hợp học sinh, sinh viên', NULL),
(8, 'Chuột Logitech M185', 300000, 'fc76eabd-dad9-4369-abcc-5073a1c7528c_52.jpg', 'Kết nối ổn định với nano receiver', '2025-05-27 15:16:42', '2025-05-27 16:12:27', 1, 19, 3, NULL, NULL, 8, NULL, 250000, 'Tương thích tốt với mọi hệ điều hành', 'Thiết kế nhỏ gọn, dễ mang theo', NULL),
(9, 'Chuột Logitech MX Anywhere 3', 1800000, '', 'Chuột di động cao cấp, nhỏ gọn', '2025-05-27 15:17:56', '2025-05-27 16:12:38', 1, 12, 3, NULL, NULL, 9, NULL, 1600000, ' Kết nối nhiều thiết bị qua Bluetooth', 'Tương thích Windows/macOS', NULL),
(10, 'Chuột Logitech MX Anywhere 2', 1800000, '501e766a-ad75-41ed-a9af-5e6317cfd905_55.jpg', 'Chuột di động cao cấp, nhỏ gọn', '2025-05-27 15:18:55', '2025-05-27 16:12:51', 1, 8, 3, NULL, NULL, 10, NULL, 1600000, ' Kết nối nhiều thiết bị qua Bluetooth', 'Tương thích Windows/macOS', NULL),
(11, 'Chuột Logitech G403 Hero', 1000000, '1914b3f2-0e48-48ae-a8e1-3fa4cfe1989c_58.jpg', 'Chuột gaming hiệu suất cao', '2025-05-27 15:20:52', '2025-05-27 16:13:05', 1, 16, 3, NULL, NULL, 11, NULL, 800000, 'Cảm biến HERO 25K siêu chính xác', 'Có đèn LED RGB', NULL),
(12, 'Bàn phím Logitech K380', 800000, 'e82b386d-b2b8-4e8d-b6c4-7e53491fd6e2_12.webp', 'Thiết kế nhỏ gọn, dễ mang theo', '2025-05-27 15:41:06', '2025-05-27 16:13:50', 2, 12, 3, NULL, 1, NULL, NULL, 700000, 'Kết nối 3 thiết bị cùng lúc qua Bluetooth', 'Tương thích Windows, macOS, Android', NULL),
(13, 'Bàn phím Logitech MX Keys', 2500000, '0edc3b72-20ac-49a2-9815-7c317f672c9f_1.webp', 'Bàn phím cao cấp với đèn nền', '2025-05-27 15:42:48', '2025-05-27 16:14:01', 2, 20, 3, NULL, 2, NULL, NULL, 2250000, 'Cảm giác gõ êm ái, chuyên nghiệp', ' Tích hợp cảm biến ánh sáng', NULL),
(14, 'Bàn phím Logitech K120', 300000, 'd4e6ed03-c526-454a-b70b-7c20220a7cd3_4.jpg', 'Bàn phím giá rẻ, chất lượng tốt', '2025-05-27 15:44:18', '2025-05-27 16:14:12', 2, 5, 3, NULL, 3, NULL, NULL, 225000, 'Thiết kế tiêu chuẩn fullsize', 'Phù hợp cho văn phòng, học tập', NULL),
(15, 'Bàn phím Logitech G213 Prodigy', 1300000, '6634f585-0930-452d-9ca1-82c29455f607_7.jpg', 'Bàn phím gaming RGB chống nước', '2025-05-27 15:45:48', '2025-05-27 16:14:25', 2, 22, 3, NULL, 4, NULL, NULL, 1100000, 'Gõ nhanh, nhạy, thiết kế game thủ', 'Tùy chỉnh led theo vùng', NULL),
(16, 'Bàn phím Logitech K480', 900000, 'f32c7fcc-3cb1-40c9-97f9-ce04c3d1c2d8_10.jpg', 'Hỗ trợ giá đỡ điện thoại/tablet', '2025-05-27 15:47:44', '2025-05-27 16:14:35', 2, 30, 3, NULL, 5, NULL, NULL, 820000, 'Kết nối 3 thiết bị, chuyển đổi dễ dàng', 'Thiết kế độc đáo, bền bỉ', NULL),
(17, 'Bàn phím Acer KM501', 350000, 'e85df52c-478f-4a28-888b-671dd6f285f1_13.webp', 'Bàn phím văn phòng tiêu chuẩn', '2025-05-27 15:49:07', '2025-05-27 16:14:46', 2, 11, 2, NULL, 6, NULL, NULL, 300000, 'Thiết kế mỏng, gõ êm', 'Dễ dàng làm quen, bền bỉ', NULL),
(18, 'Bàn phím Acer Predator Aethon 500', 3000000, 'df44bd42-d616-4cf1-ac08-20feeda92e00_19.png', 'Bàn phím cơ gaming RGB cao cấp', '2025-05-27 15:50:46', '2025-05-27 16:14:57', 2, 29, 2, NULL, 7, NULL, NULL, 2700000, 'Keycap đôi, anti-ghosting toàn phần', 'Switch siêu bền, lên đến 70 triệu lần bấm', NULL),
(19, 'Bàn phím Acer Wireless K10', 400000, '1585e2b0-2399-4260-bff4-3ec210bf76be_3.webp', 'Bàn phím không dây nhỏ gọn', '2025-05-27 15:52:06', '2025-05-27 15:52:07', 2, 0, 2, NULL, 8, NULL, NULL, 350000, 'Pin lâu, kết nối ổn định', 'Phù hợp văn phòng', NULL),
(20, 'Bàn phím Acer Slim Touch', 300000, 'da0acbbd-5e09-420d-9885-9cdd443d1c6d_13.webp', 'Gõ nhẹ, êm, độ bền cao', '2025-05-27 15:53:31', '2025-05-27 16:15:05', 2, 2, 2, NULL, 9, NULL, NULL, 270000, 'Phím thấp chống mỏi tay', 'Thiết kế hiện đại, tối giản', NULL),
(21, 'Bàn phím Acer Gaming KB810', 930000, 'd2520da2-f450-4082-8d26-3d29c268e039_18.jpg', 'Bàn phím chơi game tầm trung', '2025-05-27 15:55:06', '2025-05-27 16:15:40', 2, 10, 2, NULL, 10, NULL, NULL, 870000, ' Có đèn nền nhiều màu', 'Phím nhạy, tuổi thọ cao', NULL),
(22, ' Bàn phím ASUS TUF Gaming K1', 1299000, 'c581294c-46cd-400e-9667-c8ec305cec6b_23.jpg', 'Bàn phím giả cơ RGB bền bỉ', '2025-05-27 15:57:52', '2025-05-27 16:16:14', 2, 15, 1, NULL, 11, NULL, NULL, 1050000, 'Thiết kế chống nước', 'Dành cho game thủ phổ thông', NULL),
(23, 'Bàn phím ASUS ROG Strix Scope', 2399000, '9c911a4c-d6c7-4efb-83bb-5bd1711a37a2_19.png', ' Bàn phím cơ gaming chuyên nghiệp', '2025-05-27 15:59:32', '2025-05-27 16:16:24', 2, 12, 1, NULL, 12, NULL, NULL, 2150000, 'Thiết kế Tenkeyless linh hoạt', 'Keycap chất lượng, LED RGB từng phím', NULL),
(24, 'Bàn phím ASUS Wireless KW100', 550000, 'b77a372d-bae0-4f19-ab33-7074afd2f77a_25.png', 'Thiết kế đơn giản, không dây', '2025-05-27 16:00:54', '2025-05-27 16:16:37', 2, 22, 1, NULL, 13, NULL, NULL, 450000, 'Dễ sử dụng, pin lâu', 'Tương thích nhiều thiết bị', NULL),
(25, 'Bàn phím ASUS ROG Falchion', 2800000, '753fd70a-6c96-43ab-b12b-b3c1286e31fe_28.png', ' Bàn phím không dây 65%', '2025-05-27 16:02:16', '2025-05-27 16:16:48', 2, 20, 1, NULL, 14, NULL, NULL, 2250000, 'Có touch panel điều khiển', 'Đèn RGB Aura Sync cực đẹp', NULL),
(26, 'Bàn phím ASUS Cerberus Mech RGB', 2000000, 'f04e3430-8509-430b-bef7-fffe5110962b_13.webp', 'Bàn phím cơ với switch Kaihua', '2025-05-27 16:03:50', '2025-05-27 16:16:57', 2, 5, 1, NULL, 15, NULL, NULL, 1750000, 'Chống tràn, khung kim loại', 'Phím đa phương tiện tiện lợi', NULL),
(27, 'Tai nghe Logitech G Series 291', 999999, '5261c612-72aa-4324-a126-d2838b5d52e1_88.jpg', 'Tai nghe chất lượng cao', '2025-05-27 16:07:16', '2025-05-27 16:17:07', 3, 25, 3, 1, NULL, NULL, NULL, 715000, 'Âm thanh sống động', 'Thiết kế thời trang', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `image_url` varchar(300) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
(1, 1, '469039a3-5ee2-4550-9985-674a12ba291a_31.jpg'),
(2, 1, '7e76d8b8-ebc0-4e3e-b721-b73a9bbd61e2_32.jpg'),
(3, 1, 'f7079d3f-7eaf-496e-82a1-2ce9ad0f8748_33.jpg'),
(4, 2, '2ee7618e-0265-4e37-aaff-253eba015266_34.jpg'),
(5, 2, '29fc9e5d-2d49-4903-a49e-ebf3daa1a625_35.jpg'),
(6, 2, '83535f24-c463-41e6-a7f4-a73b08bd57c3_36.jpg'),
(7, 3, 'b5d98108-cf94-4561-b590-be87b7e6b534_37.jpg'),
(8, 3, '732cbd09-7146-4641-a971-92e95936108c_38.jpg'),
(9, 3, 'e4cadc3d-b32f-4fbf-a2af-f3bcaa86b093_39.jpg'),
(10, 4, 'd64960b4-4939-461e-9eab-26279df4e725_43.jpg'),
(11, 4, 'b94ace98-c5b4-4adc-a987-088b580aa76b_44.jpg'),
(12, 4, '00a77a34-decf-43a4-ae06-7de5b3365289_45.jpg'),
(13, 5, '03bee4ab-2acd-4d0b-95e4-7118c26861b9_40.jpg'),
(14, 5, 'ac398a98-a1f0-4560-97bc-51e2cb0f3c5f_41.jpg'),
(15, 5, '181a9df3-5497-4e40-8a1f-2ca2c0453a37_42.jpg'),
(16, 6, '61a4c45c-33c8-4d81-84cc-90c11ff10ce0_49.png'),
(17, 6, '3d7ff5aa-233b-4084-ba50-c134486a4493_50.png'),
(18, 6, '84608d0b-bed6-4a4f-9fe4-471db5df2abf_51.jpg'),
(19, 7, '46f60c5f-0107-44f5-aaae-5b0068bcb6a8_61.jpg'),
(20, 7, 'c9d2a21f-5046-4e4b-a573-24bf81062188_62.jpg'),
(21, 7, '5a89e00f-fad2-4363-951c-b791cb0c1ccb_63.jpg'),
(22, 8, 'fc76eabd-dad9-4369-abcc-5073a1c7528c_52.jpg'),
(23, 8, '116afaa4-8bf7-4b00-bd34-2016e0c92cd3_53.jpg'),
(24, 8, '549aa459-673e-4498-8333-114d439cb94b_54.jpg'),
(25, 10, '501e766a-ad75-41ed-a9af-5e6317cfd905_55.jpg'),
(26, 10, '6ec06908-d9a2-44cf-bcad-5e5ade03482b_56.png'),
(27, 10, '35409340-e858-4e05-8038-d39ab9bf61b0_57.png'),
(28, 11, '1914b3f2-0e48-48ae-a8e1-3fa4cfe1989c_58.jpg'),
(29, 11, '0abbe7bc-ab53-420e-aa66-8854f35b0bd9_59.jpg'),
(30, 11, 'c42d6d01-b1fb-4ac1-8082-59ed9e57345e_60.jpg'),
(31, 12, 'e82b386d-b2b8-4e8d-b6c4-7e53491fd6e2_12.webp'),
(32, 12, 'd1dd0ae7-953c-4cdc-85b8-3863870b2aeb_13.webp'),
(33, 12, '9bc30e47-f1eb-42de-ab45-f6d2bab6ca5e_14.webp'),
(34, 13, '0edc3b72-20ac-49a2-9815-7c317f672c9f_1.webp'),
(35, 13, '773f262c-beba-4a43-b8c6-9ac46fe1fdde_2.webp'),
(36, 13, '7a17ffb4-f382-490c-9d18-5b1e1100592f_3.webp'),
(37, 14, 'd4e6ed03-c526-454a-b70b-7c20220a7cd3_4.jpg'),
(38, 14, '0b31d409-9a2c-4637-b549-82fd16467e3c_5.jpg'),
(39, 14, '1fb7c7f7-bf75-4f6a-9a7f-60c9b62ea720_6.jpg'),
(40, 15, '6634f585-0930-452d-9ca1-82c29455f607_7.jpg'),
(41, 15, '123dfeeb-d96e-47c7-942f-0c915940bac5_8.jpg'),
(42, 15, '4c0450a4-a15c-4376-935a-b817249fe1df_9.jpg'),
(43, 16, 'f32c7fcc-3cb1-40c9-97f9-ce04c3d1c2d8_10.jpg'),
(44, 16, '7648660f-4f0f-4d58-959b-42684a8359e0_11.png'),
(45, 16, '6df76706-23b7-47e1-8f52-e4ec976d9e90_12.webp'),
(46, 17, 'e85df52c-478f-4a28-888b-671dd6f285f1_13.webp'),
(47, 17, '25807297-e812-4782-a6e5-e0695ac3a066_14.webp'),
(48, 17, '0943012e-ca59-4c09-bff0-5ad32c65dc00_15.webp'),
(49, 18, 'df44bd42-d616-4cf1-ac08-20feeda92e00_19.png'),
(50, 18, '52687ff7-1976-4997-9647-4786f9285131_20.png'),
(51, 18, '4fc9691d-d1cd-4617-9e44-32aec9180129_21.jpg'),
(52, 19, '1585e2b0-2399-4260-bff4-3ec210bf76be_3.webp'),
(53, 19, '6d4ad6d2-edca-44f9-a130-848687b0c59e_4.jpg'),
(54, 19, 'd15ee046-0ae9-4466-8686-1c20921fed96_5.jpg'),
(55, 20, 'da0acbbd-5e09-420d-9885-9cdd443d1c6d_13.webp'),
(56, 20, '1901897a-c7a3-4286-9304-900d193161e4_14.webp'),
(57, 20, 'ec253719-d07c-4dc3-9ff5-f5a4f5812d00_15.webp'),
(58, 21, 'd2520da2-f450-4082-8d26-3d29c268e039_18.jpg'),
(59, 21, '333547e9-5c3b-42ce-9873-4dbd7c0750e3_19.png'),
(60, 21, '1f76cfc0-e922-4774-ae61-f1562b9bcf3b_20.png'),
(61, 22, 'c581294c-46cd-400e-9667-c8ec305cec6b_23.jpg'),
(62, 22, '58310b04-30cc-4c21-8af6-944069b5bb5c_24.jpg'),
(63, 22, '5dae0abb-21b3-4473-b40a-0fa4d05d3d1a_25.png'),
(64, 23, '9c911a4c-d6c7-4efb-83bb-5bd1711a37a2_19.png'),
(65, 23, 'ad1b1013-5dfd-4a3d-a94e-db650438334e_20.png'),
(66, 23, '17d87c98-259f-48e2-94e3-107c27451bde_21.jpg'),
(67, 24, 'b77a372d-bae0-4f19-ab33-7074afd2f77a_25.png'),
(68, 24, '1bc3459d-8ab6-4e6c-994a-f91214f694ab_26.png'),
(69, 24, '5770637b-2f48-4f40-b102-8a967016c80c_27.png'),
(70, 25, '753fd70a-6c96-43ab-b12b-b3c1286e31fe_28.png'),
(71, 25, '3d3917e6-e02b-4345-9d3b-f8df73921d16_29.png'),
(72, 25, '79d9abd6-88cd-43ab-b0ac-b5cbea41daa0_30.png'),
(73, 26, 'f04e3430-8509-430b-bef7-fffe5110962b_13.webp'),
(74, 26, '3d2edbd6-0c7d-48c8-844f-33ddf3e583d0_14.webp'),
(75, 26, '3625cd11-0a7d-4d6e-9a01-cd3f3c5507bb_15.webp'),
(76, 27, '5261c612-72aa-4324-a126-d2838b5d52e1_88.jpg'),
(77, 27, 'ddbae8ca-28b0-4cb6-b17a-ed78b1e9735c_89.jpg'),
(78, 27, '0c519336-6ec2-4c71-932f-5227e4e5670b_90.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `thumbnail` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion_products`
--

CREATE TABLE `promotion_products` (
  `id` bigint(20) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `promotion_id` bigint(20) DEFAULT NULL,
  `discount_percent` decimal(5,2) DEFAULT NULL CHECK (`discount_percent` >= 0 and `discount_percent` <= 100),
  `is_active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'employee');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `social_accounts`
--

CREATE TABLE `social_accounts` (
  `id` int(11) NOT NULL,
  `provider` varchar(20) NOT NULL COMMENT 'social network name',
  `provider_id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL COMMENT 'social email',
  `name` varchar(100) NOT NULL COMMENT 'user name',
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `token_type` varchar(50) NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expired` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT '',
  `phone_number` varchar(10) NOT NULL,
  `address` varchar(200) DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `date_of_birth` date DEFAULT NULL,
  `facebook_account_id` int(11) DEFAULT 0,
  `google_account_id` int(11) DEFAULT 0,
  `role_id` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullname`, `phone_number`, `address`, `password`, `created_at`, `updated_at`, `is_active`, `date_of_birth`, `facebook_account_id`, `google_account_id`, `role_id`, `email`) VALUES
(1, 'Admin', '0000000001', 'admin', '$2a$10$2z7GvuSHNDF3pPCvQd6dbeOHOoSDISpow9fs/RRN0w.6PHjHt6w3W', '2025-05-27 14:41:14', '2025-05-27 14:41:14', 1, '2025-05-27', 0, 0, 1, 'thophan357@gmail.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `headphone_specs`
--
ALTER TABLE `headphone_specs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `keyboard_specs`
--
ALTER TABLE `keyboard_specs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `mouse_specs`
--
ALTER TABLE `mouse_specs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `headphone_specs_id` (`headphone_specs_id`),
  ADD KEY `keyboard_specs_id` (`keyboard_specs_id`),
  ADD KEY `mouse_specs_id` (`mouse_specs_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_images_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `promotion_products`
--
ALTER TABLE `promotion_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `headphone_specs`
--
ALTER TABLE `headphone_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `keyboard_specs`
--
ALTER TABLE `keyboard_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `mouse_specs`
--
ALTER TABLE `mouse_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `promotion_products`
--
ALTER TABLE `promotion_products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `social_accounts`
--
ALTER TABLE `social_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `headphone_specs`
--
ALTER TABLE `headphone_specs`
  ADD CONSTRAINT `headphone_specs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `keyboard_specs`
--
ALTER TABLE `keyboard_specs`
  ADD CONSTRAINT `keyboard_specs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `mouse_specs`
--
ALTER TABLE `mouse_specs`
  ADD CONSTRAINT `mouse_specs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`headphone_specs_id`) REFERENCES `headphone_specs` (`id`),
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`keyboard_specs_id`) REFERENCES `keyboard_specs` (`id`),
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`mouse_specs_id`) REFERENCES `mouse_specs` (`id`);

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `promotion_products`
--
ALTER TABLE `promotion_products`
  ADD CONSTRAINT `promotion_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `promotion_products_ibfk_2` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`);

--
-- Các ràng buộc cho bảng `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD CONSTRAINT `social_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

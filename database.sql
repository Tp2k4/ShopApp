-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 14, 2025 lúc 06:55 AM
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
-- Cơ sở dữ liệu: `shopapp`
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
(1, 'Asus', '2025-04-26 21:12:29', '2025-04-26 21:12:29'),
(2, 'Acer', '2025-04-26 21:12:41', '2025-04-26 21:12:41'),
(3, 'Logitech', '2025-04-26 21:12:51', '2025-04-26 21:12:51');

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

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 2, '2025-04-02 21:27:46', '2025-04-02 21:27:46'),
(2, 3, '2025-04-02 22:21:03', '2025-04-02 22:21:03'),
(3, 1, '2025-04-16 14:47:42', '2025-04-16 14:47:42'),
(4, 4, '2025-04-16 22:43:18', '2025-04-16 22:43:18');

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

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`, `price`, `total_price`, `added_at`, `is_selected`) VALUES
(15, 1, 7, 5, 8699.9, 43499.5, '2025-04-08 21:36:25', 1),
(16, 3, 7, 1, 8699.9, 8699.9, '2025-04-16 14:47:42', 0);

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
(1, 6, 'Lithium 59mAh', '7 years warranty', 'Wireless', 0, 0, 161.564, 'fuchsia'),
(2, 8, 'Lithium 07mAh', '5 years warranty', 'Bluetooth', 0, 1, 357.965, 'pink'),
(3, 13, 'Lithium 09mAh', '5 years warranty', 'Wired', 1, 1, 281.905, 'green'),
(4, 28, 'Lithium 81mAh', '8 years warranty', 'Bluetooth', 1, 0, 412.081, 'magenta'),
(5, 37, 'Lithium 68mAh', '2 years warranty', 'Wired', 0, 1, 144.004, 'orange'),
(6, 39, 'Lithium 19mAh', '6 years warranty', 'Bluetooth', 0, 1, 260.923, 'magenta'),
(7, 42, 'Lithium 17mAh', '2 years warranty', 'Wired', 1, 1, 270.119, 'salmon'),
(8, 46, 'Lithium 62mAh', '7 years warranty', 'Wired', 0, 0, 108.99, 'lime'),
(9, 49, 'Lithium 04mAh', '3 years warranty', 'Bluetooth', 0, 1, 465.644, 'mint green'),
(10, 58, 'Lithium 95mAh', '6 years warranty', 'Wired', 0, 0, 237.319, 'green'),
(11, 66, 'Lithium 75mAh', '9 years warranty', 'Bluetooth', 0, 1, 169.891, 'lavender'),
(12, 70, 'Lithium 52mAh', '9 years warranty', 'Bluetooth', 1, 1, 272.274, 'gold'),
(13, 71, 'Lithium 08mAh', '4 years warranty', 'Bluetooth', 1, 1, 370.694, 'grey'),
(14, 74, 'Lithium 75mAh', '8 years warranty', 'Wired', 0, 1, 326.997, 'fuchsia'),
(15, 88, 'Lithium 54mAh', '6 years warranty', 'Bluetooth', 1, 0, 400.289, 'grey'),
(16, 108, 'Lithium 21mAh', '7 years warranty', 'Wired', 0, 0, 458.528, 'tan'),
(17, 113, 'Lithium 50mAh', '0 years warranty', 'Wired', 1, 0, 498.663, 'teal'),
(18, 133, 'Lithium 95mAh', '3 years warranty', 'Wired', 1, 0, 380.217, 'lavender'),
(19, 144, 'Lithium 14mAh', '5 years warranty', 'Wired', 0, 1, 193.148, 'magenta'),
(20, 151, 'Lithium 73mAh', '8 years warranty', 'Wired', 0, 0, 445.807, 'azure'),
(21, 153, 'Lithium 40mAh', '4 years warranty', 'Bluetooth', 0, 0, 223.236, 'lavender'),
(22, 156, 'Lithium 96mAh', '0 years warranty', 'Bluetooth', 1, 1, 209.275, 'lavender'),
(23, 157, 'Lithium 65mAh', '4 years warranty', 'Bluetooth', 1, 1, 391.581, 'gold'),
(24, 178, 'Lithium 39mAh', '5 years warranty', 'Wired', 1, 0, 242.147, 'purple'),
(25, 187, 'Lithium 29mAh', '0 years warranty', 'Bluetooth', 1, 1, 303.657, 'turquoise'),
(26, 203, 'Lithium 53mAh', '8 years warranty', 'Wired', 1, 0, 271.637, 'gold'),
(27, 207, 'Lithium 97mAh', '2 years warranty', 'Wired', 0, 0, 241.311, 'pink'),
(28, 217, 'Lithium 91mAh', '1 years warranty', 'Wired', 1, 0, 126.604, 'maroon'),
(29, 227, 'Lithium 23mAh', '2 years warranty', 'Bluetooth', 1, 0, 218.599, 'black'),
(30, 230, 'Lithium 59mAh', '6 years warranty', 'Bluetooth', 0, 0, 378, 'purple'),
(31, 242, 'Lithium 72mAh', '5 years warranty', 'Bluetooth', 1, 0, 252.346, 'violet'),
(32, 251, 'Lithium 88mAh', '3 years warranty', 'Bluetooth', 1, 1, 237.494, 'orchid'),
(33, 252, 'Lithium 87mAh', '8 years warranty', 'Bluetooth', 1, 1, 131.407, 'ivory'),
(34, 253, 'Lithium 95mAh', '0 years warranty', 'Wired', 0, 0, 334.537, 'purple'),
(35, 259, 'Lithium 19mAh', '3 years warranty', 'Bluetooth', 0, 0, 378.34, 'maroon'),
(36, 264, 'Lithium 10mAh', '6 years warranty', 'Bluetooth', 0, 1, 474.567, 'lime'),
(37, 275, 'Lithium 29mAh', '4 years warranty', 'Bluetooth', 1, 0, 112.394, 'fuchsia'),
(38, 276, 'Lithium 02mAh', '4 years warranty', 'Wired', 1, 0, 190.878, 'tan'),
(39, 288, 'Lithium 94mAh', '4 years warranty', 'Wired', 1, 0, 291.892, 'green'),
(40, 295, 'Lithium 37mAh', '7 years warranty', 'Bluetooth', 0, 1, 192.827, 'gold'),
(41, 299, 'Lithium 89mAh', '4 years warranty', 'Wired', 1, 1, 173.152, 'cyan'),
(42, 301, 'Lithium 87mAh', '4 years warranty', 'Bluetooth', 0, 0, 148.994, 'black'),
(43, 303, 'Lithium 23mAh', '5 years warranty', 'Wired', 0, 1, 204.569, 'violet'),
(44, 314, 'Lithium 11mAh', '3 years warranty', 'Wired', 0, 1, 211.381, 'fuchsia'),
(45, 324, 'Lithium 82mAh', '6 years warranty', 'Wired', 1, 0, 219.278, 'cyan'),
(46, 325, 'Lithium 48mAh', '2 years warranty', 'Wired', 0, 1, 337.508, 'salmon'),
(47, 329, 'Lithium 22mAh', '0 years warranty', 'Bluetooth', 1, 0, 363.457, 'cyan'),
(48, 344, 'Lithium 59mAh', '2 years warranty', 'Wired', 0, 0, 135.265, 'orchid'),
(49, 359, 'Lithium 72mAh', '2 years warranty', 'Bluetooth', 0, 1, 280.488, 'tan'),
(50, 360, 'Lithium 29mAh', '8 years warranty', 'Bluetooth', 0, 1, 235.683, 'pink'),
(51, 365, 'Lithium 78mAh', '0 years warranty', 'Bluetooth', 0, 1, 410.091, 'orchid'),
(52, 367, 'Lithium 89mAh', '0 years warranty', 'Wired', 0, 0, 123.369, 'plum'),
(53, 382, 'Lithium 10mAh', '6 years warranty', 'Bluetooth', 1, 0, 207.45, 'maroon'),
(54, 388, 'Lithium 43mAh', '4 years warranty', 'Wired', 0, 1, 441.375, 'ivory'),
(55, 390, 'Lithium 92mAh', '8 years warranty', 'Wired', 1, 1, 416.801, 'green'),
(56, 393, 'Lithium 59mAh', '7 years warranty', 'Bluetooth', 0, 1, 118.678, 'grey'),
(57, 394, 'Lithium 80mAh', '3 years warranty', 'Wired', 1, 1, 434.717, 'yellow'),
(58, 395, 'Lithium 86mAh', '3 years warranty', 'Wired', 0, 1, 164.628, 'yellow'),
(59, 400, 'Lithium 89mAh', '1 years warranty', 'Wired', 1, 0, 199.89, 'maroon'),
(60, 403, 'Lithium 63mAh', '8 years warranty', 'Bluetooth', 0, 0, 357.02, 'yellow'),
(61, 415, 'Lithium 39mAh', '3 years warranty', 'Wired', 0, 0, 481.386, 'purple'),
(62, 421, 'Lithium 08mAh', '4 years warranty', 'Wired', 0, 0, 262.608, 'black'),
(63, 440, 'Lithium 71mAh', '2 years warranty', 'Wired', 0, 0, 482.721, 'black'),
(64, 447, 'Lithium 71mAh', '4 years warranty', 'Wired', 1, 0, 162.998, 'gold'),
(65, 448, 'Lithium 03mAh', '6 years warranty', 'Bluetooth', 1, 0, 245.622, 'maroon'),
(66, 457, 'Lithium 21mAh', '2 years warranty', 'Wired', 1, 0, 280.42, 'sky blue'),
(67, 460, 'Lithium 10mAh', '7 years warranty', 'Bluetooth', 0, 1, 193.026, 'mint green'),
(68, 472, 'Lithium 34mAh', '6 years warranty', 'Bluetooth', 1, 0, 373.747, 'red'),
(69, 479, 'Lithium 15mAh', '5 years warranty', 'Wired', 0, 1, 333.534, 'gold'),
(70, 497, 'Lithium 54mAh', '9 years warranty', 'Bluetooth', 1, 1, 327.396, 'maroon'),
(71, 500, 'Lithium 89mAh', '1 years warranty', 'Wired', 1, 1, 265.612, 'orange'),
(72, 504, 'Lithium 79mAh', '5 years warranty', 'Wired', 0, 1, 106.08, 'magenta'),
(73, 521, 'Lithium 20mAh', '9 years warranty', 'Wired', 1, 1, 101.982, 'sky blue'),
(74, 524, 'Lithium 51mAh', '0 years warranty', 'Wired', 1, 1, 164.25, 'fuchsia'),
(75, 525, 'Lithium 95mAh', '6 years warranty', 'Wired', 0, 1, 130.715, 'fuchsia'),
(76, 541, 'Lithium 47mAh', '9 years warranty', 'Bluetooth', 1, 0, 326.253, 'magenta'),
(77, 552, 'Lithium 04mAh', '8 years warranty', 'Wired', 0, 1, 427.034, 'magenta'),
(78, 556, 'Lithium 25mAh', '2 years warranty', 'Wired', 0, 0, 212.799, 'silver'),
(79, 560, 'Lithium 64mAh', '0 years warranty', 'Bluetooth', 1, 0, 353.779, 'green'),
(80, 561, 'Lithium 73mAh', '7 years warranty', 'Wired', 1, 0, 403.324, 'fuchsia'),
(81, 566, 'Lithium 79mAh', '9 years warranty', 'Wired', 0, 1, 339.647, 'pink'),
(82, 568, 'Lithium 15mAh', '1 years warranty', 'Bluetooth', 1, 1, 176.741, 'silver'),
(83, 571, 'Lithium 07mAh', '7 years warranty', 'Bluetooth', 0, 0, 260.781, 'green'),
(84, 576, 'Lithium 47mAh', '8 years warranty', 'Bluetooth', 1, 1, 284.155, 'ivory'),
(85, 581, 'Lithium 85mAh', '9 years warranty', 'Bluetooth', 1, 1, 122.158, 'black'),
(86, 588, 'Lithium 77mAh', '4 years warranty', 'Wired', 0, 0, 315.589, 'lavender'),
(87, 591, 'Lithium 26mAh', '5 years warranty', 'Bluetooth', 1, 0, 217.586, 'salmon'),
(88, 594, 'Lithium 78mAh', '5 years warranty', 'Wired', 0, 1, 348.36, 'turquoise'),
(89, 608, 'Lithium 02mAh', '3 years warranty', 'Wired', 1, 0, 224.63, 'salmon'),
(90, 609, 'Lithium 19mAh', '5 years warranty', 'Wired', 1, 1, 421.385, 'orchid'),
(91, 626, 'Lithium 97mAh', '1 years warranty', 'Wired', 0, 0, 229.664, 'lavender'),
(92, 655, 'Lithium 92mAh', '9 years warranty', 'Wired', 1, 0, 412.354, 'sky blue'),
(93, 657, 'Lithium 68mAh', '5 years warranty', 'Bluetooth', 1, 0, 383.055, 'pink'),
(94, 669, 'Lithium 19mAh', '5 years warranty', 'Wired', 1, 0, 443.185, 'tan'),
(95, 671, 'Lithium 71mAh', '1 years warranty', 'Bluetooth', 1, 1, 377.143, 'white'),
(96, 675, 'Lithium 91mAh', '1 years warranty', 'Wired', 1, 1, 455.261, 'orchid'),
(97, 678, 'Lithium 70mAh', '7 years warranty', 'Wired', 1, 0, 191.397, 'tan'),
(98, 679, 'Lithium 06mAh', '1 years warranty', 'Bluetooth', 1, 0, 403.049, 'purple'),
(99, 683, 'Lithium 21mAh', '3 years warranty', 'Wired', 1, 1, 391.942, 'maroon'),
(100, 691, 'Lithium 95mAh', '3 years warranty', 'Wired', 0, 0, 100.733, 'salmon'),
(101, 700, 'Lithium 95mAh', '6 years warranty', 'Wired', 0, 0, 398.997, 'pink'),
(102, 732, 'Lithium 59mAh', '1 years warranty', 'Bluetooth', 1, 1, 408.737, 'sky blue'),
(103, 737, 'Lithium 13mAh', '7 years warranty', 'Bluetooth', 0, 1, 441.915, 'teal'),
(104, 745, 'Lithium 17mAh', '0 years warranty', 'Bluetooth', 0, 0, 374.182, 'gold'),
(105, 748, 'Lithium 25mAh', '6 years warranty', 'Wired', 0, 0, 214.051, 'lime'),
(106, 752, 'Lithium 36mAh', '9 years warranty', 'Bluetooth', 1, 0, 316.347, 'magenta'),
(107, 757, 'Lithium 05mAh', '9 years warranty', 'Bluetooth', 1, 0, 317.643, 'turquoise'),
(108, 758, 'Lithium 79mAh', '5 years warranty', 'Wired', 1, 0, 191.154, 'black'),
(109, 773, 'Lithium 65mAh', '9 years warranty', 'Wired', 1, 0, 210.441, 'violet'),
(110, 774, 'Lithium 55mAh', '2 years warranty', 'Bluetooth', 1, 0, 337.399, 'green'),
(111, 780, 'Lithium 67mAh', '2 years warranty', 'Bluetooth', 0, 0, 411.764, 'tan'),
(112, 792, 'Lithium 42mAh', '8 years warranty', 'Wired', 0, 1, 383.579, 'turquoise'),
(113, 794, 'Lithium 21mAh', '0 years warranty', 'Bluetooth', 0, 1, 485.415, 'black'),
(114, 801, 'Lithium 54mAh', '8 years warranty', 'Wired', 1, 1, 172.771, 'ivory'),
(115, 822, 'Lithium 73mAh', '7 years warranty', 'Wired', 0, 0, 102.878, 'grey'),
(116, 832, 'Lithium 98mAh', '7 years warranty', 'Wired', 1, 0, 148.939, 'purple'),
(117, 838, 'Lithium 24mAh', '1 years warranty', 'Wired', 0, 1, 421.296, 'turquoise'),
(118, 839, 'Lithium 45mAh', '2 years warranty', 'Wired', 1, 1, 499.681, 'pink'),
(119, 854, 'Lithium 54mAh', '1 years warranty', 'Wired', 0, 1, 149.051, 'tan'),
(120, 874, 'Lithium 26mAh', '5 years warranty', 'Bluetooth', 0, 0, 305.807, 'salmon'),
(121, 876, 'Lithium 22mAh', '5 years warranty', 'Bluetooth', 1, 0, 286.604, 'white'),
(122, 877, 'Lithium 24mAh', '2 years warranty', 'Bluetooth', 1, 0, 301.073, 'silver'),
(123, 878, 'Lithium 54mAh', '7 years warranty', 'Bluetooth', 1, 0, 144.454, 'white'),
(124, 891, 'Lithium 82mAh', '0 years warranty', 'Bluetooth', 0, 1, 278.982, 'cyan'),
(125, 893, 'Lithium 36mAh', '1 years warranty', 'Wired', 1, 0, 485.221, 'purple'),
(126, 896, 'Lithium 70mAh', '8 years warranty', 'Wired', 1, 0, 447.728, 'salmon'),
(127, 900, 'Lithium 81mAh', '3 years warranty', 'Bluetooth', 1, 0, 395.94, 'blue'),
(128, 903, 'Lithium 81mAh', '2 years warranty', 'Bluetooth', 0, 1, 389.585, 'gold'),
(129, 905, 'Lithium 56mAh', '2 years warranty', 'Bluetooth', 0, 0, 428.443, 'orchid'),
(130, 910, 'Lithium 90mAh', '1 years warranty', 'Bluetooth', 0, 0, 470.99, 'cyan'),
(131, 914, 'Lithium 97mAh', '6 years warranty', 'Bluetooth', 1, 0, 182.25, 'red'),
(132, 920, 'Lithium 70mAh', '7 years warranty', 'Bluetooth', 1, 0, 293.966, 'yellow'),
(133, 923, 'Lithium 36mAh', '3 years warranty', 'Bluetooth', 0, 0, 197.557, 'azure'),
(134, 928, 'Lithium 45mAh', '9 years warranty', 'Wired', 1, 0, 425.457, 'lime'),
(135, 930, 'Lithium 68mAh', '8 years warranty', 'Bluetooth', 1, 0, 371.627, 'teal'),
(136, 936, 'Lithium 24mAh', '2 years warranty', 'Bluetooth', 1, 1, 179.451, 'ivory'),
(137, 945, '39 hrs', '7 years warranty', 'Wireless', 0, 0, 161.564, 'fuchsia');

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
(1, 6, 'export', 3, '2025-04-08 21:13:41', 'Chuot logitech sieu cap vip pro', NULL, NULL),
(2, 11, 'export', 3, '2025-04-08 21:13:41', 'Sleek Plastic Wallet', NULL, NULL),
(3, 19, 'export', 5, '2025-04-08 21:13:41', 'Heavy Duty Cotton Keyboard', NULL, NULL),
(4, 23, 'export', 6, '2025-04-08 21:13:41', 'Durable Wooden Car', NULL, NULL),
(5, 29, 'export', 9, '2025-04-08 21:13:41', 'Incredible Granite Keyboard', NULL, NULL),
(6, 2, 'import', 25, '2025-04-08 21:30:47', 'ban phim sieu cap vip pro', NULL, NULL),
(7, 3, 'export', 5, '2025-04-08 21:41:01', 'Fantastic Linen Shirt', NULL, NULL),
(8, 2, 'import', 25, '2025-04-15 10:44:46', 'ban phim sieu cap vip pro', NULL, NULL),
(9, 1, 'import', 15, '2025-04-16 00:00:00', 'Chuot logitech sieu cap vip pro', NULL, NULL),
(11, 21, 'import', 15, '2025-04-16 00:00:00', 'Ergonomic Marble Watch', NULL, NULL),
(12, 7, 'export', 1, '2025-04-16 00:00:00', 'Enormous Silk Gloves', NULL, NULL),
(13, 21, 'export', 9, '2025-04-16 00:00:00', 'Ergonomic Marble Watch', NULL, NULL),
(14, 6, 'import', 3, '2025-04-26 00:00:00', 'Chuot logitech sieu cap vip pro', NULL, NULL),
(15, 11, 'import', 3, '2025-04-26 00:00:00', 'Sleek Plastic Wallet', NULL, NULL),
(16, 19, 'import', 5, '2025-04-26 00:00:00', 'Heavy Duty Cotton Keyboard', NULL, NULL),
(17, 23, 'import', 6, '2025-04-26 00:00:00', 'Durable Wooden Car', NULL, NULL),
(18, 29, 'import', 9, '2025-04-26 00:00:00', 'Incredible Granite Keyboard', NULL, NULL),
(19, 3, 'import', 5, '2025-04-26 00:00:00', 'Fantastic Linen Shirt', NULL, NULL),
(20, 4, 'import', 2, '2025-04-26 00:00:00', 'Intelligent Cotton Hat', NULL, NULL),
(21, 1, 'import', 5, '2025-04-26 00:00:00', 'Chuot logitech sieu cap vip pro', NULL, NULL),
(22, 99, 'import', 2, '2025-04-26 00:00:00', 'Rustic Aluminum Computer', NULL, NULL),
(23, 1, 'import', 20, '2025-04-26 00:00:00', 'Chuot logitech sieu cap vip pro', NULL, NULL),
(24, 2, 'import', 15, '2025-04-26 00:00:00', 'ban phim sieu cap vip pro', NULL, NULL);

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
(1, 2, 'Lithium 46', '1 years warranty', 'both', 96, 'Optical', 1, 1265.36, 'lime'),
(2, 4, 'Lithium 58mAh', '0 years warranty', 'Wireless', 428946765, 'Red', 1, 811.419, 'tan'),
(3, 7, 'Lithium 07mAh', '5 years warranty', 'Wireless', -106447582, 'Red', 1, 1377.85, 'mint green'),
(4, 10, 'Lithium 38mAh', '3 years warranty', 'Wired', 1683424239, 'Red', 0, 732.595, 'teal'),
(5, 11, 'Lithium 53mAh', '6 years warranty', 'Wired', -1494447068, 'Blue', 0, 929.313, 'magenta'),
(6, 12, 'Lithium 98mAh', '9 years warranty', 'Wireless', -1213414925, 'Brown', 0, 516.187, 'violet'),
(7, 15, 'Lithium 32mAh', '1 years warranty', 'Wired', 622080563, 'Brown', 0, 1194.51, 'white'),
(8, 17, 'Lithium 11mAh', '4 years warranty', 'Wireless', 426060010, 'Blue', 1, 668.829, 'tan'),
(9, 19, 'Lithium 30mAh', '9 years warranty', 'Wired', -789166068, 'Blue', 1, 1163.23, 'ivory'),
(10, 21, 'Lithium 50mAh', '3 years warranty', 'Wireless', 554651049, 'Blue', 1, 1057.23, 'pink'),
(11, 23, 'Lithium 57mAh', '9 years warranty', 'Wireless', 306923411, 'Optical', 1, 1132.3, 'salmon'),
(12, 24, 'Lithium 73mAh', '3 years warranty', 'Wireless', 1229509060, 'Brown', 0, 904.614, 'ivory'),
(13, 25, 'Lithium 28mAh', '3 years warranty', 'Wired', -97169001, 'Brown', 0, 631.411, 'lime'),
(14, 26, 'Lithium 08mAh', '8 years warranty', 'Wireless', -1859777165, 'Optical', 1, 507.8, 'purple'),
(15, 27, 'Lithium 39mAh', '4 years warranty', 'Wireless', -1874769315, 'Brown', 0, 759.666, 'cyan'),
(16, 30, 'Lithium 66mAh', '2 years warranty', 'Wireless', 178820230, 'Red', 1, 718.482, 'white'),
(17, 31, 'Lithium 67mAh', '0 years warranty', 'Wired', -553725887, 'Brown', 1, 567.9, 'plum'),
(18, 32, 'Lithium 98mAh', '3 years warranty', 'Wireless', 1437814330, 'Red', 0, 509.084, 'cyan'),
(19, 35, 'Lithium 03mAh', '8 years warranty', 'Wired', 1012132217, 'Blue', 1, 578.23, 'fuchsia'),
(20, 36, 'Lithium 20mAh', '8 years warranty', 'Wireless', 2136842342, 'Blue', 1, 915.197, 'green'),
(21, 38, 'Lithium 88mAh', '8 years warranty', 'Wireless', 2126245095, 'Optical', 1, 1164.88, 'black'),
(22, 40, 'Lithium 94mAh', '2 years warranty', 'Wired', -935877349, 'Red', 1, 1315.31, 'azure'),
(23, 41, 'Lithium 25mAh', '9 years warranty', 'Wireless', 160046215, 'Optical', 0, 1212.45, 'maroon'),
(24, 43, 'Lithium 45mAh', '0 years warranty', 'Wired', -1677845725, 'Optical', 1, 690.422, 'teal'),
(25, 51, 'Lithium 91mAh', '5 years warranty', 'Wireless', 311774761, 'Optical', 0, 1247.53, 'blue'),
(26, 57, 'Lithium 14mAh', '2 years warranty', 'Wireless', 96650351, 'Optical', 0, 1489.32, 'silver'),
(27, 59, 'Lithium 19mAh', '5 years warranty', 'Wired', 109508694, 'Optical', 1, 870.716, 'red'),
(28, 60, 'Lithium 11mAh', '4 years warranty', 'Wired', -397728044, 'Blue', 0, 880.4, 'turquoise'),
(29, 62, 'Lithium 24mAh', '2 years warranty', 'Wireless', 1349801708, 'Blue', 1, 515.693, 'magenta'),
(30, 63, 'Lithium 00mAh', '1 years warranty', 'Wireless', -188093563, 'Brown', 1, 758.354, 'black'),
(31, 64, 'Lithium 69mAh', '8 years warranty', 'Wired', -115676855, 'Brown', 0, 1435.07, 'silver'),
(32, 65, 'Lithium 42mAh', '5 years warranty', 'Wired', 1415241688, 'Optical', 1, 913.17, 'ivory'),
(33, 67, 'Lithium 64mAh', '0 years warranty', 'Wired', -1298027953, 'Blue', 1, 753.425, 'fuchsia'),
(34, 69, 'Lithium 76mAh', '0 years warranty', 'Wireless', 1991597537, 'Red', 1, 1412.79, 'indigo'),
(35, 73, 'Lithium 79mAh', '4 years warranty', 'Wireless', -1932991007, 'Blue', 1, 727.299, 'purple'),
(36, 75, 'Lithium 44mAh', '6 years warranty', 'Wireless', -292639663, 'Blue', 1, 839.905, 'sky blue'),
(37, 77, 'Lithium 95mAh', '0 years warranty', 'Wired', -1663752800, 'Brown', 0, 1175.52, 'lavender'),
(38, 78, 'Lithium 03mAh', '6 years warranty', 'Wireless', 1237059219, 'Red', 1, 1425.96, 'silver'),
(39, 80, 'Lithium 34mAh', '9 years warranty', 'Wired', -1949811900, 'Blue', 1, 800.125, 'black'),
(40, 82, 'Lithium 61mAh', '3 years warranty', 'Wireless', -858434561, 'Blue', 1, 1353, 'black'),
(41, 84, 'Lithium 63mAh', '1 years warranty', 'Wired', -808142170, 'Red', 1, 1367.05, 'gold'),
(42, 85, 'Lithium 87mAh', '0 years warranty', 'Wired', -571290239, 'Brown', 1, 704.443, 'teal'),
(43, 87, 'Lithium 65mAh', '8 years warranty', 'Wired', 836546161, 'Brown', 1, 806.689, 'turquoise'),
(44, 91, 'Lithium 82mAh', '0 years warranty', 'Wireless', -2121923549, 'Brown', 1, 1193.2, 'teal'),
(45, 93, 'Lithium 78mAh', '3 years warranty', 'Wireless', 1939520548, 'Optical', 1, 758.141, 'grey'),
(46, 94, 'Lithium 73mAh', '6 years warranty', 'Wired', -979143348, 'Brown', 1, 1469.2, 'yellow'),
(47, 95, 'Lithium 26mAh', '6 years warranty', 'Wireless', -652863307, 'Blue', 1, 737.427, 'olive'),
(48, 96, 'Lithium 01mAh', '4 years warranty', 'Wireless', 1293784136, 'Brown', 1, 610.058, 'pink'),
(49, 97, 'Lithium 24mAh', '4 years warranty', 'Wireless', 1796111037, 'Optical', 1, 1498.09, 'plum'),
(50, 99, 'Lithium 83mAh', '3 years warranty', 'Wired', 1422926754, 'Blue', 0, 532.464, 'indigo'),
(51, 101, 'Lithium 21mAh', '7 years warranty', 'Wired', -1062510008, 'Brown', 0, 614.773, 'black'),
(52, 102, 'Lithium 63mAh', '6 years warranty', 'Wireless', -1168166938, 'Brown', 1, 1301.71, 'violet'),
(53, 103, 'Lithium 67mAh', '0 years warranty', 'Wired', -1907362019, 'Brown', 0, 1123.9, 'plum'),
(54, 106, 'Lithium 87mAh', '5 years warranty', 'Wired', 1433457443, 'Blue', 1, 634.159, 'white'),
(55, 107, 'Lithium 73mAh', '9 years warranty', 'Wireless', 1454544921, 'Brown', 0, 1447.65, 'orange'),
(56, 111, 'Lithium 53mAh', '9 years warranty', 'Wired', 346531887, 'Red', 1, 1089.56, 'orchid'),
(57, 112, 'Lithium 30mAh', '5 years warranty', 'Wireless', -1269049361, 'Red', 0, 580.341, 'orange'),
(58, 114, 'Lithium 53mAh', '8 years warranty', 'Wireless', -2128258456, 'Optical', 0, 905.882, 'fuchsia'),
(59, 116, 'Lithium 56mAh', '0 years warranty', 'Wired', -539220210, 'Brown', 0, 1183.43, 'green'),
(60, 119, 'Lithium 00mAh', '1 years warranty', 'Wired', -110658184, 'Brown', 1, 1394.96, 'pink'),
(61, 120, 'Lithium 65mAh', '5 years warranty', 'Wireless', -659321049, 'Brown', 0, 670.763, 'tan'),
(62, 122, 'Lithium 42mAh', '8 years warranty', 'Wireless', 167200268, 'Blue', 0, 597.047, 'magenta'),
(63, 123, 'Lithium 36mAh', '5 years warranty', 'Wireless', -1277072191, 'Brown', 1, 904.602, 'mint green'),
(64, 124, 'Lithium 11mAh', '7 years warranty', 'Wired', 535195629, 'Optical', 0, 1081.94, 'yellow'),
(65, 127, 'Lithium 03mAh', '4 years warranty', 'Wireless', 1452390423, 'Blue', 1, 1017.7, 'plum'),
(66, 128, 'Lithium 39mAh', '7 years warranty', 'Wireless', 38429468, 'Brown', 0, 908.818, 'maroon'),
(67, 131, 'Lithium 71mAh', '4 years warranty', 'Wireless', 2121227194, 'Optical', 1, 622.683, 'purple'),
(68, 132, 'Lithium 87mAh', '6 years warranty', 'Wireless', 533859897, 'Red', 1, 552.055, 'green'),
(69, 134, 'Lithium 27mAh', '3 years warranty', 'Wired', -1494261993, 'Red', 1, 941.281, 'red'),
(70, 135, 'Lithium 93mAh', '9 years warranty', 'Wired', 940033595, 'Blue', 0, 970.614, 'fuchsia'),
(71, 136, 'Lithium 62mAh', '3 years warranty', 'Wireless', 1818485081, 'Blue', 0, 852.421, 'yellow'),
(72, 137, 'Lithium 90mAh', '0 years warranty', 'Wireless', 250057097, 'Blue', 1, 1254.08, 'grey'),
(73, 139, 'Lithium 63mAh', '9 years warranty', 'Wired', -1429675849, 'Brown', 1, 1497.81, 'orange'),
(74, 140, 'Lithium 76mAh', '9 years warranty', 'Wired', 680774551, 'Brown', 1, 1369.59, 'turquoise'),
(75, 141, 'Lithium 15mAh', '9 years warranty', 'Wired', 904845185, 'Blue', 0, 1270.75, 'yellow'),
(76, 142, 'Lithium 42mAh', '8 years warranty', 'Wired', -648116456, 'Brown', 1, 1281.08, 'salmon'),
(77, 145, 'Lithium 84mAh', '0 years warranty', 'Wired', 1142422162, 'Brown', 1, 1488.11, 'plum'),
(78, 146, 'Lithium 42mAh', '0 years warranty', 'Wireless', -1106767339, 'Optical', 1, 934.844, 'plum'),
(79, 147, 'Lithium 39mAh', '6 years warranty', 'Wired', -1503698981, 'Brown', 1, 636.527, 'blue'),
(80, 148, 'Lithium 48mAh', '4 years warranty', 'Wireless', -670457098, 'Optical', 0, 751.72, 'red'),
(81, 154, 'Lithium 62mAh', '4 years warranty', 'Wired', 1430763103, 'Optical', 0, 819.788, 'tan'),
(82, 155, 'Lithium 85mAh', '9 years warranty', 'Wireless', 703068475, 'Blue', 0, 1109.87, 'silver'),
(83, 162, 'Lithium 78mAh', '5 years warranty', 'Wireless', -152838372, 'Red', 0, 1401.98, 'purple'),
(84, 163, 'Lithium 82mAh', '2 years warranty', 'Wireless', -920376341, 'Red', 0, 1262.87, 'lavender'),
(85, 164, 'Lithium 30mAh', '2 years warranty', 'Wired', -1686311360, 'Red', 0, 1056.6, 'olive'),
(86, 165, 'Lithium 11mAh', '8 years warranty', 'Wired', 1009882944, 'Blue', 0, 532.078, 'pink'),
(87, 166, 'Lithium 72mAh', '2 years warranty', 'Wired', 708321871, 'Blue', 0, 786.638, 'cyan'),
(88, 168, 'Lithium 92mAh', '7 years warranty', 'Wireless', 1973591688, 'Optical', 1, 1304.93, 'blue'),
(89, 170, 'Lithium 75mAh', '1 years warranty', 'Wireless', 2033871264, 'Brown', 1, 966.957, 'azure'),
(90, 171, 'Lithium 15mAh', '7 years warranty', 'Wired', 705439247, 'Brown', 0, 1454.89, 'pink'),
(91, 173, 'Lithium 17mAh', '4 years warranty', 'Wireless', -746250526, 'Blue', 0, 995.646, 'plum'),
(92, 176, 'Lithium 28mAh', '7 years warranty', 'Wired', 640418540, 'Blue', 1, 860.112, 'ivory'),
(93, 180, 'Lithium 90mAh', '8 years warranty', 'Wireless', -886392808, 'Brown', 1, 1468.02, 'salmon'),
(94, 181, 'Lithium 56mAh', '6 years warranty', 'Wired', -479045205, 'Blue', 0, 1366.22, 'mint green'),
(95, 182, 'Lithium 55mAh', '3 years warranty', 'Wireless', -919438551, 'Brown', 1, 575.555, 'olive'),
(96, 183, 'Lithium 95mAh', '7 years warranty', 'Wired', 915723934, 'Blue', 1, 818.572, 'black'),
(97, 185, 'Lithium 51mAh', '0 years warranty', 'Wireless', -1250409852, 'Brown', 0, 1337.58, 'maroon'),
(98, 186, 'Lithium 59mAh', '7 years warranty', 'Wireless', -1359216572, 'Red', 0, 1330.75, 'silver'),
(99, 188, 'Lithium 05mAh', '1 years warranty', 'Wired', -342920441, 'Red', 1, 915.548, 'yellow'),
(100, 189, 'Lithium 29mAh', '7 years warranty', 'Wireless', 1975204311, 'Brown', 1, 1103.62, 'lavender'),
(101, 191, 'Lithium 25mAh', '8 years warranty', 'Wireless', 1163964025, 'Brown', 0, 973.478, 'violet'),
(102, 192, 'Lithium 07mAh', '3 years warranty', 'Wireless', 733952034, 'Brown', 1, 801.801, 'salmon'),
(103, 193, 'Lithium 33mAh', '0 years warranty', 'Wired', 1604164593, 'Brown', 1, 1231.66, 'blue'),
(104, 194, 'Lithium 45mAh', '1 years warranty', 'Wired', 1153116840, 'Optical', 0, 541.181, 'lavender'),
(105, 195, 'Lithium 35mAh', '8 years warranty', 'Wireless', 433168507, 'Blue', 0, 598.697, 'magenta'),
(106, 196, 'Lithium 00mAh', '7 years warranty', 'Wireless', 1824969981, 'Optical', 0, 1498.54, 'indigo'),
(107, 199, 'Lithium 59mAh', '6 years warranty', 'Wired', 1021697497, 'Optical', 1, 1113.43, 'pink'),
(108, 200, 'Lithium 16mAh', '3 years warranty', 'Wired', -188266149, 'Brown', 1, 1473.98, 'magenta'),
(109, 201, 'Lithium 65mAh', '1 years warranty', 'Wireless', 1803162539, 'Red', 1, 602.354, 'purple'),
(110, 202, 'Lithium 37mAh', '1 years warranty', 'Wired', 1868318966, 'Blue', 0, 1299.71, 'turquoise'),
(111, 206, 'Lithium 26mAh', '8 years warranty', 'Wireless', 948036657, 'Brown', 1, 1377.29, 'white'),
(112, 208, 'Lithium 41mAh', '9 years warranty', 'Wired', 1441908091, 'Brown', 0, 583.968, 'fuchsia'),
(113, 209, 'Lithium 10mAh', '1 years warranty', 'Wireless', -1288595102, 'Optical', 1, 576.333, 'orchid'),
(114, 212, 'Lithium 29mAh', '5 years warranty', 'Wired', 946487450, 'Brown', 1, 999.306, 'turquoise'),
(115, 214, 'Lithium 00mAh', '5 years warranty', 'Wireless', -441088226, 'Blue', 1, 713.335, 'fuchsia'),
(116, 215, 'Lithium 18mAh', '1 years warranty', 'Wired', -176754197, 'Blue', 0, 1410.78, 'lavender'),
(117, 216, 'Lithium 62mAh', '6 years warranty', 'Wireless', -1471460255, 'Optical', 1, 808.264, 'ivory'),
(118, 219, 'Lithium 73mAh', '0 years warranty', 'Wireless', -1790908493, 'Blue', 0, 1061.41, 'plum'),
(119, 223, 'Lithium 50mAh', '1 years warranty', 'Wireless', -1767953398, 'Blue', 1, 1090.53, 'sky blue'),
(120, 224, 'Lithium 33mAh', '9 years warranty', 'Wireless', -1612056925, 'Red', 0, 955.608, 'green'),
(121, 225, 'Lithium 97mAh', '7 years warranty', 'Wired', 1016061096, 'Blue', 1, 799.569, 'cyan'),
(122, 226, 'Lithium 73mAh', '5 years warranty', 'Wireless', -303882907, 'Optical', 1, 863.304, 'green'),
(123, 228, 'Lithium 97mAh', '9 years warranty', 'Wireless', -1736512274, 'Red', 0, 1090, 'yellow'),
(124, 229, 'Lithium 98mAh', '5 years warranty', 'Wireless', -1276076321, 'Red', 1, 1336.89, 'lavender'),
(125, 231, 'Lithium 61mAh', '7 years warranty', 'Wireless', -207140762, 'Optical', 1, 1356.44, 'yellow'),
(126, 232, 'Lithium 06mAh', '1 years warranty', 'Wired', 1155397104, 'Optical', 1, 1026.68, 'turquoise'),
(127, 233, 'Lithium 29mAh', '5 years warranty', 'Wired', -602916479, 'Optical', 1, 1362.5, 'olive'),
(128, 236, 'Lithium 48mAh', '2 years warranty', 'Wired', 1961698356, 'Brown', 0, 686.45, 'grey'),
(129, 238, 'Lithium 11mAh', '6 years warranty', 'Wireless', -975420667, 'Optical', 0, 818.421, 'olive'),
(130, 239, 'Lithium 17mAh', '3 years warranty', 'Wired', -1582343574, 'Red', 1, 726.637, 'mint green'),
(131, 240, 'Lithium 61mAh', '5 years warranty', 'Wired', -706919622, 'Red', 1, 675.563, 'yellow'),
(132, 243, 'Lithium 27mAh', '0 years warranty', 'Wired', 1767375525, 'Red', 1, 1315.12, 'grey'),
(133, 245, 'Lithium 39mAh', '0 years warranty', 'Wireless', 1678157893, 'Optical', 0, 1314.83, 'silver'),
(134, 246, 'Lithium 56mAh', '1 years warranty', 'Wired', -312294648, 'Brown', 0, 1459.36, 'tan'),
(135, 247, 'Lithium 52mAh', '5 years warranty', 'Wireless', -2043316869, 'Red', 1, 1385.86, 'lavender'),
(136, 248, 'Lithium 51mAh', '2 years warranty', 'Wired', 1953524963, 'Brown', 0, 1400.93, 'azure'),
(137, 249, 'Lithium 74mAh', '9 years warranty', 'Wireless', -972441608, 'Brown', 1, 757.382, 'violet'),
(138, 257, 'Lithium 41mAh', '9 years warranty', 'Wired', -1057612568, 'Brown', 1, 1034.61, 'ivory'),
(139, 258, 'Lithium 80mAh', '8 years warranty', 'Wired', 995604783, 'Red', 1, 1477.33, 'yellow'),
(140, 260, 'Lithium 14mAh', '2 years warranty', 'Wireless', 1971433931, 'Red', 0, 1293.46, 'olive'),
(141, 261, 'Lithium 53mAh', '7 years warranty', 'Wireless', 1148879121, 'Red', 0, 832.631, 'red'),
(142, 263, 'Lithium 28mAh', '1 years warranty', 'Wired', 486373198, 'Optical', 1, 1323.83, 'magenta'),
(143, 265, 'Lithium 26mAh', '8 years warranty', 'Wired', -335975047, 'Brown', 0, 1210.77, 'yellow'),
(144, 267, 'Lithium 30mAh', '7 years warranty', 'Wireless', 1308770644, 'Optical', 0, 1172.29, 'gold'),
(145, 268, 'Lithium 98mAh', '8 years warranty', 'Wireless', -213862998, 'Blue', 1, 956.34, 'pink'),
(146, 271, 'Lithium 39mAh', '8 years warranty', 'Wireless', 1890675557, 'Red', 0, 778.825, 'violet'),
(147, 274, 'Lithium 96mAh', '6 years warranty', 'Wireless', -1071428522, 'Blue', 0, 877.159, 'silver'),
(148, 277, 'Lithium 89mAh', '6 years warranty', 'Wired', -1992601164, 'Red', 1, 1190.96, 'ivory'),
(149, 279, 'Lithium 30mAh', '9 years warranty', 'Wired', 1116116172, 'Red', 1, 1237.58, 'white'),
(150, 280, 'Lithium 03mAh', '8 years warranty', 'Wired', 1240878581, 'Brown', 1, 1166.54, 'indigo'),
(151, 282, 'Lithium 76mAh', '2 years warranty', 'Wireless', -391832456, 'Blue', 1, 671.695, 'orchid'),
(152, 283, 'Lithium 95mAh', '0 years warranty', 'Wireless', 1166425166, 'Brown', 1, 1472.49, 'salmon'),
(153, 284, 'Lithium 04mAh', '0 years warranty', 'Wireless', -444324119, 'Blue', 1, 1337.16, 'magenta'),
(154, 285, 'Lithium 37mAh', '5 years warranty', 'Wireless', 1797366593, 'Brown', 0, 756.39, 'salmon'),
(155, 286, 'Lithium 65mAh', '5 years warranty', 'Wired', -287732014, 'Red', 1, 810.149, 'violet'),
(156, 289, 'Lithium 67mAh', '7 years warranty', 'Wired', 1125690525, 'Red', 1, 1264.18, 'orange'),
(157, 291, 'Lithium 08mAh', '6 years warranty', 'Wired', 864192308, 'Brown', 1, 1093.5, 'cyan'),
(158, 292, 'Lithium 54mAh', '5 years warranty', 'Wired', 18387863, 'Red', 0, 830.534, 'green'),
(159, 296, 'Lithium 35mAh', '2 years warranty', 'Wireless', 679383674, 'Optical', 1, 1097.86, 'violet'),
(160, 297, 'Lithium 24mAh', '3 years warranty', 'Wireless', 406614088, 'Blue', 0, 579.569, 'tan'),
(161, 298, 'Lithium 95mAh', '7 years warranty', 'Wireless', 713598267, 'Red', 0, 665.01, 'plum'),
(162, 300, 'Lithium 09mAh', '6 years warranty', 'Wired', 1287307209, 'Blue', 1, 1027.28, 'silver'),
(163, 302, 'Lithium 20mAh', '9 years warranty', 'Wired', -1305174037, 'Optical', 0, 1468.99, 'pink'),
(164, 306, 'Lithium 66mAh', '2 years warranty', 'Wired', 592453351, 'Optical', 0, 839.305, 'violet'),
(165, 307, 'Lithium 03mAh', '7 years warranty', 'Wired', 1118999749, 'Brown', 0, 532.406, 'turquoise'),
(166, 309, 'Lithium 95mAh', '0 years warranty', 'Wireless', 796846311, 'Red', 0, 1266.88, 'violet'),
(167, 310, 'Lithium 95mAh', '9 years warranty', 'Wireless', 565153275, 'Optical', 1, 691.211, 'orange'),
(168, 313, 'Lithium 84mAh', '8 years warranty', 'Wired', 32366541, 'Brown', 0, 1297.74, 'lime'),
(169, 315, 'Lithium 90mAh', '7 years warranty', 'Wireless', -2098849529, 'Brown', 1, 1410.47, 'olive'),
(170, 317, 'Lithium 05mAh', '4 years warranty', 'Wireless', -432213178, 'Red', 1, 500.912, 'red'),
(171, 318, 'Lithium 02mAh', '2 years warranty', 'Wired', 740759105, 'Brown', 1, 885.863, 'pink'),
(172, 320, 'Lithium 12mAh', '7 years warranty', 'Wired', -79030110, 'Red', 0, 508.033, 'orchid'),
(173, 323, 'Lithium 16mAh', '3 years warranty', 'Wired', 482646452, 'Brown', 0, 1114.26, 'sky blue'),
(174, 326, 'Lithium 46mAh', '0 years warranty', 'Wired', -1968906957, 'Blue', 1, 921.253, 'orchid'),
(175, 327, 'Lithium 98mAh', '6 years warranty', 'Wireless', -1810419397, 'Blue', 0, 827.068, 'plum'),
(176, 328, 'Lithium 52mAh', '6 years warranty', 'Wireless', 1157500531, 'Brown', 1, 1434.77, 'black'),
(177, 330, 'Lithium 50mAh', '2 years warranty', 'Wired', -247522716, 'Blue', 0, 1322.12, 'orchid'),
(178, 332, 'Lithium 12mAh', '6 years warranty', 'Wired', 2056857779, 'Red', 0, 1411.55, 'pink'),
(179, 333, 'Lithium 78mAh', '7 years warranty', 'Wireless', -865564041, 'Blue', 1, 1248.47, 'red'),
(180, 336, 'Lithium 65mAh', '6 years warranty', 'Wired', 618569253, 'Blue', 1, 551.435, 'lime'),
(181, 337, 'Lithium 62mAh', '1 years warranty', 'Wired', 1687940701, 'Red', 1, 568.092, 'pink'),
(182, 339, 'Lithium 67mAh', '2 years warranty', 'Wireless', 1432166706, 'Blue', 0, 1157.84, 'orange'),
(183, 340, 'Lithium 43mAh', '6 years warranty', 'Wireless', 1206366925, 'Red', 0, 622.142, 'salmon'),
(184, 342, 'Lithium 14mAh', '2 years warranty', 'Wireless', 298880241, 'Red', 1, 1436.56, 'gold'),
(185, 343, 'Lithium 07mAh', '0 years warranty', 'Wireless', 1714437923, 'Red', 1, 1425.25, 'fuchsia'),
(186, 347, 'Lithium 23mAh', '0 years warranty', 'Wired', 1593436445, 'Brown', 0, 1412.33, 'sky blue'),
(187, 348, 'Lithium 46mAh', '7 years warranty', 'Wireless', -1705379102, 'Optical', 0, 1393.99, 'orchid'),
(188, 349, 'Lithium 15mAh', '9 years warranty', 'Wired', 860222667, 'Brown', 0, 809.358, 'fuchsia'),
(189, 350, 'Lithium 02mAh', '1 years warranty', 'Wireless', -1872626080, 'Optical', 1, 1181.17, 'ivory'),
(190, 351, 'Lithium 08mAh', '3 years warranty', 'Wireless', 1006337504, 'Brown', 0, 852.293, 'azure'),
(191, 352, 'Lithium 99mAh', '7 years warranty', 'Wireless', 1478865906, 'Brown', 0, 720.792, 'pink'),
(192, 355, 'Lithium 24mAh', '5 years warranty', 'Wired', 185885323, 'Red', 0, 1364.97, 'violet'),
(193, 356, 'Lithium 80mAh', '7 years warranty', 'Wired', -1432701277, 'Blue', 0, 541.896, 'gold'),
(194, 357, 'Lithium 02mAh', '5 years warranty', 'Wireless', 1984092727, 'Blue', 1, 684.955, 'fuchsia'),
(195, 361, 'Lithium 20mAh', '5 years warranty', 'Wireless', -610881130, 'Brown', 0, 1052.43, 'black'),
(196, 362, 'Lithium 58mAh', '1 years warranty', 'Wired', 104556292, 'Brown', 1, 752.317, 'gold'),
(197, 368, 'Lithium 25mAh', '3 years warranty', 'Wired', 934433560, 'Brown', 0, 882.506, 'black'),
(198, 369, 'Lithium 20mAh', '6 years warranty', 'Wireless', 251274454, 'Optical', 0, 1107.26, 'olive'),
(199, 370, 'Lithium 55mAh', '8 years warranty', 'Wired', -878783811, 'Optical', 1, 1417.57, 'ivory'),
(200, 377, 'Lithium 46mAh', '1 years warranty', 'Wireless', 1233275316, 'Blue', 0, 1013.49, 'lime'),
(201, 383, 'Lithium 05mAh', '3 years warranty', 'Wired', -1352605924, 'Optical', 0, 797.916, 'indigo'),
(202, 384, 'Lithium 45mAh', '4 years warranty', 'Wired', -1076622428, 'Red', 1, 849.027, 'black'),
(203, 387, 'Lithium 60mAh', '4 years warranty', 'Wired', -237619339, 'Blue', 0, 637.766, 'pink'),
(204, 391, 'Lithium 28mAh', '4 years warranty', 'Wireless', -690453396, 'Red', 1, 543.694, 'teal'),
(205, 392, 'Lithium 10mAh', '8 years warranty', 'Wireless', 851744390, 'Optical', 0, 727.747, 'turquoise'),
(206, 397, 'Lithium 47mAh', '2 years warranty', 'Wireless', 31064934, 'Red', 0, 1337.87, 'tan'),
(207, 398, 'Lithium 98mAh', '4 years warranty', 'Wireless', -1018013168, 'Blue', 1, 1091.15, 'teal'),
(208, 399, 'Lithium 15mAh', '5 years warranty', 'Wireless', -1182530897, 'Red', 0, 1339.47, 'yellow'),
(209, 401, 'Lithium 40mAh', '9 years warranty', 'Wired', -334867539, 'Brown', 1, 1065.12, 'lime'),
(210, 402, 'Lithium 96mAh', '6 years warranty', 'Wireless', 212497453, 'Red', 0, 708.575, 'orchid'),
(211, 404, 'Lithium 54mAh', '9 years warranty', 'Wireless', 1097460050, 'Red', 0, 804.723, 'grey'),
(212, 406, 'Lithium 76mAh', '6 years warranty', 'Wireless', 1114036076, 'Brown', 0, 807.086, 'turquoise'),
(213, 407, 'Lithium 11mAh', '7 years warranty', 'Wired', -391176103, 'Brown', 1, 1142.59, 'teal'),
(214, 409, 'Lithium 83mAh', '5 years warranty', 'Wireless', -1903560406, 'Optical', 1, 963.087, 'teal'),
(215, 410, 'Lithium 44mAh', '0 years warranty', 'Wireless', -1998832307, 'Blue', 1, 971.708, 'ivory'),
(216, 411, 'Lithium 21mAh', '1 years warranty', 'Wired', 1266716695, 'Brown', 0, 868.668, 'plum'),
(217, 413, 'Lithium 57mAh', '5 years warranty', 'Wired', 442669316, 'Optical', 1, 977.521, 'sky blue'),
(218, 417, 'Lithium 39mAh', '7 years warranty', 'Wireless', 1116793361, 'Optical', 1, 648.92, 'silver'),
(219, 422, 'Lithium 35mAh', '0 years warranty', 'Wired', 727925517, 'Brown', 1, 1156.4, 'red'),
(220, 423, 'Lithium 07mAh', '3 years warranty', 'Wireless', 1305954416, 'Blue', 0, 818.603, 'lavender'),
(221, 425, 'Lithium 00mAh', '6 years warranty', 'Wireless', -889179165, 'Red', 1, 597.182, 'red'),
(222, 426, 'Lithium 65mAh', '1 years warranty', 'Wireless', -852996882, 'Blue', 0, 828.444, 'salmon'),
(223, 427, 'Lithium 55mAh', '3 years warranty', 'Wireless', 1452887839, 'Brown', 1, 544.008, 'fuchsia'),
(224, 428, 'Lithium 87mAh', '4 years warranty', 'Wireless', 689522387, 'Optical', 0, 835.229, 'green'),
(225, 429, 'Lithium 20mAh', '2 years warranty', 'Wireless', -1102207460, 'Optical', 0, 616.069, 'pink'),
(226, 430, 'Lithium 99mAh', '2 years warranty', 'Wireless', -1139534742, 'Brown', 0, 899.867, 'silver'),
(227, 432, 'Lithium 34mAh', '3 years warranty', 'Wireless', 214708159, 'Optical', 0, 728.849, 'mint green'),
(228, 434, 'Lithium 88mAh', '6 years warranty', 'Wired', 1475936410, 'Blue', 1, 1035.55, 'black'),
(229, 435, 'Lithium 43mAh', '8 years warranty', 'Wired', 1503925127, 'Brown', 0, 1203.51, 'indigo'),
(230, 437, 'Lithium 00mAh', '2 years warranty', 'Wired', -456572813, 'Red', 1, 1208.52, 'silver'),
(231, 438, 'Lithium 17mAh', '6 years warranty', 'Wireless', 831778288, 'Optical', 1, 1155.35, 'orchid'),
(232, 439, 'Lithium 59mAh', '4 years warranty', 'Wireless', -839933472, 'Red', 1, 617.373, 'violet'),
(233, 441, 'Lithium 30mAh', '0 years warranty', 'Wired', 331004045, 'Brown', 0, 1196.84, 'ivory'),
(234, 442, 'Lithium 87mAh', '4 years warranty', 'Wired', -528204167, 'Blue', 0, 533.057, 'indigo'),
(235, 443, 'Lithium 88mAh', '6 years warranty', 'Wired', -10691694, 'Blue', 1, 1391.06, 'cyan'),
(236, 445, 'Lithium 75mAh', '2 years warranty', 'Wireless', -280044721, 'Red', 1, 1336.77, 'blue'),
(237, 449, 'Lithium 16mAh', '2 years warranty', 'Wired', 1594748626, 'Red', 1, 1440.15, 'pink'),
(238, 450, 'Lithium 94mAh', '2 years warranty', 'Wired', -1114483570, 'Blue', 0, 678.336, 'orchid'),
(239, 451, 'Lithium 43mAh', '1 years warranty', 'Wired', -158477468, 'Blue', 0, 792.219, 'teal'),
(240, 452, 'Lithium 76mAh', '7 years warranty', 'Wireless', 1396340486, 'Brown', 0, 722.811, 'orchid'),
(241, 453, 'Lithium 74mAh', '6 years warranty', 'Wired', 461311974, 'Brown', 0, 879.632, 'mint green'),
(242, 454, 'Lithium 60mAh', '0 years warranty', 'Wired', -543822479, 'Red', 0, 615.771, 'plum'),
(243, 455, 'Lithium 08mAh', '9 years warranty', 'Wired', -1034935110, 'Red', 1, 919.675, 'blue'),
(244, 456, 'Lithium 15mAh', '9 years warranty', 'Wired', -173259699, 'Optical', 0, 859.069, 'sky blue'),
(245, 458, 'Lithium 85mAh', '3 years warranty', 'Wireless', -819585086, 'Optical', 1, 524.938, 'olive'),
(246, 459, 'Lithium 11mAh', '9 years warranty', 'Wireless', 1442347356, 'Red', 1, 1320.17, 'purple'),
(247, 462, 'Lithium 65mAh', '2 years warranty', 'Wireless', 169326800, 'Brown', 1, 1332.42, 'magenta'),
(248, 464, 'Lithium 52mAh', '2 years warranty', 'Wireless', -1654060654, 'Red', 0, 1262.63, 'mint green'),
(249, 466, 'Lithium 15mAh', '5 years warranty', 'Wireless', 514818685, 'Blue', 1, 1110.04, 'white'),
(250, 470, 'Lithium 59mAh', '6 years warranty', 'Wired', -341500336, 'Red', 0, 751.685, 'black'),
(251, 471, 'Lithium 96mAh', '6 years warranty', 'Wired', -1928615386, 'Blue', 0, 1073.54, 'magenta'),
(252, 473, 'Lithium 69mAh', '1 years warranty', 'Wireless', -1336289842, 'Blue', 1, 1372.76, 'white'),
(253, 474, 'Lithium 53mAh', '7 years warranty', 'Wired', -217368438, 'Brown', 0, 503.812, 'olive'),
(254, 478, 'Lithium 75mAh', '6 years warranty', 'Wired', 872198776, 'Red', 1, 720.241, 'silver'),
(255, 480, 'Lithium 99mAh', '9 years warranty', 'Wireless', 1755905912, 'Red', 1, 1224.38, 'blue'),
(256, 481, 'Lithium 35mAh', '9 years warranty', 'Wireless', -172109941, 'Brown', 0, 1176.74, 'grey'),
(257, 483, 'Lithium 92mAh', '8 years warranty', 'Wired', -1750786445, 'Optical', 1, 985.867, 'ivory'),
(258, 484, 'Lithium 61mAh', '6 years warranty', 'Wireless', -1597510152, 'Optical', 0, 715.826, 'black'),
(259, 485, 'Lithium 06mAh', '0 years warranty', 'Wired', -54040206, 'Optical', 0, 1257.29, 'gold'),
(260, 486, 'Lithium 85mAh', '5 years warranty', 'Wired', -59516955, 'Red', 0, 845.449, 'pink'),
(261, 488, 'Lithium 96mAh', '5 years warranty', 'Wired', -1464290110, 'Blue', 1, 1165.74, 'yellow'),
(262, 492, 'Lithium 48mAh', '0 years warranty', 'Wired', -1461198072, 'Optical', 1, 508.483, 'magenta'),
(263, 493, 'Lithium 73mAh', '5 years warranty', 'Wired', -225852437, 'Optical', 1, 1169.5, 'fuchsia'),
(264, 494, 'Lithium 21mAh', '1 years warranty', 'Wireless', -369937775, 'Optical', 1, 1113.13, 'magenta'),
(265, 496, 'Lithium 17mAh', '9 years warranty', 'Wireless', -603298782, 'Red', 1, 672.88, 'fuchsia'),
(266, 498, 'Lithium 22mAh', '5 years warranty', 'Wired', 299746420, 'Red', 0, 1467.98, 'black'),
(267, 502, 'Lithium 73mAh', '8 years warranty', 'Wireless', 732005271, 'Brown', 1, 765.807, 'tan'),
(268, 503, 'Lithium 08mAh', '7 years warranty', 'Wireless', 1195559284, 'Optical', 1, 643.157, 'teal'),
(269, 505, 'Lithium 16mAh', '8 years warranty', 'Wired', -379793103, 'Red', 1, 1393.68, 'plum'),
(270, 506, 'Lithium 72mAh', '4 years warranty', 'Wired', -958390017, 'Blue', 1, 1415.23, 'mint green'),
(271, 507, 'Lithium 58mAh', '1 years warranty', 'Wired', 865658616, 'Red', 1, 1305.18, 'plum'),
(272, 508, 'Lithium 66mAh', '9 years warranty', 'Wired', 1795242732, 'Optical', 1, 1020.61, 'sky blue'),
(273, 509, 'Lithium 50mAh', '8 years warranty', 'Wired', -1991712668, 'Red', 1, 745.327, 'red'),
(274, 510, 'Lithium 79mAh', '5 years warranty', 'Wired', 1081991993, 'Optical', 1, 1374.41, 'grey'),
(275, 511, 'Lithium 60mAh', '0 years warranty', 'Wireless', -435958229, 'Blue', 0, 1381.99, 'sky blue'),
(276, 513, 'Lithium 53mAh', '3 years warranty', 'Wireless', -1964189169, 'Red', 0, 637.469, 'grey'),
(277, 515, 'Lithium 77mAh', '1 years warranty', 'Wireless', -371972374, 'Brown', 1, 750.774, 'blue'),
(278, 516, 'Lithium 39mAh', '0 years warranty', 'Wired', 244846252, 'Blue', 1, 769.961, 'blue'),
(279, 517, 'Lithium 98mAh', '0 years warranty', 'Wired', 1515074613, 'Red', 1, 1098.52, 'violet'),
(280, 519, 'Lithium 65mAh', '9 years warranty', 'Wired', 1894284217, 'Optical', 0, 1386.08, 'pink'),
(281, 526, 'Lithium 27mAh', '2 years warranty', 'Wireless', -571910391, 'Blue', 1, 660.227, 'violet'),
(282, 527, 'Lithium 94mAh', '4 years warranty', 'Wired', 1040156111, 'Blue', 0, 1058.62, 'pink'),
(283, 530, 'Lithium 59mAh', '1 years warranty', 'Wired', 1831520228, 'Blue', 0, 1032.56, 'olive'),
(284, 536, 'Lithium 04mAh', '5 years warranty', 'Wireless', 2021686962, 'Brown', 0, 872.447, 'orchid'),
(285, 539, 'Lithium 36mAh', '0 years warranty', 'Wired', 694662756, 'Brown', 0, 1005.09, 'plum'),
(286, 540, 'Lithium 13mAh', '2 years warranty', 'Wireless', -1744141219, 'Blue', 0, 1201.95, 'ivory'),
(287, 542, 'Lithium 52mAh', '2 years warranty', 'Wired', 73501822, 'Optical', 1, 766.358, 'ivory'),
(288, 544, 'Lithium 61mAh', '0 years warranty', 'Wireless', 404149842, 'Blue', 0, 1314.92, 'orchid'),
(289, 546, 'Lithium 62mAh', '2 years warranty', 'Wireless', 1463668817, 'Red', 0, 756.929, 'pink'),
(290, 547, 'Lithium 92mAh', '9 years warranty', 'Wired', -1787649956, 'Optical', 1, 1071.24, 'mint green'),
(291, 548, 'Lithium 53mAh', '3 years warranty', 'Wireless', 1777129026, 'Red', 1, 511.655, 'indigo'),
(292, 549, 'Lithium 21mAh', '5 years warranty', 'Wired', 937787391, 'Brown', 0, 1474.68, 'lavender'),
(293, 553, 'Lithium 85mAh', '3 years warranty', 'Wired', 1445881370, 'Blue', 0, 1493.08, 'silver'),
(294, 554, 'Lithium 22mAh', '2 years warranty', 'Wireless', 1541069771, 'Brown', 0, 649.827, 'green'),
(295, 555, 'Lithium 47mAh', '3 years warranty', 'Wireless', -1757807033, 'Optical', 1, 682.283, 'green'),
(296, 557, 'Lithium 41mAh', '7 years warranty', 'Wireless', 1682481956, 'Brown', 1, 1179.26, 'grey'),
(297, 558, 'Lithium 70mAh', '9 years warranty', 'Wireless', -1784757556, 'Blue', 0, 1029.82, 'plum'),
(298, 559, 'Lithium 67mAh', '4 years warranty', 'Wireless', 579251323, 'Blue', 0, 825.517, 'gold'),
(299, 562, 'Lithium 85mAh', '7 years warranty', 'Wired', 2016595320, 'Brown', 1, 1118.67, 'orange'),
(300, 563, 'Lithium 90mAh', '2 years warranty', 'Wired', -1437321110, 'Brown', 0, 1465.36, 'red'),
(301, 564, 'Lithium 05mAh', '2 years warranty', 'Wireless', -155334272, 'Blue', 0, 1388.73, 'violet'),
(302, 565, 'Lithium 54mAh', '9 years warranty', 'Wired', 842001212, 'Optical', 1, 814.104, 'silver'),
(303, 569, 'Lithium 05mAh', '2 years warranty', 'Wireless', -1717852834, 'Blue', 0, 1026.3, 'plum'),
(304, 570, 'Lithium 19mAh', '7 years warranty', 'Wired', 2094353525, 'Optical', 0, 978.614, 'plum'),
(305, 572, 'Lithium 43mAh', '3 years warranty', 'Wired', 273719358, 'Red', 1, 959.636, 'white'),
(306, 573, 'Lithium 26mAh', '7 years warranty', 'Wired', 1091117935, 'Red', 1, 1012.64, 'white'),
(307, 574, 'Lithium 96mAh', '5 years warranty', 'Wired', -1417505981, 'Red', 0, 557.177, 'violet'),
(308, 575, 'Lithium 41mAh', '8 years warranty', 'Wireless', 1921510121, 'Red', 1, 697.181, 'pink'),
(309, 577, 'Lithium 41mAh', '4 years warranty', 'Wireless', -194259465, 'Brown', 0, 1173.5, 'azure'),
(310, 578, 'Lithium 34mAh', '6 years warranty', 'Wireless', -1556458343, 'Optical', 0, 1277.46, 'maroon'),
(311, 579, 'Lithium 86mAh', '2 years warranty', 'Wired', 1218026748, 'Blue', 0, 1449.62, 'lavender'),
(312, 582, 'Lithium 31mAh', '9 years warranty', 'Wireless', 422091881, 'Optical', 1, 1382.39, 'cyan'),
(313, 583, 'Lithium 96mAh', '5 years warranty', 'Wireless', -1320860064, 'Optical', 1, 645.828, 'mint green'),
(314, 585, 'Lithium 11mAh', '2 years warranty', 'Wireless', 1755245486, 'Blue', 1, 1144.8, 'ivory'),
(315, 586, 'Lithium 05mAh', '6 years warranty', 'Wireless', 818028952, 'Optical', 0, 628.809, 'olive'),
(316, 587, 'Lithium 08mAh', '1 years warranty', 'Wireless', 1408211518, 'Optical', 0, 843.633, 'black'),
(317, 590, 'Lithium 86mAh', '2 years warranty', 'Wireless', 1508034629, 'Brown', 0, 769.574, 'lime'),
(318, 592, 'Lithium 23mAh', '7 years warranty', 'Wireless', -941261681, 'Optical', 0, 701.28, 'teal'),
(319, 593, 'Lithium 60mAh', '5 years warranty', 'Wired', -686204987, 'Blue', 1, 670.409, 'fuchsia'),
(320, 596, 'Lithium 79mAh', '0 years warranty', 'Wireless', 1193249502, 'Red', 1, 684.32, 'lime'),
(321, 597, 'Lithium 53mAh', '4 years warranty', 'Wired', -1834855175, 'Red', 0, 894.484, 'tan'),
(322, 598, 'Lithium 64mAh', '7 years warranty', 'Wired', 1405904459, 'Brown', 1, 802.222, 'cyan'),
(323, 599, 'Lithium 92mAh', '9 years warranty', 'Wireless', -1952465529, 'Red', 0, 1301.95, 'yellow'),
(324, 600, 'Lithium 17mAh', '8 years warranty', 'Wireless', -183139995, 'Blue', 0, 1281.91, 'indigo'),
(325, 602, 'Lithium 22mAh', '1 years warranty', 'Wired', 2143129633, 'Optical', 1, 502.142, 'fuchsia'),
(326, 605, 'Lithium 22mAh', '1 years warranty', 'Wireless', -894334697, 'Blue', 1, 891.575, 'silver'),
(327, 610, 'Lithium 36mAh', '2 years warranty', 'Wireless', 1671695509, 'Red', 1, 1337.74, 'salmon'),
(328, 613, 'Lithium 55mAh', '2 years warranty', 'Wireless', 923374150, 'Blue', 1, 1468.19, 'cyan'),
(329, 615, 'Lithium 95mAh', '1 years warranty', 'Wired', -2053579459, 'Brown', 1, 1409.61, 'magenta'),
(330, 616, 'Lithium 59mAh', '2 years warranty', 'Wired', -1034369186, 'Optical', 0, 524.508, 'yellow'),
(331, 623, 'Lithium 54mAh', '8 years warranty', 'Wired', 770839303, 'Red', 0, 863.676, 'blue'),
(332, 625, 'Lithium 54mAh', '1 years warranty', 'Wired', 942570748, 'Brown', 0, 1417.91, 'pink'),
(333, 627, 'Lithium 92mAh', '9 years warranty', 'Wireless', 1804118635, 'Optical', 1, 1490.38, 'orchid'),
(334, 628, 'Lithium 42mAh', '5 years warranty', 'Wired', 287734621, 'Red', 1, 1147.82, 'violet'),
(335, 629, 'Lithium 32mAh', '2 years warranty', 'Wired', -208267849, 'Red', 0, 554.89, 'orange'),
(336, 630, 'Lithium 68mAh', '8 years warranty', 'Wireless', -414809376, 'Brown', 0, 956.408, 'violet'),
(337, 631, 'Lithium 57mAh', '7 years warranty', 'Wired', -708628003, 'Optical', 0, 1482.43, 'silver'),
(338, 633, 'Lithium 97mAh', '2 years warranty', 'Wired', -543018988, 'Brown', 0, 1253.63, 'tan'),
(339, 634, 'Lithium 61mAh', '6 years warranty', 'Wireless', -360527933, 'Brown', 1, 544.337, 'sky blue'),
(340, 636, 'Lithium 26mAh', '0 years warranty', 'Wireless', -1921114202, 'Blue', 0, 855.87, 'plum'),
(341, 639, 'Lithium 57mAh', '0 years warranty', 'Wireless', -2047520714, 'Brown', 1, 863.612, 'yellow'),
(342, 640, 'Lithium 69mAh', '2 years warranty', 'Wireless', 1562893603, 'Optical', 0, 785.479, 'lavender'),
(343, 641, 'Lithium 22mAh', '6 years warranty', 'Wired', -942649883, 'Red', 1, 1307.51, 'salmon'),
(344, 647, 'Lithium 90mAh', '0 years warranty', 'Wired', -262088728, 'Optical', 1, 1028.28, 'lime'),
(345, 648, 'Lithium 83mAh', '2 years warranty', 'Wired', 1445354268, 'Blue', 1, 757.159, 'purple'),
(346, 649, 'Lithium 78mAh', '1 years warranty', 'Wireless', -837169408, 'Optical', 0, 509.832, 'grey'),
(347, 651, 'Lithium 97mAh', '1 years warranty', 'Wired', 40422166, 'Blue', 0, 1037.36, 'blue'),
(348, 653, 'Lithium 27mAh', '8 years warranty', 'Wired', 779089503, 'Blue', 0, 571.077, 'yellow'),
(349, 656, 'Lithium 92mAh', '4 years warranty', 'Wired', -146202085, 'Red', 1, 1245.58, 'violet'),
(350, 658, 'Lithium 62mAh', '8 years warranty', 'Wireless', 1799966028, 'Red', 0, 1094.86, 'gold'),
(351, 659, 'Lithium 27mAh', '4 years warranty', 'Wired', 531157004, 'Optical', 0, 1287.43, 'lime'),
(352, 662, 'Lithium 75mAh', '5 years warranty', 'Wireless', -206537704, 'Red', 1, 1104.19, 'mint green'),
(353, 664, 'Lithium 90mAh', '0 years warranty', 'Wireless', -2011599200, 'Blue', 1, 604.44, 'silver'),
(354, 665, 'Lithium 06mAh', '7 years warranty', 'Wired', 1487406560, 'Blue', 1, 1343.55, 'green'),
(355, 667, 'Lithium 13mAh', '4 years warranty', 'Wired', -2117560839, 'Red', 0, 766.328, 'indigo'),
(356, 668, 'Lithium 68mAh', '3 years warranty', 'Wireless', 1162360269, 'Optical', 0, 779.683, 'salmon'),
(357, 672, 'Lithium 48mAh', '8 years warranty', 'Wired', -1567866994, 'Brown', 1, 1211.74, 'tan'),
(358, 676, 'Lithium 71mAh', '8 years warranty', 'Wireless', -553695991, 'Optical', 1, 629.688, 'gold'),
(359, 677, 'Lithium 27mAh', '7 years warranty', 'Wired', -209022070, 'Blue', 0, 755.042, 'sky blue'),
(360, 680, 'Lithium 21mAh', '4 years warranty', 'Wired', 1405889365, 'Blue', 0, 1042.7, 'grey'),
(361, 681, 'Lithium 35mAh', '9 years warranty', 'Wired', 526746401, 'Brown', 1, 840.396, 'yellow'),
(362, 682, 'Lithium 60mAh', '3 years warranty', 'Wired', -1984853358, 'Optical', 1, 1173.06, 'red'),
(363, 684, 'Lithium 75mAh', '5 years warranty', 'Wired', -1292059908, 'Blue', 0, 875.88, 'green'),
(364, 685, 'Lithium 53mAh', '8 years warranty', 'Wireless', -2015330729, 'Optical', 0, 1309.09, 'tan'),
(365, 686, 'Lithium 86mAh', '4 years warranty', 'Wireless', 1530680177, 'Brown', 1, 1324.57, 'ivory'),
(366, 687, 'Lithium 64mAh', '5 years warranty', 'Wireless', 1965149075, 'Brown', 0, 1392.87, 'plum'),
(367, 688, 'Lithium 83mAh', '6 years warranty', 'Wired', 1403993821, 'Brown', 0, 1077.33, 'silver'),
(368, 690, 'Lithium 04mAh', '8 years warranty', 'Wired', -2048012646, 'Optical', 0, 1252.12, 'fuchsia'),
(369, 692, 'Lithium 98mAh', '6 years warranty', 'Wired', -1650259306, 'Red', 1, 637.823, 'silver'),
(370, 693, 'Lithium 15mAh', '3 years warranty', 'Wireless', 1140233611, 'Blue', 0, 528.756, 'white'),
(371, 694, 'Lithium 85mAh', '6 years warranty', 'Wired', -583978738, 'Optical', 0, 1194.14, 'sky blue'),
(372, 696, 'Lithium 26mAh', '2 years warranty', 'Wireless', 1966501489, 'Blue', 0, 879.898, 'gold'),
(373, 697, 'Lithium 35mAh', '9 years warranty', 'Wired', -1066364245, 'Red', 0, 1415.03, 'gold'),
(374, 698, 'Lithium 51mAh', '1 years warranty', 'Wired', -1924842618, 'Brown', 0, 1457.18, 'salmon'),
(375, 699, 'Lithium 92mAh', '0 years warranty', 'Wired', 1562562924, 'Blue', 1, 928.931, 'sky blue'),
(376, 701, 'Lithium 69mAh', '9 years warranty', 'Wireless', 1503297044, 'Optical', 1, 854.427, 'plum'),
(377, 702, 'Lithium 11mAh', '9 years warranty', 'Wireless', -1805471314, 'Brown', 1, 652.977, 'blue'),
(378, 703, 'Lithium 49mAh', '6 years warranty', 'Wireless', 493109210, 'Blue', 1, 764.344, 'mint green'),
(379, 704, 'Lithium 28mAh', '5 years warranty', 'Wired', 119252455, 'Optical', 0, 602.537, 'azure'),
(380, 705, 'Lithium 24mAh', '9 years warranty', 'Wireless', -1677478867, 'Brown', 0, 756.66, 'violet'),
(381, 708, 'Lithium 64mAh', '5 years warranty', 'Wired', -906664981, 'Blue', 1, 681.493, 'lavender'),
(382, 709, 'Lithium 12mAh', '7 years warranty', 'Wired', 634026679, 'Brown', 1, 866.365, 'cyan'),
(383, 710, 'Lithium 03mAh', '9 years warranty', 'Wireless', -1786989063, 'Optical', 0, 862.304, 'tan'),
(384, 711, 'Lithium 35mAh', '8 years warranty', 'Wireless', 1846184766, 'Brown', 0, 1070.66, 'white'),
(385, 712, 'Lithium 86mAh', '7 years warranty', 'Wireless', 1003292561, 'Red', 1, 990.143, 'lavender'),
(386, 713, 'Lithium 06mAh', '9 years warranty', 'Wired', -1944531024, 'Brown', 0, 1356.28, 'turquoise'),
(387, 715, 'Lithium 22mAh', '8 years warranty', 'Wireless', -1581807009, 'Red', 1, 996.349, 'purple'),
(388, 716, 'Lithium 82mAh', '2 years warranty', 'Wired', -713293510, 'Brown', 1, 1404.47, 'orchid'),
(389, 717, 'Lithium 34mAh', '0 years warranty', 'Wired', 1985970695, 'Brown', 0, 693.425, 'blue'),
(390, 719, 'Lithium 34mAh', '7 years warranty', 'Wired', 1309669414, 'Red', 0, 1216.27, 'purple'),
(391, 721, 'Lithium 56mAh', '2 years warranty', 'Wired', -115911727, 'Optical', 1, 1094.66, 'black'),
(392, 722, 'Lithium 91mAh', '5 years warranty', 'Wireless', 84693061, 'Red', 0, 1093.72, 'silver'),
(393, 723, 'Lithium 62mAh', '3 years warranty', 'Wired', -1467879284, 'Optical', 0, 673.269, 'maroon'),
(394, 726, 'Lithium 12mAh', '7 years warranty', 'Wireless', 1625978777, 'Red', 0, 546.329, 'sky blue'),
(395, 727, 'Lithium 10mAh', '1 years warranty', 'Wireless', -247399283, 'Brown', 0, 873.433, 'blue'),
(396, 731, 'Lithium 15mAh', '7 years warranty', 'Wired', 567309979, 'Optical', 0, 993.685, 'orchid'),
(397, 733, 'Lithium 02mAh', '3 years warranty', 'Wireless', -1056709306, 'Red', 0, 999.703, 'orchid'),
(398, 735, 'Lithium 82mAh', '6 years warranty', 'Wireless', 854218082, 'Optical', 0, 1059.31, 'olive'),
(399, 738, 'Lithium 01mAh', '3 years warranty', 'Wired', 1862817947, 'Blue', 0, 752.501, 'orchid'),
(400, 739, 'Lithium 41mAh', '8 years warranty', 'Wireless', 536189592, 'Blue', 0, 984.95, 'silver'),
(401, 740, 'Lithium 42mAh', '3 years warranty', 'Wireless', 708541266, 'Red', 1, 1469.62, 'yellow'),
(402, 742, 'Lithium 79mAh', '0 years warranty', 'Wireless', 319151137, 'Optical', 1, 1129.22, 'sky blue'),
(403, 743, 'Lithium 38mAh', '7 years warranty', 'Wireless', -2070107749, 'Optical', 0, 1134.23, 'magenta'),
(404, 747, 'Lithium 14mAh', '0 years warranty', 'Wired', -151121221, 'Blue', 1, 681.954, 'teal'),
(405, 750, 'Lithium 04mAh', '2 years warranty', 'Wireless', 1741052499, 'Blue', 1, 884.876, 'white'),
(406, 751, 'Lithium 14mAh', '1 years warranty', 'Wireless', -1005549248, 'Optical', 0, 1056.03, 'pink'),
(407, 753, 'Lithium 73mAh', '0 years warranty', 'Wired', 1755227395, 'Brown', 0, 1315.79, 'indigo'),
(408, 755, 'Lithium 26mAh', '9 years warranty', 'Wired', 351519594, 'Brown', 1, 1497.2, 'sky blue'),
(409, 756, 'Lithium 08mAh', '9 years warranty', 'Wired', 2009147919, 'Brown', 0, 834.602, 'white'),
(410, 759, 'Lithium 21mAh', '7 years warranty', 'Wireless', -1974591147, 'Brown', 1, 1301.59, 'ivory'),
(411, 760, 'Lithium 81mAh', '4 years warranty', 'Wireless', 1591295197, 'Blue', 0, 1269.61, 'grey'),
(412, 762, 'Lithium 77mAh', '6 years warranty', 'Wireless', -609330916, 'Brown', 1, 808.058, 'maroon'),
(413, 764, 'Lithium 77mAh', '2 years warranty', 'Wireless', -1864122253, 'Red', 0, 1180.04, 'blue'),
(414, 765, 'Lithium 07mAh', '6 years warranty', 'Wired', 1523091177, 'Brown', 0, 731.693, 'mint green'),
(415, 766, 'Lithium 06mAh', '6 years warranty', 'Wired', -1719693675, 'Brown', 0, 1133.4, 'salmon'),
(416, 767, 'Lithium 57mAh', '7 years warranty', 'Wireless', -1240037849, 'Blue', 0, 525.82, 'pink'),
(417, 768, 'Lithium 19mAh', '9 years warranty', 'Wired', 976496563, 'Red', 1, 1042.32, 'blue'),
(418, 769, 'Lithium 31mAh', '5 years warranty', 'Wireless', 887890824, 'Optical', 1, 988.471, 'gold'),
(419, 770, 'Lithium 80mAh', '1 years warranty', 'Wired', 1685894656, 'Blue', 1, 1009.54, 'pink'),
(420, 771, 'Lithium 93mAh', '6 years warranty', 'Wired', 1482163242, 'Blue', 0, 1213.51, 'grey'),
(421, 776, 'Lithium 32mAh', '4 years warranty', 'Wireless', 1589468783, 'Red', 1, 1180.67, 'olive'),
(422, 778, 'Lithium 02mAh', '6 years warranty', 'Wireless', 272131909, 'Optical', 1, 553.954, 'sky blue'),
(423, 779, 'Lithium 12mAh', '4 years warranty', 'Wireless', 1347341646, 'Red', 0, 943.456, 'red'),
(424, 781, 'Lithium 10mAh', '7 years warranty', 'Wired', 1009831074, 'Optical', 0, 1468.68, 'orchid'),
(425, 782, 'Lithium 79mAh', '4 years warranty', 'Wireless', 1065550016, 'Brown', 0, 1326.89, 'green'),
(426, 784, 'Lithium 62mAh', '5 years warranty', 'Wireless', 527302914, 'Brown', 0, 552.815, 'cyan'),
(427, 785, 'Lithium 32mAh', '1 years warranty', 'Wireless', -1956952626, 'Optical', 0, 546.767, 'green'),
(428, 787, 'Lithium 28mAh', '3 years warranty', 'Wired', -501371265, 'Blue', 1, 1217.84, 'purple'),
(429, 788, 'Lithium 95mAh', '4 years warranty', 'Wired', 1449334623, 'Red', 1, 972.899, 'violet'),
(430, 789, 'Lithium 46mAh', '1 years warranty', 'Wired', -621692794, 'Optical', 0, 1017.54, 'turquoise'),
(431, 791, 'Lithium 96mAh', '8 years warranty', 'Wired', -1243383621, 'Optical', 0, 605.756, 'sky blue'),
(432, 795, 'Lithium 96mAh', '8 years warranty', 'Wireless', -1379809301, 'Red', 0, 1333.43, 'purple'),
(433, 796, 'Lithium 34mAh', '2 years warranty', 'Wired', 1314397878, 'Brown', 0, 623.776, 'pink'),
(434, 797, 'Lithium 85mAh', '9 years warranty', 'Wired', -1363610368, 'Blue', 0, 1225.41, 'gold'),
(435, 798, 'Lithium 74mAh', '8 years warranty', 'Wired', -1868614172, 'Red', 1, 868.842, 'yellow'),
(436, 803, 'Lithium 85mAh', '8 years warranty', 'Wireless', 1591200650, 'Red', 1, 734.406, 'olive'),
(437, 804, 'Lithium 57mAh', '1 years warranty', 'Wireless', -2129951607, 'Optical', 0, 1232.98, 'maroon'),
(438, 805, 'Lithium 69mAh', '6 years warranty', 'Wired', 659034317, 'Brown', 1, 1494.24, 'azure'),
(439, 808, 'Lithium 70mAh', '9 years warranty', 'Wired', -1800556492, 'Brown', 1, 1473.99, 'red'),
(440, 811, 'Lithium 59mAh', '0 years warranty', 'Wired', 402719762, 'Brown', 0, 781.572, 'tan'),
(441, 812, 'Lithium 32mAh', '9 years warranty', 'Wireless', 1923629274, 'Brown', 0, 527.308, 'blue'),
(442, 813, 'Lithium 95mAh', '1 years warranty', 'Wired', -638426409, 'Red', 1, 774.491, 'grey'),
(443, 814, 'Lithium 87mAh', '4 years warranty', 'Wireless', -1185035266, 'Red', 0, 1259.7, 'yellow'),
(444, 819, 'Lithium 21mAh', '7 years warranty', 'Wired', -1166471053, 'Optical', 0, 1463.83, 'silver'),
(445, 820, 'Lithium 37mAh', '1 years warranty', 'Wired', 199265856, 'Red', 0, 1071.86, 'gold'),
(446, 821, 'Lithium 18mAh', '5 years warranty', 'Wired', 1733201999, 'Blue', 0, 1065.5, 'indigo'),
(447, 823, 'Lithium 69mAh', '2 years warranty', 'Wired', -311092037, 'Blue', 0, 1049.11, 'violet'),
(448, 824, 'Lithium 18mAh', '2 years warranty', 'Wired', 1469798745, 'Red', 1, 551, 'ivory'),
(449, 825, 'Lithium 29mAh', '1 years warranty', 'Wired', 338422225, 'Brown', 0, 814.396, 'indigo'),
(450, 826, 'Lithium 27mAh', '6 years warranty', 'Wired', -782359607, 'Optical', 0, 1388.14, 'lavender'),
(451, 827, 'Lithium 23mAh', '2 years warranty', 'Wired', -1595371102, 'Optical', 0, 1069.42, 'green'),
(452, 829, 'Lithium 14mAh', '8 years warranty', 'Wireless', -372870126, 'Red', 1, 1451.65, 'turquoise'),
(453, 831, 'Lithium 25mAh', '7 years warranty', 'Wireless', 114300759, 'Optical', 1, 1284.14, 'teal'),
(454, 833, 'Lithium 56mAh', '9 years warranty', 'Wired', -1606508915, 'Blue', 1, 650.833, 'pink'),
(455, 835, 'Lithium 58mAh', '8 years warranty', 'Wired', 418747626, 'Blue', 0, 1468.97, 'white'),
(456, 836, 'Lithium 46mAh', '2 years warranty', 'Wired', 1702060309, 'Brown', 0, 610.047, 'salmon'),
(457, 837, 'Lithium 62mAh', '7 years warranty', 'Wired', -1533004659, 'Blue', 0, 843.108, 'blue'),
(458, 840, 'Lithium 30mAh', '1 years warranty', 'Wireless', 204877900, 'Optical', 0, 1389.53, 'orchid'),
(459, 841, 'Lithium 74mAh', '6 years warranty', 'Wireless', -1751956709, 'Brown', 0, 501.785, 'white'),
(460, 842, 'Lithium 05mAh', '4 years warranty', 'Wired', -1924990274, 'Optical', 0, 1245.12, 'gold'),
(461, 843, 'Lithium 03mAh', '5 years warranty', 'Wireless', -374975555, 'Optical', 1, 662.515, 'gold'),
(462, 845, 'Lithium 76mAh', '2 years warranty', 'Wireless', -358917029, 'Optical', 0, 1046.5, 'mint green'),
(463, 846, 'Lithium 49mAh', '7 years warranty', 'Wireless', 418812478, 'Blue', 0, 1383.32, 'green'),
(464, 847, 'Lithium 07mAh', '9 years warranty', 'Wireless', -1041181815, 'Brown', 0, 704.462, 'blue'),
(465, 850, 'Lithium 60mAh', '6 years warranty', 'Wired', 17715178, 'Brown', 1, 1473.46, 'magenta'),
(466, 851, 'Lithium 26mAh', '3 years warranty', 'Wireless', 1299626424, 'Red', 0, 1478.39, 'plum'),
(467, 853, 'Lithium 23mAh', '9 years warranty', 'Wired', 1771903893, 'Optical', 0, 844.52, 'blue'),
(468, 855, 'Lithium 63mAh', '6 years warranty', 'Wireless', -585759279, 'Blue', 0, 1446.11, 'turquoise'),
(469, 856, 'Lithium 17mAh', '6 years warranty', 'Wireless', -245017239, 'Red', 1, 642.032, 'white'),
(470, 857, 'Lithium 47mAh', '8 years warranty', 'Wireless', 1872466122, 'Blue', 1, 1198.96, 'turquoise'),
(471, 859, 'Lithium 32mAh', '6 years warranty', 'Wireless', -1102062938, 'Blue', 0, 548.953, 'orchid'),
(472, 860, 'Lithium 79mAh', '4 years warranty', 'Wired', 168080135, 'Optical', 1, 659.422, 'olive'),
(473, 862, 'Lithium 84mAh', '9 years warranty', 'Wireless', 667133121, 'Optical', 0, 566.467, 'fuchsia'),
(474, 864, 'Lithium 73mAh', '9 years warranty', 'Wired', 679475393, 'Red', 1, 1458.75, 'orange'),
(475, 865, 'Lithium 70mAh', '6 years warranty', 'Wired', -1031522973, 'Brown', 1, 1203.59, 'lavender'),
(476, 866, 'Lithium 65mAh', '6 years warranty', 'Wireless', -1172914162, 'Blue', 1, 1018.16, 'turquoise'),
(477, 867, 'Lithium 70mAh', '3 years warranty', 'Wireless', 1405598377, 'Blue', 0, 1310.54, 'pink'),
(478, 869, 'Lithium 14mAh', '9 years warranty', 'Wired', -1578977824, 'Brown', 1, 1447.5, 'turquoise'),
(479, 870, 'Lithium 11mAh', '7 years warranty', 'Wireless', -1205475083, 'Red', 0, 1298.8, 'plum'),
(480, 872, 'Lithium 42mAh', '3 years warranty', 'Wireless', -1918426327, 'Brown', 1, 790.963, 'green'),
(481, 873, 'Lithium 52mAh', '6 years warranty', 'Wired', -177227583, 'Optical', 1, 835.176, 'green'),
(482, 875, 'Lithium 36mAh', '8 years warranty', 'Wireless', 238757726, 'Brown', 1, 874.48, 'ivory'),
(483, 880, 'Lithium 73mAh', '2 years warranty', 'Wireless', 1225153368, 'Optical', 1, 1287.69, 'violet'),
(484, 882, 'Lithium 62mAh', '7 years warranty', 'Wired', 866322839, 'Brown', 1, 529.795, 'plum'),
(485, 883, 'Lithium 09mAh', '3 years warranty', 'Wired', 1757441513, 'Brown', 0, 1309.75, 'pink'),
(486, 886, 'Lithium 17mAh', '1 years warranty', 'Wireless', -230041409, 'Blue', 1, 849.545, 'orchid'),
(487, 887, 'Lithium 83mAh', '8 years warranty', 'Wireless', -646349835, 'Blue', 1, 1291.83, 'fuchsia'),
(488, 889, 'Lithium 29mAh', '5 years warranty', 'Wireless', -1526945843, 'Brown', 0, 1373.63, 'lime'),
(489, 894, 'Lithium 96mAh', '0 years warranty', 'Wireless', 1816835794, 'Blue', 1, 1195.65, 'fuchsia'),
(490, 895, 'Lithium 25mAh', '5 years warranty', 'Wireless', 1490638943, 'Brown', 0, 800.259, 'grey'),
(491, 898, 'Lithium 69mAh', '7 years warranty', 'Wired', 596232183, 'Brown', 0, 782.629, 'silver'),
(492, 899, 'Lithium 67mAh', '4 years warranty', 'Wireless', -1415138559, 'Red', 1, 999.538, 'fuchsia'),
(493, 901, 'Lithium 17mAh', '0 years warranty', 'Wired', -2021845907, 'Brown', 0, 1335.2, 'olive'),
(494, 906, 'Lithium 39mAh', '3 years warranty', 'Wireless', -649158993, 'Brown', 1, 972.468, 'silver'),
(495, 911, 'Lithium 20mAh', '6 years warranty', 'Wireless', 1024346892, 'Brown', 1, 1343.92, 'indigo'),
(496, 912, 'Lithium 99mAh', '0 years warranty', 'Wireless', 227881070, 'Red', 1, 1135.3, 'white'),
(497, 915, 'Lithium 13mAh', '1 years warranty', 'Wireless', 1608410475, 'Blue', 0, 686.842, 'green'),
(498, 916, 'Lithium 66mAh', '1 years warranty', 'Wired', -1107030835, 'Optical', 0, 1101.43, 'grey'),
(499, 917, 'Lithium 48mAh', '7 years warranty', 'Wired', 403211911, 'Brown', 1, 741.348, 'lavender'),
(500, 918, 'Lithium 42mAh', '3 years warranty', 'Wireless', 871795244, 'Brown', 0, 1094.29, 'purple'),
(501, 921, 'Lithium 03mAh', '7 years warranty', 'Wired', 635762751, 'Brown', 0, 1115.19, 'sky blue');
INSERT INTO `keyboard_specs` (`id`, `product_id`, `battery`, `warranty`, `connection_type`, `num_keys`, `switch_type`, `led`, `weight`, `color`) VALUES
(502, 922, 'Lithium 41mAh', '1 years warranty', 'Wired', -386122075, 'Optical', 1, 938.262, 'cyan'),
(503, 924, 'Lithium 53mAh', '8 years warranty', 'Wireless', 711008646, 'Optical', 0, 974.274, 'gold'),
(504, 925, 'Lithium 02mAh', '0 years warranty', 'Wired', -1424057169, 'Blue', 1, 703.615, 'cyan'),
(505, 926, 'Lithium 99mAh', '1 years warranty', 'Wired', 628823947, 'Blue', 0, 826.301, 'plum'),
(506, 927, 'Lithium 52mAh', '2 years warranty', 'Wireless', -2132544387, 'Blue', 1, 1375.51, 'mint green'),
(507, 929, 'Lithium 73mAh', '7 years warranty', 'Wired', -1462011571, 'Blue', 0, 795.906, 'white'),
(508, 931, 'Lithium 12mAh', '9 years warranty', 'Wired', -64301940, 'Red', 0, 734.476, 'magenta'),
(509, 933, 'Lithium 66mAh', '2 years warranty', 'Wired', 622724070, 'Optical', 1, 914.93, 'olive'),
(510, 934, 'Lithium 50mAh', '7 years warranty', 'Wired', -1009741920, 'Brown', 1, 862.51, 'mint green'),
(511, 935, 'Lithium 14mAh', '6 years warranty', 'Wired', 2064489603, 'Brown', 0, 814.152, 'ivory'),
(512, 938, 'Lithium 51mAh', '6 years warranty', 'Wired', 91136777, 'Red', 0, 841.98, 'lime'),
(513, 939, 'Lithium 25mAh', '2 years warranty', 'Wired', 1216209, 'Blue', 1, 954.298, 'teal'),
(516, 944, 'pin sieu trau', '100 years warranty', 'bluetooh', 96, 'Red Switch', 1, 1265.36, 'lime');

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
(1, 1, '100 mAh', '1 years', 100, 'Wireless', 1, 50.6, 'dirty blue'),
(2, 3, 'Lithium-ion 65mAh', '2 years warranty', 1887, 'Wired', 1, 196.383, 'turquoise'),
(3, 5, 'Lithium-ion 63mAh', '7 years warranty', 11193, 'Wired', 1, 199.087, 'silver'),
(4, 9, 'Lithium-ion 33mAh', '2 years warranty', 13506, 'Wired', 1, 172.612, 'azure'),
(5, 14, 'Lithium-ion 26mAh', '2 years warranty', 13760, 'Wireless', 1, 85.9413, 'lavender'),
(6, 16, 'Lithium-ion 84mAh', '1 years warranty', 8353, 'Wired', 0, 64.2336, 'yellow'),
(7, 18, 'Lithium-ion 33mAh', '5 years warranty', 1121, 'Wired', 0, 190.082, 'maroon'),
(8, 20, 'Lithium-ion 12mAh', '8 years warranty', 8552, 'Wired', 1, 159.22, 'cyan'),
(9, 22, 'Lithium-ion 90mAh', '1 years warranty', 15953, 'Wired', 1, 183.717, 'tan'),
(10, 29, 'Lithium-ion 84mAh', '7 years warranty', 7795, 'Wireless', 1, 184.27, 'silver'),
(11, 33, 'Lithium-ion 78mAh', '5 years warranty', 9841, 'Wired', 0, 75.0822, 'maroon'),
(12, 34, 'Lithium-ion 50mAh', '4 years warranty', 15425, 'Wired', 1, 90.8139, 'lavender'),
(13, 44, 'Lithium-ion 05mAh', '2 years warranty', 7190, 'Wired', 0, 71.5669, 'indigo'),
(14, 45, 'Lithium-ion 81mAh', '2 years warranty', 7980, 'Wireless', 1, 86.796, 'white'),
(15, 47, 'Lithium-ion 13mAh', '6 years warranty', 4226, 'Wireless', 0, 77.65, 'pink'),
(16, 48, 'Lithium-ion 85mAh', '6 years warranty', 12644, 'Wireless', 1, 154.466, 'fuchsia'),
(17, 50, 'Lithium-ion 76mAh', '4 years warranty', 13641, 'Wired', 1, 149.221, 'silver'),
(18, 52, 'Lithium-ion 45mAh', '8 years warranty', 1792, 'Wired', 0, 84.3833, 'olive'),
(19, 53, 'Lithium-ion 12mAh', '1 years warranty', 15927, 'Wireless', 0, 152.683, 'gold'),
(20, 54, 'Lithium-ion 10mAh', '1 years warranty', 1157, 'Wireless', 0, 75.1609, 'tan'),
(21, 55, 'Lithium-ion 58mAh', '3 years warranty', 5781, 'Wired', 0, 154.991, 'lime'),
(22, 56, 'Lithium-ion 50mAh', '8 years warranty', 2391, 'Wireless', 0, 127.149, 'indigo'),
(23, 61, 'Lithium-ion 15mAh', '8 years warranty', 5953, 'Wireless', 1, 79.7031, 'mint green'),
(24, 68, 'Lithium-ion 91mAh', '8 years warranty', 2265, 'Wireless', 1, 186.66, 'gold'),
(25, 72, 'Lithium-ion 42mAh', '3 years warranty', 3903, 'Wired', 1, 92.9162, 'yellow'),
(26, 76, 'Lithium-ion 18mAh', '3 years warranty', 14967, 'Wired', 0, 151.576, 'lavender'),
(27, 79, 'Lithium-ion 55mAh', '4 years warranty', 9417, 'Wired', 0, 79.6017, 'white'),
(28, 81, 'Lithium-ion 32mAh', '2 years warranty', 2718, 'Wired', 1, 100.294, 'black'),
(29, 83, 'Lithium-ion 97mAh', '1 years warranty', 11323, 'Wired', 1, 159.339, 'turquoise'),
(30, 86, 'Lithium-ion 65mAh', '6 years warranty', 8412, 'Wireless', 1, 179.703, 'teal'),
(31, 89, 'Lithium-ion 12mAh', '1 years warranty', 13005, 'Wired', 0, 155.081, 'red'),
(32, 90, 'Lithium-ion 69mAh', '0 years warranty', 10456, 'Wired', 1, 159.876, 'grey'),
(33, 92, 'Lithium-ion 19mAh', '0 years warranty', 2521, 'Wireless', 1, 113.299, 'mint green'),
(34, 98, 'Lithium-ion 58mAh', '9 years warranty', 3699, 'Wireless', 1, 90.0085, 'turquoise'),
(35, 100, 'Lithium-ion 81mAh', '5 years warranty', 10825, 'Wireless', 1, 60.0418, 'gold'),
(36, 104, 'Lithium-ion 82mAh', '7 years warranty', 11484, 'Wired', 0, 103.818, 'lavender'),
(37, 105, 'Lithium-ion 42mAh', '2 years warranty', 7560, 'Wireless', 0, 188.917, 'green'),
(38, 109, 'Lithium-ion 66mAh', '6 years warranty', 13364, 'Wireless', 0, 145.276, 'azure'),
(39, 110, 'Lithium-ion 81mAh', '3 years warranty', 14561, 'Wired', 1, 162.443, 'lime'),
(40, 115, 'Lithium-ion 31mAh', '6 years warranty', 10387, 'Wireless', 0, 89.5818, 'fuchsia'),
(41, 117, 'Lithium-ion 06mAh', '0 years warranty', 10510, 'Wireless', 1, 187.317, 'grey'),
(42, 118, 'Lithium-ion 27mAh', '5 years warranty', 5427, 'Wired', 1, 123.262, 'lime'),
(43, 121, 'Lithium-ion 18mAh', '9 years warranty', 14535, 'Wired', 0, 167.913, 'tan'),
(44, 125, 'Lithium-ion 12mAh', '0 years warranty', 5566, 'Wired', 1, 54.7794, 'orange'),
(45, 126, 'Lithium-ion 61mAh', '3 years warranty', 6634, 'Wireless', 0, 53.9769, 'teal'),
(46, 129, 'Lithium-ion 27mAh', '5 years warranty', 14212, 'Wireless', 0, 159.167, 'fuchsia'),
(47, 130, 'Lithium-ion 08mAh', '7 years warranty', 11035, 'Wireless', 0, 118.947, 'mint green'),
(48, 138, 'Lithium-ion 66mAh', '6 years warranty', 12303, 'Wired', 0, 57.7093, 'violet'),
(49, 143, 'Lithium-ion 74mAh', '5 years warranty', 13241, 'Wireless', 0, 60.9149, 'teal'),
(50, 149, 'Lithium-ion 36mAh', '6 years warranty', 11937, 'Wired', 0, 130.207, 'sky blue'),
(51, 150, 'Lithium-ion 57mAh', '5 years warranty', 7182, 'Wired', 1, 168.823, 'white'),
(52, 152, 'Lithium-ion 57mAh', '5 years warranty', 8614, 'Wired', 0, 73.0359, 'turquoise'),
(53, 158, 'Lithium-ion 57mAh', '8 years warranty', 1602, 'Wireless', 1, 131.169, 'red'),
(54, 159, 'Lithium-ion 38mAh', '8 years warranty', 14083, 'Wired', 0, 146.091, 'lime'),
(55, 160, 'Lithium-ion 89mAh', '4 years warranty', 13298, 'Wireless', 0, 173.1, 'mint green'),
(56, 161, 'Lithium-ion 03mAh', '9 years warranty', 6901, 'Wired', 1, 59.4604, 'sky blue'),
(57, 167, 'Lithium-ion 70mAh', '2 years warranty', 2775, 'Wireless', 0, 160.555, 'maroon'),
(58, 169, 'Lithium-ion 95mAh', '0 years warranty', 2617, 'Wired', 0, 114.217, 'olive'),
(59, 172, 'Lithium-ion 07mAh', '1 years warranty', 3478, 'Wired', 0, 52.5157, 'black'),
(60, 174, 'Lithium-ion 06mAh', '4 years warranty', 5960, 'Wireless', 0, 89.0029, 'maroon'),
(61, 175, 'Lithium-ion 18mAh', '0 years warranty', 9833, 'Wireless', 0, 123.121, 'indigo'),
(62, 177, 'Lithium-ion 20mAh', '2 years warranty', 2179, 'Wired', 1, 154.333, 'purple'),
(63, 179, 'Lithium-ion 69mAh', '7 years warranty', 12278, 'Wired', 1, 90.7899, 'lime'),
(64, 184, 'Lithium-ion 94mAh', '1 years warranty', 11835, 'Wireless', 1, 64.3831, 'silver'),
(65, 190, 'Lithium-ion 38mAh', '6 years warranty', 12801, 'Wireless', 1, 171.638, 'green'),
(66, 197, 'Lithium-ion 78mAh', '1 years warranty', 12546, 'Wireless', 1, 132.868, 'lavender'),
(67, 198, 'Lithium-ion 89mAh', '2 years warranty', 5382, 'Wired', 1, 198.428, 'grey'),
(68, 204, 'Lithium-ion 07mAh', '3 years warranty', 2488, 'Wireless', 1, 100.676, 'pink'),
(69, 205, 'Lithium-ion 00mAh', '1 years warranty', 14057, 'Wireless', 1, 93.655, 'red'),
(70, 210, 'Lithium-ion 00mAh', '5 years warranty', 2221, 'Wireless', 0, 155.734, 'ivory'),
(71, 211, 'Lithium-ion 74mAh', '0 years warranty', 15524, 'Wired', 1, 146.796, 'orchid'),
(72, 213, 'Lithium-ion 67mAh', '1 years warranty', 4081, 'Wired', 0, 85.7853, 'red'),
(73, 218, 'Lithium-ion 34mAh', '7 years warranty', 10787, 'Wired', 0, 132.583, 'purple'),
(74, 220, 'Lithium-ion 92mAh', '9 years warranty', 7034, 'Wireless', 0, 97.138, 'azure'),
(75, 221, 'Lithium-ion 53mAh', '7 years warranty', 9350, 'Wireless', 0, 139.13, 'red'),
(76, 222, 'Lithium-ion 28mAh', '6 years warranty', 9383, 'Wired', 1, 101.899, 'lavender'),
(77, 234, 'Lithium-ion 85mAh', '8 years warranty', 3908, 'Wired', 1, 133.121, 'orchid'),
(78, 235, 'Lithium-ion 77mAh', '4 years warranty', 4794, 'Wired', 1, 107.277, 'salmon'),
(79, 237, 'Lithium-ion 32mAh', '1 years warranty', 6867, 'Wireless', 1, 141.126, 'lavender'),
(80, 241, 'Lithium-ion 43mAh', '0 years warranty', 7080, 'Wired', 0, 109.596, 'yellow'),
(81, 244, 'Lithium-ion 74mAh', '0 years warranty', 2936, 'Wireless', 1, 147.543, 'teal'),
(82, 250, 'Lithium-ion 83mAh', '8 years warranty', 14172, 'Wired', 0, 181.02, 'purple'),
(83, 254, 'Lithium-ion 16mAh', '4 years warranty', 7042, 'Wireless', 1, 72.2245, 'violet'),
(84, 255, 'Lithium-ion 83mAh', '8 years warranty', 7594, 'Wireless', 0, 182.104, 'maroon'),
(85, 256, 'Lithium-ion 46mAh', '7 years warranty', 2719, 'Wired', 0, 129.465, 'blue'),
(86, 262, 'Lithium-ion 87mAh', '5 years warranty', 3358, 'Wired', 0, 189.409, 'ivory'),
(87, 266, 'Lithium-ion 78mAh', '6 years warranty', 4240, 'Wireless', 1, 145.112, 'turquoise'),
(88, 269, 'Lithium-ion 95mAh', '1 years warranty', 7990, 'Wired', 0, 175.792, 'cyan'),
(89, 270, 'Lithium-ion 94mAh', '0 years warranty', 7481, 'Wired', 0, 166.297, 'violet'),
(90, 272, 'Lithium-ion 73mAh', '5 years warranty', 3732, 'Wireless', 0, 91.5274, 'fuchsia'),
(91, 273, 'Lithium-ion 87mAh', '7 years warranty', 15572, 'Wired', 0, 72.8431, 'gold'),
(92, 278, 'Lithium-ion 89mAh', '9 years warranty', 15007, 'Wireless', 0, 55.7635, 'grey'),
(93, 281, 'Lithium-ion 95mAh', '0 years warranty', 15425, 'Wireless', 1, 57.4987, 'magenta'),
(94, 287, 'Lithium-ion 19mAh', '0 years warranty', 10336, 'Wireless', 0, 153.995, 'lavender'),
(95, 290, 'Lithium-ion 32mAh', '8 years warranty', 8441, 'Wired', 1, 86.4381, 'orange'),
(96, 293, 'Lithium-ion 73mAh', '2 years warranty', 8527, 'Wireless', 0, 175.811, 'ivory'),
(97, 294, 'Lithium-ion 00mAh', '6 years warranty', 11641, 'Wireless', 0, 101.089, 'orchid'),
(98, 304, 'Lithium-ion 19mAh', '0 years warranty', 13596, 'Wired', 1, 98.101, 'lime'),
(99, 305, 'Lithium-ion 27mAh', '6 years warranty', 9365, 'Wired', 1, 171.881, 'red'),
(100, 308, 'Lithium-ion 93mAh', '0 years warranty', 3224, 'Wireless', 0, 84.313, 'yellow'),
(101, 311, 'Lithium-ion 40mAh', '7 years warranty', 3148, 'Wired', 0, 94.8205, 'magenta'),
(102, 312, 'Lithium-ion 90mAh', '4 years warranty', 11025, 'Wireless', 1, 104.549, 'tan'),
(103, 316, 'Lithium-ion 62mAh', '8 years warranty', 5698, 'Wired', 1, 94.0494, 'lime'),
(104, 319, 'Lithium-ion 86mAh', '7 years warranty', 14714, 'Wired', 0, 166.271, 'yellow'),
(105, 321, 'Lithium-ion 92mAh', '5 years warranty', 6187, 'Wireless', 0, 103.034, 'olive'),
(106, 322, 'Lithium-ion 00mAh', '4 years warranty', 908, 'Wireless', 0, 110.564, 'blue'),
(107, 331, 'Lithium-ion 56mAh', '0 years warranty', 13661, 'Wireless', 1, 183.693, 'olive'),
(108, 334, 'Lithium-ion 06mAh', '6 years warranty', 2973, 'Wireless', 1, 167.769, 'red'),
(109, 335, 'Lithium-ion 69mAh', '2 years warranty', 8902, 'Wired', 0, 188.729, 'blue'),
(110, 338, 'Lithium-ion 40mAh', '7 years warranty', 11569, 'Wired', 0, 174.368, 'tan'),
(111, 341, 'Lithium-ion 69mAh', '5 years warranty', 9063, 'Wireless', 0, 75.3007, 'maroon'),
(112, 345, 'Lithium-ion 08mAh', '2 years warranty', 11118, 'Wireless', 0, 111.808, 'fuchsia'),
(113, 346, 'Lithium-ion 79mAh', '0 years warranty', 6073, 'Wired', 0, 123.231, 'indigo'),
(114, 353, 'Lithium-ion 05mAh', '5 years warranty', 8163, 'Wireless', 0, 194.685, 'gold'),
(115, 354, 'Lithium-ion 99mAh', '4 years warranty', 2311, 'Wireless', 1, 147.493, 'plum'),
(116, 358, 'Lithium-ion 86mAh', '1 years warranty', 13000, 'Wireless', 0, 191.321, 'indigo'),
(117, 363, 'Lithium-ion 60mAh', '8 years warranty', 9581, 'Wireless', 0, 153.761, 'sky blue'),
(118, 364, 'Lithium-ion 03mAh', '9 years warranty', 14511, 'Wireless', 1, 98.5851, 'plum'),
(119, 366, 'Lithium-ion 98mAh', '9 years warranty', 7628, 'Wired', 1, 102.46, 'sky blue'),
(120, 371, 'Lithium-ion 83mAh', '9 years warranty', 2652, 'Wired', 1, 58.1874, 'white'),
(121, 372, 'Lithium-ion 21mAh', '7 years warranty', 4060, 'Wired', 0, 83.7642, 'black'),
(122, 373, 'Lithium-ion 70mAh', '5 years warranty', 1848, 'Wireless', 1, 90.9702, 'silver'),
(123, 374, 'Lithium-ion 38mAh', '1 years warranty', 1899, 'Wireless', 0, 101.312, 'red'),
(124, 375, 'Lithium-ion 03mAh', '4 years warranty', 3444, 'Wireless', 1, 149.49, 'maroon'),
(125, 376, 'Lithium-ion 72mAh', '6 years warranty', 10778, 'Wireless', 0, 106.109, 'black'),
(126, 378, 'Lithium-ion 93mAh', '6 years warranty', 12390, 'Wired', 1, 59.5131, 'cyan'),
(127, 379, 'Lithium-ion 11mAh', '1 years warranty', 14860, 'Wired', 1, 58.0252, 'turquoise'),
(128, 380, 'Lithium-ion 13mAh', '4 years warranty', 1100, 'Wired', 0, 127.244, 'ivory'),
(129, 381, 'Lithium-ion 75mAh', '5 years warranty', 6813, 'Wireless', 1, 94.0972, 'red'),
(130, 385, 'Lithium-ion 44mAh', '1 years warranty', 11223, 'Wired', 1, 162.201, 'cyan'),
(131, 386, 'Lithium-ion 45mAh', '7 years warranty', 3805, 'Wired', 1, 110.671, 'salmon'),
(132, 389, 'Lithium-ion 07mAh', '4 years warranty', 9520, 'Wired', 1, 173.446, 'fuchsia'),
(133, 396, 'Lithium-ion 40mAh', '7 years warranty', 9924, 'Wired', 0, 135.1, 'purple'),
(134, 405, 'Lithium-ion 40mAh', '6 years warranty', 7958, 'Wired', 0, 143.967, 'violet'),
(135, 408, 'Lithium-ion 37mAh', '2 years warranty', 14235, 'Wired', 1, 85.0049, 'tan'),
(136, 412, 'Lithium-ion 89mAh', '6 years warranty', 7754, 'Wired', 1, 180.574, 'cyan'),
(137, 414, 'Lithium-ion 31mAh', '7 years warranty', 4791, 'Wireless', 0, 109.171, 'fuchsia'),
(138, 416, 'Lithium-ion 15mAh', '3 years warranty', 1527, 'Wireless', 1, 75.1683, 'maroon'),
(139, 418, 'Lithium-ion 34mAh', '8 years warranty', 12564, 'Wired', 0, 83.4051, 'silver'),
(140, 419, 'Lithium-ion 56mAh', '2 years warranty', 2927, 'Wireless', 1, 153.371, 'violet'),
(141, 420, 'Lithium-ion 80mAh', '6 years warranty', 6339, 'Wireless', 0, 69.727, 'indigo'),
(142, 424, 'Lithium-ion 41mAh', '0 years warranty', 14302, 'Wired', 0, 133.452, 'plum'),
(143, 431, 'Lithium-ion 70mAh', '2 years warranty', 10702, 'Wireless', 0, 159.478, 'mint green'),
(144, 433, 'Lithium-ion 27mAh', '4 years warranty', 5028, 'Wired', 0, 191.089, 'violet'),
(145, 436, 'Lithium-ion 62mAh', '4 years warranty', 12026, 'Wired', 1, 188.367, 'turquoise'),
(146, 444, 'Lithium-ion 98mAh', '0 years warranty', 14958, 'Wireless', 0, 154.667, 'red'),
(147, 446, 'Lithium-ion 65mAh', '7 years warranty', 5712, 'Wireless', 0, 78.6711, 'orange'),
(148, 461, 'Lithium-ion 23mAh', '2 years warranty', 6501, 'Wireless', 1, 64.7379, 'violet'),
(149, 463, 'Lithium-ion 06mAh', '1 years warranty', 15702, 'Wireless', 1, 105.173, 'tan'),
(150, 465, 'Lithium-ion 57mAh', '3 years warranty', 2002, 'Wired', 0, 82.0565, 'purple'),
(151, 467, 'Lithium-ion 68mAh', '4 years warranty', 6096, 'Wireless', 0, 198.88, 'maroon'),
(152, 468, 'Lithium-ion 99mAh', '4 years warranty', 2433, 'Wired', 1, 118.974, 'plum'),
(153, 469, 'Lithium-ion 28mAh', '2 years warranty', 3590, 'Wireless', 0, 64.5802, 'black'),
(154, 475, 'Lithium-ion 02mAh', '8 years warranty', 13567, 'Wireless', 1, 52.1372, 'black'),
(155, 476, 'Lithium-ion 32mAh', '8 years warranty', 8130, 'Wireless', 0, 136.857, 'grey'),
(156, 477, 'Lithium-ion 93mAh', '6 years warranty', 7630, 'Wired', 1, 172.451, 'blue'),
(157, 482, 'Lithium-ion 38mAh', '5 years warranty', 3030, 'Wireless', 0, 190.051, 'green'),
(158, 487, 'Lithium-ion 67mAh', '6 years warranty', 10264, 'Wired', 0, 106.489, 'azure'),
(159, 489, 'Lithium-ion 70mAh', '2 years warranty', 2004, 'Wired', 1, 124.462, 'red'),
(160, 490, 'Lithium-ion 09mAh', '5 years warranty', 10975, 'Wired', 1, 86.9155, 'indigo'),
(161, 491, 'Lithium-ion 99mAh', '6 years warranty', 9699, 'Wired', 1, 103.613, 'mint green'),
(162, 495, 'Lithium-ion 96mAh', '5 years warranty', 15673, 'Wireless', 1, 72.519, 'grey'),
(163, 499, 'Lithium-ion 67mAh', '3 years warranty', 8137, 'Wireless', 1, 62.9551, 'green'),
(164, 501, 'Lithium-ion 66mAh', '5 years warranty', 10985, 'Wired', 1, 177.633, 'azure'),
(165, 512, 'Lithium-ion 07mAh', '0 years warranty', 983, 'Wireless', 0, 143.839, 'pink'),
(166, 514, 'Lithium-ion 94mAh', '3 years warranty', 5594, 'Wired', 1, 56.8478, 'plum'),
(167, 518, 'Lithium-ion 28mAh', '7 years warranty', 3234, 'Wireless', 0, 199.249, 'sky blue'),
(168, 520, 'Lithium-ion 69mAh', '8 years warranty', 3010, 'Wireless', 1, 53.2, 'turquoise'),
(169, 522, 'Lithium-ion 22mAh', '7 years warranty', 6174, 'Wired', 1, 67.3011, 'sky blue'),
(170, 523, 'Lithium-ion 94mAh', '7 years warranty', 13745, 'Wireless', 1, 109.04, 'blue'),
(171, 528, 'Lithium-ion 37mAh', '1 years warranty', 9835, 'Wired', 0, 192.511, 'gold'),
(172, 529, 'Lithium-ion 93mAh', '1 years warranty', 15575, 'Wired', 0, 81.1313, 'lime'),
(173, 531, 'Lithium-ion 72mAh', '9 years warranty', 14185, 'Wireless', 1, 174.373, 'sky blue'),
(174, 532, 'Lithium-ion 62mAh', '6 years warranty', 905, 'Wired', 1, 180.717, 'sky blue'),
(175, 533, 'Lithium-ion 86mAh', '3 years warranty', 11617, 'Wireless', 1, 111.407, 'grey'),
(176, 534, 'Lithium-ion 03mAh', '3 years warranty', 3317, 'Wired', 1, 191.753, 'ivory'),
(177, 535, 'Lithium-ion 45mAh', '4 years warranty', 3735, 'Wired', 1, 70.0893, 'green'),
(178, 537, 'Lithium-ion 37mAh', '2 years warranty', 11057, 'Wired', 1, 63.6006, 'indigo'),
(179, 538, 'Lithium-ion 95mAh', '4 years warranty', 13206, 'Wireless', 0, 195.555, 'teal'),
(180, 543, 'Lithium-ion 48mAh', '0 years warranty', 6302, 'Wired', 1, 98.308, 'fuchsia'),
(181, 545, 'Lithium-ion 23mAh', '7 years warranty', 1613, 'Wired', 0, 116.177, 'grey'),
(182, 550, 'Lithium-ion 25mAh', '5 years warranty', 4531, 'Wired', 0, 109.577, 'orchid'),
(183, 551, 'Lithium-ion 03mAh', '4 years warranty', 5831, 'Wireless', 1, 97.8955, 'turquoise'),
(184, 567, 'Lithium-ion 05mAh', '1 years warranty', 8630, 'Wireless', 0, 86.1289, 'yellow'),
(185, 580, 'Lithium-ion 23mAh', '1 years warranty', 9214, 'Wired', 0, 77.3756, 'black'),
(186, 584, 'Lithium-ion 79mAh', '5 years warranty', 2403, 'Wireless', 1, 121.608, 'violet'),
(187, 589, 'Lithium-ion 62mAh', '8 years warranty', 11244, 'Wireless', 0, 87.4892, 'lavender'),
(188, 595, 'Lithium-ion 08mAh', '3 years warranty', 10356, 'Wired', 1, 99.9709, 'gold'),
(189, 601, 'Lithium-ion 53mAh', '2 years warranty', 8262, 'Wireless', 1, 146.758, 'pink'),
(190, 603, 'Lithium-ion 60mAh', '5 years warranty', 1958, 'Wireless', 1, 177.559, 'silver'),
(191, 604, 'Lithium-ion 65mAh', '0 years warranty', 4837, 'Wireless', 0, 166.71, 'azure'),
(192, 606, 'Lithium-ion 18mAh', '1 years warranty', 6840, 'Wireless', 0, 87.9196, 'azure'),
(193, 607, 'Lithium-ion 14mAh', '3 years warranty', 7608, 'Wireless', 1, 52.4858, 'cyan'),
(194, 611, 'Lithium-ion 78mAh', '6 years warranty', 2658, 'Wireless', 0, 177.993, 'mint green'),
(195, 612, 'Lithium-ion 56mAh', '4 years warranty', 5501, 'Wireless', 0, 144.517, 'cyan'),
(196, 614, 'Lithium-ion 36mAh', '5 years warranty', 8129, 'Wireless', 1, 107.831, 'salmon'),
(197, 617, 'Lithium-ion 69mAh', '2 years warranty', 3360, 'Wireless', 1, 85.6169, 'lime'),
(198, 618, 'Lithium-ion 66mAh', '4 years warranty', 14564, 'Wired', 1, 186.359, 'teal'),
(199, 619, 'Lithium-ion 24mAh', '6 years warranty', 9359, 'Wired', 1, 91.9654, 'red'),
(200, 620, 'Lithium-ion 36mAh', '7 years warranty', 2181, 'Wired', 1, 73.1222, 'teal'),
(201, 621, 'Lithium-ion 30mAh', '2 years warranty', 12965, 'Wired', 0, 185.262, 'salmon'),
(202, 622, 'Lithium-ion 07mAh', '7 years warranty', 2495, 'Wireless', 1, 147.024, 'grey'),
(203, 624, 'Lithium-ion 06mAh', '3 years warranty', 7038, 'Wireless', 1, 108.243, 'green'),
(204, 632, 'Lithium-ion 76mAh', '1 years warranty', 2263, 'Wired', 1, 160.747, 'pink'),
(205, 635, 'Lithium-ion 82mAh', '9 years warranty', 15373, 'Wireless', 0, 81.4628, 'orange'),
(206, 637, 'Lithium-ion 70mAh', '8 years warranty', 9307, 'Wireless', 0, 133.521, 'black'),
(207, 638, 'Lithium-ion 67mAh', '8 years warranty', 15508, 'Wired', 0, 163.927, 'green'),
(208, 642, 'Lithium-ion 41mAh', '1 years warranty', 12121, 'Wired', 0, 178.854, 'orchid'),
(209, 643, 'Lithium-ion 39mAh', '5 years warranty', 15563, 'Wireless', 0, 102.882, 'pink'),
(210, 644, 'Lithium-ion 94mAh', '2 years warranty', 13535, 'Wired', 0, 148.109, 'tan'),
(211, 645, 'Lithium-ion 37mAh', '4 years warranty', 5855, 'Wireless', 1, 165.884, 'lime'),
(212, 646, 'Lithium-ion 90mAh', '7 years warranty', 10710, 'Wireless', 1, 94.6002, 'magenta'),
(213, 650, 'Lithium-ion 55mAh', '2 years warranty', 10529, 'Wireless', 0, 144.169, 'ivory'),
(214, 652, 'Lithium-ion 56mAh', '7 years warranty', 7810, 'Wired', 0, 55.3953, 'ivory'),
(215, 654, 'Lithium-ion 12mAh', '2 years warranty', 7962, 'Wireless', 1, 176.09, 'black'),
(216, 660, 'Lithium-ion 58mAh', '6 years warranty', 8275, 'Wireless', 0, 58.6197, 'blue'),
(217, 661, 'Lithium-ion 28mAh', '5 years warranty', 2148, 'Wireless', 0, 114.808, 'cyan'),
(218, 663, 'Lithium-ion 65mAh', '3 years warranty', 5846, 'Wired', 0, 120.865, 'orchid'),
(219, 666, 'Lithium-ion 70mAh', '7 years warranty', 4762, 'Wireless', 1, 156.49, 'pink'),
(220, 670, 'Lithium-ion 00mAh', '5 years warranty', 3254, 'Wireless', 1, 75.5512, 'red'),
(221, 673, 'Lithium-ion 95mAh', '3 years warranty', 6629, 'Wireless', 0, 133.21, 'teal'),
(222, 674, 'Lithium-ion 49mAh', '3 years warranty', 10002, 'Wireless', 0, 62.5213, 'white'),
(223, 689, 'Lithium-ion 04mAh', '8 years warranty', 13003, 'Wired', 0, 155.53, 'mint green'),
(224, 695, 'Lithium-ion 90mAh', '1 years warranty', 3322, 'Wired', 0, 82.9724, 'mint green'),
(225, 706, 'Lithium-ion 91mAh', '0 years warranty', 6770, 'Wired', 1, 143.055, 'black'),
(226, 707, 'Lithium-ion 75mAh', '4 years warranty', 1137, 'Wired', 1, 82.1131, 'red'),
(227, 714, 'Lithium-ion 80mAh', '7 years warranty', 1114, 'Wired', 0, 106.284, 'magenta'),
(228, 718, 'Lithium-ion 23mAh', '8 years warranty', 7921, 'Wired', 0, 58.4701, 'red'),
(229, 720, 'Lithium-ion 35mAh', '7 years warranty', 13717, 'Wired', 0, 183.636, 'silver'),
(230, 724, 'Lithium-ion 22mAh', '7 years warranty', 1321, 'Wired', 0, 139.877, 'black'),
(231, 725, 'Lithium-ion 78mAh', '1 years warranty', 6602, 'Wireless', 0, 168.381, 'pink'),
(232, 728, 'Lithium-ion 59mAh', '5 years warranty', 8135, 'Wired', 1, 170.127, 'blue'),
(233, 729, 'Lithium-ion 73mAh', '3 years warranty', 855, 'Wireless', 0, 154.77, 'grey'),
(234, 730, 'Lithium-ion 77mAh', '5 years warranty', 9146, 'Wireless', 0, 194.177, 'gold'),
(235, 734, 'Lithium-ion 00mAh', '9 years warranty', 1861, 'Wired', 0, 107.919, 'tan'),
(236, 736, 'Lithium-ion 82mAh', '7 years warranty', 7755, 'Wired', 1, 86.5297, 'orchid'),
(237, 741, 'Lithium-ion 34mAh', '4 years warranty', 15671, 'Wired', 0, 88.1233, 'ivory'),
(238, 744, 'Lithium-ion 61mAh', '2 years warranty', 4665, 'Wireless', 0, 89.0675, 'purple'),
(239, 746, 'Lithium-ion 51mAh', '0 years warranty', 11913, 'Wired', 1, 93.42, 'cyan'),
(240, 749, 'Lithium-ion 08mAh', '1 years warranty', 8960, 'Wireless', 1, 111.88, 'pink'),
(241, 754, 'Lithium-ion 00mAh', '3 years warranty', 3084, 'Wired', 0, 130.389, 'silver'),
(242, 761, 'Lithium-ion 29mAh', '7 years warranty', 10934, 'Wireless', 1, 156.607, 'violet'),
(243, 763, 'Lithium-ion 16mAh', '0 years warranty', 5429, 'Wireless', 1, 56.0117, 'lavender'),
(244, 772, 'Lithium-ion 44mAh', '3 years warranty', 5799, 'Wired', 1, 158.076, 'black'),
(245, 775, 'Lithium-ion 78mAh', '9 years warranty', 13120, 'Wireless', 1, 50.0687, 'teal'),
(246, 777, 'Lithium-ion 98mAh', '7 years warranty', 2141, 'Wired', 0, 125.265, 'turquoise'),
(247, 783, 'Lithium-ion 70mAh', '0 years warranty', 8908, 'Wireless', 1, 150.932, 'azure'),
(248, 786, 'Lithium-ion 76mAh', '1 years warranty', 14759, 'Wireless', 0, 197.702, 'tan'),
(249, 790, 'Lithium-ion 20mAh', '7 years warranty', 6893, 'Wired', 0, 54.0951, 'maroon'),
(250, 793, 'Lithium-ion 70mAh', '6 years warranty', 7938, 'Wired', 0, 115.2, 'turquoise'),
(251, 799, 'Lithium-ion 62mAh', '9 years warranty', 11363, 'Wired', 0, 172.692, 'lavender'),
(252, 800, 'Lithium-ion 23mAh', '3 years warranty', 5425, 'Wired', 0, 100.005, 'azure'),
(253, 802, 'Lithium-ion 98mAh', '7 years warranty', 8624, 'Wired', 0, 174.71, 'gold'),
(254, 806, 'Lithium-ion 12mAh', '2 years warranty', 6348, 'Wired', 0, 192.934, 'magenta'),
(255, 807, 'Lithium-ion 72mAh', '9 years warranty', 1852, 'Wired', 0, 78.4969, 'magenta'),
(256, 809, 'Lithium-ion 36mAh', '2 years warranty', 14464, 'Wireless', 0, 100.929, 'maroon'),
(257, 810, 'Lithium-ion 97mAh', '8 years warranty', 8996, 'Wireless', 0, 65.8811, 'teal'),
(258, 815, 'Lithium-ion 58mAh', '2 years warranty', 3684, 'Wireless', 1, 78.5072, 'black'),
(259, 816, 'Lithium-ion 82mAh', '4 years warranty', 8058, 'Wireless', 0, 85.7532, 'indigo'),
(260, 817, 'Lithium-ion 92mAh', '9 years warranty', 1472, 'Wired', 0, 112.642, 'red'),
(261, 818, 'Lithium-ion 12mAh', '9 years warranty', 8167, 'Wireless', 0, 129.352, 'lavender'),
(262, 828, 'Lithium-ion 61mAh', '0 years warranty', 4397, 'Wired', 0, 185.419, 'pink'),
(263, 830, 'Lithium-ion 01mAh', '7 years warranty', 4649, 'Wired', 1, 144.927, 'ivory'),
(264, 834, 'Lithium-ion 12mAh', '0 years warranty', 4990, 'Wireless', 0, 74.6178, 'red'),
(265, 844, 'Lithium-ion 67mAh', '1 years warranty', 6053, 'Wired', 1, 61.1025, 'sky blue'),
(266, 848, 'Lithium-ion 63mAh', '1 years warranty', 4481, 'Wireless', 0, 107.824, 'plum'),
(267, 849, 'Lithium-ion 18mAh', '7 years warranty', 1096, 'Wired', 1, 87.8276, 'indigo'),
(268, 852, 'Lithium-ion 35mAh', '3 years warranty', 11373, 'Wireless', 1, 195.32, 'silver'),
(269, 858, 'Lithium-ion 29mAh', '8 years warranty', 15901, 'Wireless', 0, 124.753, 'lime'),
(270, 861, 'Lithium-ion 12mAh', '5 years warranty', 11238, 'Wireless', 1, 173.221, 'azure'),
(271, 863, 'Lithium-ion 94mAh', '5 years warranty', 8862, 'Wired', 1, 53.5335, 'black'),
(272, 868, 'Lithium-ion 94mAh', '6 years warranty', 11608, 'Wired', 0, 157.397, 'lime'),
(273, 871, 'Lithium-ion 81mAh', '0 years warranty', 15301, 'Wired', 0, 199.251, 'sky blue'),
(274, 879, 'Lithium-ion 86mAh', '0 years warranty', 11866, 'Wireless', 1, 166.731, 'teal'),
(275, 881, 'Lithium-ion 56mAh', '4 years warranty', 10912, 'Wireless', 1, 114.72, 'cyan'),
(276, 884, 'Lithium-ion 77mAh', '4 years warranty', 10816, 'Wired', 1, 128.685, 'tan'),
(277, 885, 'Lithium-ion 18mAh', '7 years warranty', 15825, 'Wireless', 0, 135.203, 'salmon'),
(278, 888, 'Lithium-ion 38mAh', '3 years warranty', 12934, 'Wireless', 0, 142.051, 'pink'),
(279, 890, 'Lithium-ion 49mAh', '0 years warranty', 15939, 'Wired', 0, 74.0028, 'mint green'),
(280, 892, 'Lithium-ion 61mAh', '6 years warranty', 6884, 'Wireless', 0, 62.9259, 'blue'),
(281, 897, 'Lithium-ion 80mAh', '1 years warranty', 7205, 'Wired', 0, 137.333, 'orange'),
(282, 902, 'Lithium-ion 49mAh', '3 years warranty', 14936, 'Wireless', 0, 51.0335, 'black'),
(283, 904, 'Lithium-ion 66mAh', '3 years warranty', 9690, 'Wireless', 1, 78.275, 'gold'),
(284, 907, 'Lithium-ion 63mAh', '8 years warranty', 11706, 'Wireless', 1, 85.2191, 'olive'),
(285, 908, 'Lithium-ion 78mAh', '6 years warranty', 8889, 'Wired', 0, 80.1277, 'mint green'),
(286, 909, 'Lithium-ion 37mAh', '3 years warranty', 1551, 'Wireless', 0, 160.732, 'pink'),
(287, 913, 'Lithium-ion 04mAh', '7 years warranty', 4951, 'Wireless', 0, 85.6138, 'white'),
(288, 919, 'Lithium-ion 58mAh', '2 years warranty', 14775, 'Wireless', 1, 156.093, 'sky blue'),
(289, 932, 'Lithium-ion 04mAh', '4 years warranty', 9394, 'Wireless', 1, 51.2042, 'teal'),
(290, 937, 'Lithium-ion 79mAh', '5 years warranty', 12907, 'Wired', 0, 73.7599, 'purple'),
(291, 940, 'Lithium-ion 06mAh', '3 years warranty', 1533, 'Wireless', 0, 120.349, 'pink'),
(292, 941, '1000 mAh', '1000 years', 100, 'Wireless', 1, 23.2, 'pinky');

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
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT NULL COMMENT 'order status',
  `total_money` float DEFAULT NULL CHECK (`total_money` >= 0),
  `payment_method` varchar(100) DEFAULT 'cash',
  `shipping_method` varchar(100) DEFAULT NULL,
  `shipping_address` varchar(200) DEFAULT NULL,
  `shipping_date` date DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `fullname`, `email`, `phone_number`, `address`, `note`, `order_date`, `status`, `total_money`, `payment_method`, `shipping_method`, `shipping_address`, `shipping_date`, `tracking_number`, `active`) VALUES
(1, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 00:00:00', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 0),
(2, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 00:00:00', 'delivered', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 1),
(3, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 00:00:00', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 0),
(4, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 15:25:41', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 1),
(5, 2, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 00:00:00', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 0),
(6, 2, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 15:53:31', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 1),
(7, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 00:00:00', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 0),
(8, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-06 16:26:59', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-11', NULL, 1),
(9, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-08 00:00:00', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-13', NULL, 0),
(10, 2, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-08 21:37:26', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-13', NULL, 1),
(12, 3, 'Tho Phan', 'pvt@gmail.com', '123456789', '240 Hoang Dieu 2', ' Hang de vo, xin nhe tay', '2025-04-08 21:41:01', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-13', NULL, 1),
(14, 3, 'Anh Phan Van Tho', 'pvt@gmail.com', '112212312', 'Le van viet', ' Hang de vo, xin nhe tay', '2025-04-16 00:00:00', 'pending', 1332, 'COD', 'express', 'LVV', '2025-04-21', NULL, 0);

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

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `number_of_products`, `price`, `total_money`, `color`) VALUES
(1, 3, 3, 5, 24577600, 122888000, NULL),
(2, 3, 4, 2, 31228900, 62457800, NULL),
(3, 4, 1, 5, 56504800, 282524000, NULL),
(4, 4, 99, 2, 49825200, 99650400, NULL),
(5, 5, 1, 5, 56504800, 282524000, NULL),
(6, 5, 99, 2, 49825200, 99650400, NULL),
(7, 6, 9, 1, 11585100, 11585100, NULL),
(8, 6, 255, 1, 75534000, 75534000, NULL),
(9, 7, 1, 20, 56504800, 1130100000, NULL),
(10, 7, 2, 15, 76276000, 1144140000, NULL),
(11, 8, 4, 2, 31228900, 62457800, NULL),
(12, 8, 5, 1, 36977600, 36977600, NULL),
(13, 8, 7, 1, 22971200, 22971200, NULL),
(14, 9, 6, 3, 56504800, 169514000, NULL),
(15, 9, 11, 3, 66309200, 198928000, NULL),
(16, 9, 19, 5, 13616100, 68080500, NULL),
(17, 9, 23, 6, 40296900, 241781000, NULL),
(18, 9, 29, 9, 84343600, 759092000, NULL),
(19, 12, 3, 5, 24577600, 122888000, NULL),
(20, 14, 7, 1, 22971200, 22971200, NULL),
(21, 14, 21, 9, 20661100, 185950000, NULL);

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
  `discount_percent` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`, `stock_quantity`, `brand_id`, `headphone_specs_id`, `keyboard_specs_id`, `mouse_specs_id`, `discount_percent`) VALUES
(1, 'Chuot logitech sieu cap vip pro', 56504800, '941768c7-2ede-450f-8199-cfc6bef74ca3_astronaunt.jpg', NULL, '2025-03-29 13:18:50', '2025-04-26 22:40:36', 1, 79, 1, NULL, NULL, 1, 30),
(2, 'ban phim sieu cap vip pro', 76276000, 'be6ce84d-563c-4a9d-b2db-d47768162b0f_Screenshot 2024-12-18 163711.png', NULL, '2025-03-29 13:18:50', '2025-04-26 22:40:36', 2, 66, 1, NULL, 1, NULL, 20),
(3, 'Fantastic Linen Shirt', 24577600, '', 'Dolores iure sint porro impedit labore consequatur.', '2025-03-29 13:18:50', '2025-04-26 22:31:15', 1, 73, 2, NULL, NULL, 2, 35),
(4, 'Intelligent Cotton Hat', 31228900, '', 'Commodi assumenda unde qui molestias error sed.', '2025-03-29 13:18:50', '2025-04-26 22:31:15', 2, 33, 2, NULL, 2, NULL, 30),
(5, 'Lightweight Plastic Keyboard', 36977600, '', 'Eum quia rerum dicta aut et.', '2025-03-29 13:18:50', '2025-04-26 22:08:06', 1, 14, 2, NULL, NULL, 3, 30),
(6, 'Chuot logitech sieu cap vip pro', 56504800, '', NULL, '2025-03-29 13:18:50', '2025-04-26 22:28:54', 3, 57, 3, 1, NULL, NULL, 20),
(7, 'Enormous Silk Gloves', 22971200, '', 'Alias alias totam sunt rerum.', '2025-03-29 13:18:50', '2025-04-26 22:08:06', 2, 1, 3, NULL, 3, NULL, 35),
(8, 'Ergonomic Linen Hat', 84659100, '', 'Quae qui neque aut autem.', '2025-03-29 13:18:50', '2025-04-26 22:08:06', 3, 40, 1, 2, NULL, NULL, 30),
(9, 'Gorgeous Aluminum Pants', 11585100, '', 'Blanditiis accusantium ducimus natus tempore quod.', '2025-03-29 13:18:50', '2025-04-26 22:08:06', 1, 59, 1, NULL, NULL, 4, NULL),
(10, 'Aerodynamic Wooden Watch', 72478500, '', 'Fugit sapiente accusamus quam itaque.', '2025-03-29 13:18:50', '2025-04-26 22:08:06', 2, 80, 1, NULL, 4, NULL, NULL),
(11, 'Sleek Plastic Wallet', 66309200, '', 'Ipsum exercitationem iusto.', '2025-03-29 13:18:50', '2025-04-26 22:28:55', 2, 14, 2, NULL, 5, NULL, NULL),
(12, 'Aerodynamic Cotton Chair', 81725400, '', 'Ad vel voluptatem molestias iste et tempore beatae.', '2025-03-29 13:18:50', '2025-04-26 22:08:06', 2, 5, 2, NULL, 6, NULL, NULL),
(13, 'Enormous Wooden Keyboard', 57864300, '', 'Nesciunt fugiat consectetur repellat non.', '2025-03-29 13:18:50', '2025-04-26 22:08:07', 3, 56, 2, 3, NULL, NULL, NULL),
(14, 'Durable Granite Keyboard', 78578200, '', 'Est quis eos aperiam.', '2025-03-29 13:18:50', '2025-04-26 22:08:07', 1, 49, 2, NULL, NULL, 5, NULL),
(15, 'Sleek Steel Shoes', 20078600, '', 'Provident aperiam laborum asperiores iure.', '2025-03-29 13:18:50', '2025-04-26 22:08:07', 2, 62, 2, NULL, 7, NULL, NULL),
(16, 'Rustic Linen Computer', 5751290, '', 'Distinctio quasi quas possimus ut.', '2025-03-29 13:18:50', '2025-04-26 22:08:07', 1, 22, 2, NULL, NULL, 6, NULL),
(17, 'Small Wool Shoes', 76837500, '', 'Pariatur dicta sit.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 90, 2, NULL, 8, NULL, NULL),
(18, 'Heavy Duty Linen Bench', 15941600, '', 'Doloremque corrupti corrupti doloremque explicabo natus.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 1, 23, 2, NULL, NULL, 7, NULL),
(19, 'Heavy Duty Cotton Keyboard', 13616100, '', 'Omnis molestiae quasi deleniti et libero nesciunt cupiditate.', '2025-03-29 13:18:51', '2025-04-26 22:28:55', 2, 61, 2, NULL, 9, NULL, NULL),
(20, 'Practical Bronze Pants', 87608900, '', 'Sed omnis velit.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 1, 56, 1, NULL, NULL, 8, NULL),
(21, 'Ergonomic Marble Watch', 20661100, '4f0efb4e-a28e-446e-8b37-cb598a6650f2_Screenshot (680).png', 'Enim aut optio atque et impedit.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 10, 3, NULL, 10, NULL, 30),
(22, 'Rustic Granite Watch', 79932200, '', 'Saepe eum dolorem ut quos omnis adipisci.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 1, 26, 3, NULL, NULL, 9, 30),
(23, 'Durable Wooden Car', 40296900, '', 'Tempora ipsa corporis itaque esse cum sed voluptate.', '2025-03-29 13:18:51', '2025-04-26 22:28:55', 2, 88, 1, NULL, 11, NULL, 30),
(24, 'Ergonomic Linen Bag', 60280500, '', 'Eaque impedit et quaerat ad voluptatem.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 36, 2, NULL, 12, NULL, NULL),
(25, 'Mediocre Bronze Lamp', 71893900, '', 'Dignissimos sit voluptas ullam rem et sequi illum.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 35, 1, NULL, 13, NULL, NULL),
(26, 'Incredible Granite Plate', 35986100, '', 'Dolore beatae culpa eos libero porro sit.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 50, 2, NULL, 14, NULL, NULL),
(27, 'Fantastic Leather Wallet', 9322020, '', 'A molestiae enim ratione vel.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 18, 1, NULL, 15, NULL, NULL),
(28, 'Heavy Duty Bronze Computer', 63798300, '', 'Dolore porro porro dolorum aut veniam optio cupiditate.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 3, 35, 2, 4, NULL, NULL, NULL),
(29, 'Incredible Granite Keyboard', 84343600, '', 'Ea vel vero.', '2025-03-29 13:18:51', '2025-04-26 22:28:55', 1, 99, 2, NULL, NULL, 10, NULL),
(30, 'Heavy Duty Wool Car', 59605500, '', 'Non debitis excepturi.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 5, 2, NULL, 16, NULL, NULL),
(31, 'Lightweight Granite Car', 80177400, '', 'Optio cum corrupti provident iusto.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 6, 1, NULL, 17, NULL, NULL),
(32, 'Mediocre Wool Computer', 17706300, '', 'Nihil laborum minima beatae suscipit vel nemo vitae.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 58, 2, NULL, 18, NULL, NULL),
(33, 'Fantastic Leather Lamp', 23870200, '', 'Sit maiores ad unde.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 1, 42, 2, NULL, NULL, 11, NULL),
(34, 'Ergonomic Bronze Bag', 24532900, '', 'Iste sit nobis asperiores ducimus voluptas quo.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 1, 66, 1, NULL, NULL, 12, NULL),
(35, 'Ergonomic Rubber Keyboard', 7970670, '', 'A quo vel.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 53, 1, NULL, 19, NULL, NULL),
(36, 'Aerodynamic Paper Knife', 82985000, '', 'Magni tenetur et iure id a.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 12, 2, NULL, 20, NULL, NULL),
(37, 'Heavy Duty Aluminum Wallet', 62362800, '', 'Sed deserunt quae.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 3, 12, 1, 5, NULL, NULL, NULL),
(38, 'Lightweight Steel Clock', 71737300, '', 'Porro totam deserunt adipisci sed.', '2025-03-29 13:18:51', '2025-04-26 22:08:07', 2, 89, 2, NULL, 21, NULL, NULL),
(39, 'Ergonomic Silk Coat', 25935000, '', 'Praesentium dolorum fuga.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 3, 53, 1, 6, NULL, NULL, NULL),
(40, 'Enormous Wool Shoes', 19850000, '', 'Eum expedita est quis sunt ut ea.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 20, 1, NULL, 22, NULL, NULL),
(41, 'Mediocre Steel Bag', 57718500, '', 'Perspiciatis ratione suscipit qui.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 87, 2, NULL, 23, NULL, NULL),
(42, 'Incredible Silk Lamp', 41827000, '', 'Excepturi quibusdam reprehenderit asperiores illo vero.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 3, 81, 2, 7, NULL, NULL, NULL),
(43, 'Mediocre Plastic Computer', 86383900, '', 'Sit non magni omnis recusandae sapiente.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 87, 1, NULL, 24, NULL, NULL),
(44, 'Small Iron Shoes', 13918700, '', 'Error ullam odit tempore fugiat quis quia.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 58, 3, NULL, NULL, 13, NULL),
(45, 'Gorgeous Iron Plate', 54613900, '', 'Perferendis maiores neque aut quas est quibusdam.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 80, 2, NULL, NULL, 14, NULL),
(46, 'Aerodynamic Plastic Wallet', 88411000, '', 'Qui est voluptatum inventore nesciunt suscipit esse.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 3, 79, 2, 8, NULL, NULL, NULL),
(47, 'Practical Wooden Keyboard', 79350000, '', 'Numquam molestias id in quae.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 58, 2, NULL, NULL, 15, NULL),
(48, 'Fantastic Paper Computer', 38224500, '', 'Tempore eum dolore quis ipsam aut.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 2, 1, NULL, NULL, 16, NULL),
(49, 'Fantastic Steel Bottle', 84191700, '', 'Quia maxime ad minima eum quod enim eaque.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 3, 52, 2, 9, NULL, NULL, NULL),
(50, 'Heavy Duty Marble Table', 10827200, '', 'Iusto voluptatum itaque.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 14, 1, NULL, NULL, 17, NULL),
(51, 'Synergistic Granite Hat', 38193200, '', 'Et expedita nam adipisci.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 77, 2, NULL, 25, NULL, NULL),
(52, 'Aerodynamic Silk Coat', 48245500, '', 'Dignissimos porro eos.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 32, 3, NULL, NULL, 18, NULL),
(53, 'Awesome Bronze Coat', 47454100, '', 'Illo dolores doloremque ratione quaerat dignissimos porro.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 47, 2, NULL, NULL, 19, NULL),
(54, 'Mediocre Concrete Watch', 60129100, '', 'Facilis quis repellat sed et corrupti incidunt.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 85, 2, NULL, NULL, 20, NULL),
(55, 'Synergistic Wooden Shoes', 51961200, '', 'Eligendi animi temporibus.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 55, 2, NULL, NULL, 21, NULL),
(56, 'Awesome Wool Shirt', 78569400, '', 'Harum et vitae quam modi quas.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 28, 3, NULL, NULL, 22, NULL),
(57, 'Intelligent Plastic Bench', 66159000, '', 'Fugiat aut sit dignissimos.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 10, 2, NULL, 26, NULL, NULL),
(58, 'Lightweight Rubber Shoes', 47631000, '', 'Qui ipsum blanditiis laudantium temporibus qui ipsum.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 3, 24, 2, 10, NULL, NULL, NULL),
(59, 'Practical Wool Bottle', 82292000, '', 'Et non similique error perspiciatis molestias enim rerum.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 81, 1, NULL, 27, NULL, NULL),
(60, 'Gorgeous Bronze Table', 44599800, '', 'Doloribus molestiae quo ullam animi tenetur sunt.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 1, 3, NULL, 28, NULL, NULL),
(61, 'Durable Paper Pants', 15542600, '', 'Fugiat repellendus officia quis repellat.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 1, 22, 2, NULL, NULL, 23, NULL),
(62, 'Sleek Granite Table', 64708700, '', 'Doloribus est qui quos.', '2025-03-29 13:18:52', '2025-04-26 22:08:07', 2, 26, 1, NULL, 29, NULL, NULL),
(63, 'Ergonomic Paper Watch', 15903500, '', 'Minus quia pariatur ducimus.', '2025-03-29 13:18:53', '2025-04-26 22:08:07', 2, 62, 3, NULL, 30, NULL, NULL),
(64, 'Mediocre Aluminum Computer', 4545660, '', 'Atque nobis dolores explicabo.', '2025-03-29 13:18:53', '2025-04-26 22:08:07', 2, 61, 1, NULL, 31, NULL, NULL),
(65, 'Lightweight Aluminum Wallet', 60559500, '', 'Ut minus et maxime ut autem qui.', '2025-03-29 13:18:53', '2025-04-26 22:08:07', 2, 51, 2, NULL, 32, NULL, NULL),
(66, 'Lightweight Wooden Pants', 50288400, '', 'Cumque et in officia quia.', '2025-03-29 13:18:53', '2025-04-26 22:08:07', 3, 42, 2, 11, NULL, NULL, NULL),
(67, 'Heavy Duty Concrete Gloves', 51189800, '', 'Et minima non laborum.', '2025-03-29 13:18:53', '2025-04-26 22:08:07', 2, 26, 2, NULL, 33, NULL, NULL),
(68, 'Small Plastic Lamp', 41028800, '', 'Voluptatem quos placeat animi est nulla blanditiis.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 74, 2, NULL, NULL, 24, NULL),
(69, 'Fantastic Bronze Chair', 23839100, '', 'Eius exercitationem inventore.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 75, 2, NULL, 34, NULL, NULL),
(70, 'Durable Copper Chair', 73284900, '', 'Ut blanditiis rerum quam voluptates.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 3, 84, 1, 12, NULL, NULL, NULL),
(71, 'Aerodynamic Leather Coat', 44636700, '', 'Dolores sapiente aperiam illo odio.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 3, 38, 2, 13, NULL, NULL, NULL),
(72, 'Practical Rubber Watch', 5044600, '', 'Deleniti adipisci sint.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 66, 2, NULL, NULL, 25, NULL),
(73, 'Enormous Copper Lamp', 3645490, '', 'Odio itaque molestiae facilis.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 34, 2, NULL, 35, NULL, NULL),
(74, 'Practical Steel Chair', 25767500, '', 'Ab tenetur et molestiae perspiciatis voluptas aliquam.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 3, 63, 3, 14, NULL, NULL, NULL),
(75, 'Mediocre Cotton Clock', 78427100, '', 'Doloribus voluptatem eos consequatur ut eius placeat.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 44, 2, NULL, 36, NULL, NULL),
(76, 'Incredible Rubber Plate', 17702300, '', 'Ut eaque dolores aut facilis praesentium est praesentium.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 50, 2, NULL, NULL, 26, NULL),
(77, 'Mediocre Leather Table', 44957300, '', 'Minus quisquam distinctio alias eos doloremque.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 57, 2, NULL, 37, NULL, NULL),
(78, 'Incredible Concrete Shoes', 47102200, '', 'Et laboriosam et sit quisquam enim.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 62, 2, NULL, 38, NULL, NULL),
(79, 'Synergistic Rubber Car', 73377500, '', 'Soluta est omnis provident earum.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 89, 2, NULL, NULL, 27, NULL),
(80, 'Rustic Silk Computer', 43996600, '', 'Qui nihil iusto cumque nisi porro numquam.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 76, 3, NULL, 39, NULL, NULL),
(81, 'Ergonomic Aluminum Bottle', 15242300, '', 'Sed consequatur ea repudiandae.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 36, 2, NULL, NULL, 28, NULL),
(82, 'Durable Wool Watch', 65873600, '', 'Dolorum in nemo corporis modi ut.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 21, 2, NULL, 40, NULL, NULL),
(83, 'Aerodynamic Rubber Coat', 56764400, '', 'Quae ullam repellat esse magni in atque.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 20, 2, NULL, NULL, 29, NULL),
(84, 'Gorgeous Steel Knife', 1686720, '', 'Velit ipsa ducimus error voluptas possimus optio.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 30, 1, NULL, 41, NULL, NULL),
(85, 'Heavy Duty Cotton Car', 10503400, '', 'Aut ea delectus aut.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 45, 2, NULL, 42, NULL, NULL),
(86, 'Heavy Duty Iron Coat', 24373200, '', 'Nam eligendi expedita doloribus qui aut possimus quia.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 1, 54, 1, NULL, NULL, 30, NULL),
(87, 'Aerodynamic Silk Pants', 51986400, '', 'Autem distinctio sapiente et quisquam voluptatibus.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 2, 55, 1, NULL, 43, NULL, NULL),
(88, 'Rustic Paper Knife', 8608910, '', 'Cumque ratione earum.', '2025-03-29 13:18:53', '2025-04-26 22:08:08', 3, 53, 2, 15, NULL, NULL, NULL),
(89, 'Practical Plastic Hat', 4563280, '', 'Et sapiente ipsam nostrum laborum accusantium expedita.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 69, 1, NULL, NULL, 31, NULL),
(90, 'Aerodynamic Marble Knife', 49750900, '', 'Sit vitae ducimus commodi adipisci.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 87, 2, NULL, NULL, 32, NULL),
(91, 'Enormous Concrete Computer', 58876300, '', 'Dolorem minus quis.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 51, 3, NULL, 44, NULL, NULL),
(92, 'Durable Silk Shoes', 83089500, '', 'Dolorem nostrum deleniti beatae.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 79, 2, NULL, NULL, 33, NULL),
(93, 'Mediocre Iron Pants', 21031000, '', 'Dolorem odit vel iste.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 83, 1, NULL, 45, NULL, NULL),
(94, 'Awesome Silk Wallet', 7773460, '', 'Nulla vitae dignissimos eveniet id perspiciatis.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 84, 1, NULL, 46, NULL, NULL),
(95, 'Practical Cotton Bag', 58573900, '', 'Aut officiis aut eos quis.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 39, 2, NULL, 47, NULL, NULL),
(96, 'Mediocre Granite Shirt', 59265100, '', 'Aut ullam maiores enim.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 75, 2, NULL, 48, NULL, NULL),
(97, 'Durable Plastic Knife', 66451300, '', 'Cumque et minus quo facere odit omnis aliquid.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 19, 1, NULL, 49, NULL, NULL),
(98, 'Rustic Marble Keyboard', 60356400, '', 'Fuga illo animi est non et ut quis.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 16, 1, NULL, NULL, 34, NULL),
(99, 'Rustic Aluminum Computer', 49825200, '', 'Ad dolor aut.', '2025-03-29 13:18:54', '2025-04-26 22:32:53', 2, 55, 2, NULL, 50, NULL, NULL),
(100, 'Synergistic Rubber Bottle', 26220600, '', 'Aspernatur consectetur eum et.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 61, 1, NULL, NULL, 35, NULL),
(101, 'Heavy Duty Leather Chair', 72605500, '', 'Exercitationem soluta et iure voluptas est perferendis ea.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 2, 3, NULL, 51, NULL, NULL),
(102, 'Incredible Leather Bag', 75652300, '', 'At cupiditate quis quae consequatur.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 75, 3, NULL, 52, NULL, NULL),
(103, 'Ergonomic Copper Bench', 7679110, '', 'Totam aperiam ipsa ut vel voluptatibus.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 24, 2, NULL, 53, NULL, NULL),
(104, 'Gorgeous Leather Watch', 2446650, '', 'Sit eos quam labore eligendi.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 26, 3, NULL, NULL, 36, NULL),
(105, 'Intelligent Linen Pants', 58437500, '', 'Debitis aut dignissimos voluptatem quo sunt porro.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 42, 2, NULL, NULL, 37, NULL),
(106, 'Gorgeous Iron Computer', 37692600, '', 'Aut ipsa omnis.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 13, 2, NULL, 54, NULL, NULL),
(107, 'Gorgeous Concrete Plate', 77509100, '', 'Autem velit et neque occaecati.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 2, 53, 2, NULL, 55, NULL, NULL),
(108, 'Synergistic Steel Bag', 80011300, '', 'Amet commodi enim eaque commodi possimus enim.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 3, 61, 2, 16, NULL, NULL, NULL),
(109, 'Enormous Bronze Clock', 55902500, '', 'Vitae omnis expedita alias delectus odio.', '2025-03-29 13:18:54', '2025-04-26 22:08:08', 1, 84, 1, NULL, NULL, 38, NULL),
(110, 'Awesome Rubber Plate', 9230700, '', 'Eos facere in molestias.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 1, 23, 2, NULL, NULL, 39, NULL),
(111, 'Heavy Duty Rubber Table', 47424900, '', 'Ut architecto illo quam sit.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 2, 34, 3, NULL, 56, NULL, NULL),
(112, 'Sleek Wool Bag', 86539600, '', 'Reiciendis recusandae velit earum doloremque est.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 2, 19, 3, NULL, 57, NULL, NULL),
(113, 'Gorgeous Concrete Gloves', 54889600, '', 'Repellat et consequatur deleniti praesentium aut.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 3, 61, 2, 17, NULL, NULL, NULL),
(114, 'Heavy Duty Granite Table', 34703700, '', 'Accusantium nihil ex quibusdam veritatis fugiat et ipsa.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 2, 19, 2, NULL, 58, NULL, NULL),
(115, 'Enormous Leather Shoes', 75140300, '', 'Et natus possimus magnam veritatis aut.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 1, 5, 2, NULL, NULL, 40, NULL),
(116, 'Gorgeous Plastic Pants', 36631500, '', 'Officiis possimus et.', '2025-03-29 13:18:54', '2025-04-26 22:08:09', 2, 51, 1, NULL, 59, NULL, NULL),
(117, 'Small Plastic Chair', 75683100, '', 'Rerum consequuntur reprehenderit facere sint nemo harum.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 14, 1, NULL, NULL, 41, NULL),
(118, 'Small Cotton Pants', 63094000, '', 'Modi placeat autem reprehenderit et nesciunt.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 11, 2, NULL, NULL, 42, NULL),
(119, 'Ergonomic Wool Lamp', 56425200, '', 'Odit et autem harum magni sit sed dolore.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 17, 2, NULL, 60, NULL, NULL),
(120, 'Gorgeous Granite Hat', 89711100, '', 'Id officiis dolorum nulla qui sunt.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 56, 1, NULL, 61, NULL, NULL),
(121, 'Small Aluminum Watch', 60516900, '', 'Rerum sint dolores et magni doloremque.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 41, 2, NULL, NULL, 43, NULL),
(122, 'Small Leather Knife', 85316600, '', 'Et aliquid corporis ut praesentium animi.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 75, 2, NULL, 62, NULL, NULL),
(123, 'Fantastic Rubber Bottle', 49754900, '', 'Et provident amet adipisci.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 31, 2, NULL, 63, NULL, NULL),
(124, 'Heavy Duty Steel Shoes', 72782700, '', 'Eius accusamus ut numquam et explicabo maxime.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 60, 1, NULL, 64, NULL, NULL),
(125, 'Durable Linen Clock', 43190300, '', 'Fugit iure ipsum dignissimos praesentium dolor.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 53, 1, NULL, NULL, 44, NULL),
(126, 'Incredible Wooden Bench', 32846900, '', 'Voluptatibus illum cum saepe voluptas.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 65, 1, NULL, NULL, 45, NULL),
(127, 'Lightweight Leather Table', 9975780, '', 'Culpa tempora omnis aut commodi.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 74, 2, NULL, 65, NULL, NULL),
(128, 'Lightweight Concrete Bag', 15158200, '', 'Explicabo eveniet consequatur temporibus.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 70, 2, NULL, 66, NULL, NULL),
(129, 'Gorgeous Wooden Hat', 29798300, '', 'Suscipit eum doloribus quasi voluptas explicabo sint.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 32, 2, NULL, NULL, 46, NULL),
(130, 'Awesome Steel Bench', 42027700, '', 'Aliquam molestias vel deserunt a.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 31, 3, NULL, NULL, 47, NULL),
(131, 'Intelligent Copper Hat', 69317900, '', 'Voluptatem ipsam porro quod.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 17, 2, NULL, 67, NULL, NULL),
(132, 'Incredible Steel Watch', 42798500, '', 'Amet vel nihil natus.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 37, 2, NULL, 68, NULL, NULL),
(133, 'Ergonomic Copper Hat', 88278700, '', 'Aut veniam ut voluptas.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 3, 85, 2, 18, NULL, NULL, NULL),
(134, 'Gorgeous Wool Watch', 23733600, '', 'Minus ad accusantium praesentium impedit.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 7, 2, NULL, 69, NULL, NULL),
(135, 'Heavy Duty Paper Hat', 73463600, '', 'Voluptate laudantium rerum reprehenderit aut omnis nesciunt esse.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 25, 2, NULL, 70, NULL, NULL),
(136, 'Aerodynamic Concrete Knife', 17783300, '', 'Nihil itaque suscipit expedita repellat molestias dolorem.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 50, 2, NULL, 71, NULL, NULL),
(137, 'Intelligent Linen Gloves', 45972600, '', 'Sed deleniti et quia dicta esse aut.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 65, 3, NULL, 72, NULL, NULL),
(138, 'Fantastic Bronze Coat', 39123900, '', 'Saepe vero ratione itaque deleniti.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 1, 26, 1, NULL, NULL, 48, NULL),
(139, 'Synergistic Silk Clock', 1805090, '', 'Est in similique voluptas iusto doloribus tempora.', '2025-03-29 13:18:55', '2025-04-26 22:08:09', 2, 58, 2, NULL, 73, NULL, NULL),
(140, 'Heavy Duty Granite Wallet', 52096600, '', 'Rem accusantium voluptate quo quasi et omnis.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 41, 1, NULL, 74, NULL, NULL),
(141, 'Sleek Bronze Bottle', 20621300, '', 'Iure et harum sint est itaque.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 31, 3, NULL, 75, NULL, NULL),
(142, 'Ergonomic Aluminum Pants', 70348100, '', 'Qui est itaque.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 16, 3, NULL, 76, NULL, NULL),
(143, 'Heavy Duty Copper Shoes', 58283600, '', 'Sed aut blanditiis est laudantium culpa.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 1, 15, 2, NULL, NULL, 49, NULL),
(144, 'Enormous Copper Knife', 52849500, '', 'Recusandae minus doloremque minima veritatis ad dolor id.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 3, 45, 2, 19, NULL, NULL, NULL),
(145, 'Rustic Paper Clock', 42960700, '', 'Vitae a necessitatibus perferendis suscipit.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 49, 3, NULL, 77, NULL, NULL),
(146, 'Durable Bronze Wallet', 45917000, '', 'Eum rerum voluptas quibusdam minus.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 61, 1, NULL, 78, NULL, NULL),
(147, 'Small Steel Gloves', 19956800, '', 'Necessitatibus aperiam est et et.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 11, 2, NULL, 79, NULL, NULL),
(148, 'Sleek Bronze Car', 15031000, '', 'Saepe necessitatibus eum sunt id sint aliquam sit.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 16, 2, NULL, 80, NULL, NULL),
(149, 'Fantastic Marble Hat', 78524100, '', 'Ducimus eum autem exercitationem ut omnis.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 1, 75, 2, NULL, NULL, 50, NULL),
(150, 'Aerodynamic Marble Bag', 19623600, '', 'Assumenda nostrum officia sapiente saepe.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 1, 50, 2, NULL, NULL, 51, NULL),
(151, 'Gorgeous Cotton Watch', 73336500, '', 'Odit facere voluptatibus minus cum odio inventore.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 3, 47, 2, 20, NULL, NULL, NULL),
(152, 'Synergistic Wool Bench', 39205800, '', 'Aspernatur dolores quas iusto.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 1, 28, 2, NULL, NULL, 52, NULL),
(153, 'Mediocre Bronze Coat', 87126000, '', 'Autem et magni magni debitis.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 3, 69, 2, 21, NULL, NULL, NULL),
(154, 'Aerodynamic Plastic Car', 44641300, '', 'Dignissimos non architecto corporis rerum sed aspernatur accusantium.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 37, 2, NULL, 81, NULL, NULL),
(155, 'Enormous Plastic Keyboard', 86431700, '', 'Ab ipsum omnis ullam vero maiores.', '2025-03-29 13:18:56', '2025-04-26 22:08:09', 2, 31, 2, NULL, 82, NULL, NULL),
(156, 'Aerodynamic Rubber Knife', 73450500, '', 'Beatae et consequuntur dolores at sequi tenetur error.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 3, 30, 2, 22, NULL, NULL, NULL),
(157, 'Aerodynamic Bronze Wallet', 47046600, '', 'Officiis et harum illo libero totam optio nihil.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 3, 47, 2, 23, NULL, NULL, NULL),
(158, 'Synergistic Leather Computer', 40108500, '', 'Suscipit tenetur non nulla aut sit.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 1, 42, 2, NULL, NULL, 53, NULL),
(159, 'Small Silk Pants', 63031000, '', 'Dolore corporis et architecto sed laudantium.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 1, 85, 2, NULL, NULL, 54, NULL),
(160, 'Fantastic Aluminum Shoes', 31391400, '', 'Odio et aliquid ut vitae omnis adipisci ut.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 1, 7, 1, NULL, NULL, 55, NULL),
(161, 'Sleek Silk Bottle', 5519980, '', 'Pariatur voluptatem vitae architecto cumque voluptatem doloribus.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 1, 3, 1, NULL, NULL, 56, NULL),
(162, 'Heavy Duty Rubber Lamp', 81205000, '', 'Explicabo ut sed.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 2, 34, 3, NULL, 83, NULL, NULL),
(163, 'Small Cotton Knife', 22207300, '', 'Quaerat delectus ut voluptas sed mollitia vero.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 2, 39, 2, NULL, 84, NULL, NULL),
(164, 'Awesome Silk Coat', 6105030, '', 'Laboriosam unde quos non nulla non dignissimos.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 2, 38, 2, NULL, 85, NULL, NULL),
(165, 'Heavy Duty Iron Bag', 75147000, '', 'Nisi suscipit non.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 2, 1, 1, NULL, 86, NULL, NULL),
(166, 'Ergonomic Steel Lamp', 42899900, '', 'Pariatur aut dicta.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 2, 49, 3, NULL, 87, NULL, NULL),
(167, 'Small Cotton Lamp', 70578400, '', 'Pariatur iste vero aut debitis cupiditate voluptatem.', '2025-03-29 13:18:56', '2025-04-26 22:08:10', 1, 86, 2, NULL, NULL, 57, NULL),
(168, 'Rustic Wooden Car', 121046, '', 'Optio dolor rem veritatis veritatis est.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 37, 1, NULL, 88, NULL, NULL),
(169, 'Mediocre Copper Bag', 28763900, '', 'Voluptatibus nesciunt exercitationem ut nobis mollitia.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 64, 2, NULL, NULL, 58, NULL),
(170, 'Aerodynamic Copper Bench', 17006400, '', 'Voluptatem qui aut voluptas.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 33, 2, NULL, 89, NULL, NULL),
(171, 'Rustic Leather Shoes', 75544900, '', 'Ex qui pariatur ut.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 21, 1, NULL, 90, NULL, NULL),
(172, 'Synergistic Granite Shirt', 54351900, '', 'Sed rerum amet ut omnis cum.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 5, 1, NULL, NULL, 59, NULL),
(173, 'Mediocre Steel Gloves', 67682400, '', 'Labore occaecati adipisci vel.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 36, 3, NULL, 91, NULL, NULL),
(174, 'Synergistic Iron Wallet', 34485700, '', 'Numquam ipsam beatae.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 49, 2, NULL, NULL, 60, NULL),
(175, 'Synergistic Cotton Knife', 31013000, '', 'Sequi dolor earum ut.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 7, 1, NULL, NULL, 61, NULL),
(176, 'Small Cotton Keyboard', 72694800, '', 'Cupiditate repudiandae quod necessitatibus quasi eum.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 59, 1, NULL, 92, NULL, NULL),
(177, 'Heavy Duty Rubber Gloves', 7382460, '', 'Dolorum ipsa quisquam.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 90, 2, NULL, NULL, 62, NULL),
(178, 'Ergonomic Cotton Gloves', 49587600, '', 'Perspiciatis deserunt laborum pariatur sit qui.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 3, 53, 2, 24, NULL, NULL, NULL),
(179, 'Practical Aluminum Bottle', 79726100, '', 'Magni repellendus quam dignissimos accusamus quo aut.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 28, 2, NULL, NULL, 63, NULL),
(180, 'Awesome Plastic Shoes', 24332600, '', 'Voluptatem voluptates quidem similique et consectetur eaque quia.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 41, 3, NULL, 93, NULL, NULL),
(181, 'Lightweight Bronze Car', 21400100, '', 'Est dolore exercitationem quia eaque.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 23, 2, NULL, 94, NULL, NULL),
(182, 'Ergonomic Silk Bottle', 53889500, '', 'Sunt quo saepe.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 75, 2, NULL, 95, NULL, NULL),
(183, 'Fantastic Wooden Car', 2449740, '', 'Sit modi doloremque.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 31, 2, NULL, 96, NULL, NULL),
(184, 'Enormous Marble Keyboard', 37238200, '', 'Nemo exercitationem officiis cupiditate aut optio sequi.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 56, 1, NULL, NULL, 64, NULL),
(185, 'Rustic Wooden Gloves', 11577400, '', 'Molestias laudantium at architecto.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 10, 2, NULL, 97, NULL, NULL),
(186, 'Small Bronze Keyboard', 56633100, '', 'Repellendus quia autem reprehenderit maiores quam.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 62, 2, NULL, 98, NULL, NULL),
(187, 'Gorgeous Linen Coat', 82813300, '', 'Optio suscipit minus in expedita.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 3, 40, 2, 25, NULL, NULL, NULL),
(188, 'Lightweight Concrete Shoes', 83564300, '', 'Reiciendis commodi tenetur architecto autem et debitis qui.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 27, 2, NULL, 99, NULL, NULL),
(189, 'Fantastic Marble Computer', 84138100, '', 'Recusandae dolorem vel animi odit et.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 48, 3, NULL, 100, NULL, NULL),
(190, 'Ergonomic Bronze Car', 37001000, '', 'Dolorum quia distinctio tenetur modi dolorum error.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 1, 26, 1, NULL, NULL, 65, NULL),
(191, 'Heavy Duty Copper Shirt', 5189360, '', 'Ipsam voluptas exercitationem.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 25, 2, NULL, 101, NULL, NULL),
(192, 'Gorgeous Concrete Bottle', 60837700, '', 'Officiis labore et.', '2025-03-29 13:18:57', '2025-04-26 22:08:10', 2, 55, 2, NULL, 102, NULL, NULL),
(193, 'Heavy Duty Paper Keyboard', 16212700, '', 'Quae commodi eum.', '2025-03-29 13:18:58', '2025-04-26 22:08:10', 2, 53, 2, NULL, 103, NULL, NULL),
(194, 'Awesome Marble Hat', 73130400, '', 'Velit repellat hic qui tenetur voluptatem quae natus.', '2025-03-29 13:18:58', '2025-04-26 22:08:10', 2, 35, 1, NULL, 104, NULL, NULL),
(195, 'Practical Aluminum Car', 35734600, '', 'Cum voluptas iusto autem voluptas asperiores.', '2025-03-29 13:18:58', '2025-04-26 22:08:10', 2, 56, 2, NULL, 105, NULL, NULL),
(196, 'Durable Steel Hat', 60520200, '', 'Voluptatem pariatur debitis.', '2025-03-29 13:18:58', '2025-04-26 22:08:10', 2, 8, 1, NULL, 106, NULL, NULL),
(197, 'Aerodynamic Steel Gloves', 2361090, '', 'Temporibus odio sit.', '2025-03-29 13:18:58', '2025-04-26 22:08:10', 1, 46, 2, NULL, NULL, 66, NULL),
(198, 'Sleek Wooden Bag', 55316800, '', 'Harum et quidem dolorem soluta illo et.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 1, 30, 2, NULL, NULL, 67, NULL),
(199, 'Rustic Paper Keyboard', 68069400, '', 'Et cumque qui consequuntur.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 8, 2, NULL, 107, NULL, NULL),
(200, 'Incredible Cotton Table', 15914700, '', 'Illo laudantium ratione tempore voluptas necessitatibus facere ea.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 12, 1, NULL, 108, NULL, NULL),
(201, 'Gorgeous Wooden Car', 49746200, '', 'Inventore ut ut ea sunt.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 73, 2, NULL, 109, NULL, NULL),
(202, 'Practical Steel Hat', 54490600, '', 'Magni laborum voluptatem consequatur est est et quia.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 11, 2, NULL, 110, NULL, NULL),
(203, 'Intelligent Leather Car', 49745200, '', 'Sunt quam fugit aut aut autem illum.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 3, 56, 1, 26, NULL, NULL, NULL),
(204, 'Small Paper Lamp', 8907510, '', 'Repellat consequatur deserunt veritatis qui iure aut eos.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 1, 35, 3, NULL, NULL, 68, NULL),
(205, 'Ergonomic Bronze Chair', 57082800, '', 'Illo nemo ad quo quo.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 1, 58, 2, NULL, NULL, 69, NULL),
(206, 'Mediocre Bronze Bottle', 68834100, '', 'Ratione aut beatae blanditiis omnis non aliquid aut.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 37, 2, NULL, 111, NULL, NULL),
(207, 'Ergonomic Rubber Watch', 36477800, '', 'Placeat at maxime qui placeat dolores.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 3, 74, 3, 27, NULL, NULL, NULL),
(208, 'Aerodynamic Paper Plate', 56466600, '', 'Ex dignissimos quia nisi.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 74, 2, NULL, 112, NULL, NULL),
(209, 'Gorgeous Paper Bag', 6394660, '', 'Consequatur occaecati harum.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 5, 2, NULL, 113, NULL, NULL),
(210, 'Aerodynamic Aluminum Wallet', 51676800, '', 'Ut rerum eveniet eveniet.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 1, 33, 2, NULL, NULL, 70, NULL),
(211, 'Fantastic Marble Knife', 17013500, '', 'At quo expedita et.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 1, 58, 2, NULL, NULL, 71, NULL),
(212, 'Practical Silk Wallet', 88992100, '', 'Eius iste velit tempora sed qui omnis.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 61, 1, NULL, 114, NULL, NULL),
(213, 'Mediocre Copper Gloves', 81539100, '', 'Cupiditate omnis officia est dignissimos rem quod et.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 1, 24, 2, NULL, NULL, 72, NULL),
(214, 'Small Leather Lamp', 14386800, '', 'Voluptatem error voluptatem iusto eius.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 43, 2, NULL, 115, NULL, NULL),
(215, 'Rustic Steel Gloves', 84092100, '', 'Similique quod enim sit nihil cumque.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 38, 1, NULL, 116, NULL, NULL),
(216, 'Fantastic Rubber Gloves', 3318690, '', 'Aperiam sunt quisquam et ipsam tenetur.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 2, 79, 2, NULL, 117, NULL, NULL),
(217, 'Durable Rubber Bag', 1151080, '', 'Repellendus assumenda excepturi ratione non amet.', '2025-03-29 13:18:58', '2025-04-26 22:08:11', 3, 27, 2, 28, NULL, NULL, NULL),
(218, 'Synergistic Concrete Keyboard', 85082900, '', 'Est qui vero dolores et quos molestiae.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 27, 2, NULL, NULL, 73, NULL),
(219, 'Durable Bronze Chair', 57699800, '', 'Ipsam nihil assumenda ut sint dolores excepturi.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 68, 2, NULL, 118, NULL, NULL),
(220, 'Incredible Bronze Bench', 32531200, '', 'Eveniet autem impedit inventore.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 85, 2, NULL, NULL, 74, NULL),
(221, 'Sleek Iron Coat', 429326, '', 'A reiciendis quas sunt reiciendis eveniet.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 11, 1, NULL, NULL, 75, NULL),
(222, 'Incredible Cotton Pants', 58132200, '', 'Dolores omnis saepe.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 32, 1, NULL, NULL, 76, NULL),
(223, 'Awesome Iron Bottle', 3736750, '', 'Adipisci perspiciatis iste laboriosam ut non eum qui.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 13, 1, NULL, 119, NULL, NULL),
(224, 'Incredible Aluminum Wallet', 67495700, '', 'Nisi ipsam est.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 58, 1, NULL, 120, NULL, NULL),
(225, 'Small Marble Car', 42790200, '', 'Et amet qui adipisci sit.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 26, 2, NULL, 121, NULL, NULL),
(226, 'Aerodynamic Copper Wallet', 32063700, '', 'Nobis ea sed quos ut sit consequuntur.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 26, 2, NULL, 122, NULL, NULL),
(227, 'Mediocre Rubber Wallet', 38252700, '', 'Architecto et fugit dicta.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 3, 60, 2, 29, NULL, NULL, NULL),
(228, 'Rustic Linen Bag', 46622900, '', 'Qui veniam aperiam molestiae sed ut dolor facilis.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 61, 2, NULL, 123, NULL, NULL),
(229, 'Awesome Marble Bottle', 77280900, '', 'Ea molestias voluptatem distinctio optio.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 48, 1, NULL, 124, NULL, NULL),
(230, 'Aerodynamic Plastic Coat', 87930700, '', 'Vel laudantium qui aut neque aut.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 3, 42, 2, 30, NULL, NULL, NULL),
(231, 'Mediocre Aluminum Wallet', 12011100, '', 'Libero eius et.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 71, 2, NULL, 125, NULL, NULL),
(232, 'Small Wool Knife', 57535500, '', 'Voluptatem dignissimos dolore.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 33, 2, NULL, 126, NULL, NULL),
(233, 'Lightweight Plastic Pants', 41567500, '', 'Similique corrupti id sunt.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 88, 2, NULL, 127, NULL, NULL),
(234, 'Lightweight Marble Knife', 52170800, '', 'Corporis autem molestiae.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 73, 2, NULL, NULL, 77, NULL),
(235, 'Aerodynamic Concrete Chair', 8509720, '', 'Qui reprehenderit placeat sint ipsam ut voluptatibus.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 13, 2, NULL, NULL, 78, NULL),
(236, 'Practical Copper Watch', 66956900, '', 'Consequuntur repudiandae omnis hic amet.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 63, 2, NULL, 128, NULL, NULL),
(237, 'Intelligent Marble Shirt', 77247500, '', 'Dolores eos ratione nihil earum nihil.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 64, 3, NULL, NULL, 79, NULL),
(238, 'Heavy Duty Wool Table', 63637300, '', 'Et dicta unde.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 42, 2, NULL, 129, NULL, NULL),
(239, 'Ergonomic Copper Bottle', 71602600, '', 'Et et sapiente sunt.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 48, 2, NULL, 130, NULL, NULL),
(240, 'Ergonomic Bronze Lamp', 24835400, '', 'Beatae voluptatem odio magnam incidunt quibusdam.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 2, 64, 2, NULL, 131, NULL, NULL),
(241, 'Synergistic Copper Watch', 72917900, '', 'Et ut distinctio suscipit.', '2025-03-29 13:18:59', '2025-04-26 22:08:11', 1, 74, 3, NULL, NULL, 80, NULL),
(242, 'Rustic Iron Gloves', 31463200, '', 'Et autem quas nisi et.', '2025-03-29 13:18:59', '2025-04-26 22:08:12', 3, 34, 2, 31, NULL, NULL, NULL),
(243, 'Lightweight Wool Coat', 68038100, '', 'Optio velit corporis adipisci ab quia vero voluptate.', '2025-03-29 13:18:59', '2025-04-26 22:08:12', 2, 77, 3, NULL, 132, NULL, NULL),
(244, 'Practical Granite Plate', 85872500, '', 'Illo qui dolorem.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 76, 2, NULL, NULL, 81, NULL),
(245, 'Lightweight Steel Hat', 73099100, '', 'Iure voluptates ea ea corrupti earum at.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 10, 2, NULL, 133, NULL, NULL),
(246, 'Lightweight Wool Hat', 25040300, '', 'Sunt ad aut unde placeat sit consectetur placeat.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 46, 3, NULL, 134, NULL, NULL),
(247, 'Small Paper Keyboard', 86422400, '', 'Vel aspernatur quas dignissimos sit enim autem.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 10, 1, NULL, 135, NULL, NULL),
(248, 'Fantastic Linen Watch', 67560900, '', 'Tempora consequuntur in asperiores quam.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 21, 3, NULL, 136, NULL, NULL),
(249, 'Fantastic Wooden Coat', 4112580, '', 'Deserunt dicta cumque consequatur adipisci.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 56, 3, NULL, 137, NULL, NULL),
(250, 'Lightweight Leather Hat', 26989700, '', 'Occaecati in accusamus numquam nam error dolore velit.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 30, 2, NULL, NULL, 82, NULL),
(251, 'Lightweight Wool Car', 68986200, '', 'Qui et delectus cumque.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 3, 8, 1, 32, NULL, NULL, NULL),
(252, 'Ergonomic Copper Plate', 20677000, '', 'Ea alias accusantium vitae quia facilis dicta.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 3, 47, 2, 33, NULL, NULL, NULL),
(253, 'Lightweight Wool Knife', 13040100, '', 'Aliquam consequatur voluptatibus.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 3, 7, 1, 34, NULL, NULL, NULL),
(254, 'Intelligent Iron Watch', 67098700, '', 'Corrupti magni natus.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 68, 2, NULL, NULL, 83, NULL),
(255, 'Practical Rubber Pants', 75534000, '', 'Vel qui nihil.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 6, 1, NULL, NULL, 84, NULL),
(256, 'Rustic Plastic Coat', 51564800, '', 'Explicabo non est quisquam explicabo odio.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 89, 1, NULL, NULL, 85, NULL),
(257, 'Aerodynamic Leather Shirt', 36521800, '', 'Ducimus praesentium nihil ipsam.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 78, 2, NULL, 138, NULL, NULL),
(258, 'Synergistic Leather Gloves', 39709800, '', 'Nemo atque earum quis sed est earum.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 64, 2, NULL, 139, NULL, NULL),
(259, 'Fantastic Wool Bench', 20168100, '', 'Vero tenetur voluptate mollitia fugit eum quos ut.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 3, 26, 2, 35, NULL, NULL, NULL),
(260, 'Enormous Steel Wallet', 29517500, '', 'Sapiente aspernatur quia laborum doloribus laborum est.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 64, 1, NULL, 140, NULL, NULL),
(261, 'Fantastic Rubber Chair', 22437700, '', 'Vero assumenda sit perferendis.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 47, 2, NULL, 141, NULL, NULL),
(262, 'Durable Plastic Table', 25063000, '', 'Est magnam voluptas aut.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 56, 1, NULL, NULL, 86, NULL),
(263, 'Durable Linen Bench', 21660900, '', 'Voluptatibus sunt maxime et.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 23, 2, NULL, 142, NULL, NULL),
(264, 'Mediocre Bronze Pants', 44556300, '', 'Rerum voluptatem et provident illum quaerat.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 3, 58, 1, 36, NULL, NULL, NULL),
(265, 'Rustic Copper Hat', 25389400, '', 'Sapiente quidem facilis corporis ea ut dignissimos impedit.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 2, 47, 2, NULL, 143, NULL, NULL),
(266, 'Lightweight Aluminum Shirt', 4228890, '', 'Sed qui nihil et.', '2025-03-29 13:19:00', '2025-04-26 22:08:12', 1, 32, 2, NULL, NULL, 87, NULL),
(267, 'Intelligent Aluminum Keyboard', 29164500, '', 'Dolorum quia ea sint asperiores.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 64, 2, NULL, 144, NULL, NULL),
(268, 'Lightweight Rubber Coat', 23352500, '', 'Quisquam aut incidunt.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 79, 1, NULL, 145, NULL, NULL),
(269, 'Awesome Rubber Table', 76510500, '', 'Nobis occaecati dolorem labore.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 1, 6, 2, NULL, NULL, 88, NULL),
(270, 'Aerodynamic Copper Table', 53627800, '', 'Sed eaque molestias quis deserunt non ipsa.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 1, 73, 2, NULL, NULL, 89, NULL),
(271, 'Synergistic Wooden Bottle', 36816100, '', 'Magnam suscipit velit dolores suscipit.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 5, 1, NULL, 146, NULL, NULL),
(272, 'Sleek Copper Keyboard', 70424400, '', 'Nemo nisi atque expedita eius.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 1, 72, 2, NULL, NULL, 90, NULL),
(273, 'Ergonomic Plastic Gloves', 14360900, '', 'Magnam quia rem debitis.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 1, 7, 2, NULL, NULL, 91, NULL),
(274, 'Mediocre Copper Bench', 58941300, '', 'Animi deserunt veritatis nostrum deserunt sint aperiam sequi.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 58, 2, NULL, 147, NULL, NULL),
(275, 'Gorgeous Rubber Table', 11098100, '', 'Cum ducimus asperiores laudantium.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 3, 41, 3, 37, NULL, NULL, NULL),
(276, 'Durable Bronze Clock', 17271700, '', 'Eaque consequatur doloremque maxime maxime.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 3, 35, 3, 38, NULL, NULL, NULL),
(277, 'Gorgeous Wooden Watch', 40414800, '', 'Eum qui dicta enim repudiandae vero et.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 4, 3, NULL, 148, NULL, NULL),
(278, 'Intelligent Granite Hat', 62708900, '', 'Ad aperiam magnam necessitatibus.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 1, 25, 2, NULL, NULL, 92, NULL),
(279, 'Sleek Bronze Shoes', 28511900, '', 'Ea veritatis dolore.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 14, 2, NULL, 149, NULL, NULL),
(280, 'Ergonomic Leather Keyboard', 25331900, '', 'Alias dicta aliquam est enim est velit placeat.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 59, 2, NULL, 150, NULL, NULL),
(281, 'Lightweight Paper Watch', 52986300, '', 'Illum fugiat aut aspernatur iste et.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 1, 87, 2, NULL, NULL, 93, NULL),
(282, 'Lightweight Wooden Hat', 1528260, '', 'Error nihil cumque necessitatibus vel.', '2025-03-29 13:19:01', '2025-04-26 22:08:12', 2, 89, 3, NULL, 151, NULL, NULL),
(283, 'Synergistic Plastic Shirt', 59465300, '', 'Repudiandae fugiat eum.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 2, 87, 3, NULL, 152, NULL, NULL),
(284, 'Mediocre Marble Bench', 79523500, '', 'Vel optio voluptas perspiciatis esse sed eius et.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 2, 80, 3, NULL, 153, NULL, NULL),
(285, 'Enormous Steel Gloves', 52233800, '', 'Quidem architecto aut neque dolores est atque et.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 2, 38, 2, NULL, 154, NULL, NULL),
(286, 'Mediocre Marble Car', 22807100, '', 'Illo animi quae iste voluptatem ut.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 2, 58, 2, NULL, 155, NULL, NULL),
(287, 'Fantastic Iron Car', 79082400, '', 'Doloribus atque voluptatibus dolorem nulla enim tempora.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 1, 48, 2, NULL, NULL, 94, NULL),
(288, 'Heavy Duty Silk Computer', 85718700, '', 'Magnam in cumque nemo distinctio minus quas eius.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 3, 53, 2, 39, NULL, NULL, NULL),
(289, 'Synergistic Steel Lamp', 45575200, '', 'Facilis magnam esse porro.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 2, 13, 1, NULL, 156, NULL, NULL),
(290, 'Fantastic Cotton Car', 32391000, '', 'Non magni quasi deserunt eum rerum delectus labore.', '2025-03-29 13:19:01', '2025-04-26 22:08:13', 1, 3, 3, NULL, NULL, 95, NULL),
(291, 'Fantastic Paper Wallet', 37877100, '', 'Sapiente sunt sint et.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 34, 1, NULL, 157, NULL, NULL),
(292, 'Gorgeous Copper Hat', 81388300, '', 'Molestiae ut dolores earum repudiandae ad in esse.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 24, 2, NULL, 158, NULL, NULL),
(293, 'Rustic Granite Computer', 67290200, '', 'Maxime accusantium qui sit excepturi.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 19, 2, NULL, NULL, 96, NULL),
(294, 'Synergistic Rubber Gloves', 3001620, '', 'Tempora soluta ipsum dolorum molestiae.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 47, 2, NULL, NULL, 97, NULL),
(295, 'Rustic Leather Bag', 11158600, '', 'Ipsum ratione natus cupiditate quae rerum.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 3, 65, 2, 40, NULL, NULL, NULL),
(296, 'Mediocre Plastic Bag', 77174700, '', 'Debitis est reiciendis nihil.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 38, 2, NULL, 159, NULL, NULL),
(297, 'Enormous Granite Gloves', 38278400, '', 'Perferendis rem deleniti eum est dicta ipsum error.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 71, 3, NULL, 160, NULL, NULL),
(298, 'Aerodynamic Wooden Plate', 52519300, '', 'In illum molestiae eveniet.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 20, 1, NULL, 161, NULL, NULL),
(299, 'Gorgeous Aluminum Lamp', 31756600, '', 'Illo recusandae perferendis ipsa ut minima.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 3, 4, 2, 41, NULL, NULL, NULL),
(300, 'Mediocre Bronze Bench', 57579600, '', 'Ducimus architecto maxime sed perspiciatis.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 74, 2, NULL, 162, NULL, NULL),
(301, 'Incredible Paper Knife', 76285700, '', 'Odit libero autem vitae est illo nihil.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 3, 50, 2, 42, NULL, NULL, NULL),
(302, 'Ergonomic Paper Shoes', 36989700, '', 'Atque et nemo aut.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 49, 2, NULL, 163, NULL, NULL),
(303, 'Lightweight Plastic Bottle', 60554900, '', 'Eum nemo ut eveniet qui provident dolores et.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 3, 51, 3, 43, NULL, NULL, NULL),
(304, 'Incredible Paper Pants', 27946200, '', 'Iste omnis quod quaerat consequuntur.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 89, 2, NULL, NULL, 98, NULL);
INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`, `stock_quantity`, `brand_id`, `headphone_specs_id`, `keyboard_specs_id`, `mouse_specs_id`, `discount_percent`) VALUES
(305, 'Fantastic Silk Chair', 760941, '', 'Est voluptas rem.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 79, 1, NULL, NULL, 99, NULL),
(306, 'Sleek Copper Shirt', 88204400, '', 'Assumenda dolor est vel.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 54, 1, NULL, 164, NULL, NULL),
(307, 'Lightweight Iron Knife', 7764710, '', 'Atque quidem rem non laboriosam vero.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 33, 2, NULL, 165, NULL, NULL),
(308, 'Incredible Iron Watch', 17508200, '', 'Quisquam ipsam similique.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 42, 1, NULL, NULL, 100, NULL),
(309, 'Aerodynamic Marble Clock', 2761250, '', 'Qui dolorem saepe magnam nostrum impedit.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 55, 2, NULL, 166, NULL, NULL),
(310, 'Rustic Bronze Gloves', 60444700, '', 'Veniam eligendi tempora magnam.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 36, 2, NULL, 167, NULL, NULL),
(311, 'Durable Aluminum Plate', 13189800, '', 'Aut quo vitae doloribus.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 29, 2, NULL, NULL, 101, NULL),
(312, 'Awesome Rubber Wallet', 1396300, '', 'Omnis omnis voluptate.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 1, 47, 2, NULL, NULL, 102, NULL),
(313, 'Small Leather Shoes', 12101400, '', 'Dolores consectetur quis.', '2025-03-29 13:19:02', '2025-04-26 22:08:13', 2, 45, 2, NULL, 168, NULL, NULL),
(314, 'Fantastic Plastic Clock', 53470900, '', 'Libero molestias dolores laborum et reprehenderit.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 3, 85, 2, 44, NULL, NULL, NULL),
(315, 'Fantastic Marble Car', 85525700, '', 'Quaerat rem aut.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 2, 82, 3, NULL, 169, NULL, NULL),
(316, 'Synergistic Paper Gloves', 19197000, '', 'Enim ut ducimus vel nulla.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 1, 56, 1, NULL, NULL, 103, NULL),
(317, 'Lightweight Copper Lamp', 36689900, '', 'Aut sed voluptas.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 2, 58, 2, NULL, 170, NULL, NULL),
(318, 'Sleek Granite Pants', 71032500, '', 'Consequatur excepturi totam.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 2, 37, 2, NULL, 171, NULL, NULL),
(319, 'Durable Aluminum Car', 14718200, '', 'Error saepe distinctio consequatur.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 1, 31, 3, NULL, NULL, 104, NULL),
(320, 'Sleek Rubber Shirt', 45557200, '', 'Aut tempora ipsam corporis.', '2025-03-29 13:19:03', '2025-04-26 22:08:13', 2, 10, 3, NULL, 172, NULL, NULL),
(321, 'Sleek Wool Gloves', 83794100, '', 'Et amet facilis magnam qui.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 1, 35, 3, NULL, NULL, 105, NULL),
(322, 'Lightweight Wool Shoes', 68630000, '', 'Amet laudantium possimus.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 1, 5, 2, NULL, NULL, 106, NULL),
(323, 'Aerodynamic Silk Shirt', 1909360, '', 'Id enim cumque voluptas omnis est libero.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 83, 2, NULL, 173, NULL, NULL),
(324, 'Durable Rubber Shoes', 49195300, '', 'Optio amet deserunt.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 3, 10, 2, 45, NULL, NULL, NULL),
(325, 'Lightweight Paper Bottle', 62172600, '', 'Magnam omnis sit.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 3, 72, 2, 46, NULL, NULL, NULL),
(326, 'Enormous Bronze Bag', 1524630, '', 'Commodi est dicta nihil rem cumque qui.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 48, 3, NULL, 174, NULL, NULL),
(327, 'Practical Iron Pants', 81365300, '', 'Saepe et nihil molestias distinctio.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 33, 2, NULL, 175, NULL, NULL),
(328, 'Gorgeous Concrete Bench', 79538700, '', 'Impedit qui distinctio iste.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 53, 2, NULL, 176, NULL, NULL),
(329, 'Intelligent Steel Coat', 58539900, '', 'Tenetur voluptate optio.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 3, 54, 1, 47, NULL, NULL, NULL),
(330, 'Lightweight Paper Coat', 45455300, '', 'Consequatur est sed quo.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 83, 1, NULL, 177, NULL, NULL),
(331, 'Rustic Aluminum Keyboard', 75094300, '', 'Consequuntur aspernatur consequatur doloremque ut maiores.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 1, 72, 2, NULL, NULL, 107, NULL),
(332, 'Small Linen Bag', 60455500, '', 'Officia sunt officiis velit.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 51, 2, NULL, 178, NULL, NULL),
(333, 'Small Cotton Plate', 1824850, '', 'Velit et aspernatur odit ab illo accusamus.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 70, 2, NULL, 179, NULL, NULL),
(334, 'Heavy Duty Bronze Plate', 31021800, '', 'Maiores vero natus voluptatibus sit voluptatum.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 1, 85, 3, NULL, NULL, 108, NULL),
(335, 'Synergistic Silk Hat', 67491500, '', 'Natus maxime harum molestiae.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 1, 81, 1, NULL, NULL, 109, NULL),
(336, 'Lightweight Leather Chair', 67388900, '', 'Non maiores occaecati amet nostrum velit consequatur ullam.', '2025-03-29 13:19:03', '2025-04-26 22:08:14', 2, 70, 2, NULL, 180, NULL, NULL),
(337, 'Awesome Plastic Watch', 83112400, '', 'A doloremque hic qui et fuga quasi.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 53, 2, NULL, 181, NULL, NULL),
(338, 'Rustic Wool Shoes', 85817700, '', 'Laboriosam sit hic quisquam voluptatem repellat ea.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 84, 1, NULL, NULL, 110, NULL),
(339, 'Small Plastic Shirt', 4030430, '', 'Autem et et sint.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 4, 1, NULL, 182, NULL, NULL),
(340, 'Synergistic Iron Computer', 29021000, '', 'Consequuntur rerum rem vel eos magnam similique quae.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 18, 2, NULL, 183, NULL, NULL),
(341, 'Practical Aluminum Bench', 58755600, '', 'Accusamus aut sunt rerum sit id quas enim.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 80, 2, NULL, NULL, 111, NULL),
(342, 'Enormous Wooden Bench', 60914900, '', 'Dolorem rerum at officia.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 28, 2, NULL, 184, NULL, NULL),
(343, 'Practical Marble Knife', 71777700, '', 'Aut et laborum quam vero eveniet ut rerum.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 2, 2, NULL, 185, NULL, NULL),
(344, 'Awesome Granite Pants', 31378800, '', 'Illum fugiat nobis numquam magni quia.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 3, 9, 1, 48, NULL, NULL, NULL),
(345, 'Awesome Copper Wallet', 81098700, '', 'Ut repellendus voluptates consequatur.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 33, 1, NULL, NULL, 112, NULL),
(346, 'Mediocre Leather Car', 61564300, '', 'Enim voluptatem reprehenderit autem consequatur quasi.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 36, 2, NULL, NULL, 113, NULL),
(347, 'Rustic Plastic Table', 47869100, '', 'Numquam iure officia eveniet deleniti.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 81, 1, NULL, 186, NULL, NULL),
(348, 'Ergonomic Wooden Bag', 29276600, '', 'Explicabo consequatur consequuntur est omnis provident.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 29, 2, NULL, 187, NULL, NULL),
(349, 'Intelligent Iron Shoes', 65630800, '', 'Earum quam ipsam enim reprehenderit.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 18, 2, NULL, 188, NULL, NULL),
(350, 'Incredible Leather Hat', 27261500, '', 'Iusto velit temporibus sunt delectus cupiditate sapiente nesciunt.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 5, 1, NULL, 189, NULL, NULL),
(351, 'Durable Copper Clock', 3681510, '', 'Modi ullam possimus consequatur atque velit est.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 19, 3, NULL, 190, NULL, NULL),
(352, 'Aerodynamic Rubber Shirt', 24636100, '', 'A repellat esse omnis sunt non.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 46, 3, NULL, 191, NULL, NULL),
(353, 'Sleek Marble Keyboard', 9043440, '', 'Quia sapiente rerum corrupti aut qui sequi.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 24, 1, NULL, NULL, 114, NULL),
(354, 'Intelligent Marble Computer', 30964100, '', 'Magni nostrum et maiores totam consequuntur et.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 12, 1, NULL, NULL, 115, NULL),
(355, 'Practical Plastic Table', 27970500, '', 'Accusantium ut eos illum et.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 13, 2, NULL, 192, NULL, NULL),
(356, 'Fantastic Rubber Plate', 40899900, '', 'Eaque iure consequatur non id repellat sequi accusamus.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 22, 1, NULL, 193, NULL, NULL),
(357, 'Mediocre Steel Plate', 59271500, '', 'Optio sunt sed rerum expedita quaerat.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 2, 17, 2, NULL, 194, NULL, NULL),
(358, 'Sleek Rubber Hat', 77786900, '', 'Quos blanditiis cumque.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 1, 27, 2, NULL, NULL, 116, NULL),
(359, 'Aerodynamic Silk Bottle', 54037700, '', 'Qui et nisi.', '2025-03-29 13:19:04', '2025-04-26 22:08:14', 3, 5, 2, 49, NULL, NULL, NULL),
(360, 'Enormous Leather Gloves', 40120800, '', 'Culpa atque aperiam voluptas non quam omnis molestias.', '2025-03-29 13:19:05', '2025-04-26 22:08:14', 3, 59, 1, 50, NULL, NULL, NULL),
(361, 'Sleek Paper Wallet', 32985600, '', 'Ut et architecto dignissimos alias quod non consequatur.', '2025-03-29 13:19:05', '2025-04-26 22:08:14', 2, 25, 2, NULL, 195, NULL, NULL),
(362, 'Heavy Duty Bronze Clock', 32019800, '', 'Doloremque dicta quae quam voluptatum.', '2025-03-29 13:19:05', '2025-04-26 22:08:14', 2, 51, 2, NULL, 196, NULL, NULL),
(363, 'Aerodynamic Wool Plate', 87852500, '', 'Rerum fugit velit rerum saepe.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 63, 2, NULL, NULL, 117, NULL),
(364, 'Heavy Duty Iron Shirt', 3954440, '', 'Magni quia iste odit.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 22, 1, NULL, NULL, 118, NULL),
(365, 'Intelligent Steel Watch', 73825200, '', 'Minima iste dicta aut.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 3, 82, 2, 51, NULL, NULL, NULL),
(366, 'Durable Marble Wallet', 89117600, '', 'Minima quia impedit commodi sequi velit.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 16, 2, NULL, NULL, 119, NULL),
(367, 'Synergistic Iron Bag', 79214400, '', 'Nihil nihil magnam minus distinctio aut numquam.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 3, 39, 1, 52, NULL, NULL, NULL),
(368, 'Enormous Concrete Bag', 21506600, '', 'Sed ut reprehenderit doloribus consequuntur et neque.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 2, 49, 2, NULL, 197, NULL, NULL),
(369, 'Enormous Steel Lamp', 19278500, '', 'Aut fugit quo aut quod saepe quos vel.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 2, 63, 1, NULL, 198, NULL, NULL),
(370, 'Gorgeous Steel Keyboard', 86643700, '', 'Consequatur quidem et ut officia libero.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 2, 83, 2, NULL, 199, NULL, NULL),
(371, 'Lightweight Cotton Pants', 72396300, '', 'Debitis sunt aliquam velit nam aut est commodi.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 29, 2, NULL, NULL, 120, NULL),
(372, 'Rustic Wooden Clock', 12041500, '', 'Necessitatibus tempora incidunt modi aut in.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 65, 2, NULL, NULL, 121, NULL),
(373, 'Intelligent Paper Wallet', 17809000, '', 'Ab magnam repudiandae distinctio esse velit.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 89, 1, NULL, NULL, 122, NULL),
(374, 'Ergonomic Aluminum Plate', 85277000, '', 'Nihil quas quas.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 43, 2, NULL, NULL, 123, NULL),
(375, 'Ergonomic Steel Shirt', 49723300, '', 'Unde dolor voluptatem sed ex quia quia occaecati.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 61, 2, NULL, NULL, 124, NULL),
(376, 'Durable Steel Lamp', 10902700, '', 'Sit ea nulla consequatur blanditiis culpa.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 18, 2, NULL, NULL, 125, NULL),
(377, 'Mediocre Wool Table', 53779100, '', 'Ab officiis nesciunt occaecati qui aspernatur corrupti.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 2, 71, 2, NULL, 200, NULL, NULL),
(378, 'Gorgeous Bronze Shirt', 42822100, '', 'Voluptas tempore necessitatibus ratione est veritatis illum.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 36, 3, NULL, NULL, 126, NULL),
(379, 'Durable Silk Coat', 74945900, '', 'Nam pariatur explicabo odio ab perspiciatis.', '2025-03-29 13:19:05', '2025-04-26 22:08:15', 1, 31, 2, NULL, NULL, 127, NULL),
(380, 'Enormous Steel Computer', 72608900, '', 'Perspiciatis dicta soluta deleniti voluptates dolor quas et.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 1, 67, 1, NULL, NULL, 128, NULL),
(381, 'Incredible Plastic Bench', 21085500, '', 'Quasi in similique consequuntur et et dolore quae.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 1, 73, 3, NULL, NULL, 129, NULL),
(382, 'Rustic Concrete Coat', 63060700, '', 'Quas quibusdam aperiam harum adipisci quam quas.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 3, 18, 2, 53, NULL, NULL, NULL),
(383, 'Awesome Aluminum Hat', 9869020, '', 'Aut ipsa eum omnis.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 42, 1, NULL, 201, NULL, NULL),
(384, 'Incredible Marble Computer', 71933400, '', 'Non voluptatem doloribus.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 43, 1, NULL, 202, NULL, NULL),
(385, 'Heavy Duty Wooden Bag', 32197300, '', 'Ut officiis laudantium dolorem aspernatur eius.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 1, 40, 2, NULL, NULL, 130, NULL),
(386, 'Incredible Marble Knife', 67527300, '', 'Atque deserunt totam quae.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 1, 18, 2, NULL, NULL, 131, NULL),
(387, 'Practical Rubber Clock', 17684400, '', 'Doloribus minima eligendi.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 65, 1, NULL, 203, NULL, NULL),
(388, 'Incredible Plastic Coat', 23557700, '', 'Reiciendis dolorem accusantium optio.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 3, 68, 2, 54, NULL, NULL, NULL),
(389, 'Practical Plastic Pants', 75301000, '', 'Est molestias aut culpa similique.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 1, 49, 3, NULL, NULL, 132, NULL),
(390, 'Practical Linen Chair', 63846200, '', 'Nesciunt reiciendis accusantium ipsa quod consequatur libero facere.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 3, 78, 3, 55, NULL, NULL, NULL),
(391, 'Aerodynamic Leather Knife', 13284300, '', 'Ea doloremque natus velit nihil.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 32, 2, NULL, 204, NULL, NULL),
(392, 'Awesome Marble Bench', 46535800, '', 'Eos ratione enim quisquam omnis iusto totam qui.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 69, 3, NULL, 205, NULL, NULL),
(393, 'Practical Cotton Table', 84349000, '', 'Repudiandae quia aut labore vitae ut perspiciatis qui.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 3, 51, 1, 56, NULL, NULL, NULL),
(394, 'Sleek Leather Shoes', 37122400, '', 'Rem quibusdam sed alias totam dolore quisquam.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 3, 77, 1, 57, NULL, NULL, NULL),
(395, 'Awesome Rubber Bench', 48339400, '', 'Dolorum cum excepturi nesciunt.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 3, 9, 1, 58, NULL, NULL, NULL),
(396, 'Enormous Wool Hat', 35199000, '', 'Magni qui explicabo aspernatur non.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 1, 63, 1, NULL, NULL, 133, NULL),
(397, 'Aerodynamic Plastic Keyboard', 74845200, '', 'Maiores dolorum amet vitae quod nam.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 85, 2, NULL, 206, NULL, NULL),
(398, 'Fantastic Granite Watch', 65069700, '', 'Omnis enim excepturi ratione quo.', '2025-03-29 13:19:06', '2025-04-26 22:08:15', 2, 65, 3, NULL, 207, NULL, NULL),
(399, 'Rustic Cotton Gloves', 21460100, '', 'Est qui voluptatem autem rerum rerum.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 3, 2, NULL, 208, NULL, NULL),
(400, 'Mediocre Wooden Bottle', 50866300, '', 'Et perferendis ex ut modi.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 3, 84, 1, 59, NULL, NULL, NULL),
(401, 'Heavy Duty Rubber Clock', 17286900, '', 'Id dolore autem est quia in.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 44, 3, NULL, 209, NULL, NULL),
(402, 'Small Marble Table', 82397800, '', 'Voluptatem incidunt consequatur nesciunt.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 65, 1, NULL, 210, NULL, NULL),
(403, 'Ergonomic Leather Shirt', 13639600, '', 'Quod quidem harum explicabo.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 3, 86, 2, 60, NULL, NULL, NULL),
(404, 'Heavy Duty Wool Watch', 89749500, '', 'Optio rerum consectetur magnam.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 67, 3, NULL, 211, NULL, NULL),
(405, 'Practical Bronze Hat', 28907600, '', 'Velit delectus saepe.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 1, 57, 2, NULL, NULL, 134, NULL),
(406, 'Lightweight Wool Shirt', 67095000, '', 'Sunt et fuga voluptate.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 77, 2, NULL, 212, NULL, NULL),
(407, 'Enormous Concrete Chair', 78937200, '', 'Consequuntur explicabo nihil et.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 79, 2, NULL, 213, NULL, NULL),
(408, 'Practical Wool Shirt', 74390300, '', 'Veritatis et rem.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 1, 55, 3, NULL, NULL, 135, NULL),
(409, 'Fantastic Wool Watch', 65294200, '', 'Voluptatem facilis quis illo voluptatibus unde.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 65, 2, NULL, 214, NULL, NULL),
(410, 'Ergonomic Steel Bag', 15779900, '', 'Quisquam at asperiores iusto recusandae.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 75, 2, NULL, 215, NULL, NULL),
(411, 'Durable Copper Keyboard', 23551100, '', 'Sit error neque quia rerum soluta dolores aut.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 72, 2, NULL, 216, NULL, NULL),
(412, 'Ergonomic Marble Bench', 80965000, '', 'Commodi ut placeat.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 1, 2, 2, NULL, NULL, 136, NULL),
(413, 'Sleek Silk Knife', 89109200, '', 'Placeat nemo nam.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 2, 57, 1, NULL, 217, NULL, NULL),
(414, 'Incredible Cotton Plate', 2446700, '', 'Laborum laudantium blanditiis quaerat illo quasi dolorem consequatur.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 1, 15, 2, NULL, NULL, 137, NULL),
(415, 'Fantastic Silk Wallet', 41521900, '', 'Ut mollitia suscipit.', '2025-03-29 13:19:07', '2025-04-26 22:08:16', 3, 21, 2, 61, NULL, NULL, NULL),
(416, 'Small Granite Gloves', 62649400, '', 'Non nihil accusamus delectus molestiae ut.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 76, 1, NULL, NULL, 138, NULL),
(417, 'Sleek Marble Knife', 14733100, '', 'Fugit debitis nobis officiis omnis qui velit.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 75, 3, NULL, 218, NULL, NULL),
(418, 'Ergonomic Aluminum Shoes', 29149000, '', 'Repellendus culpa dolores.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 27, 1, NULL, NULL, 139, NULL),
(419, 'Lightweight Silk Gloves', 89645400, '', 'Consequuntur aut eos cum voluptate quasi totam.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 44, 2, NULL, NULL, 140, NULL),
(420, 'Lightweight Steel Computer', 25143800, '', 'Doloremque vitae eaque quisquam distinctio.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 3, 2, NULL, NULL, 141, NULL),
(421, 'Small Marble Bottle', 40157600, '', 'Suscipit laborum consequuntur sit.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 3, 66, 2, 62, NULL, NULL, NULL),
(422, 'Rustic Leather Watch', 76353000, '', 'Totam facilis nam.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 20, 1, NULL, 219, NULL, NULL),
(423, 'Lightweight Linen Clock', 61206300, '', 'Aliquid repellendus et pariatur officiis ut et.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 17, 2, NULL, 220, NULL, NULL),
(424, 'Small Copper Plate', 62048900, '', 'Itaque omnis est expedita.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 67, 2, NULL, NULL, 142, NULL),
(425, 'Ergonomic Copper Computer', 18302300, '', 'Tempore eos aperiam cumque nam voluptas.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 35, 2, NULL, 221, NULL, NULL),
(426, 'Small Iron Keyboard', 16484100, '', 'Error sequi eum aliquam consequatur quae consectetur.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 15, 2, NULL, 222, NULL, NULL),
(427, 'Synergistic Plastic Watch', 37476600, '', 'Optio ut sed minima voluptas aperiam.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 11, 2, NULL, 223, NULL, NULL),
(428, 'Synergistic Copper Coat', 37040400, '', 'Consequuntur quidem doloremque placeat eius aut.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 25, 2, NULL, 224, NULL, NULL),
(429, 'Sleek Paper Shirt', 2373040, '', 'Accusamus exercitationem beatae laboriosam.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 39, 2, NULL, 225, NULL, NULL),
(430, 'Mediocre Aluminum Coat', 87301200, '', 'Id delectus vel et.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 75, 2, NULL, 226, NULL, NULL),
(431, 'Durable Copper Computer', 6449080, '', 'Illo et qui id excepturi.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 16, 2, NULL, NULL, 143, NULL),
(432, 'Heavy Duty Iron Clock', 6411270, '', 'Ullam voluptates sit et et est.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 42, 1, NULL, 227, NULL, NULL),
(433, 'Aerodynamic Paper Keyboard', 53104200, '', 'Sed deleniti eius voluptate totam aspernatur atque.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 1, 83, 1, NULL, NULL, 144, NULL),
(434, 'Durable Cotton Lamp', 44993700, '', 'Fugiat ut et.', '2025-03-29 13:19:08', '2025-04-26 22:08:16', 2, 55, 2, NULL, 228, NULL, NULL),
(435, 'Enormous Rubber Hat', 48955600, '', 'Nostrum non ea.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 5, 2, NULL, 229, NULL, NULL),
(436, 'Synergistic Bronze Wallet', 78357600, '', 'Voluptate voluptatem ut amet reiciendis hic animi placeat.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 1, 78, 2, NULL, NULL, 145, NULL),
(437, 'Mediocre Marble Shirt', 85931700, '', 'Non sunt molestiae numquam dolorum soluta rerum facere.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 14, 2, NULL, 230, NULL, NULL),
(438, 'Lightweight Leather Wallet', 39803800, '', 'Optio dolores voluptatem qui tempora tenetur.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 57, 1, NULL, 231, NULL, NULL),
(439, 'Sleek Copper Coat', 61417800, '', 'Quia optio corporis magnam vel ab.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 37, 1, NULL, 232, NULL, NULL),
(440, 'Awesome Rubber Gloves', 18075000, '', 'Suscipit ratione rerum et animi eligendi ea.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 3, 52, 2, 63, NULL, NULL, NULL),
(441, 'Small Concrete Bottle', 86180900, '', 'Impedit aliquam tenetur pariatur quia consectetur nobis voluptas.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 69, 2, NULL, 233, NULL, NULL),
(442, 'Heavy Duty Silk Wallet', 2859980, '', 'Qui doloremque voluptas.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 15, 2, NULL, 234, NULL, NULL),
(443, 'Sleek Aluminum Bag', 45548400, '', 'Fugiat voluptas velit cumque laudantium eos consequatur voluptas.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 6, 3, NULL, 235, NULL, NULL),
(444, 'Incredible Wool Watch', 76972600, '', 'Ad beatae voluptates debitis quis ut.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 1, 52, 2, NULL, NULL, 146, NULL),
(445, 'Heavy Duty Linen Chair', 58773500, '', 'Ipsum voluptatibus in blanditiis harum reiciendis.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 27, 2, NULL, 236, NULL, NULL),
(446, 'Mediocre Leather Coat', 28712400, '', 'Officiis et nihil.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 1, 15, 2, NULL, NULL, 147, NULL),
(447, 'Synergistic Copper Plate', 55033000, '', 'Sunt tempore qui similique.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 3, 30, 3, 64, NULL, NULL, NULL),
(448, 'Sleek Plastic Car', 27259500, '', 'Sed ut modi explicabo neque non tenetur.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 3, 62, 2, 65, NULL, NULL, NULL),
(449, 'Sleek Wooden Shirt', 64909200, '', 'Neque rerum voluptas.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 74, 1, NULL, 237, NULL, NULL),
(450, 'Mediocre Plastic Watch', 6643830, '', 'Est assumenda beatae inventore voluptatem minima inventore minus.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 31, 2, NULL, 238, NULL, NULL),
(451, 'Intelligent Wool Table', 13383500, '', 'Ut ipsa ullam rerum est eos porro.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 23, 3, NULL, 239, NULL, NULL),
(452, 'Sleek Cotton Shirt', 43339500, '', 'Quia accusamus consequatur quia accusamus debitis reprehenderit sunt.', '2025-03-29 13:19:09', '2025-04-26 22:08:17', 2, 8, 1, NULL, 240, NULL, NULL),
(453, 'Sleek Iron Gloves', 15631000, '', 'Velit nesciunt dolor dolorum.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 82, 2, NULL, 241, NULL, NULL),
(454, 'Intelligent Granite Pants', 57872100, '', 'Animi omnis ut quia accusantium.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 22, 2, NULL, 242, NULL, NULL),
(455, 'Durable Copper Lamp', 8402670, '', 'Officia sunt voluptatum quod laborum earum qui provident.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 85, 2, NULL, 243, NULL, NULL),
(456, 'Heavy Duty Plastic Shoes', 8431200, '', 'Amet culpa sed perferendis ad.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 61, 3, NULL, 244, NULL, NULL),
(457, 'Durable Leather Plate', 15303300, '', 'Enim natus ducimus repellat aperiam sit alias error.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 3, 49, 2, 66, NULL, NULL, NULL),
(458, 'Practical Steel Knife', 4696840, '', 'Est soluta dolorum iure nihil doloremque.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 30, 2, NULL, 245, NULL, NULL),
(459, 'Heavy Duty Marble Shoes', 34469200, '', 'Quia architecto in enim ut.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 48, 2, NULL, 246, NULL, NULL),
(460, 'Sleek Aluminum Knife', 9709880, '', 'Consequatur ut et quibusdam.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 3, 4, 1, 67, NULL, NULL, NULL),
(461, 'Incredible Concrete Clock', 52774400, '', 'Molestiae ut voluptatibus et et.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 1, 86, 2, NULL, NULL, 148, NULL),
(462, 'Lightweight Wool Pants', 42531300, '', 'Culpa et aut exercitationem expedita exercitationem.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 72, 1, NULL, 247, NULL, NULL),
(463, 'Ergonomic Aluminum Knife', 35622700, '', 'Saepe quis est accusantium minima tenetur.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 1, 66, 2, NULL, NULL, 149, NULL),
(464, 'Synergistic Aluminum Shirt', 74072800, '', 'Aut consequuntur occaecati culpa expedita sit accusantium qui.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 85, 2, NULL, 248, NULL, NULL),
(465, 'Mediocre Leather Hat', 26738200, '', 'Molestiae non temporibus earum.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 1, 5, 1, NULL, NULL, 150, NULL),
(466, 'Lightweight Bronze Shirt', 89712900, '', 'Enim incidunt cumque dolor labore quas.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 2, 28, 2, NULL, 249, NULL, NULL),
(467, 'Aerodynamic Steel Bench', 13189800, '', 'Possimus animi architecto ratione ratione soluta.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 1, 16, 2, NULL, NULL, 151, NULL),
(468, 'Small Wooden Wallet', 57501800, '', 'Quasi quibusdam tempora explicabo.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 1, 76, 1, NULL, NULL, 152, NULL),
(469, 'Durable Granite Bottle', 86179400, '', 'Nihil amet sapiente harum.', '2025-03-29 13:19:10', '2025-04-26 22:08:17', 1, 42, 2, NULL, NULL, 153, NULL),
(470, 'Rustic Plastic Wallet', 28448600, '', 'Delectus necessitatibus quis ex et et qui sunt.', '2025-03-29 13:19:10', '2025-04-26 22:08:18', 2, 50, 2, NULL, 250, NULL, NULL),
(471, 'Enormous Wool Plate', 86256800, '', 'Qui sint fugit.', '2025-03-29 13:19:10', '2025-04-26 22:08:18', 2, 74, 1, NULL, 251, NULL, NULL),
(472, 'Synergistic Iron Lamp', 8947530, '', 'Corporis fugit delectus ullam laboriosam facere autem.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 3, 55, 1, 68, NULL, NULL, NULL),
(473, 'Gorgeous Wooden Table', 44500300, '', 'Aut laboriosam voluptas.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 29, 2, NULL, 252, NULL, NULL),
(474, 'Synergistic Paper Coat', 56358700, '', 'Velit sed dolore.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 62, 2, NULL, 253, NULL, NULL),
(475, 'Practical Steel Bottle', 24827700, '', 'Pariatur nobis magni reiciendis rerum.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 1, 52, 2, NULL, NULL, 154, NULL),
(476, 'Intelligent Steel Shoes', 84238300, '', 'Adipisci voluptatem nihil pariatur omnis.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 1, 52, 2, NULL, NULL, 155, NULL),
(477, 'Gorgeous Steel Plate', 5971550, '', 'Voluptate in amet iste aut esse.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 1, 71, 2, NULL, NULL, 156, NULL),
(478, 'Lightweight Iron Plate', 1708850, '', 'Dolor est et molestiae sed aut rerum itaque.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 89, 1, NULL, 254, NULL, NULL),
(479, 'Heavy Duty Marble Keyboard', 76352100, '', 'Facilis esse libero iusto aut tenetur rerum nulla.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 3, 36, 1, 69, NULL, NULL, NULL),
(480, 'Durable Bronze Hat', 31705800, '', 'Culpa quisquam vel hic.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 88, 1, NULL, 255, NULL, NULL),
(481, 'Rustic Granite Shoes', 3257140, '', 'Voluptas ipsam nihil et facere aut.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 47, 2, NULL, 256, NULL, NULL),
(482, 'Aerodynamic Silk Chair', 29444700, '', 'Sequi impedit officia cum minima ipsa corporis.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 1, 26, 1, NULL, NULL, 157, NULL),
(483, 'Incredible Wooden Plate', 68138300, '', 'Nam ad facere.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 84, 2, NULL, 257, NULL, NULL),
(484, 'Fantastic Bronze Shoes', 10472200, '', 'Assumenda expedita sint delectus quaerat et enim.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 32, 1, NULL, 258, NULL, NULL),
(485, 'Heavy Duty Iron Lamp', 11530600, '', 'Reprehenderit aperiam dignissimos nostrum iusto eum dolorum.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 19, 2, NULL, 259, NULL, NULL),
(486, 'Enormous Aluminum Computer', 1271820, '', 'Aut sit quia perferendis.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 26, 2, NULL, 260, NULL, NULL),
(487, 'Awesome Bronze Shirt', 21170500, '', 'Eos assumenda aliquid autem similique tempore.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 1, 33, 3, NULL, NULL, 158, NULL),
(488, 'Synergistic Concrete Chair', 35269500, '', 'Sunt sed consequatur ut perferendis dolorem est animi.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 2, 59, 3, NULL, 261, NULL, NULL),
(489, 'Enormous Bronze Watch', 71585300, '', 'In voluptatum dignissimos qui nihil.', '2025-03-29 13:19:11', '2025-04-26 22:08:18', 1, 17, 2, NULL, NULL, 159, NULL),
(490, 'Synergistic Wooden Knife', 2195180, '', 'Sed quam delectus tempore.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 1, 71, 2, NULL, NULL, 160, NULL),
(491, 'Fantastic Leather Computer', 27227400, '', 'Consequuntur nesciunt accusamus sed ut iure.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 1, 66, 2, NULL, NULL, 161, NULL),
(492, 'Rustic Copper Gloves', 42033600, '', 'Fugiat et occaecati in et sint dolores.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 83, 3, NULL, 262, NULL, NULL),
(493, 'Lightweight Steel Gloves', 74643000, '', 'Sed est qui.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 87, 2, NULL, 263, NULL, NULL),
(494, 'Awesome Plastic Pants', 53419100, '', 'Ut sunt qui et ullam.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 78, 2, NULL, 264, NULL, NULL),
(495, 'Mediocre Bronze Bag', 65106000, '', 'Et accusamus architecto quos in.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 1, 41, 2, NULL, NULL, 162, NULL),
(496, 'Incredible Copper Wallet', 76482000, '', 'Velit laboriosam suscipit officiis fuga possimus.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 16, 1, NULL, 265, NULL, NULL),
(497, 'Incredible Concrete Table', 78497600, '', 'Enim ut tempore enim.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 3, 45, 2, 70, NULL, NULL, NULL),
(498, 'Small Linen Keyboard', 44449300, '', 'Occaecati neque voluptatem consequuntur qui.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 89, 1, NULL, 266, NULL, NULL),
(499, 'Incredible Wooden Bottle', 67147000, '', 'Soluta quasi dolor perferendis ut esse qui vitae.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 1, 51, 2, NULL, NULL, 163, NULL),
(500, 'Incredible Wooden Knife', 88258800, '', 'Libero quidem modi eius vel tempore quisquam et.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 3, 84, 3, 71, NULL, NULL, NULL),
(501, 'Aerodynamic Paper Shirt', 88026800, '', 'Numquam repellendus officiis pariatur necessitatibus velit enim provident.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 1, 73, 2, NULL, NULL, 164, NULL),
(502, 'Fantastic Bronze Pants', 63445400, '', 'Rerum dicta labore beatae unde.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 61, 1, NULL, 267, NULL, NULL),
(503, 'Gorgeous Concrete Keyboard', 35262800, '', 'Qui id officiis libero modi fugiat quos.', '2025-03-29 13:19:12', '2025-04-26 22:08:18', 2, 78, 2, NULL, 268, NULL, NULL),
(504, 'Small Wooden Watch', 25109700, '', 'Quo exercitationem nam hic voluptas quia.', '2025-03-29 13:19:12', '2025-04-26 22:08:19', 3, 2, 1, 72, NULL, NULL, NULL),
(505, 'Durable Wooden Coat', 22406200, '', 'Natus quo reiciendis rerum ex nemo.', '2025-03-29 13:19:12', '2025-04-26 22:08:19', 2, 55, 3, NULL, 269, NULL, NULL),
(506, 'Lightweight Bronze Coat', 54403400, '', 'Reiciendis atque ut iure.', '2025-03-29 13:19:12', '2025-04-26 22:08:19', 2, 52, 1, NULL, 270, NULL, NULL),
(507, 'Mediocre Linen Hat', 45221300, '', 'Nisi tempore libero quibusdam.', '2025-03-29 13:19:12', '2025-04-26 22:08:19', 2, 27, 3, NULL, 271, NULL, NULL),
(508, 'Intelligent Cotton Chair', 33622900, '', 'Quos corporis incidunt a magni omnis.', '2025-03-29 13:19:12', '2025-04-26 22:08:19', 2, 31, 1, NULL, 272, NULL, NULL),
(509, 'Awesome Silk Computer', 1121480, '', 'Est soluta dicta at veniam consectetur voluptatem blanditiis.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 72, 2, NULL, 273, NULL, NULL),
(510, 'Synergistic Steel Car', 45330300, '', 'Quis dignissimos et.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 3, 2, NULL, 274, NULL, NULL),
(511, 'Heavy Duty Granite Pants', 66723400, '', 'Sed praesentium labore aperiam.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 89, 2, NULL, 275, NULL, NULL),
(512, 'Intelligent Linen Knife', 30013000, '', 'Placeat eaque eum ut quis dolorem soluta.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 1, 73, 2, NULL, NULL, 165, NULL),
(513, 'Incredible Cotton Shirt', 18044100, '', 'Corporis unde ratione in.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 6, 2, NULL, 276, NULL, NULL),
(514, 'Awesome Wooden Hat', 50556100, '', 'Magni omnis consequatur voluptates distinctio nobis animi soluta.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 1, 5, 2, NULL, NULL, 166, NULL),
(515, 'Lightweight Silk Computer', 51903500, '', 'Magni et repudiandae.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 39, 1, NULL, 277, NULL, NULL),
(516, 'Synergistic Silk Keyboard', 22514100, '', 'Explicabo dolor necessitatibus eum soluta molestias.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 32, 1, NULL, 278, NULL, NULL),
(517, 'Sleek Steel Knife', 23233500, '', 'Modi et doloremque.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 15, 2, NULL, 279, NULL, NULL),
(518, 'Ergonomic Wool Hat', 47011500, '', 'Itaque ducimus exercitationem.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 1, 69, 2, NULL, NULL, 167, NULL),
(519, 'Small Marble Knife', 16203100, '', 'Voluptatibus quia dolor.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 2, 46, 3, NULL, 280, NULL, NULL),
(520, 'Lightweight Steel Bottle', 86891900, '', 'Maxime incidunt vitae velit velit eum sed.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 1, 14, 2, NULL, NULL, 168, NULL),
(521, 'Rustic Concrete Computer', 23911700, '', 'Accusamus hic deleniti aut eligendi dolorem dolor.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 3, 38, 1, 73, NULL, NULL, NULL),
(522, 'Synergistic Copper Chair', 78052100, '', 'Saepe voluptatem quis aut.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 1, 66, 2, NULL, NULL, 169, NULL),
(523, 'Awesome Bronze Bag', 86004900, '', 'Est ipsam nulla dolores non rem tempora nihil.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 1, 9, 2, NULL, NULL, 170, NULL),
(524, 'Incredible Leather Wallet', 52896900, '', 'Quia deserunt error unde porro consequatur nostrum.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 3, 54, 1, 74, NULL, NULL, NULL),
(525, 'Practical Cotton Shirt', 5367500, '', 'Sequi sint tenetur dolorum aspernatur.', '2025-03-29 13:19:13', '2025-04-26 22:08:19', 3, 86, 3, 75, NULL, NULL, NULL),
(526, 'Enormous Plastic Bench', 69050600, '', 'Hic voluptas voluptates.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 2, 2, 2, NULL, 281, NULL, NULL),
(527, 'Incredible Copper Computer', 11397300, '', 'Sint vel at officia sint consequatur eaque.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 2, 78, 2, NULL, 282, NULL, NULL),
(528, 'Enormous Iron Computer', 5845920, '', 'Quidem maxime ullam ut voluptate.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 87, 3, NULL, NULL, 171, NULL),
(529, 'Small Paper Pants', 74428500, '', 'Id amet et dolor non ea quia.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 59, 1, NULL, NULL, 172, NULL),
(530, 'Gorgeous Aluminum Clock', 8265000, '', 'Et provident libero sequi.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 2, 63, 3, NULL, 283, NULL, NULL),
(531, 'Awesome Steel Pants', 80344100, '', 'Omnis possimus maxime repellendus odio sit enim dolore.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 60, 2, NULL, NULL, 173, NULL),
(532, 'Small Steel Coat', 86277000, '', 'Optio totam fuga quo veritatis consequatur.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 81, 2, NULL, NULL, 174, NULL),
(533, 'Rustic Concrete Bottle', 28019800, '', 'Fugiat ut velit aspernatur.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 52, 2, NULL, NULL, 175, NULL),
(534, 'Lightweight Marble Table', 66382000, '', 'Molestiae molestias ut aut itaque expedita qui.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 2, 1, NULL, NULL, 176, NULL),
(535, 'Ergonomic Marble Knife', 9494430, '', 'Nobis aut quisquam nemo minima dolorum beatae cum.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 44, 1, NULL, NULL, 177, NULL),
(536, 'Durable Rubber Chair', 54506400, '', 'Aut quia illum porro est et qui.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 2, 18, 2, NULL, 284, NULL, NULL),
(537, 'Rustic Leather Bench', 17713100, '', 'Dicta dolores dolores ut sapiente quod.', '2025-03-29 13:19:14', '2025-04-26 22:08:19', 1, 65, 2, NULL, NULL, 178, NULL),
(538, 'Practical Granite Shirt', 43880100, '', 'Consequatur minus voluptatem non ex et minus.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 1, 73, 2, NULL, NULL, 179, NULL),
(539, 'Gorgeous Wooden Shirt', 36809500, '', 'Veritatis totam qui ad velit.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 2, 29, 1, NULL, 285, NULL, NULL),
(540, 'Ergonomic Wooden Clock', 18728500, '', 'Iure aut in laboriosam consectetur alias id.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 2, 23, 2, NULL, 286, NULL, NULL),
(541, 'Synergistic Marble Bag', 34299000, '', 'Ipsam aut et blanditiis saepe voluptatibus optio.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 3, 83, 1, 76, NULL, NULL, NULL),
(542, 'Intelligent Concrete Table', 42973700, '', 'Ut officia deserunt et aliquid fuga.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 2, 80, 2, NULL, 287, NULL, NULL),
(543, 'Rustic Wooden Computer', 6569200, '', 'Dicta expedita vel non odio aut soluta quia.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 1, 67, 2, NULL, NULL, 180, NULL),
(544, 'Durable Rubber Shirt', 75537200, '', 'Labore mollitia rem sit aut id sapiente.', '2025-03-29 13:19:14', '2025-04-26 22:08:20', 2, 15, 2, NULL, 288, NULL, NULL),
(545, 'Aerodynamic Leather Gloves', 68962500, '', 'Reprehenderit a eum est.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 1, 19, 2, NULL, NULL, 181, NULL),
(546, 'Synergistic Steel Shirt', 55081300, '', 'Esse esse ut vero deleniti perspiciatis beatae ratione.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 46, 2, NULL, 289, NULL, NULL),
(547, 'Synergistic Wooden Hat', 87645500, '', 'Quia nisi repellat laboriosam earum et.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 48, 1, NULL, 290, NULL, NULL),
(548, 'Aerodynamic Wool Keyboard', 58675500, '', 'Deleniti unde quaerat veniam recusandae.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 21, 2, NULL, 291, NULL, NULL),
(549, 'Incredible Silk Knife', 32054200, '', 'Sapiente vel est aperiam rerum magni laborum.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 73, 1, NULL, 292, NULL, NULL),
(550, 'Lightweight Marble Chair', 36530700, '', 'In repellat ipsum iure eum ex.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 1, 52, 2, NULL, NULL, 182, NULL),
(551, 'Mediocre Granite Table', 3259020, '', 'Vero ea odit quis quam corrupti et consequatur.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 1, 16, 2, NULL, NULL, 183, NULL),
(552, 'Ergonomic Paper Plate', 21635200, '', 'Voluptatem nulla nostrum maiores soluta incidunt earum distinctio.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 3, 9, 1, 77, NULL, NULL, NULL),
(553, 'Incredible Marble Hat', 81234200, '', 'Omnis non rerum corporis deserunt odit in alias.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 16, 3, NULL, 293, NULL, NULL),
(554, 'Durable Silk Car', 15116600, '', 'Consequatur porro labore placeat dolores voluptatem.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 84, 3, NULL, 294, NULL, NULL),
(555, 'Synergistic Wool Chair', 76052400, '', 'Sunt aperiam voluptate.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 6, 2, NULL, 295, NULL, NULL),
(556, 'Mediocre Iron Lamp', 74980100, '', 'Aut voluptatem laboriosam rerum impedit est.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 3, 55, 2, 78, NULL, NULL, NULL),
(557, 'Awesome Rubber Hat', 34778000, '', 'Et aliquid magni sunt possimus deleniti aut aliquam.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 56, 3, NULL, 296, NULL, NULL),
(558, 'Sleek Silk Chair', 9963510, '', 'Quis eaque repudiandae quos.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 85, 3, NULL, 297, NULL, NULL),
(559, 'Sleek Linen Watch', 88284300, '', 'Reprehenderit consequatur tempora aspernatur perferendis culpa distinctio sunt.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 2, 5, 1, NULL, 298, NULL, NULL),
(560, 'Gorgeous Granite Lamp', 68163200, '', 'Dolorem commodi nihil similique temporibus.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 3, 15, 1, 79, NULL, NULL, NULL),
(561, 'Mediocre Wooden Car', 73257900, '', 'Qui ut repellendus eveniet qui voluptas voluptatem at.', '2025-03-29 13:19:15', '2025-04-26 22:08:20', 3, 33, 1, 80, NULL, NULL, NULL),
(562, 'Enormous Linen Plate', 51696300, '', 'Porro hic quasi magnam at odit qui.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 2, 50, 1, NULL, 299, NULL, NULL),
(563, 'Synergistic Wooden Clock', 43666300, '', 'Nulla eum quos deserunt.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 2, 62, 2, NULL, 300, NULL, NULL),
(564, 'Intelligent Steel Shirt', 7219740, '', 'Sint cumque eos deleniti voluptas esse.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 2, 31, 2, NULL, 301, NULL, NULL),
(565, 'Intelligent Copper Table', 46870600, '', 'In qui porro voluptates iusto eum.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 2, 76, 2, NULL, 302, NULL, NULL),
(566, 'Gorgeous Bronze Gloves', 81410600, '', 'Rerum sint ea ex ad dolores occaecati.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 3, 64, 1, 81, NULL, NULL, NULL),
(567, 'Gorgeous Steel Bench', 71879600, '', 'Est quia qui incidunt consequatur sed.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 1, 40, 1, NULL, NULL, 184, NULL),
(568, 'Rustic Wool Car', 73684300, '', 'Quis nostrum numquam.', '2025-03-29 13:19:16', '2025-04-26 22:08:20', 3, 84, 1, 82, NULL, NULL, NULL),
(569, 'Gorgeous Bronze Lamp', 39168500, '', 'Voluptas ut atque.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 20, 2, NULL, 303, NULL, NULL),
(570, 'Fantastic Steel Computer', 28467300, '', 'Quisquam qui repellat a enim architecto aperiam.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 76, 2, NULL, 304, NULL, NULL),
(571, 'Lightweight Paper Computer', 51235500, '', 'Quo vero nesciunt.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 3, 52, 2, 83, NULL, NULL, NULL),
(572, 'Enormous Concrete Car', 48815000, '', 'Esse voluptates ad quaerat est consectetur.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 9, 1, NULL, 305, NULL, NULL),
(573, 'Intelligent Marble Watch', 7462110, '', 'Quisquam reprehenderit rerum qui est quia.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 50, 2, NULL, 306, NULL, NULL),
(574, 'Synergistic Wool Keyboard', 34495400, '', 'Iste optio dicta.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 79, 2, NULL, 307, NULL, NULL),
(575, 'Enormous Paper Bag', 11052400, '', 'Unde magnam sit et.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 62, 1, NULL, 308, NULL, NULL),
(576, 'Gorgeous Concrete Wallet', 81029800, '', 'Quod ad fugit architecto ea.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 3, 50, 2, 84, NULL, NULL, NULL),
(577, 'Gorgeous Steel Car', 79956900, '', 'Laudantium veniam quibusdam velit rerum nobis voluptatem nam.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 11, 2, NULL, 309, NULL, NULL),
(578, 'Aerodynamic Aluminum Gloves', 22757400, '', 'Saepe et quibusdam voluptas.', '2025-03-29 13:19:16', '2025-04-26 22:08:21', 2, 84, 2, NULL, 310, NULL, NULL),
(579, 'Sleek Wool Pants', 68631600, '', 'Voluptas et sunt voluptates deserunt sit ut est.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 59, 2, NULL, 311, NULL, NULL),
(580, 'Awesome Granite Clock', 70020100, '', 'Dolor corporis minima ut recusandae.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 1, 24, 1, NULL, NULL, 185, NULL),
(581, 'Incredible Granite Chair', 61369500, '', 'Voluptate ut sunt sint.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 3, 88, 2, 85, NULL, NULL, NULL),
(582, 'Gorgeous Concrete Clock', 8365830, '', 'Consequuntur non voluptate assumenda.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 22, 1, NULL, 312, NULL, NULL),
(583, 'Rustic Steel Shoes', 79384700, '', 'Placeat asperiores doloribus tempora.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 77, 2, NULL, 313, NULL, NULL),
(584, 'Ergonomic Cotton Chair', 2739300, '', 'Sed quia est.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 1, 55, 2, NULL, NULL, 186, NULL),
(585, 'Lightweight Linen Bag', 50574300, '', 'Neque dolores vel in.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 11, 2, NULL, 314, NULL, NULL),
(586, 'Awesome Linen Shoes', 8870530, '', 'Ipsam dicta sed blanditiis unde.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 29, 2, NULL, 315, NULL, NULL),
(587, 'Aerodynamic Iron Bench', 30312000, '', 'Nam porro quia amet voluptatem.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 77, 2, NULL, 316, NULL, NULL),
(588, 'Gorgeous Wooden Keyboard', 65098300, '', 'Quo sit voluptatem iusto eius consequuntur consequatur accusamus.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 3, 24, 2, 86, NULL, NULL, NULL),
(589, 'Sleek Concrete Hat', 1389040, '', 'Pariatur nesciunt nemo velit quibusdam ut.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 1, 62, 1, NULL, NULL, 187, NULL),
(590, 'Sleek Bronze Shirt', 51100300, '', 'Perspiciatis animi aperiam suscipit recusandae asperiores eum.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 87, 3, NULL, 317, NULL, NULL),
(591, 'Lightweight Cotton Clock', 39279400, '', 'Laboriosam a blanditiis.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 3, 54, 2, 87, NULL, NULL, NULL),
(592, 'Small Aluminum Car', 88481300, '', 'Et saepe consequatur qui nesciunt alias non.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 27, 2, NULL, 318, NULL, NULL),
(593, 'Mediocre Iron Clock', 62961900, '', 'Et consequatur et.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 2, 83, 2, NULL, 319, NULL, NULL),
(594, 'Heavy Duty Aluminum Bottle', 84380200, '', 'Voluptatem quasi nobis possimus.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 3, 34, 2, 88, NULL, NULL, NULL),
(595, 'Fantastic Rubber Computer', 17232500, '', 'Consequuntur est ipsam quod.', '2025-03-29 13:19:17', '2025-04-26 22:08:21', 1, 5, 3, NULL, NULL, 188, NULL),
(596, 'Awesome Rubber Computer', 81693800, '', 'Labore voluptas optio nostrum dignissimos non dolorem quia.', '2025-03-29 13:19:18', '2025-04-26 22:08:21', 2, 61, 2, NULL, 320, NULL, NULL),
(597, 'Synergistic Paper Bag', 24229700, '', 'Dolorem temporibus ipsa esse cupiditate.', '2025-03-29 13:19:18', '2025-04-26 22:08:21', 2, 78, 2, NULL, 321, NULL, NULL),
(598, 'Small Aluminum Clock', 71732800, '', 'Modi magnam maxime facere quidem.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 65, 2, NULL, 322, NULL, NULL),
(599, 'Durable Steel Pants', 88914800, '', 'Perferendis architecto alias ducimus nulla et ut numquam.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 71, 1, NULL, 323, NULL, NULL),
(600, 'Heavy Duty Wool Bag', 9960330, '', 'Omnis perspiciatis suscipit fugit magni.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 3, 2, NULL, 324, NULL, NULL),
(601, 'Lightweight Marble Keyboard', 40015400, '', 'Culpa unde deleniti et.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 16, 2, NULL, NULL, 189, NULL),
(602, 'Awesome Linen Hat', 63043800, '', 'Veritatis consequatur sint eos.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 85, 1, NULL, 325, NULL, NULL),
(603, 'Gorgeous Paper Table', 41687100, '', 'Animi ea sit sunt quaerat.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 7, 2, NULL, NULL, 190, NULL),
(604, 'Lightweight Steel Chair', 70796700, '', 'Et dolores id quidem quae voluptatem officia.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 72, 2, NULL, NULL, 191, NULL),
(605, 'Incredible Cotton Chair', 44065300, '', 'Architecto quasi explicabo assumenda laborum reprehenderit.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 4, 3, NULL, 326, NULL, NULL),
(606, 'Aerodynamic Plastic Computer', 67160500, '', 'Qui sed sed hic eius cupiditate facilis et.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 26, 2, NULL, NULL, 192, NULL);
INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`, `stock_quantity`, `brand_id`, `headphone_specs_id`, `keyboard_specs_id`, `mouse_specs_id`, `discount_percent`) VALUES
(607, 'Awesome Bronze Chair', 83013700, '', 'Officiis est est quis explicabo.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 79, 1, NULL, NULL, 193, NULL),
(608, 'Intelligent Steel Computer', 32716000, '', 'Fugit aut ex ratione vitae.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 3, 71, 1, 89, NULL, NULL, NULL),
(609, 'Mediocre Steel Hat', 13262300, '', 'Quisquam et totam et.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 3, 36, 2, 90, NULL, NULL, NULL),
(610, 'Rustic Aluminum Plate', 39408700, '', 'Qui consequatur magnam quis suscipit molestiae.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 83, 1, NULL, 327, NULL, NULL),
(611, 'Intelligent Plastic Bottle', 37217600, '', 'Labore labore quibusdam quae ex nesciunt.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 84, 2, NULL, NULL, 194, NULL),
(612, 'Aerodynamic Marble Coat', 14099400, '', 'Eveniet id consequatur nam ut voluptas.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 1, 75, 2, NULL, NULL, 195, NULL),
(613, 'Heavy Duty Bronze Bag', 44914900, '', 'Et laudantium ipsum aliquam expedita earum.', '2025-03-29 13:19:18', '2025-04-26 22:08:22', 2, 59, 2, NULL, 328, NULL, NULL),
(614, 'Ergonomic Rubber Lamp', 52132000, '', 'Iste voluptatum occaecati.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 4, 1, NULL, NULL, 196, NULL),
(615, 'Ergonomic Wooden Bottle', 61735800, '', 'Omnis iure voluptas dicta enim autem et.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 2, 57, 2, NULL, 329, NULL, NULL),
(616, 'Rustic Leather Shirt', 25531200, '', 'Eveniet odio odit.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 2, 66, 1, NULL, 330, NULL, NULL),
(617, 'Gorgeous Rubber Car', 25502200, '', 'Iure facilis iure consequatur soluta repudiandae.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 15, 2, NULL, NULL, 197, NULL),
(618, 'Fantastic Iron Table', 33029300, '', 'Est magni adipisci labore.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 9, 2, NULL, NULL, 198, NULL),
(619, 'Small Wool Computer', 83204000, '', 'Quos et occaecati unde iusto nobis nulla.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 83, 2, NULL, NULL, 199, NULL),
(620, 'Fantastic Steel Hat', 2915570, '', 'Rerum et a corporis.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 9, 2, NULL, NULL, 200, NULL),
(621, 'Small Wool Car', 38444500, '', 'Dolorem illum ad ut et laboriosam veritatis.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 75, 2, NULL, NULL, 201, NULL),
(622, 'Gorgeous Cotton Chair', 51347900, '', 'Omnis nobis qui voluptatibus sint consectetur eveniet qui.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 83, 2, NULL, NULL, 202, NULL),
(623, 'Heavy Duty Silk Knife', 73829300, '', 'Eligendi voluptatem quasi autem et quia ipsa id.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 2, 1, 2, NULL, 331, NULL, NULL),
(624, 'Intelligent Linen Bag', 59006300, '', 'Aut quasi eligendi tempore.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 1, 83, 2, NULL, NULL, 203, NULL),
(625, 'Lightweight Silk Chair', 39518500, '', 'Repellat quidem itaque porro.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 2, 27, 2, NULL, 332, NULL, NULL),
(626, 'Lightweight Plastic Chair', 18803100, '', 'Harum maiores sint sapiente eius maiores quos.', '2025-03-29 13:19:19', '2025-04-26 22:08:22', 3, 86, 2, 91, NULL, NULL, NULL),
(627, 'Intelligent Cotton Computer', 1780050, '', 'Unde quis inventore dolores laborum est nesciunt sapiente.', '2025-03-29 13:19:19', '2025-04-26 22:08:23', 2, 76, 2, NULL, 333, NULL, NULL),
(628, 'Sleek Paper Bag', 49189500, '', 'Molestiae necessitatibus animi dolor ea eum.', '2025-03-29 13:19:19', '2025-04-26 22:08:23', 2, 47, 2, NULL, 334, NULL, NULL),
(629, 'Durable Concrete Clock', 82913300, '', 'Culpa sunt praesentium non vel.', '2025-03-29 13:19:19', '2025-04-26 22:08:23', 2, 49, 2, NULL, 335, NULL, NULL),
(630, 'Gorgeous Marble Bag', 30182900, '', 'Perspiciatis aperiam ad corporis rem omnis aliquam.', '2025-03-29 13:19:19', '2025-04-26 22:08:23', 2, 38, 1, NULL, 336, NULL, NULL),
(631, 'Sleek Concrete Computer', 34185200, '', 'Quod similique nemo delectus similique rerum.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 80, 2, NULL, 337, NULL, NULL),
(632, 'Rustic Cotton Chair', 52495500, '', 'Enim aut qui aliquam.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 77, 3, NULL, NULL, 204, NULL),
(633, 'Awesome Aluminum Plate', 64076400, '', 'Harum cumque dolorem officia et laudantium non nemo.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 86, 1, NULL, 338, NULL, NULL),
(634, 'Fantastic Granite Lamp', 44626500, '', 'Numquam sunt nesciunt possimus quas consequatur et.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 63, 2, NULL, 339, NULL, NULL),
(635, 'Ergonomic Rubber Coat', 50529400, '', 'Omnis ullam cum magnam sint rerum occaecati.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 52, 1, NULL, NULL, 205, NULL),
(636, 'Gorgeous Plastic Clock', 49842500, '', 'Aut magnam minima eaque aut.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 50, 2, NULL, 340, NULL, NULL),
(637, 'Incredible Paper Car', 22791400, '', 'Voluptates voluptate aut fugit ut eaque.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 22, 2, NULL, NULL, 206, NULL),
(638, 'Gorgeous Paper Gloves', 4576570, '', 'Deserunt ut ut dignissimos assumenda omnis explicabo consequatur.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 53, 2, NULL, NULL, 207, NULL),
(639, 'Rustic Concrete Shoes', 9131060, '', 'Fugit nesciunt tenetur culpa est est alias.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 16, 1, NULL, 341, NULL, NULL),
(640, 'Fantastic Iron Wallet', 68865600, '', 'Laboriosam aperiam et vel quam cum.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 20, 3, NULL, 342, NULL, NULL),
(641, 'Durable Cotton Bench', 41933800, '', 'Quia consequatur eaque.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 57, 2, NULL, 343, NULL, NULL),
(642, 'Awesome Iron Chair', 65437300, '', 'Et et suscipit quos molestias recusandae quia voluptatem.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 85, 2, NULL, NULL, 208, NULL),
(643, 'Ergonomic Marble Pants', 14395000, '', 'Quia deleniti dolorem architecto dicta consequuntur.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 65, 2, NULL, NULL, 209, NULL),
(644, 'Fantastic Copper Car', 14512200, '', 'Corrupti voluptatem a inventore natus quo.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 73, 3, NULL, NULL, 210, NULL),
(645, 'Enormous Aluminum Table', 66019200, '', 'Quis minima facere et.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 45, 3, NULL, NULL, 211, NULL),
(646, 'Small Marble Watch', 47266900, '', 'Placeat omnis eos nobis aperiam est.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 1, 21, 2, NULL, NULL, 212, NULL),
(647, 'Small Leather Gloves', 69578100, '', 'Dolorum ut dolorem.', '2025-03-29 13:19:20', '2025-04-26 22:08:23', 2, 79, 2, NULL, 344, NULL, NULL),
(648, 'Fantastic Concrete Bottle', 7048400, '', 'Possimus fugit iste.', '2025-03-29 13:19:21', '2025-04-26 22:08:23', 2, 27, 2, NULL, 345, NULL, NULL),
(649, 'Small Iron Knife', 17816800, '', 'Nihil modi esse non mollitia.', '2025-03-29 13:19:21', '2025-04-26 22:08:23', 2, 35, 2, NULL, 346, NULL, NULL),
(650, 'Fantastic Linen Table', 27804600, '', 'Qui eaque ut ut ut minus illum.', '2025-03-29 13:19:21', '2025-04-26 22:08:23', 1, 11, 2, NULL, NULL, 213, NULL),
(651, 'Durable Iron Table', 43470300, '', 'Dolores molestiae soluta unde et fugiat hic.', '2025-03-29 13:19:21', '2025-04-26 22:08:23', 2, 46, 3, NULL, 347, NULL, NULL),
(652, 'Sleek Plastic Hat', 47289500, '', 'Perspiciatis ipsa atque non nostrum dolor dolorem nobis.', '2025-03-29 13:19:21', '2025-04-26 22:08:23', 1, 3, 1, NULL, NULL, 214, NULL),
(653, 'Synergistic Linen Pants', 16423400, '', 'Consequuntur ex et in facilis ea labore.', '2025-03-29 13:19:21', '2025-04-26 22:08:23', 2, 15, 1, NULL, 348, NULL, NULL),
(654, 'Heavy Duty Copper Clock', 4219460, '', 'Expedita repudiandae atque architecto ipsa deserunt qui voluptatem.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 1, 7, 2, NULL, NULL, 215, NULL),
(655, 'Synergistic Marble Wallet', 37591800, '', 'Dolores cumque accusantium.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 3, 60, 1, 92, NULL, NULL, NULL),
(656, 'Heavy Duty Granite Bench', 23259200, '', 'Voluptas in temporibus amet.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 2, 35, 1, NULL, 349, NULL, NULL),
(657, 'Synergistic Steel Table', 69462500, '', 'Eaque sit unde consequatur eveniet architecto voluptate.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 3, 77, 2, 93, NULL, NULL, NULL),
(658, 'Ergonomic Wooden Keyboard', 5106760, '', 'Officia dolor sunt.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 2, 21, 1, NULL, 350, NULL, NULL),
(659, 'Fantastic Copper Chair', 44784900, '', 'Deserunt sed incidunt quam sint laudantium impedit rerum.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 2, 45, 1, NULL, 351, NULL, NULL),
(660, 'Incredible Cotton Gloves', 59048000, '', 'Qui perferendis eaque nam odio fugiat.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 1, 66, 1, NULL, NULL, 216, NULL),
(661, 'Sleek Plastic Clock', 21852800, '', 'Nam modi voluptates repudiandae reprehenderit.', '2025-03-29 13:19:21', '2025-04-26 22:08:24', 1, 84, 1, NULL, NULL, 217, NULL),
(662, 'Heavy Duty Iron Bottle', 21505300, '', 'Cupiditate minima recusandae fugiat.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 2, 71, 1, NULL, 352, NULL, NULL),
(663, 'Synergistic Aluminum Bench', 23623500, '', 'Nihil consequatur quo ut nemo eveniet.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 1, 88, 1, NULL, NULL, 218, NULL),
(664, 'Small Concrete Clock', 89178000, '', 'Harum autem omnis et voluptate.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 2, 60, 2, NULL, 353, NULL, NULL),
(665, 'Rustic Iron Knife', 49699900, '', 'Maiores ea consectetur sequi illo rerum.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 2, 29, 2, NULL, 354, NULL, NULL),
(666, 'Heavy Duty Rubber Plate', 16180800, '', 'Doloribus doloribus accusamus laudantium.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 1, 6, 2, NULL, NULL, 219, NULL),
(667, 'Fantastic Granite Coat', 75988600, '', 'Expedita iste architecto consectetur aspernatur quia.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 2, 78, 3, NULL, 355, NULL, NULL),
(668, 'Ergonomic Copper Coat', 45960200, '', 'Quidem facilis cumque ipsam hic et ut saepe.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 2, 72, 2, NULL, 356, NULL, NULL),
(669, 'Durable Aluminum Knife', 80790000, '', 'Ullam consequatur magnam amet sunt qui.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 3, 34, 3, 94, NULL, NULL, NULL),
(670, 'Durable Linen Chair', 29459300, '', 'Voluptatibus dolores qui sunt voluptates accusantium voluptatibus et.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 1, 30, 2, NULL, NULL, 220, NULL),
(671, 'Small Marble Shoes', 53751700, '', 'Libero veritatis porro aperiam repellat repudiandae.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 3, 50, 3, 95, NULL, NULL, NULL),
(672, 'Aerodynamic Linen Hat', 54653700, '', 'Adipisci iure et sequi.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 2, 33, 2, NULL, 357, NULL, NULL),
(673, 'Mediocre Copper Computer', 73046400, '', 'Molestiae deserunt est ea placeat voluptates esse.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 1, 35, 2, NULL, NULL, 221, NULL),
(674, 'Rustic Bronze Computer', 79905100, '', 'Voluptatem accusantium ut corrupti qui.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 1, 5, 2, NULL, NULL, 222, NULL),
(675, 'Rustic Rubber Wallet', 71893200, '', 'Neque id est sit voluptatem.', '2025-03-29 13:19:22', '2025-04-26 22:08:24', 3, 29, 2, 96, NULL, NULL, NULL),
(676, 'Enormous Wool Bag', 13702800, '', 'Voluptas consequuntur ut animi blanditiis harum quam.', '2025-03-29 13:19:23', '2025-04-26 22:08:24', 2, 77, 3, NULL, 358, NULL, NULL),
(677, 'Awesome Steel Gloves', 9979100, '', 'Aut qui est sapiente officiis mollitia.', '2025-03-29 13:19:23', '2025-04-26 22:08:24', 2, 58, 1, NULL, 359, NULL, NULL),
(678, 'Durable Silk Shirt', 22971200, '', 'Quia vel eum quam id.', '2025-03-29 13:19:23', '2025-04-26 22:08:24', 3, 9, 1, 97, NULL, NULL, NULL),
(679, 'Rustic Aluminum Hat', 40826000, '', 'Illum totam est expedita in blanditiis.', '2025-03-29 13:19:23', '2025-04-26 22:08:24', 3, 39, 1, 98, NULL, NULL, NULL),
(680, 'Ergonomic Rubber Bench', 38245100, '', 'Ut odit officiis voluptatem omnis consequatur deleniti.', '2025-03-29 13:19:23', '2025-04-26 22:08:24', 2, 75, 2, NULL, 360, NULL, NULL),
(681, 'Fantastic Paper Bench', 47276600, '', 'Repellat nobis odio velit omnis.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 68, 2, NULL, 361, NULL, NULL),
(682, 'Enormous Paper Car', 76523600, '', 'Voluptatum cum debitis sit sit quos.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 28, 2, NULL, 362, NULL, NULL),
(683, 'Durable Wooden Knife', 36998200, '', 'Consequatur esse exercitationem error necessitatibus sed.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 3, 63, 2, 99, NULL, NULL, NULL),
(684, 'Practical Bronze Bottle', 75958400, '', 'Ex quia rerum itaque vero ipsum.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 89, 2, NULL, 363, NULL, NULL),
(685, 'Durable Rubber Wallet', 25195100, '', 'Et enim libero error.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 15, 2, NULL, 364, NULL, NULL),
(686, 'Intelligent Wooden Bag', 4000640, '', 'Nobis accusantium a dolor enim harum magnam laudantium.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 50, 1, NULL, 365, NULL, NULL),
(687, 'Enormous Silk Bench', 38289500, '', 'Est accusantium est quasi ipsum impedit nemo amet.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 47, 2, NULL, 366, NULL, NULL),
(688, 'Small Linen Gloves', 59146100, '', 'Quo fuga in maxime.', '2025-03-29 13:19:23', '2025-04-26 22:08:25', 2, 82, 3, NULL, 367, NULL, NULL),
(689, 'Enormous Steel Shoes', 68626200, '', 'Eveniet debitis nulla nihil deserunt a et.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 1, 41, 2, NULL, NULL, 223, NULL),
(690, 'Lightweight Wool Bench', 53609000, '', 'Minima quibusdam reiciendis consequuntur sit qui vel et.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 59, 3, NULL, 368, NULL, NULL),
(691, 'Lightweight Plastic Knife', 83326200, '', 'Nam et sit.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 3, 46, 1, 100, NULL, NULL, NULL),
(692, 'Aerodynamic Aluminum Car', 25512200, '', 'Alias dolorem quod voluptas cupiditate quo.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 71, 2, NULL, 369, NULL, NULL),
(693, 'Heavy Duty Steel Knife', 77774000, '', 'Ut molestiae deserunt.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 2, 3, NULL, 370, NULL, NULL),
(694, 'Intelligent Granite Bottle', 51793300, '', 'Quae nesciunt id est.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 89, 3, NULL, 371, NULL, NULL),
(695, 'Practical Aluminum Lamp', 25457700, '', 'Doloremque consectetur architecto adipisci quia et delectus.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 1, 28, 1, NULL, NULL, 224, NULL),
(696, 'Incredible Plastic Keyboard', 54248200, '', 'Consequatur voluptates ut fugit rerum temporibus.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 54, 2, NULL, 372, NULL, NULL),
(697, 'Aerodynamic Rubber Gloves', 77909600, '', 'Ducimus voluptatem deleniti voluptas iusto qui iste itaque.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 62, 1, NULL, 373, NULL, NULL),
(698, 'Durable Rubber Knife', 83674100, '', 'Quidem autem aut beatae voluptas.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 67, 2, NULL, 374, NULL, NULL),
(699, 'Rustic Cotton Computer', 17941900, '', 'Dolorem at deserunt laboriosam minima temporibus facere.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 89, 1, NULL, 375, NULL, NULL),
(700, 'Intelligent Silk Table', 19709200, '', 'Eveniet dolor maiores impedit laudantium.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 3, 87, 2, 101, NULL, NULL, NULL),
(701, 'Rustic Bronze Clock', 61419700, '', 'Laborum magnam totam atque non rem adipisci.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 36, 2, NULL, 376, NULL, NULL),
(702, 'Practical Marble Chair', 80673700, '', 'Quae quis unde et.', '2025-03-29 13:19:24', '2025-04-26 22:08:25', 2, 88, 2, NULL, 377, NULL, NULL),
(703, 'Intelligent Bronze Hat', 74007500, '', 'Eaque veritatis qui cum mollitia nemo voluptas.', '2025-03-29 13:19:25', '2025-04-26 22:08:25', 2, 83, 2, NULL, 378, NULL, NULL),
(704, 'Sleek Paper Knife', 4929570, '', 'Dolorem ipsam earum iure labore.', '2025-03-29 13:19:25', '2025-04-26 22:08:25', 2, 5, 3, NULL, 379, NULL, NULL),
(705, 'Synergistic Wooden Wallet', 16411400, '', 'Repellendus dolorem enim eveniet nobis.', '2025-03-29 13:19:25', '2025-04-26 22:08:25', 2, 86, 2, NULL, 380, NULL, NULL),
(706, 'Synergistic Marble Computer', 80065100, '', 'Tempore harum vero.', '2025-03-29 13:19:25', '2025-04-26 22:08:25', 1, 33, 2, NULL, NULL, 225, NULL),
(707, 'Durable Concrete Keyboard', 42886600, '', 'Rerum nostrum excepturi facilis nobis velit.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 1, 37, 2, NULL, NULL, 226, NULL),
(708, 'Practical Copper Pants', 78125500, '', 'Repudiandae corporis tempora aliquam.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 1, 2, NULL, 381, NULL, NULL),
(709, 'Incredible Plastic Table', 47236100, '', 'Eum nam dicta dolorem maxime corporis.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 58, 1, NULL, 382, NULL, NULL),
(710, 'Practical Iron Wallet', 36476000, '', 'Rerum vel maiores ipsum modi.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 79, 1, NULL, 383, NULL, NULL),
(711, 'Fantastic Silk Shirt', 55917500, '', 'Voluptatem doloribus id ullam.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 48, 1, NULL, 384, NULL, NULL),
(712, 'Heavy Duty Linen Bag', 38125100, '', 'Itaque a ipsum deserunt iure laudantium eaque.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 18, 2, NULL, 385, NULL, NULL),
(713, 'Sleek Copper Gloves', 29824100, '', 'Perspiciatis praesentium reprehenderit eveniet quod.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 29, 3, NULL, 386, NULL, NULL),
(714, 'Incredible Iron Bench', 58544500, '', 'Molestias dignissimos veritatis.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 1, 39, 1, NULL, NULL, 227, NULL),
(715, 'Sleek Wooden Keyboard', 68004200, '', 'Et fugiat et modi exercitationem et.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 17, 2, NULL, 387, NULL, NULL),
(716, 'Incredible Plastic Plate', 30221100, '', 'Sunt ad aut eaque.', '2025-03-29 13:19:25', '2025-04-26 22:08:26', 2, 18, 1, NULL, 388, NULL, NULL),
(717, 'Aerodynamic Iron Keyboard', 66507900, '', 'Non voluptate debitis veritatis voluptatum sit ipsum.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 51, 3, NULL, 389, NULL, NULL),
(718, 'Ergonomic Copper Pants', 84705300, '', 'Provident molestiae sed in.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 1, 68, 2, NULL, NULL, 228, NULL),
(719, 'Heavy Duty Marble Computer', 15258200, '', 'Magni earum vitae voluptas.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 61, 2, NULL, 390, NULL, NULL),
(720, 'Aerodynamic Bronze Shirt', 82357100, '', 'Vel ullam sit et architecto repellat.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 1, 68, 2, NULL, NULL, 229, NULL),
(721, 'Enormous Paper Gloves', 75417800, '', 'Asperiores voluptatem mollitia vero qui.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 72, 2, NULL, 391, NULL, NULL),
(722, 'Incredible Copper Bench', 59951800, '', 'Explicabo quasi molestias odio sed.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 21, 2, NULL, 392, NULL, NULL),
(723, 'Small Cotton Bench', 2373260, '', 'Repudiandae assumenda sequi ut ipsum aut voluptatem est.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 3, 1, NULL, 393, NULL, NULL),
(724, 'Enormous Iron Bottle', 33117200, '', 'Dolorem aperiam molestias odio debitis perferendis animi nam.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 1, 16, 1, NULL, NULL, 230, NULL),
(725, 'Rustic Wooden Knife', 34002000, '', 'Aut quisquam perferendis sunt sunt ut quam.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 1, 70, 3, NULL, NULL, 231, NULL),
(726, 'Rustic Paper Bench', 41479200, '', 'Est commodi sequi quia.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 5, 3, NULL, 394, NULL, NULL),
(727, 'Lightweight Silk Coat', 77266700, '', 'In eos ut excepturi non.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 2, 33, 2, NULL, 395, NULL, NULL),
(728, 'Awesome Bronze Shoes', 33606300, '', 'Perspiciatis delectus vel qui odio.', '2025-03-29 13:19:26', '2025-04-26 22:08:26', 1, 30, 2, NULL, NULL, 232, NULL),
(729, 'Practical Iron Gloves', 46654100, '', 'Facilis sed veritatis explicabo iusto.', '2025-03-29 13:19:27', '2025-04-26 22:08:26', 1, 18, 1, NULL, NULL, 233, NULL),
(730, 'Sleek Plastic Pants', 11495400, '', 'Cum porro saepe est aut.', '2025-03-29 13:19:27', '2025-04-26 22:08:26', 1, 44, 3, NULL, NULL, 234, NULL),
(731, 'Synergistic Plastic Coat', 43123600, '', 'Et et consequatur animi ipsum.', '2025-03-29 13:19:27', '2025-04-26 22:08:26', 2, 73, 1, NULL, 396, NULL, NULL),
(732, 'Durable Cotton Bottle', 5483430, '', 'Amet quis doloremque.', '2025-03-29 13:19:27', '2025-04-26 22:08:26', 3, 55, 1, 102, NULL, NULL, NULL),
(733, 'Aerodynamic Cotton Shirt', 13692400, '', 'Voluptas velit iure.', '2025-03-29 13:19:27', '2025-04-26 22:08:26', 2, 59, 1, NULL, 397, NULL, NULL),
(734, 'Heavy Duty Steel Pants', 54185000, '', 'Ducimus quod maxime vitae quia est magni.', '2025-03-29 13:19:27', '2025-04-26 22:08:26', 1, 56, 1, NULL, NULL, 235, NULL),
(735, 'Heavy Duty Rubber Watch', 21278900, '', 'Eligendi quia deserunt.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 2, 29, 2, NULL, 398, NULL, NULL),
(736, 'Mediocre Linen Keyboard', 25495400, '', 'Accusantium natus quidem in ut facilis officia.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 1, 6, 1, NULL, NULL, 236, NULL),
(737, 'Intelligent Steel Bench', 75401700, '', 'Ut ea corrupti dolorum.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 3, 50, 1, 103, NULL, NULL, NULL),
(738, 'Mediocre Plastic Lamp', 11356600, '', 'Qui deserunt voluptates.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 2, 62, 2, NULL, 399, NULL, NULL),
(739, 'Lightweight Wooden Shoes', 82768900, '', 'Illo ut voluptas ut.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 2, 50, 2, NULL, 400, NULL, NULL),
(740, 'Sleek Marble Bottle', 73728600, '', 'Totam eligendi ab ab.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 2, 60, 3, NULL, 401, NULL, NULL),
(741, 'Intelligent Aluminum Table', 36618800, '', 'Omnis et voluptas vero quam doloribus ea quia.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 1, 55, 2, NULL, NULL, 237, NULL),
(742, 'Intelligent Marble Knife', 59838600, '', 'Iure enim numquam cupiditate ea.', '2025-03-29 13:19:27', '2025-04-26 22:08:27', 2, 86, 2, NULL, 402, NULL, NULL),
(743, 'Enormous Bronze Coat', 69530700, '', 'Eum eos culpa quia voluptatibus magni.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 2, 89, 1, NULL, 403, NULL, NULL),
(744, 'Small Cotton Shoes', 30226600, '', 'Voluptates facilis perspiciatis.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 1, 47, 1, NULL, NULL, 238, NULL),
(745, 'Incredible Paper Wallet', 1986700, '', 'Dolores nostrum et maiores et.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 3, 60, 2, 104, NULL, NULL, NULL),
(746, 'Ergonomic Concrete Computer', 57491100, '', 'Voluptatem officia aspernatur perspiciatis ut numquam alias.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 1, 58, 2, NULL, NULL, 239, NULL),
(747, 'Enormous Linen Shirt', 75767000, '', 'Necessitatibus autem maxime voluptatem cupiditate non soluta consectetur.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 2, 90, 1, NULL, 404, NULL, NULL),
(748, 'Incredible Granite Knife', 1166260, '', 'Nesciunt eveniet et ratione natus dolor explicabo.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 3, 87, 3, 105, NULL, NULL, NULL),
(749, 'Heavy Duty Wool Keyboard', 79099800, '', 'Debitis eos corporis quia aut illum ut.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 1, 12, 2, NULL, NULL, 240, NULL),
(750, 'Small Iron Computer', 48059100, '', 'Dolorem quia maiores et.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 2, 3, 1, NULL, 405, NULL, NULL),
(751, 'Heavy Duty Plastic Wallet', 77774500, '', 'Velit similique maiores fuga.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 2, 4, 1, NULL, 406, NULL, NULL),
(752, 'Enormous Linen Coat', 29275300, '', 'Quod et eveniet molestiae.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 3, 84, 3, 106, NULL, NULL, NULL),
(753, 'Durable Granite Shoes', 22435100, '', 'Atque sunt ex voluptas animi consequatur cupiditate.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 2, 7, 1, NULL, 407, NULL, NULL),
(754, 'Rustic Marble Car', 74959600, '', 'Rerum aliquam ducimus sit minima quia harum.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 1, 59, 1, NULL, NULL, 241, NULL),
(755, 'Durable Leather Knife', 7462470, '', 'Aut sint accusantium aut.', '2025-03-29 13:19:28', '2025-04-26 22:08:27', 2, 12, 2, NULL, 408, NULL, NULL),
(756, 'Awesome Concrete Plate', 79612100, '', 'In enim voluptatibus perspiciatis vero quam.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 2, 60, 2, NULL, 409, NULL, NULL),
(757, 'Practical Rubber Knife', 55642200, '', 'Facere odio enim quia eveniet sit aut.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 3, 81, 1, 107, NULL, NULL, NULL),
(758, 'Synergistic Wooden Bag', 27391200, '', 'Maiores ipsa quia qui quo alias dolorum omnis.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 3, 75, 1, 108, NULL, NULL, NULL),
(759, 'Mediocre Paper Table', 55001600, '', 'Ea illum aut molestias eum quas accusamus.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 2, 82, 2, NULL, 410, NULL, NULL),
(760, 'Fantastic Copper Bag', 89067800, '', 'Similique repellat corporis qui iste quibusdam molestiae.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 2, 20, 2, NULL, 411, NULL, NULL),
(761, 'Synergistic Leather Clock', 10275800, '', 'Sunt alias fuga aperiam quis id repudiandae.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 1, 77, 2, NULL, NULL, 242, NULL),
(762, 'Sleek Plastic Keyboard', 9876440, '', 'Placeat et eum adipisci in.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 2, 85, 2, NULL, 412, NULL, NULL),
(763, 'Sleek Steel Table', 69317800, '', 'Ut qui qui ex.', '2025-03-29 13:19:29', '2025-04-26 22:08:27', 1, 47, 2, NULL, NULL, 243, NULL),
(764, 'Intelligent Bronze Lamp', 44803700, '', 'Quae officia dolorem velit quisquam laudantium rerum.', '2025-03-29 13:19:29', '2025-04-26 22:08:28', 2, 84, 3, NULL, 413, NULL, NULL),
(765, 'Small Copper Clock', 21749700, '', 'Adipisci voluptatem sequi et cupiditate.', '2025-03-29 13:19:29', '2025-04-26 22:08:28', 2, 76, 2, NULL, 414, NULL, NULL),
(766, 'Intelligent Iron Bag', 51375100, '', 'Adipisci distinctio omnis quidem unde.', '2025-03-29 13:19:29', '2025-04-26 22:08:28', 2, 44, 2, NULL, 415, NULL, NULL),
(767, 'Rustic Marble Knife', 70701700, '', 'Qui enim consequuntur.', '2025-03-29 13:19:29', '2025-04-26 22:08:28', 2, 45, 3, NULL, 416, NULL, NULL),
(768, 'Incredible Wool Shirt', 89896800, '', 'Voluptatem quaerat sapiente non et tempora.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 51, 2, NULL, 417, NULL, NULL),
(769, 'Fantastic Leather Shoes', 18480900, '', 'Voluptatem est nihil enim blanditiis ipsam unde.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 70, 1, NULL, 418, NULL, NULL),
(770, 'Gorgeous Copper Clock', 77668000, '', 'Natus dolores sequi laudantium voluptatum ea aut.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 2, 3, NULL, 419, NULL, NULL),
(771, 'Practical Copper Bag', 43229400, '', 'Maxime vitae blanditiis sint.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 68, 2, NULL, 420, NULL, NULL),
(772, 'Gorgeous Marble Coat', 75777800, '', 'Sapiente est et ipsam sapiente.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 1, 80, 1, NULL, NULL, 244, NULL),
(773, 'Aerodynamic Concrete Bench', 37554800, '', 'Quis perspiciatis earum.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 3, 37, 2, 109, NULL, NULL, NULL),
(774, 'Durable Silk Wallet', 32292900, '', 'Voluptatibus asperiores ea inventore.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 3, 84, 2, 110, NULL, NULL, NULL),
(775, 'Enormous Silk Clock', 26116600, '', 'Ea dolorum ipsam dolor sit aut.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 1, 23, 1, NULL, NULL, 245, NULL),
(776, 'Gorgeous Rubber Hat', 22746200, '', 'Saepe ipsa debitis excepturi corrupti temporibus aut aliquid.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 73, 3, NULL, 421, NULL, NULL),
(777, 'Lightweight Aluminum Hat', 64633400, '', 'Repellendus et qui eveniet et.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 1, 59, 2, NULL, NULL, 246, NULL),
(778, 'Synergistic Cotton Car', 70397500, '', 'Modi odit illo quaerat nam.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 76, 1, NULL, 422, NULL, NULL),
(779, 'Rustic Wool Plate', 64717000, '', 'Aut voluptate officiis officia reprehenderit recusandae.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 2, 29, 2, NULL, 423, NULL, NULL),
(780, 'Practical Copper Plate', 20183700, '', 'Maiores corporis praesentium ipsam eaque ipsa.', '2025-03-29 13:19:30', '2025-04-26 22:08:28', 3, 5, 2, 111, NULL, NULL, NULL),
(781, 'Intelligent Bronze Bench', 38219300, '', 'Praesentium culpa dolore labore praesentium minima.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 20, 2, NULL, 424, NULL, NULL),
(782, 'Mediocre Linen Car', 29834800, '', 'Voluptates expedita incidunt.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 30, 2, NULL, 425, NULL, NULL),
(783, 'Incredible Leather Keyboard', 22488500, '', 'Et ipsa neque.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 1, 52, 3, NULL, NULL, 247, NULL),
(784, 'Aerodynamic Concrete Hat', 80404300, '', 'Quidem consectetur non et.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 73, 2, NULL, 426, NULL, NULL),
(785, 'Gorgeous Wool Car', 14749200, '', 'Quos magnam quo omnis quia.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 58, 3, NULL, 427, NULL, NULL),
(786, 'Synergistic Paper Plate', 58892900, '', 'Rerum dolor exercitationem veritatis sed.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 1, 75, 2, NULL, NULL, 248, NULL),
(787, 'Practical Steel Computer', 17839800, '', 'Perspiciatis adipisci consequatur optio nobis quis.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 24, 1, NULL, 428, NULL, NULL),
(788, 'Practical Marble Plate', 17370000, '', 'Dolorum vitae voluptas sit aut dolor.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 86, 2, NULL, 429, NULL, NULL),
(789, 'Awesome Wool Gloves', 58490900, '', 'Voluptatem nam maiores.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 38, 2, NULL, 430, NULL, NULL),
(790, 'Synergistic Granite Shoes', 3127380, '', 'Qui sit rem omnis impedit sit.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 1, 69, 3, NULL, NULL, 249, NULL),
(791, 'Awesome Silk Pants', 8399140, '', 'Maiores laudantium nihil quia.', '2025-03-29 13:19:31', '2025-04-26 22:08:28', 2, 75, 2, NULL, 431, NULL, NULL),
(792, 'Awesome Wooden Car', 81629000, '', 'Qui voluptas nemo.', '2025-03-29 13:19:31', '2025-04-26 22:08:29', 3, 60, 3, 112, NULL, NULL, NULL),
(793, 'Synergistic Wooden Gloves', 33456700, '', 'Qui natus aut.', '2025-03-29 13:19:31', '2025-04-26 22:08:29', 1, 80, 2, NULL, NULL, 250, NULL),
(794, 'Awesome Cotton Bag', 79758400, '', 'Vel voluptatibus ut.', '2025-03-29 13:19:31', '2025-04-26 22:08:29', 3, 8, 3, 113, NULL, NULL, NULL),
(795, 'Incredible Plastic Car', 21937100, '', 'Dolorem fugiat ratione nihil.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 8, 2, NULL, 432, NULL, NULL),
(796, 'Sleek Bronze Hat', 14494500, '', 'Dolor et deleniti expedita.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 47, 2, NULL, 433, NULL, NULL),
(797, 'Practical Cotton Wallet', 20210100, '', 'Dolore facilis voluptate laudantium provident vero nesciunt eius.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 33, 2, NULL, 434, NULL, NULL),
(798, 'Durable Rubber Computer', 85238200, '', 'Repudiandae ducimus nesciunt doloribus voluptatem voluptatem et sapiente.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 65, 1, NULL, 435, NULL, NULL),
(799, 'Small Iron Car', 77086800, '', 'Vitae omnis est.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 1, 36, 3, NULL, NULL, 251, NULL),
(800, 'Gorgeous Iron Pants', 8268180, '', 'Magnam fugiat porro iusto.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 1, 44, 2, NULL, NULL, 252, NULL),
(801, 'Heavy Duty Granite Plate', 71179200, '', 'Quis dolor tempora.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 3, 41, 2, 114, NULL, NULL, NULL),
(802, 'Rustic Steel Coat', 70660600, '', 'Quia totam facilis.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 1, 33, 2, NULL, NULL, 253, NULL),
(803, 'Small Plastic Bottle', 5206210, '', 'Nulla ex ipsam iusto.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 63, 1, NULL, 436, NULL, NULL),
(804, 'Practical Silk Computer', 3084630, '', 'Iure quo aspernatur eos est labore dolorum.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 52, 1, NULL, 437, NULL, NULL),
(805, 'Awesome Cotton Car', 66372400, '', 'Ut aspernatur consequuntur.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 36, 2, NULL, 438, NULL, NULL),
(806, 'Mediocre Wooden Chair', 37136500, '', 'Eius aut optio sed vel placeat suscipit dolores.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 1, 35, 2, NULL, NULL, 254, NULL),
(807, 'Aerodynamic Linen Shirt', 44772000, '', 'Omnis dolorum aspernatur maxime dolores doloremque dignissimos.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 1, 75, 3, NULL, NULL, 255, NULL),
(808, 'Durable Cotton Gloves', 82429500, '', 'Corporis in ea est officiis eos totam.', '2025-03-29 13:19:32', '2025-04-26 22:08:29', 2, 61, 3, NULL, 439, NULL, NULL),
(809, 'Heavy Duty Copper Chair', 58634000, '', 'Animi excepturi a quibusdam omnis unde doloremque.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 1, 70, 1, NULL, NULL, 256, NULL),
(810, 'Mediocre Plastic Table', 51004200, '', 'Esse autem ut eius.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 1, 77, 2, NULL, NULL, 257, NULL),
(811, 'Small Steel Bench', 66765800, '', 'Alias cupiditate saepe non.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 2, 19, 2, NULL, 440, NULL, NULL),
(812, 'Small Rubber Bottle', 23322700, '', 'Odio magnam dolor.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 2, 89, 2, NULL, 441, NULL, NULL),
(813, 'Enormous Wooden Bottle', 38193800, '', 'Fuga esse sit et.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 2, 72, 2, NULL, 442, NULL, NULL),
(814, 'Ergonomic Paper Computer', 71873700, '', 'Et quisquam aliquid qui debitis quis quasi rerum.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 2, 64, 2, NULL, 443, NULL, NULL),
(815, 'Lightweight Rubber Plate', 84138900, '', 'Omnis nulla architecto dignissimos temporibus exercitationem aliquam ullam.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 1, 86, 2, NULL, NULL, 258, NULL),
(816, 'Rustic Plastic Hat', 51857600, '', 'Eos inventore vel sapiente.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 1, 13, 2, NULL, NULL, 259, NULL),
(817, 'Rustic Bronze Shoes', 38062200, '', 'Magnam et assumenda blanditiis.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 1, 85, 2, NULL, NULL, 260, NULL),
(818, 'Durable Paper Chair', 58543600, '', 'Numquam quibusdam tenetur et eos laudantium voluptatem eum.', '2025-03-29 13:19:33', '2025-04-26 22:08:29', 1, 47, 1, NULL, NULL, 261, NULL),
(819, 'Synergistic Marble Lamp', 58269700, '', 'Et aliquid enim inventore.', '2025-03-29 13:19:33', '2025-04-26 22:08:30', 2, 82, 1, NULL, 444, NULL, NULL),
(820, 'Small Silk Bag', 6441370, '', 'Quia debitis aut voluptates occaecati.', '2025-03-29 13:19:33', '2025-04-26 22:08:30', 2, 88, 2, NULL, 445, NULL, NULL),
(821, 'Rustic Marble Watch', 52019100, '', 'Earum delectus aut.', '2025-03-29 13:19:33', '2025-04-26 22:08:30', 2, 55, 2, NULL, 446, NULL, NULL),
(822, 'Incredible Plastic Wallet', 83606800, '', 'Dicta voluptates maiores a illo.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 3, 47, 2, 115, NULL, NULL, NULL),
(823, 'Practical Cotton Lamp', 3722350, '', 'Vero fuga voluptatibus quia placeat in exercitationem.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 64, 3, NULL, 447, NULL, NULL),
(824, 'Mediocre Copper Pants', 73935600, '', 'Veritatis consequatur voluptas.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 61, 3, NULL, 448, NULL, NULL),
(825, 'Practical Copper Clock', 80707700, '', 'Aspernatur aut autem voluptate esse quis soluta deserunt.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 26, 3, NULL, 449, NULL, NULL),
(826, 'Rustic Plastic Watch', 47227700, '', 'Veniam voluptatibus dolor at vero accusantium.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 42, 2, NULL, 450, NULL, NULL),
(827, 'Incredible Wooden Clock', 49883500, '', 'Quos harum pariatur ea qui ad voluptas tempora.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 44, 2, NULL, 451, NULL, NULL),
(828, 'Aerodynamic Iron Bottle', 62825200, '', 'Porro doloremque id ut dolores.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 1, 3, 2, NULL, NULL, 262, NULL),
(829, 'Lightweight Rubber Table', 61184300, '', 'Laboriosam omnis quis vero ad.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 71, 1, NULL, 452, NULL, NULL),
(830, 'Intelligent Leather Knife', 69483200, '', 'Sit ea dolor magni.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 1, 25, 1, NULL, NULL, 263, NULL),
(831, 'Small Granite Keyboard', 21054200, '', 'Hic eveniet inventore totam modi sed qui mollitia.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 32, 2, NULL, 453, NULL, NULL),
(832, 'Rustic Marble Bottle', 74670900, '', 'Dicta nulla facere repellendus sequi cum quam id.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 3, 14, 2, 116, NULL, NULL, NULL),
(833, 'Mediocre Copper Bottle', 75946400, '', 'Porro aliquam quibusdam eaque.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 44, 2, NULL, 454, NULL, NULL),
(834, 'Sleek Steel Clock', 9977190, '', 'Minima quia optio et explicabo soluta occaecati totam.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 1, 31, 1, NULL, NULL, 264, NULL),
(835, 'Mediocre Rubber Table', 83304000, '', 'Itaque nobis adipisci.', '2025-03-29 13:19:34', '2025-04-26 22:08:30', 2, 48, 2, NULL, 455, NULL, NULL),
(836, 'Heavy Duty Aluminum Chair', 68917700, '', 'Veritatis est voluptatem qui.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 2, 16, 2, NULL, 456, NULL, NULL),
(837, 'Mediocre Cotton Wallet', 17784700, '', 'Sed natus quos dolores doloremque eum nemo.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 2, 51, 1, NULL, 457, NULL, NULL),
(838, 'Synergistic Marble Hat', 53923900, '', 'Et qui iure aperiam maxime laboriosam earum exercitationem.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 3, 79, 2, 117, NULL, NULL, NULL),
(839, 'Durable Copper Hat', 87519300, '', 'Quasi sint ad quaerat dolores sint.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 3, 59, 1, 118, NULL, NULL, NULL),
(840, 'Durable Leather Clock', 33377600, '', 'Aliquid porro alias repudiandae iste alias aliquam vel.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 2, 30, 2, NULL, 458, NULL, NULL),
(841, 'Sleek Steel Plate', 5784100, '', 'Voluptate cum harum.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 2, 84, 2, NULL, 459, NULL, NULL),
(842, 'Intelligent Aluminum Gloves', 28186600, '', 'Voluptatum ut nostrum non quidem officiis in.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 2, 66, 1, NULL, 460, NULL, NULL),
(843, 'Gorgeous Wool Bottle', 10854700, '', 'Quos temporibus voluptatem velit.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 2, 18, 1, NULL, 461, NULL, NULL),
(844, 'Incredible Leather Clock', 60781700, '', 'Ut possimus nesciunt dignissimos earum aut hic molestiae.', '2025-03-29 13:19:35', '2025-04-26 22:08:30', 1, 12, 3, NULL, NULL, 265, NULL),
(845, 'Ergonomic Steel Bench', 12026000, '', 'Tempore error recusandae.', '2025-03-29 13:19:35', '2025-04-26 22:08:31', 2, 61, 1, NULL, 462, NULL, NULL),
(846, 'Fantastic Wooden Plate', 16617900, '', 'Est perferendis est blanditiis et.', '2025-03-29 13:19:35', '2025-04-26 22:08:31', 2, 73, 2, NULL, 463, NULL, NULL),
(847, 'Mediocre Leather Chair', 9554020, '', 'Eaque cum voluptatem sapiente voluptatem qui dicta.', '2025-03-29 13:19:35', '2025-04-26 22:08:31', 2, 63, 2, NULL, 464, NULL, NULL),
(848, 'Sleek Bronze Watch', 42004800, '', 'Eligendi saepe quia.', '2025-03-29 13:19:35', '2025-04-26 22:08:31', 1, 69, 2, NULL, NULL, 266, NULL),
(849, 'Awesome Wooden Pants', 31982400, '', 'Aut sunt expedita blanditiis.', '2025-03-29 13:19:35', '2025-04-26 22:08:31', 1, 14, 2, NULL, NULL, 267, NULL),
(850, 'Durable Linen Bag', 42051100, '', 'Quia placeat qui est sed molestias vitae ea.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 1, 2, NULL, 465, NULL, NULL),
(851, 'Gorgeous Marble Bottle', 36725100, '', 'Alias harum quibusdam ut.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 17, 2, NULL, 466, NULL, NULL),
(852, 'Aerodynamic Wooden Coat', 33043200, '', 'Reiciendis officia sit quia nisi.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 1, 13, 2, NULL, NULL, 268, NULL),
(853, 'Rustic Cotton Wallet', 39169700, '', 'Et et est aut ducimus voluptas aut.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 54, 1, NULL, 467, NULL, NULL),
(854, 'Practical Copper Lamp', 50484200, '', 'Ratione autem adipisci ad placeat dolorem fugiat.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 3, 76, 1, 119, NULL, NULL, NULL),
(855, 'Awesome Aluminum Coat', 66359700, '', 'Quia excepturi debitis.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 83, 2, NULL, 468, NULL, NULL),
(856, 'Fantastic Wool Coat', 37238900, '', 'Provident rerum eum velit non.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 24, 2, NULL, 469, NULL, NULL),
(857, 'Practical Iron Table', 32136000, '', 'Quo mollitia perferendis suscipit aut est sequi.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 1, 2, NULL, 470, NULL, NULL),
(858, 'Aerodynamic Copper Coat', 89976400, '', 'Sunt ipsam et porro.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 1, 47, 1, NULL, NULL, 269, NULL),
(859, 'Intelligent Leather Hat', 60754500, '', 'Illum itaque dicta ea quis occaecati.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 16, 2, NULL, 471, NULL, NULL),
(860, 'Sleek Iron Shoes', 87863800, '', 'Dolorem sed molestiae aut.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 6, 3, NULL, 472, NULL, NULL),
(861, 'Aerodynamic Copper Car', 12892800, '', 'Fugit quasi numquam laboriosam quis repudiandae aut.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 1, 44, 2, NULL, NULL, 270, NULL),
(862, 'Ergonomic Cotton Keyboard', 25450800, '', 'Consequatur quia omnis voluptas repellendus.', '2025-03-29 13:19:36', '2025-04-26 22:08:31', 2, 10, 1, NULL, 473, NULL, NULL),
(863, 'Aerodynamic Wooden Computer', 22899000, '', 'Explicabo dignissimos consequatur.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 1, 70, 2, NULL, NULL, 271, NULL),
(864, 'Synergistic Iron Plate', 39086400, '', 'Et praesentium voluptatem reiciendis.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 2, 37, 2, NULL, 474, NULL, NULL),
(865, 'Incredible Copper Shoes', 83469100, '', 'Animi praesentium commodi temporibus molestiae quis.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 2, 55, 2, NULL, 475, NULL, NULL),
(866, 'Intelligent Concrete Car', 9374510, '', 'Sint cupiditate voluptatem provident.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 2, 20, 3, NULL, 476, NULL, NULL),
(867, 'Aerodynamic Concrete Bag', 82461400, '', 'Ut eum commodi.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 2, 52, 2, NULL, 477, NULL, NULL),
(868, 'Rustic Wool Bench', 15527500, '', 'Vero vel eligendi consequuntur quibusdam sed.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 1, 90, 3, NULL, NULL, 272, NULL),
(869, 'Mediocre Granite Lamp', 12790700, '', 'In deleniti et cumque asperiores magnam.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 2, 39, 2, NULL, 478, NULL, NULL),
(870, 'Enormous Cotton Wallet', 22545200, '', 'Eius necessitatibus voluptatibus sunt eveniet.', '2025-03-29 13:19:37', '2025-04-26 22:08:31', 2, 59, 3, NULL, 479, NULL, NULL),
(871, 'Intelligent Silk Bench', 31532700, '', 'Aut ad qui ullam cum eligendi.', '2025-03-29 13:19:37', '2025-04-26 22:08:32', 1, 15, 1, NULL, NULL, 273, NULL),
(872, 'Practical Linen Bottle', 50285700, '', 'Qui voluptas aliquid in placeat eum.', '2025-03-29 13:19:37', '2025-04-26 22:08:32', 2, 9, 2, NULL, 480, NULL, NULL),
(873, 'Intelligent Linen Plate', 37487900, '', 'Voluptas est doloremque aut rerum.', '2025-03-29 13:19:37', '2025-04-26 22:08:32', 2, 60, 2, NULL, 481, NULL, NULL),
(874, 'Awesome Plastic Bench', 19964200, '', 'Aut voluptatibus nihil.', '2025-03-29 13:19:37', '2025-04-26 22:08:32', 3, 48, 1, 120, NULL, NULL, NULL),
(875, 'Synergistic Aluminum Watch', 10360400, '', 'Et natus est veniam et distinctio labore similique.', '2025-03-29 13:19:37', '2025-04-26 22:08:32', 2, 15, 3, NULL, 482, NULL, NULL),
(876, 'Durable Cotton Hat', 75917200, '', 'Recusandae quidem aliquid esse est eos expedita.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 3, 35, 2, 121, NULL, NULL, NULL),
(877, 'Rustic Copper Clock', 24270000, '', 'Doloremque non aliquam deleniti vel.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 3, 62, 3, 122, NULL, NULL, NULL),
(878, 'Practical Silk Shirt', 46939400, '', 'Debitis amet neque aut ea accusamus.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 3, 48, 2, 123, NULL, NULL, NULL),
(879, 'Awesome Plastic Knife', 52384300, '', 'Vel qui vel at sint consequuntur inventore.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 1, 54, 1, NULL, NULL, 274, NULL),
(880, 'Sleek Aluminum Car', 24795900, '', 'Sit iure et esse non necessitatibus.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 2, 49, 1, NULL, 483, NULL, NULL),
(881, 'Durable Copper Bottle', 88968700, '', 'Veritatis hic maiores adipisci distinctio nam quidem.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 1, 47, 2, NULL, NULL, 275, NULL),
(882, 'Gorgeous Bronze Keyboard', 39464200, '', 'Commodi ab molestias asperiores qui.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 2, 35, 2, NULL, 484, NULL, NULL),
(883, 'Intelligent Iron Hat', 65891000, '', 'Dolor laborum voluptate.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 2, 38, 2, NULL, 485, NULL, NULL),
(884, 'Gorgeous Cotton Car', 39077500, '', 'Repudiandae non laborum vero commodi.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 1, 53, 3, NULL, NULL, 276, NULL),
(885, 'Awesome Paper Car', 83733800, '', 'Qui ut dolor repellendus.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 1, 54, 1, NULL, NULL, 277, NULL),
(886, 'Synergistic Iron Keyboard', 16136900, '', 'Ullam sit sapiente suscipit est accusamus deleniti dolores.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 2, 16, 1, NULL, 486, NULL, NULL),
(887, 'Enormous Silk Computer', 70584900, '', 'Ullam illum dolorem aut.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 2, 19, 2, NULL, 487, NULL, NULL),
(888, 'Small Wooden Keyboard', 10871300, '', 'Et expedita rerum.', '2025-03-29 13:19:38', '2025-04-26 22:08:32', 1, 69, 2, NULL, NULL, 278, NULL),
(889, 'Fantastic Rubber Hat', 45544600, '', 'Quibusdam libero quia et laboriosam sit.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 2, 84, 2, NULL, 488, NULL, NULL),
(890, 'Rustic Granite Pants', 81983200, '', 'Quibusdam quia minus qui dignissimos et neque.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 1, 84, 2, NULL, NULL, 279, NULL),
(891, 'Fantastic Wooden Chair', 81023500, '', 'Rem dolor et minus dolores laudantium doloribus.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 3, 55, 2, 124, NULL, NULL, NULL),
(892, 'Mediocre Plastic Shoes', 44260900, '', 'Libero iusto libero voluptas sit fuga quisquam deserunt.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 1, 9, 2, NULL, NULL, 280, NULL),
(893, 'Practical Plastic Watch', 15934300, '', 'Perspiciatis et perspiciatis reprehenderit.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 3, 69, 2, 125, NULL, NULL, NULL),
(894, 'Sleek Paper Shoes', 4951040, '', 'Qui odio ea odit qui voluptas ratione minus.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 2, 74, 3, NULL, 489, NULL, NULL),
(895, 'Practical Wool Bench', 60121500, '', 'Et omnis ut commodi.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 2, 61, 2, NULL, 490, NULL, NULL),
(896, 'Small Iron Table', 47308900, '', 'Est qui laudantium.', '2025-03-29 13:19:39', '2025-04-26 22:08:32', 3, 75, 3, 126, NULL, NULL, NULL),
(897, 'Small Bronze Lamp', 10305100, '', 'Temporibus laborum ut.', '2025-03-29 13:19:39', '2025-04-26 22:08:33', 1, 26, 1, NULL, NULL, 281, NULL),
(898, 'Aerodynamic Granite Gloves', 65249800, '', 'Hic iusto saepe enim voluptatum.', '2025-03-29 13:19:39', '2025-04-26 22:08:33', 2, 13, 2, NULL, 491, NULL, NULL),
(899, 'Fantastic Paper Hat', 80950600, '', 'Accusantium facere sint similique.', '2025-03-29 13:19:39', '2025-04-26 22:08:33', 2, 76, 2, NULL, 492, NULL, NULL),
(900, 'Durable Wool Bottle', 27953500, '', 'Inventore hic qui.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 3, 80, 2, 127, NULL, NULL, NULL),
(901, 'Practical Iron Clock', 49190900, '', 'Repellat ipsa consequatur dolores veniam.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 2, 89, 2, NULL, 493, NULL, NULL),
(902, 'Enormous Granite Clock', 3097850, '', 'Reprehenderit commodi corrupti dolores unde omnis.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 1, 52, 1, NULL, NULL, 282, NULL),
(903, 'Sleek Copper Bag', 67507700, '', 'Laborum sint beatae molestias.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 3, 88, 2, 128, NULL, NULL, NULL),
(904, 'Enormous Linen Clock', 7788970, '', 'Eum nulla ratione id labore adipisci qui.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 1, 9, 2, NULL, NULL, 283, NULL),
(905, 'Durable Silk Bench', 14372500, '', 'Itaque qui earum dolore earum.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 3, 68, 2, 129, NULL, NULL, NULL),
(906, 'Incredible Granite Bag', 77597300, '', 'Itaque corporis veritatis.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 2, 54, 1, NULL, 494, NULL, NULL),
(907, 'Mediocre Iron Knife', 72409900, '', 'Odit sit optio tempore laboriosam inventore possimus eius.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 1, 90, 1, NULL, NULL, 284, NULL),
(908, 'Intelligent Leather Lamp', 12759300, '', 'In velit voluptatem unde.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 1, 58, 2, NULL, NULL, 285, NULL);
INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`, `stock_quantity`, `brand_id`, `headphone_specs_id`, `keyboard_specs_id`, `mouse_specs_id`, `discount_percent`) VALUES
(909, 'Synergistic Iron Coat', 5585480, '', 'Cupiditate perferendis illum.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 1, 26, 2, NULL, NULL, 286, NULL),
(910, 'Synergistic Concrete Gloves', 74309600, '', 'Nam recusandae sequi velit quis velit molestiae.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 3, 8, 3, 130, NULL, NULL, NULL),
(911, 'Incredible Linen Bottle', 27301700, '', 'Excepturi voluptas qui quia atque qui nisi et.', '2025-03-29 13:19:40', '2025-04-26 22:08:33', 2, 17, 2, NULL, 495, NULL, NULL),
(912, 'Small Wooden Car', 65438300, '', 'Est sunt explicabo.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 2, 32, 2, NULL, 496, NULL, NULL),
(913, 'Aerodynamic Wool Lamp', 62923000, '', 'Iure reprehenderit temporibus facilis vel.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 1, 78, 1, NULL, NULL, 287, NULL),
(914, 'Durable Iron Plate', 78217800, '', 'Assumenda omnis laudantium.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 3, 73, 2, 131, NULL, NULL, NULL),
(915, 'Fantastic Steel Clock', 85316100, '', 'Dolores est et.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 2, 70, 2, NULL, 497, NULL, NULL),
(916, 'Durable Marble Pants', 85725800, '', 'Aut vitae at quis dolorem.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 2, 14, 2, NULL, 498, NULL, NULL),
(917, 'Rustic Wool Bag', 19932200, '', 'Voluptas est voluptate.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 2, 34, 1, NULL, 499, NULL, NULL),
(918, 'Mediocre Cotton Shoes', 64601900, '', 'Reiciendis nesciunt rerum in.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 2, 51, 2, NULL, 500, NULL, NULL),
(919, 'Heavy Duty Paper Knife', 80180900, '', 'Occaecati rerum expedita quidem similique repudiandae et.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 1, 3, 2, NULL, NULL, 288, NULL),
(920, 'Incredible Bronze Bag', 16371200, '', 'Atque et officiis tenetur ut unde et et.', '2025-03-29 13:19:41', '2025-04-26 22:08:33', 3, 86, 3, 132, NULL, NULL, NULL),
(921, 'Heavy Duty Cotton Coat', 39861100, '', 'Saepe tenetur quia ullam aspernatur.', '2025-03-29 13:19:41', '2025-04-26 22:08:34', 2, 3, 1, NULL, 501, NULL, NULL),
(922, 'Awesome Plastic Bag', 41633600, '', 'Nihil in vel sed soluta aut.', '2025-03-29 13:19:41', '2025-04-26 22:08:34', 2, 31, 1, NULL, 502, NULL, NULL),
(923, 'Awesome Plastic Hat', 32946500, '', 'Eveniet voluptatem sit nihil maiores qui.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 3, 51, 1, 133, NULL, NULL, NULL),
(924, 'Awesome Wool Bench', 67672800, '', 'Perferendis dolorem molestiae velit ipsa.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 24, 2, NULL, 503, NULL, NULL),
(925, 'Rustic Aluminum Gloves', 69808300, '', 'Aut quos iste delectus nostrum.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 61, 1, NULL, 504, NULL, NULL),
(926, 'Incredible Paper Bottle', 51642400, '', 'Nihil asperiores non voluptas corporis autem alias culpa.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 49, 2, NULL, 505, NULL, NULL),
(927, 'Awesome Leather Keyboard', 82337900, '', 'Quae exercitationem atque nam.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 44, 2, NULL, 506, NULL, NULL),
(928, 'Synergistic Concrete Car', 49296200, '', 'Enim nulla dolor.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 3, 49, 2, 134, NULL, NULL, NULL),
(929, 'Incredible Leather Bench', 5277720, '', 'Iusto quos et voluptas inventore reiciendis qui.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 36, 3, NULL, 507, NULL, NULL),
(930, 'Incredible Granite Bench', 12954500, '', 'Ipsam et laborum dolor impedit voluptatem neque.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 3, 52, 3, 135, NULL, NULL, NULL),
(931, 'Rustic Marble Plate', 23142600, '', 'Odit eligendi sint corrupti doloribus alias fugiat minus.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 12, 2, NULL, 508, NULL, NULL),
(932, 'Awesome Cotton Computer', 61259700, '', 'Dolores nam aperiam vitae similique.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 1, 40, 2, NULL, NULL, 289, NULL),
(933, 'Mediocre Rubber Gloves', 12731000, '', 'Ut quia sequi.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 61, 3, NULL, 509, NULL, NULL),
(934, 'Intelligent Aluminum Bottle', 10204600, '', 'Sint nulla unde aut.', '2025-03-29 13:19:42', '2025-04-26 22:08:34', 2, 27, 2, NULL, 510, NULL, NULL),
(935, 'Aerodynamic Wool Clock', 69814700, '', 'Exercitationem eaque consequatur voluptas et et excepturi.', '2025-03-29 13:19:43', '2025-04-26 22:08:34', 2, 30, 1, NULL, 511, NULL, NULL),
(936, 'Enormous Wooden Shirt', 73353000, '', 'Animi id corrupti quis nam sit sit.', '2025-03-29 13:19:43', '2025-04-26 22:08:34', 3, 75, 1, 136, NULL, NULL, NULL),
(937, 'Gorgeous Linen Pants', 23798300, '', 'Vero voluptas hic fugiat.', '2025-03-29 13:19:43', '2025-04-26 22:08:34', 1, 8, 2, NULL, NULL, 290, NULL),
(938, 'Ergonomic Granite Pants', 11813600, '', 'Est sit at ut maxime aut enim officia.', '2025-03-29 13:19:43', '2025-04-26 22:08:34', 2, 22, 2, NULL, 512, NULL, NULL),
(939, 'Small Bronze Bottle', 80367000, '', 'Officia quaerat voluptatem.', '2025-03-29 13:19:43', '2025-04-26 22:08:34', 2, 60, 2, NULL, 513, NULL, NULL),
(940, 'Small Granite Coat', 74447900, '', 'Non dignissimos omnis voluptatem non molestiae neque.', '2025-03-29 13:19:43', '2025-04-26 22:08:34', 1, 41, 2, NULL, NULL, 291, NULL),
(941, 'Chuot mickey', 5.99999, '', NULL, '2025-04-01 20:56:52', '2025-04-26 22:08:34', 1, 54, 1, NULL, NULL, 292, NULL),
(944, 'ban phim luffy sieu ngau', 76276000, '', NULL, '2025-04-01 21:07:18', '2025-04-01 21:07:18', 2, 32, NULL, NULL, 516, NULL, NULL),
(945, 'Tai nghe SoundPeats T3', 390000, '', NULL, '2025-04-01 21:10:28', '2025-04-01 21:10:28', 3, 23, NULL, 137, NULL, NULL, NULL);

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
(1, 1, '4ecac173-c7d5-4748-8a3e-cc79cd9de979_DSC06170.JPG'),
(2, 1, '327deded-9e1b-4cd0-8879-fc1ae4c54e14_DSC06137.JPG'),
(3, 1, '941768c7-2ede-450f-8199-cfc6bef74ca3_astronaunt.jpg'),
(4, 2, '9450f2c9-819d-4dba-b0fd-fa7f2f706c96_Screenshot 2025-03-31 151944.png'),
(5, 2, 'b319b679-b4ef-40e3-ba1b-545efda40a3b_Screenshot 2025-03-31 152125.png'),
(6, 2, 'fd8ae3f6-2787-4ab4-a733-7f8aca4b419d_Screenshot 2025-03-31 152200.png'),
(7, 2, '90ae9229-73d0-4735-af8a-4e341a504cec_Screenshot 2025-04-02 084954.png'),
(8, 2, 'be6ce84d-563c-4a9d-b2db-d47768162b0f_Screenshot 2024-12-18 163711.png'),
(9, 21, '4f0efb4e-a28e-446e-8b37-cb598a6650f2_Screenshot (680).png'),
(10, 21, '1cccc0e1-cbb2-4cb7-89bf-39a0e9d766a7_Screenshot (681).png'),
(11, 21, 'dd8d642d-4b53-41b2-8ec0-5762ee7c8aff_Screenshot 2024-12-18 163711.png'),
(12, 21, 'bf2be26b-4d73-4189-a541-7ddee88f653b_Screenshot 2024-12-18 164054.png');

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
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `type`, `start_date`, `end_date`, `status`) VALUES
(2, NULL, NULL, NULL, NULL, 'inactive'),
(3, 'Black Friday 2', 'Percent', '2025-04-12 00:00:00', '2025-05-12 00:00:00', 'inactive'),
(4, 'Black Friday 3', 'Percent', '2025-04-12 00:00:00', '2025-05-12 00:00:00', 'active'),
(8, 'Black Friday 4', 'Percent', '2025-04-12 00:00:00', '2025-05-12 00:00:00', 'inactive'),
(9, 'Black Friday 5', 'Percent', '2025-04-12 00:00:00', '2025-05-12 00:00:00', 'active'),
(10, 'khuyen mai sieu cap vip pro', 'Percent', '2025-04-12 00:00:00', '2025-05-12 00:00:00', 'inactive');

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

--
-- Đang đổ dữ liệu cho bảng `promotion_products`
--

INSERT INTO `promotion_products` (`id`, `product_id`, `promotion_id`, `discount_percent`, `is_active`) VALUES
(1, 1, 3, 30.00, 0),
(2, 2, 3, 20.00, 0),
(3, 3, 3, 35.00, 0),
(4, 4, 3, 30.00, 0),
(5, 1, 4, 30.00, 1),
(6, 2, 4, 20.00, 1),
(7, 3, 4, 35.00, 1),
(8, 4, 4, 30.00, 1),
(9, 5, 8, 30.00, 0),
(10, 6, 8, 20.00, 0),
(11, 7, 8, 35.00, 0),
(12, 8, 8, 30.00, 0),
(13, 5, 9, 30.00, 1),
(14, 6, 9, 20.00, 1),
(15, 7, 9, 35.00, 1),
(16, 8, 9, 30.00, 1),
(20, 11, 10, 30.00, 0),
(21, 12, 10, 20.00, 0),
(22, 13, 10, 35.00, 0),
(23, 14, 10, 30.00, 0);

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
(2, 'user');

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
(1, 'admin', '000000001', '128 la xuan oai', '$2a$10$QdbxpIGJVXyJffqMZr1HweOvuZlkl4mbb/8cH.68giqfTqRtWdyUO', '2025-03-29 12:49:50', '2025-04-20 20:16:13', 1, '2004-02-23', 0, 0, 1, 'thophan357@gmail.com'),
(2, 'admin', '000000002', '128 la xuan oai', '$2a$10$/9upQRdL/c.8mmSRthflb.uvUv.M5iQKP9JVdOSEFqwtsp/XXHXrS', '2025-04-01 21:13:58', '2025-04-01 21:13:58', 1, '2004-02-23', 0, 0, 2, 'thophan753@gmail.com'),
(3, 'adminUser', '000000003', '128 la xuan oai', '$2a$10$jD1gPWMAY0ZF4vo5DRX/TOjvP4P7PMcwFNax04ljH1fVpX8k1by7S', '2025-04-02 22:19:30', '2025-04-02 22:19:30', 1, '2004-02-23', 0, 0, 2, 'ptho9006@gmail.com'),
(4, 'Levo', '000000004', '128 la xuan oai', '$2a$10$IzSEShTF.ZK/VteFL68vl.fmQ0VJfT2kFbylZN8xG.Bnid3y5jDDq', '2025-04-16 22:41:57', '2025-04-16 22:46:05', 1, '2004-02-23', 0, 0, 2, 'n22dccn083@student.ptithcm.edu.vn');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `headphone_specs`
--
ALTER TABLE `headphone_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT cho bảng `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `keyboard_specs`
--
ALTER TABLE `keyboard_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=517;

--
-- AUTO_INCREMENT cho bảng `mouse_specs`
--
ALTER TABLE `mouse_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=293;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=946;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `promotion_products`
--
ALTER TABLE `promotion_products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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

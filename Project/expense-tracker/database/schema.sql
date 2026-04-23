-- Create database
CREATE DATABASE IF NOT EXISTS expense_tracker_db;
USE expense_tracker_db;

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data
INSERT INTO expenses (amount, category, description, date) VALUES
(150.00, 'Food', 'Groceries from BigBazaar', '2026-04-01'),
(500.00, 'Transport', 'Monthly bus pass', '2026-04-02'),
(1200.00, 'Education', 'Online course subscription', '2026-04-05'),
(80.00, 'Food', 'Lunch at canteen', '2026-04-07'),
(300.00, 'Entertainment', 'Movie tickets', '2026-04-10'),
(2000.00, 'Rent', 'Hostel rent share', '2026-04-12'),
(450.00, 'Shopping', 'New notebook and stationery', '2026-04-15'),
(60.00, 'Food', 'Evening snacks', '2026-04-18');

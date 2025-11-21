CREATE DATABASE IF NOT EXISTS lunoxscan

USE lunoxscan;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(355),
    avatar_url VARCHAR(255),
    role ENUM('user', 'admin', 'staff') DEFAULT 'user',
    subscription ENUM('free', 'star1', 'star2', 'star3') DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE mangas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title2 VARCHAR(255) NOT NULL,
    description TEXT,
    cover_url VARCHAR(255),
    views INT DEFAULT 0,
    status ENUM('en_cours', 'terminé', 'abandonné') DEFAULT 'en_cours',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE mangas_genres (
    manga_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (manga_id, genre_id),
    FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    manga_id INT NOT NULL,
    number DECIMAL(5,2) NOT NULL,
    views INT DEFAULT 0,
    lang VARCHAR(10) DEFAULT 'fr',
    page_count INT DEFAULT 0,
    title VARCHAR(255),
    release_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_chapter (manga_id, number, lang),
    FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE
);

CREATE TABLE chapter_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    page_number INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    width INT NULL,
    height INT NULL,
    file_size_bytes INT NULL,
    checksum VARCHAR(64) NULL,
    UNIQUE KEY uniq_page (chapter_id, page_number),
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    manga_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_manga (user_id, manga_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    manga_id INT NOT NULL,
    review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE
);

CREATE INDEX idx_manga_title ON mangas(title);
CREATE INDEX idx_chapters_manga ON chapters(manga_id, number);
CREATE INDEX idx_pages_chapter ON chapter_pages(chapter_id, page_number);

CREATE INDEX idx_ratings_user ON ratings(user_id);
CREATE INDEX idx_ratings_manga ON ratings(manga_id);

CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_manga ON reviews(manga_id);

CREATE INDEX idx_mangas_views ON mangas(views);
CREATE INDEX idx_ratings_value ON ratings(rating);

CREATE INDEX idx_chapters_date ON chapters(manga_id, release_date);

CREATE INDEX idx_reviews_date ON reviews(manga_id, created_at);

ALTER TABLE mangas ADD COLUMN banner_url VARCHAR(255) AFTER cover_url;
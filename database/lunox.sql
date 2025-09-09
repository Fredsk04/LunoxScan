CREATE DATABASE IF NOT EXISTS lunoxscan;

USE lunoxscan;
-- USERS
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','premium','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MANGAS
CREATE TABLE mangas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(150) UNIQUE NOT NULL,             -- pour des URLs propres
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(100),
  cover_image_url VARCHAR(255),                   -- ✅ image de couverture (URL ou chemin)
  status ENUM('ongoing','completed') DEFAULT 'ongoing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- GENRES
CREATE TABLE genres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- M:N mangas <-> genres
CREATE TABLE manga_genres (
  manga_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (manga_id, genre_id),
  FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- CHAPITRES
CREATE TABLE chapters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  manga_id INT NOT NULL,
  number INT NOT NULL,                            -- 1, 2, 3 ...
  title VARCHAR(255),
  volume INT,
  lang VARCHAR(10) DEFAULT 'fr',                  -- pour FR/EN plus tard
  release_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- utile pour premium/embargo
  page_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_chapter (manga_id, number, lang),
  FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE
);

-- PAGES D’UN CHAPITRE
CREATE TABLE chapter_pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chapter_id INT NOT NULL,
  page_number INT NOT NULL,                       -- 1, 2, 3 ...
  image_url VARCHAR(255) NOT NULL,                -- ✅ URL/chemin du fichier
  width INT NULL,
  height INT NULL,
  file_size_bytes INT NULL,
  checksum VARCHAR(64) NULL,                      -- pour vérifier l’intégrité
  UNIQUE KEY uniq_page (chapter_id, page_number),
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);

-- NOTES/AVIS
CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  manga_id INT NOT NULL,
  rating TINYINT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_manga (user_id, manga_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (manga_id) REFERENCES mangas(id) ON DELETE CASCADE
);

ALTER TABLE users
ADD reset_token VARCHAR(255),
ADD reset_expires DATETIME;
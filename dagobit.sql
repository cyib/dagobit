-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 03-Set-2018 às 07:30
-- Versão do servidor: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dagobit`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `friendtype`
--

CREATE TABLE `friendtype` (
  `id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `friendtype`
--

INSERT INTO `friendtype` (`id`, `type`) VALUES
(1, 'Family'),
(2, 'Friend'),
(3, 'Fellow'),
(4, 'Public');

-- --------------------------------------------------------

--
-- Estrutura da tabela `network`
--

CREATE TABLE `network` (
  `id` int(11) NOT NULL,
  `personId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `createDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `network`
--

INSERT INTO `network` (`id`, `personId`, `friendId`, `typeId`, `createDate`) VALUES
(1, 1, 2, 2, '2018-09-03 01:13:39'),
(2, 2, 1, 3, '2018-09-03 01:14:06');

-- --------------------------------------------------------

--
-- Estrutura da tabela `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(400) NOT NULL,
  `description` varchar(255) NOT NULL,
  `nice` int(11) NOT NULL DEFAULT '0',
  `comment` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL,
  `audienceId` int(11) NOT NULL,
  `createDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `post`
--

INSERT INTO `post` (`id`, `userId`, `content`, `description`, `nice`, `comment`, `type`, `audienceId`, `createDate`, `updateDate`) VALUES
(1, 2, '../assets/content/1.png', 'Eu programando de noite!', 2, 0, 1, 4, '2018-08-20 15:22:20', '2018-08-20 15:22:20'),
(2, 1, '../assets/content/2.jpg', 'With great power comes great responsibility', 1, 4, 1, 4, '2018-08-20 15:23:18', '2018-08-20 15:23:18'),
(3, 2, 'O Xlr8 é mais rápido que o flash!', '', 1, 3, 2, 4, '2018-08-20 15:24:04', '2018-08-20 15:24:04');

-- --------------------------------------------------------

--
-- Estrutura da tabela `posttype`
--

CREATE TABLE `posttype` (
  `id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `posttype`
--

INSERT INTO `posttype` (`id`, `type`) VALUES
(1, 'PHOTO'),
(2, 'TEXT');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `nick` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `profile` varchar(255) NOT NULL DEFAULT '../assets/content/profiles/new.png',
  `followers` int(11) NOT NULL DEFAULT '0',
  `following` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `mail`, `pass`, `nick`, `age`, `profile`, `followers`, `following`) VALUES
(1, 'Henry Dagobit', 'henrydagobit@gmail.com', 'pass', 'henry', 19, '../assets/content/profiles/1.png', 10, 0),
(2, 'Lucas Borges', 'lucas@gmail.com', 'senha', 'lucas', 18, '../assets/content/profiles/new.png', 5, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friendtype`
--
ALTER TABLE `friendtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `network`
--
ALTER TABLE `network`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personId` (`personId`),
  ADD KEY `friendId` (`friendId`),
  ADD KEY `typeId` (`typeId`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `audienceId` (`audienceId`),
  ADD KEY `typeId` (`type`);

--
-- Indexes for table `posttype`
--
ALTER TABLE `posttype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friendtype`
--
ALTER TABLE `friendtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `network`
--
ALTER TABLE `network`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posttype`
--
ALTER TABLE `posttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `network`
--
ALTER TABLE `network`
  ADD CONSTRAINT `network_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `network_ibfk_2` FOREIGN KEY (`friendId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `network_ibfk_3` FOREIGN KEY (`typeId`) REFERENCES `friendtype` (`id`);

--
-- Limitadores para a tabela `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`audienceId`) REFERENCES `friendtype` (`id`),
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`type`) REFERENCES `posttype` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

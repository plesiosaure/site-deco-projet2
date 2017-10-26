-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'Appartement 50 m2','Cet appartement a été entièrement rénové','2017-10-26 16:26:36'),(2,1,'Appartement 50 m2','Cet appartement a été entièrement rénové','2017-10-26 16:26:50'),(3,1,'Appartement 50 m2','Cet appartement a été entièrement rénové','2017-10-26 16:26:53'),(4,1,'Appartement 50 m2','Cet appartement a été entièrement rénové','2017-10-26 16:26:54'),(5,1,'Appartement 50 m2','Cet appartement a été entièrement rénové','2017-10-26 16:26:59'),(6,1,'Appartement 50 m2','Cet appartement a été entièrement rénové','2017-10-26 16:27:00'),(7,1,'Le Figaro Madame','Rubrique immobilier','2017-10-26 16:27:01'),(8,1,'Le Figaro Madame','Rubrique immobilier','2017-10-26 16:27:03'),(9,1,'Le Figaro Madame','Rubrique immobilier','2017-10-26 16:27:04'),(10,1,'Le Figaro Madame','Rubrique immobilier','2017-10-26 16:27:07');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `article_has_category`
--

LOCK TABLES `article_has_category` WRITE;
/*!40000 ALTER TABLE `article_has_category` DISABLE KEYS */;
INSERT INTO `article_has_category` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,2),(8,2),(9,2),(10,2);
/*!40000 ALTER TABLE `article_has_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Réalisations'),(2,'Articles de presse');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `key`
--

LOCK TABLES `key` WRITE;
/*!40000 ALTER TABLE `key` DISABLE KEYS */;
/*!40000 ALTER TABLE `key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',1),(2,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',1),(3,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',1),(4,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',2),(5,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',2),(6,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',3),(7,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',3),(8,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',4),(9,'img','','légeCeci est une imagende','vign_real_img2.jpg','real_img2.jpg',4),(10,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',4),(11,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',5),(12,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',5),(13,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',6),(14,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',6),(15,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',6),(16,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',1),(17,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',2),(18,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',3),(19,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',7),(20,'pdf','','Ceci est un pdf','vign_real_img2.jpg','lefigaromadamepdf',8),(21,'video','http://www.youtube.com/fff','Ceci est une vidéo','vign_real_img2.jpg','',9),(22,'img','','Ceci est une image','vign_real_img2.jpg','real_img2.jpg',10);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','123','alexis.ducerf@homesweethome.com',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-26 17:14:33

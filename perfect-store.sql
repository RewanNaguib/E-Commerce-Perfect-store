-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: perfect_store
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `img` varchar(255) NOT NULL,
  `category` enum('women','men') NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Denim Jacket',50,'item1.jpg','women',100,'Contrast logo denim jacket'),(2,'Pastel pullover',50,'item2.jpg','women',100,'oversized long sleeves'),(3,'Powder rose pullover',50,'item3.jpg','women',100,'Comfy long sleeves'),(4,'Angelic white pullover',50,'item4.jpg','women',100,'puffy long sleeves'),(5,'Black Pullover',100,'item5.jpg','men',100,'Long sleeve mock neck'),(6,'Disney Sweatshirt',80,'item7.jpg','men',100,'Basic regular sweatshirt'),(7,'Graphic Black SweetShirt',70,'item8.jpg','men',100,'Comfy Hoodie'),(9,'Dark Blue Jeans',100,'item6.jpg','men',99,'Regular Fit Jeans');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('cS4T5ltvS0n33C60FXoCJJaeeLxclO8O',1613933784,'{\"cookie\":{\"originalMaxAge\":10799999,\"expires\":\"2021-02-21T18:56:24.477Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedin\":true,\"username\":\"admin\",\"password\":\"admin\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ASakr2','123','ASakr@gmail','smoha3'),(2,'ahmed','456','ahmed@gmail','smoha'),(3,'Amira Sakr','P@ssw0rd','amira.21sakr@gmail.com','Smoha,compound grandville'),(4,'Ahmed Sakr','1111','ahmed.sakr.as6@gmail.com','test'),(5,'s','s','s@mm','s'),(6,'s','s','s@mm','s'),(7,'s','s','s@mm','s'),(8,'mariam','123','mariam@gmail.com','test'),(9,'test','test','test@test.com','test'),(10,'test1','test1','test1@test1.com','test1'),(11,'test2','test2','test2@tst2.com','test2'),(12,'test3 updated','test3','test3@test3.com','test3'),(13,'test4 test','test4','test4@tst4.com','test4'),(14,'test4 test','test4','test4@tst4.com','test4'),(15,'test4 test','test4','test4@tst4.com','test4'),(16,'test5_test','test5','test5@test5.com','test5'),(17,'test6_test','test6','test6@test6.com','test6'),(18,'test7_test','test7','test7@test7.com','test7_test'),(19,'test7_test','test7','test7@test7','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-21 19:55:35

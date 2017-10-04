-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: mcrdb
-- ------------------------------------------------------
-- Server version	5.7.10-log

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
-- Table structure for table `acao_log`
--

DROP TABLE IF EXISTS `acao_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acao_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='INCLUIR/ALTERAR/DESATIVAR';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acao_log`
--

LOCK TABLES `acao_log` WRITE;
/*!40000 ALTER TABLE `acao_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `acao_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinica`
--

DROP TABLE IF EXISTS `clinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_fantasia` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `cnpj` varchar(17) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `razao_social` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinica`
--

LOCK TABLES `clinica` WRITE;
/*!40000 ALTER TABLE `clinica` DISABLE KEYS */;
INSERT INTO `clinica` VALUES (1,'Clinica Médica',NULL,'123456789',1,'Clinica LTDA','clinica@clinica.com.br'),(2,'CLINICA MAE','CLINICA ESTÉTICA',NULL,1,'CLINICA MAE LTDA',NULL),(3,'Clinica Testeira',NULL,'123456789',1,'Teste LTDA','teste@teste.com.br'),(4,'GABIRU VACILAO',NULL,NULL,1,'GABIRU',NULL);
/*!40000 ALTER TABLE `clinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinica_convenio`
--

DROP TABLE IF EXISTS `clinica_convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinica_convenio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_clinica` int(11) NOT NULL,
  `id_convenio` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_clinica` (`id_clinica`),
  KEY `id_convenio` (`id_convenio`),
  CONSTRAINT `clinica_convenio_ibfk_1` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `clinica_convenio_ibfk_2` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinica_convenio`
--

LOCK TABLES `clinica_convenio` WRITE;
/*!40000 ALTER TABLE `clinica_convenio` DISABLE KEYS */;
INSERT INTO `clinica_convenio` VALUES (9,1,1,1),(10,4,4,1);
/*!40000 ALTER TABLE `clinica_convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinica_medicos`
--

DROP TABLE IF EXISTS `clinica_medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinica_medicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_clinica` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_clinica` (`id_clinica`),
  KEY `id_medico` (`id_medico`),
  CONSTRAINT `clinica_medicos_ibfk_1` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `clinica_medicos_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinica_medicos`
--

LOCK TABLES `clinica_medicos` WRITE;
/*!40000 ALTER TABLE `clinica_medicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinica_medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenio`
--

DROP TABLE IF EXISTS `convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `convenio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenio`
--

LOCK TABLES `convenio` WRITE;
/*!40000 ALTER TABLE `convenio` DISABLE KEYS */;
INSERT INTO `convenio` VALUES (1,'Medial Saúde',1),(2,'Almint',0),(3,'teste',1),(4,'Sulamerica',1),(5,'Medial Saúde',0),(6,'BRADESCO',1),(7,'Medial Saúde',1);
/*!40000 ALTER TABLE `convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenio_paciente`
--

DROP TABLE IF EXISTS `convenio_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `convenio_paciente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_convenio` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `matricula` varchar(100) DEFAULT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  `valor_consulta` decimal(10,2) NOT NULL,
  `id_plano` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_convenio_convenio_paciente_fk_idx` (`id_convenio`),
  KEY `id_pessoa_convenio_paciente_fk_idx` (`id_pessoa`),
  KEY `id_plano_convenio_paciente_idx` (`id_plano`),
  CONSTRAINT `id_convenio_convenio_paciente_fk` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_pessoa_convenio_paciente_fk` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_plano_convenio_paciente` FOREIGN KEY (`id_plano`) REFERENCES `plano` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenio_paciente`
--

LOCK TABLES `convenio_paciente` WRITE;
/*!40000 ALTER TABLE `convenio_paciente` DISABLE KEYS */;
INSERT INTO `convenio_paciente` VALUES (8,4,10,'213',1,2.31,5);
/*!40000 ALTER TABLE `convenio_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenio_plano`
--

DROP TABLE IF EXISTS `convenio_plano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `convenio_plano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_convenio` int(11) DEFAULT NULL,
  `id_plano` int(11) DEFAULT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `convenio_plano_id_convenio_fk_idx` (`id_convenio`),
  KEY `conveni_plano_id_plano_fk_idx` (`id_plano`),
  CONSTRAINT `conveni_plano_id_plano_fk` FOREIGN KEY (`id_plano`) REFERENCES `plano` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `convenio_plano_id_convenio_fk` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenio_plano`
--

LOCK TABLES `convenio_plano` WRITE;
/*!40000 ALTER TABLE `convenio_plano` DISABLE KEYS */;
INSERT INTO `convenio_plano` VALUES (1,1,7,1),(2,1,8,1),(3,1,3,1),(4,1,8,1),(5,1,6,1),(6,4,5,1),(7,4,10,1),(8,4,11,1),(9,6,5,1),(10,6,10,1),(11,6,11,1);
/*!40000 ALTER TABLE `convenio_plano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenio_plano_tabela`
--

DROP TABLE IF EXISTS `convenio_plano_tabela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `convenio_plano_tabela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_convenio_plano` int(11) NOT NULL,
  `id_tabela` int(11) NOT NULL,
  `multiplos` float DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `conv_plan_id_idx` (`id_convenio_plano`),
  KEY `fk_prod_conv_plan_idx` (`id_tabela`),
  CONSTRAINT `conv_plan_id` FOREIGN KEY (`id_convenio_plano`) REFERENCES `convenio_plano` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prod_conv_plan` FOREIGN KEY (`id_tabela`) REFERENCES `tabelas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenio_plano_tabela`
--

LOCK TABLES `convenio_plano_tabela` WRITE;
/*!40000 ALTER TABLE `convenio_plano_tabela` DISABLE KEYS */;
INSERT INTO `convenio_plano_tabela` VALUES (1,2,3,0.05,1),(2,1,1,0.01,1),(3,6,2,0.1,1);
/*!40000 ALTER TABLE `convenio_plano_tabela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(150) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'Rua Giussepe Tartini','04844300','Jardim São Bernado','São Paulo','SP');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco_clinica`
--

DROP TABLE IF EXISTS `endereco_clinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco_clinica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_endereco` int(11) NOT NULL,
  `id_clinicia` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `id_tipo_endereco` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_endereco` (`id_endereco`),
  KEY `id_clinicia` (`id_clinicia`),
  KEY `id_tipo_endereco_idx` (`id_tipo_endereco`),
  CONSTRAINT `endereco_clinica_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `endereco_clinica_ibfk_2` FOREIGN KEY (`id_clinicia`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_tipo_endereco` FOREIGN KEY (`id_tipo_endereco`) REFERENCES `tipo_endereco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco_clinica`
--

LOCK TABLES `endereco_clinica` WRITE;
/*!40000 ALTER TABLE `endereco_clinica` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco_clinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco_convenio`
--

DROP TABLE IF EXISTS `endereco_convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco_convenio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_endereco` int(11) NOT NULL,
  `id_convenio` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `id_tipo_endereco` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_endereco` (`id_endereco`),
  KEY `id_convenio` (`id_convenio`),
  KEY `id_tipo_endereco_idx` (`id_tipo_endereco`),
  CONSTRAINT `endereco_convenio_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `endereco_convenio_ibfk_2` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `endereco_convenio_tipo_endereco` FOREIGN KEY (`id_tipo_endereco`) REFERENCES `tipo_endereco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco_convenio`
--

LOCK TABLES `endereco_convenio` WRITE;
/*!40000 ALTER TABLE `endereco_convenio` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco_convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco_pessoa`
--

DROP TABLE IF EXISTS `endereco_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco_pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_endereco` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `id_tipo_endereco` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_endereco` (`id_endereco`),
  KEY `id_pessoa` (`id_pessoa`),
  KEY `tipo_endereco_pessoa_idx` (`id_tipo_endereco`),
  CONSTRAINT `endereco_pessoa_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `endereco_pessoa_ibfk_2` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tipo_endereco_pessoa` FOREIGN KEY (`id_tipo_endereco`) REFERENCES `tipo_endereco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco_pessoa`
--

LOCK TABLES `endereco_pessoa` WRITE;
/*!40000 ALTER TABLE `endereco_pessoa` DISABLE KEYS */;
INSERT INTO `endereco_pessoa` VALUES (2,1,6,'15','bloco a5',1),(3,1,10,'2',NULL,1),(4,1,14,'11','apto.',1),(5,1,16,'123',NULL,1);
/*!40000 ALTER TABLE `endereco_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faturamento`
--

DROP TABLE IF EXISTS `faturamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faturamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_status` int(11) NOT NULL,
  `data_criacao` datetime NOT NULL,
  `data_fechamento` datetime DEFAULT NULL,
  `id_clinica` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`),
  KEY `id_clinica` (`id_clinica`),
  CONSTRAINT `faturamento_ibfk_1` FOREIGN KEY (`id_status`) REFERENCES `status_faturamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `faturamento_ibfk_2` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faturamento`
--

LOCK TABLES `faturamento` WRITE;
/*!40000 ALTER TABLE `faturamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `faturamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faturamento_previa`
--

DROP TABLE IF EXISTS `faturamento_previa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faturamento_previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_faturamento` int(11) NOT NULL,
  `id_previa` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `data_pgto` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_faturamento` (`id_faturamento`),
  KEY `id_previa` (`id_previa`),
  CONSTRAINT `faturamento_previa_ibfk_1` FOREIGN KEY (`id_faturamento`) REFERENCES `faturamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `faturamento_previa_ibfk_2` FOREIGN KEY (`id_previa`) REFERENCES `previa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faturamento_previa`
--

LOCK TABLES `faturamento_previa` WRITE;
/*!40000 ALTER TABLE `faturamento_previa` DISABLE KEYS */;
/*!40000 ALTER TABLE `faturamento_previa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logging`
--

DROP TABLE IF EXISTS `logging`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logging` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_acao` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `id_tabela` int(11) NOT NULL,
  `id_registro` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_acao` (`id_acao`),
  KEY `id_tabela` (`id_tabela`),
  CONSTRAINT `logging_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `logging_ibfk_2` FOREIGN KEY (`id_acao`) REFERENCES `acao_log` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `logging_ibfk_3` FOREIGN KEY (`id_tabela`) REFERENCES `tabela_log` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logging`
--

LOCK TABLES `logging` WRITE;
/*!40000 ALTER TABLE `logging` DISABLE KEYS */;
/*!40000 ALTER TABLE `logging` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'Nível 1',NULL),(2,'Nível 2',NULL),(3,'Nível 3',NULL),(4,'Nível 4',NULL),(5,'Nível 5',NULL);
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_pessoa` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(100) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `email` varchar(100) CHARACTER SET armscii8 DEFAULT NULL,
  `crm` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `dt_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_nascimento` date DEFAULT NULL,
  `nome_mae` varchar(100) DEFAULT NULL,
  `nome_empresa` varchar(10) DEFAULT NULL,
  `observacao` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_pessoa` (`id_tipo_pessoa`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `pessoa_ibfk_1` FOREIGN KEY (`id_tipo_pessoa`) REFERENCES `tipo_pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pessoa_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (6,1,1,'Rafael','Lemes','36097269897','rafael.ads09@gmail.com',NULL,1,'2016-03-19 11:26:52',NULL,NULL,NULL,NULL),(7,1,NULL,'Juliana','Lemes','123456','juliana@lemes.com.br',NULL,1,'2016-03-19 11:28:57',NULL,NULL,NULL,NULL),(8,1,NULL,'Renato','Castro',NULL,'renato@castro.com.br',NULL,1,'2016-03-19 17:50:55',NULL,NULL,NULL,NULL),(9,1,2,'Luciano','MCR 2',NULL,'luciano@mcr.com.br',NULL,1,'2016-03-19 17:53:22',NULL,NULL,NULL,NULL),(10,2,NULL,'PACIENTE DOENTÃO DA SILVA','Doente','36097269897','EMAIL@EMAIL.COM',NULL,1,'2016-03-29 20:56:46','1988-09-08','MARIA DOENTE','EMPRESA',NULL),(11,3,NULL,'Médico','Teste',NULL,NULL,'123456',1,'2016-03-29 21:54:07',NULL,NULL,NULL,NULL),(12,3,NULL,'Médico 2','Teste',NULL,NULL,NULL,1,'2016-03-29 21:56:45',NULL,NULL,NULL,NULL),(13,3,NULL,'Médico 3','tes',NULL,NULL,NULL,1,'2016-03-29 21:58:12',NULL,NULL,NULL,NULL),(14,3,NULL,'Médico 4','teste CRM',NULL,NULL,'5648795',1,'2016-03-29 22:47:13',NULL,NULL,NULL,NULL),(15,2,NULL,'DOENTE DA SILVA','Tenso','36097269897','TESTE@EMAIL.COM',NULL,1,'2016-03-30 18:58:19','1988-09-08','DONA ZUADA',NULL,NULL),(16,1,NULL,'Luciano',NULL,'14847666879',NULL,NULL,1,'2016-03-31 19:43:55',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plano`
--

DROP TABLE IF EXISTS `plano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plano`
--

LOCK TABLES `plano` WRITE;
/*!40000 ALTER TABLE `plano` DISABLE KEYS */;
INSERT INTO `plano` VALUES (1,'Top Nacional','Top é só no nome mesmo',1),(2,'FAKE TOP','Só parece top',1),(3,'BASICÃO 2','HUE BR',1),(4,'Exato',NULL,1),(5,'BASICO',NULL,1),(6,'Classico',NULL,1),(7,'TESTE RAFAEL','DESCRIÇÃO MAROTA',1),(8,'ENGANAÇÃO','HUE HUE BR',1),(9,'PLANO SAFADÃO','HUE',1),(10,'ESPECIAL',NULL,1),(11,'EXECUTIVO',NULL,1);
/*!40000 ALTER TABLE `plano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `previa`
--

DROP TABLE IF EXISTS `previa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_previa` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `id_convenio` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observacao` varchar(200) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_tipo_previa` (`id_tipo_previa`),
  KEY `id_clinica` (`id_clinica`),
  KEY `id_pessoa` (`id_pessoa`),
  KEY `id_convenio` (`id_convenio`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `previa_ibfk_1` FOREIGN KEY (`id_tipo_previa`) REFERENCES `tipo_previa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `previa_ibfk_2` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `previa_ibfk_3` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `previa_ibfk_4` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `previa_ibfk_5` FOREIGN KEY (`id_status`) REFERENCES `status_previa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `previa`
--

LOCK TABLES `previa` WRITE;
/*!40000 ALTER TABLE `previa` DISABLE KEYS */;
INSERT INTO `previa` VALUES (1,1,1,10,1,1,'2016-10-18 14:09:43',NULL,1),(2,2,1,15,2,1,'2016-10-18 14:09:43',NULL,1);
/*!40000 ALTER TABLE `previa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `previa_tabelas`
--

DROP TABLE IF EXISTS `previa_tabelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `previa_tabelas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tabelas` int(11) NOT NULL,
  `id_previa` int(11) NOT NULL,
  `valor` double NOT NULL,
  `observacao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_previa` (`id_previa`),
  KEY `previa_tabelas_ibfk_1` (`id_tabelas`),
  CONSTRAINT `previa_tabelas_ibfk_1` FOREIGN KEY (`id_tabelas`) REFERENCES `tabelas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `previa_tabelas_ibfk_2` FOREIGN KEY (`id_previa`) REFERENCES `previa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `previa_tabelas`
--

LOCK TABLES `previa_tabelas` WRITE;
/*!40000 ALTER TABLE `previa_tabelas` DISABLE KEYS */;
/*!40000 ALTER TABLE `previa_tabelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_faturamento`
--

DROP TABLE IF EXISTS `status_faturamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_faturamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_faturamento`
--

LOCK TABLES `status_faturamento` WRITE;
/*!40000 ALTER TABLE `status_faturamento` DISABLE KEYS */;
INSERT INTO `status_faturamento` VALUES (1,'Faturamento','Ordem de Recebimento'),(2,'Adiado','Pagamento adiado'),(3,'Recebido',NULL);
/*!40000 ALTER TABLE `status_faturamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_previa`
--

DROP TABLE IF EXISTS `status_previa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_previa`
--

LOCK TABLES `status_previa` WRITE;
/*!40000 ALTER TABLE `status_previa` DISABLE KEYS */;
INSERT INTO `status_previa` VALUES (1,'Aberto','Aguardando Pagamento Convênio'),(2,'Fechado','Pago pelo Convênio');
/*!40000 ALTER TABLE `status_previa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabela_log`
--

DROP TABLE IF EXISTS `tabela_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tabela_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Nome da TABELA (Para agilizar o desenvolvimento) ->\nCadastro';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabela_log`
--

LOCK TABLES `tabela_log` WRITE;
/*!40000 ALTER TABLE `tabela_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabela_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabelas`
--

DROP TABLE IF EXISTS `tabelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tabelas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_amb` varchar(20) DEFAULT NULL,
  `codigo_tus` varchar(20) DEFAULT NULL,
  `descricao` varchar(150) DEFAULT NULL,
  `qtd_ch` int(11) DEFAULT NULL,
  `porte` int(11) DEFAULT NULL,
  `porte_ch` int(11) DEFAULT NULL,
  `m2_filme` double DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `numero` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabelas`
--

LOCK TABLES `tabelas` WRITE;
/*!40000 ALTER TABLE `tabelas` DISABLE KEYS */;
INSERT INTO `tabelas` VALUES (1,'000123456',NULL,'APENAS PARA TESTE D',5,NULL,NULL,NULL,1,123),(2,'009876543',NULL,'HuE HUE',123456,0,NULL,1.23,1,321),(3,'00010014','10101012','Consulta',50,NULL,NULL,NULL,1,456),(4,'123456789','1231223','TESTE NÚMERO',123,123,123,12312.31,1,789);
/*!40000 ALTER TABLE `tabelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone`
--

DROP TABLE IF EXISTS `telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(11) NOT NULL,
  `id_tipo_telefone` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_telefone_idx` (`id_tipo_telefone`),
  CONSTRAINT `id_tipo_telefone` FOREIGN KEY (`id_tipo_telefone`) REFERENCES `tipo_telefone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
INSERT INTO `telefone` VALUES (1,'11963696902',3),(2,'11963696902',3),(7,'11963696666',1),(8,'1159713572',1),(9,'1159713572',1),(10,'1159713572',1),(11,'11999483674',3);
/*!40000 ALTER TABLE `telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone_clinica`
--

DROP TABLE IF EXISTS `telefone_clinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefone_clinica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_telefone` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_telefone` (`id_telefone`),
  KEY `id_clinica` (`id_clinica`),
  CONSTRAINT `telefone_clinica_ibfk_1` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `telefone_clinica_ibfk_2` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone_clinica`
--

LOCK TABLES `telefone_clinica` WRITE;
/*!40000 ALTER TABLE `telefone_clinica` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefone_clinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone_convenio`
--

DROP TABLE IF EXISTS `telefone_convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefone_convenio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_telefone` int(11) NOT NULL,
  `id_convenio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_telefone` (`id_telefone`),
  KEY `id_convenio` (`id_convenio`),
  CONSTRAINT `telefone_convenio_ibfk_1` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `telefone_convenio_ibfk_2` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone_convenio`
--

LOCK TABLES `telefone_convenio` WRITE;
/*!40000 ALTER TABLE `telefone_convenio` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefone_convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone_pessoa`
--

DROP TABLE IF EXISTS `telefone_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefone_pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pessoa` int(11) NOT NULL,
  `id_telefone` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pessoa` (`id_pessoa`),
  KEY `id_telefone` (`id_telefone`),
  CONSTRAINT `telefone_pessoa_ibfk_1` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `telefone_pessoa_ibfk_2` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone_pessoa`
--

LOCK TABLES `telefone_pessoa` WRITE;
/*!40000 ALTER TABLE `telefone_pessoa` DISABLE KEYS */;
INSERT INTO `telefone_pessoa` VALUES (1,6,2),(6,10,7),(7,14,8),(8,15,9),(9,11,10),(10,16,11);
/*!40000 ALTER TABLE `telefone_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_endereco`
--

DROP TABLE IF EXISTS `tipo_endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_endereco`
--

LOCK TABLES `tipo_endereco` WRITE;
/*!40000 ALTER TABLE `tipo_endereco` DISABLE KEYS */;
INSERT INTO `tipo_endereco` VALUES (1,'Comercial',NULL),(2,'Residencial',NULL);
/*!40000 ALTER TABLE `tipo_endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pessoa`
--

DROP TABLE IF EXISTS `tipo_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Funcionário/Paciente/Médico';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pessoa`
--

LOCK TABLES `tipo_pessoa` WRITE;
/*!40000 ALTER TABLE `tipo_pessoa` DISABLE KEYS */;
INSERT INTO `tipo_pessoa` VALUES (1,'Funcionário',NULL),(2,'Paciente',NULL),(3,'Médico',NULL);
/*!40000 ALTER TABLE `tipo_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_previa`
--

DROP TABLE IF EXISTS `tipo_previa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_previa`
--

LOCK TABLES `tipo_previa` WRITE;
/*!40000 ALTER TABLE `tipo_previa` DISABLE KEYS */;
INSERT INTO `tipo_previa` VALUES (1,'Ambulatorial',NULL),(2,'Internato',NULL);
/*!40000 ALTER TABLE `tipo_previa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_telefone`
--

DROP TABLE IF EXISTS `tipo_telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_telefone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_telefone`
--

LOCK TABLES `tipo_telefone` WRITE;
/*!40000 ALTER TABLE `tipo_telefone` DISABLE KEYS */;
INSERT INTO `tipo_telefone` VALUES (1,'Residêncial',NULL),(2,'Comercial',NULL),(3,'Celular',NULL);
/*!40000 ALTER TABLE `tipo_telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `senha` varchar(20) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `id_perfil` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_perfil` (`id_perfil`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'rafa.lemes','123',1,2),(2,'luciano','1234',1,3),(3,'renato','789',1,3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mcrdb'
--

--
-- Dumping routines for database 'mcrdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-28 22:52:17

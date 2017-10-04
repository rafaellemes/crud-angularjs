CREATE TABLE `acao_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='INCLUIR/ALTERAR/DESATIVAR';

CREATE TABLE `clinica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_fantasia` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `cnpj` varchar(17) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `razao_social` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `clinica_convenio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_clinica` int(11) NOT NULL,
  `id_convenio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_clinica` (`id_clinica`),
  KEY `id_convenio` (`id_convenio`),
  CONSTRAINT `clinica_convenio_ibfk_1` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `clinica_convenio_ibfk_2` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `convenio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(150) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

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

CREATE TABLE `perfil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

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

CREATE TABLE `pessoa_plano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_plano` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_plano` (`id_plano`),
  KEY `id_pessoa` (`id_pessoa`),
  CONSTRAINT `pessoa_plano_ibfk_1` FOREIGN KEY (`id_plano`) REFERENCES `plano` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pessoa_plano_ibfk_2` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `plano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `id_convenio` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_convenio` (`id_convenio`),
  CONSTRAINT `plano_ibfk_1` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `plano_produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_plano` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_plano` (`id_plano`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `plano_produto_ibfk_1` FOREIGN KEY (`id_plano`) REFERENCES `plano` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plano_produto_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_previa` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `id_convenio` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `observacao` varchar(200) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `previa_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produtos` int(11) NOT NULL,
  `id_previa` int(11) NOT NULL,
  `valor` double NOT NULL,
  `observacao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produtos` (`id_produtos`),
  KEY `id_previa` (`id_previa`),
  CONSTRAINT `previa_produtos_ibfk_1` FOREIGN KEY (`id_produtos`) REFERENCES `produtos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `previa_produtos_ibfk_2` FOREIGN KEY (`id_previa`) REFERENCES `previa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_amb` varchar(20) DEFAULT NULL,
  `codigo_tus` varchar(20) DEFAULT NULL,
  `descricao` varchar(150) DEFAULT NULL,
  `qtd_ch` int(11) DEFAULT NULL,
  `porte` int(11) DEFAULT NULL,
  `porte_ch` int(11) DEFAULT NULL,
  `m2_filme` double DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `status_faturamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `status_previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tabela_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Nome da TABELA (Para agilizar o desenvolvimento) ->\nCadastro';

CREATE TABLE `telefone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(11) NOT NULL,
  `id_tipo_telefone` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_telefone_idx` (`id_tipo_telefone`),
  CONSTRAINT `id_tipo_telefone` FOREIGN KEY (`id_tipo_telefone`) REFERENCES `tipo_telefone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

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

CREATE TABLE `tipo_endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `tipo_pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Funcionário/Paciente/Médico';

CREATE TABLE `tipo_previa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tipo_telefone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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

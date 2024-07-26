# README para Tabela `todo`

## Descrição

Este documento fornece uma visão geral sobre a tabela `todo` que armazena informações sobre tarefas. A tabela `todo` foi criada para suportar operações CRUD (Create, Read, Update, Delete) em um sistema de gerenciamento de tarefas.

## Estrutura da Tabela

A tabela `todo` é definida com a seguinte estrutura:

```sql
CREATE TABLE `todo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `completed` TINYINT(1) NOT NULL,
  `date_conclusion` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

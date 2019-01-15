SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`User` (
  `userID` INT NOT NULL ,
  `userName` VARCHAR(45) NULL ,
  `userPassword` VARCHAR(45) NULL ,
  PRIMARY KEY (`userID`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Patient`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`Patient` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `firstName` VARCHAR(45) NULL ,
  `lastName` VARCHAR(45) NULL ,
  `mobile` VARCHAR(45) NULL ,
  `gender` VARCHAR(45) NULL ,
  `email` VARCHAR(45) NULL ,
  `note` TEXT NULL ,
  `storageID` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Procedure`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`Procedure` (
  `id` INT NOT NULL ,
  `note` TEXT NULL ,
  `price` VARCHAR(45) NULL ,
  `PatientID` INT NOT NULL ,
  `date` TIMESTAMP NULL ,
  `storageID` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Procedure_Patient_idx` (`PatientID` ASC) ,
  CONSTRAINT `fk_Procedure_Patient`
    FOREIGN KEY (`PatientID` )
    REFERENCES `mydb`.`Patient` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mydb` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

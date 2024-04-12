-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loginid` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phones` VARCHAR(191) NULL,
    `isDel` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME NOT NULL DEFAULT now(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `User_loginid_key`(`loginid`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phones_key`(`phones`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserHaderImg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `userHaderImgUrl` VARCHAR(191) NOT NULL,
    `isDel` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME NOT NULL DEFAULT now(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhotoCollectionInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `photoName` VARCHAR(191) NOT NULL,
    `photoDes` VARCHAR(191) NULL,
    `isDel` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME NOT NULL DEFAULT now(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhotosList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `photoCollectionId` INTEGER NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `photoShootTime` VARCHAR(191) NULL,
    `isDel` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME NOT NULL DEFAULT now(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhotoCollectionMange` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `photoCollectionId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT now(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserHaderImg` ADD CONSTRAINT `UserHaderImg_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhotoCollectionInfo` ADD CONSTRAINT `PhotoCollectionInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhotosList` ADD CONSTRAINT `PhotosList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhotosList` ADD CONSTRAINT `PhotosList_photoCollectionId_fkey` FOREIGN KEY (`photoCollectionId`) REFERENCES `PhotoCollectionInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

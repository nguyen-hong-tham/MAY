-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "aiDescription" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "iceLevel" INTEGER,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "sugarLevel" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "aiDescription" TEXT,
ADD COLUMN     "caffeine" BOOLEAN,
ADD COLUMN     "calories" INTEGER,
ADD COLUMN     "flavorTags" TEXT[],
ADD COLUMN     "protein" DOUBLE PRECISION,
ADD COLUMN     "sweetnessDefault" INTEGER;

-- AlterTable
ALTER TABLE "Topping" ADD COLUMN     "caffeine" BOOLEAN,
ADD COLUMN     "calories" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "flavorTags" TEXT[],
ADD COLUMN     "isHealthy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "protein" DOUBLE PRECISION;

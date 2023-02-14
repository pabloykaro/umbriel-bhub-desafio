-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "personal_phone" VARCHAR(255) NOT NULL,
    "personal_address" VARCHAR(255) NOT NULL,
    "status_account" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "cnpj_number" VARCHAR(255) NOT NULL,
    "cnpj_address" VARCHAR(255) NOT NULL,
    "cnpj_phone" VARCHAR(255) NOT NULL,
    "declared_billing" DECIMAL(65,30) NOT NULL,
    "status_company" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_subscribers" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "theme_content" VARCHAR(255) NOT NULL,
    "status_subscriber" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "club_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_number_key" ON "companies"("cnpj_number");

-- CreateIndex
CREATE UNIQUE INDEX "club_subscribers_email_theme_content_key" ON "club_subscribers"("email", "theme_content");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_subscribers" ADD CONSTRAINT "club_subscribers_email_fkey" FOREIGN KEY ("email") REFERENCES "clients"("email") ON DELETE CASCADE ON UPDATE CASCADE;

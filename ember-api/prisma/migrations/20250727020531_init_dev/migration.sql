-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "favorited" BOOLEAN NOT NULL DEFAULT false,
    "gitEnabled" BOOLEAN NOT NULL DEFAULT false,
    "githubEnabled" BOOLEAN NOT NULL DEFAULT false,
    "cloudflareEnabled" BOOLEAN NOT NULL DEFAULT false,
    "prismaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "database" TEXT NOT NULL DEFAULT '',
    "githubRepo" TEXT NOT NULL DEFAULT '',
    "cloudflarePage" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "editor" TEXT NOT NULL DEFAULT '',
    "githubProfile" TEXT NOT NULL DEFAULT '',
    "cloudflareProfile" TEXT NOT NULL DEFAULT '',
    "renderProfile" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Database" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "projectDir" TEXT NOT NULL DEFAULT 'workspace/ember/ember-projects',
    "scriptsDir" TEXT NOT NULL DEFAULT 'workspace/ember/ember-scripts',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CREATE DATABASE "shortly";

CREATE TABLE "usuarios" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"linksCount" integer DEFAULT '0',
	"createdAt" DATE DEFAULT NOW(),
	CONSTRAINT "usuarios_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessoes" (
	"id" serial NOT NULL,
	"usuarioId" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" DATE DEFAULT NOW(),
	CONSTRAINT "sessoes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "links" (
	"id" serial NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"visitCount" integer DEFAULT '0',
	"usuarioId" integer NOT NULL,
	"createdAt" DATE DEFAULT NOW(),
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_fk0" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id");

ALTER TABLE "links" ADD CONSTRAINT "links_fk0" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id");
-- CREATE DATABASE "shortly";

CREATE TABLE "public.usuarios" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"linksCount" integer NOT NULL DEFAULT '0',
	"createdAt" DATE DEFAULT NOW(),
	CONSTRAINT "usuarios_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sessoes" (
	"id" serial NOT NULL,
	"usuarioId" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" DATE DEFAULT NOW(),
	CONSTRAINT "sessoes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.links" (
	"id" serial NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"visitCount" integer NOT NULL DEFAULT '0',
	"usuarioId" integer NOT NULL,
	"createdAt" DATE DEFAULT NOW(),
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_fk0" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id");

ALTER TABLE "links" ADD CONSTRAINT "links_fk0" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id");





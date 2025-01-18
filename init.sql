CREATE TABLE "depot_points" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "depot_points_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
        "name" varchar(255) NOT NULL,
        "coordinates" varchar(255) NOT NULL,
        "contact" varchar(255) NOT NULL,
        "openTime" timestamp NOT NULL,
        "closeTime" timestamp NOT NULL
);

CREATE TABLE "round_depots" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "round_depots_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
        "roundId" integer NOT NULL,
        "depotId" integer NOT NULL,
        "order" integer NOT NULL
);

CREATE TABLE "rounds" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rounds_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
        "preparationDay" timestamp NOT NULL,
        "deliveryDay" timestamp NOT NULL
);

CREATE TABLE "users" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
        "name" varchar(255) NOT NULL,
        "surname" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "phoneNumber" varchar(255) NOT NULL,
        "bankDetails" varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL,
        "role" varchar(255) NOT NULL,
        CONSTRAINT "users_email_unique" UNIQUE("email"),
        CONSTRAINT "users_phoneNumber_unique" UNIQUE("phoneNumber")
);

ALTER TABLE "round_depots" ADD CONSTRAINT "round_depots_roundId_rounds_id_fk" FOREIGN KEY ("roundId") REFERENCES "public"."rounds"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "round_depots" ADD CONSTRAINT "round_depots_depotId_depot_points_id_fk" FOREIGN KEY ("depotId") REFERENCES "public"."depot_points"("id") ON DELETE cascade ON UPDATE no action;

INSERT INTO "depot_points" ("id", "name", "coordinates", "contact", "openTime", "closeTime") OVERRIDING SYSTEM VALUE VALUES
(1, 'IUT de Saint-Dié-des-Vosges', '{"lat": 48.29002481817756, "lng" : 6.94225075459547}', '0606060606', '2025-01-17 18:09:35.396', '2025-01-17 18:09:35.396'),
(2, 'Mairie de Saint-Dié-des-Vosges', '{"lat": 48.28745134155948, "lng": 6.947785895310519}', '0606060606', '2025-01-17 18:09:35.42', '2025-01-17 18:09:35.42'),
(3, 'Gare de Saint-Dié-des-Vosges', '{"lat": 48.28206086785984, "lng": 6.948560754595013}', '0606060606', '2025-01-17 18:09:35.469', '2025-01-17 18:09:35.469'),
(4, 'Lycée Georges Baumont', '{"lat": 48.299049492750335, "lng": 6.947259492990392}', '0606060606', '2025-01-17 18:09:35.538', '2025-01-17 18:09:35.538');

INSERT INTO "rounds" ("id", "preparationDay", "deliveryDay") OVERRIDING SYSTEM VALUE VALUES
(1, '2025-01-17 18:09:35.589', '2025-01-17 18:09:35.589'),
(2, '2025-01-17 18:09:35.811', '2025-01-17 18:09:35.811');

INSERT INTO "round_depots" ("id", "roundId", "depotId", "order") OVERRIDING SYSTEM VALUE VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 2, 1, 1),
(5, 2, 3, 2);



INSERT INTO "users" ("id", "name", "surname", "email", "phoneNumber", "bankDetails", "password", "role") OVERRIDING SYSTEM VALUE VALUES
(1, 'Utilisateur', '1', 'user1@cocagne.com', '0606060606', 'FR7630004000031234567890143', 'password', 'user');


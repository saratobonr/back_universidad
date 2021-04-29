
CREATE TABLE public.personas (
	id serial NOT NULL,
	nombre varchar(30) NOT NULL,
	correo varchar(100) NOT NULL,
	CONSTRAINT personas_pk PRIMARY KEY (id)
);
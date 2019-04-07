-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2-alpha1
-- PostgreSQL version: 11.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- object: admin | type: ROLE --
-- DROP ROLE IF EXISTS admin;
CREATE ROLE admin WITH 
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	LOGIN
	REPLICATION
	BYPASSRLS;
-- ddl-end --


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: erogen | type: DATABASE --
-- -- DROP DATABASE IF EXISTS erogen;
-- CREATE DATABASE erogen;
-- -- ddl-end --
-- 

-- object: identity | type: SCHEMA --
-- DROP SCHEMA IF EXISTS identity CASCADE;
CREATE SCHEMA identity;
-- ddl-end --
ALTER SCHEMA identity OWNER TO postgres;
-- ddl-end --

-- object: reference | type: SCHEMA --
-- DROP SCHEMA IF EXISTS reference CASCADE;
CREATE SCHEMA reference;
-- ddl-end --
ALTER SCHEMA reference OWNER TO postgres;
-- ddl-end --

-- object: legal | type: SCHEMA --
-- DROP SCHEMA IF EXISTS legal CASCADE;
CREATE SCHEMA legal;
-- ddl-end --
ALTER SCHEMA legal OWNER TO postgres;
-- ddl-end --

-- object: config | type: SCHEMA --
-- DROP SCHEMA IF EXISTS config CASCADE;
CREATE SCHEMA config;
-- ddl-end --
ALTER SCHEMA config OWNER TO postgres;
-- ddl-end --

-- object: identities | type: SCHEMA --
-- DROP SCHEMA IF EXISTS identities CASCADE;
CREATE SCHEMA identities;
-- ddl-end --
ALTER SCHEMA identities OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,identity,reference,legal,config,identities;
-- ddl-end --

-- object: identity.user_profile | type: TABLE --
-- DROP TABLE IF EXISTS identity.user_profile CASCADE;
CREATE TABLE identity.user_profile (
	id char(26) NOT NULL,
	title varchar(30),
	given_name varchar(35),
	middle_name varchar(50),
	family_name varchar(35),
	preferred_name varchar(70),
	birthdate date,
	gender char(1),
	occupation varchar(255),
	profile_pic_url text,
	banner_pic_url text,
	bio_description text,
	website_link text,
	social_links json,
	postal_addr_street text[],
	postal_addr_suburb varchar(1024),
	postal_addr_city varchar(1024),
	postal_addr_zipcode varchar(15),
	postal_addr_country smallint,
	physical_addr_street text[],
	physical_addr_suburb varchar(1024),
	physical_addr_city varchar(1024),
	physical_addr_zipcode varchar(15),
	physical_addr_country smallint,
	locale smallint,
	zone_info smallint,
	newsletter_sub bool NOT NULL DEFAULT true,
	privacy_level smallint NOT NULL,
	ui_preferences json,
	created_at timestamp NOT NULL,
	updated_at timestamp,
	CONSTRAINT user_profile__gender__ck CHECK (gender = 'M' OR gender = 'F' OR gender = 'O'),
	CONSTRAINT user_profile__pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE identity.user_profile OWNER TO postgres;
-- ddl-end --

-- object: identity.user_account | type: TABLE --
-- DROP TABLE IF EXISTS identity.user_account CASCADE;
CREATE TABLE identity.user_account (
	id char(26) NOT NULL,
	username varchar(70) NOT NULL,
	email_address varchar(255) NOT NULL,
	mobile_number json,
	payment_method json,
	security_question smallint,
	security_answer text,
	mfa_enabled bool NOT NULL DEFAULT false,
	accepted_tos_version smallint NOT NULL,
	last_known_ip inet,
	last_known_device text,
	last_known_geolocation point,
	previous_ips inet[],
	trusted_devices text[],
	last_login_at timestamp,
	failed_login_attempts integer,
	lockout_timestamp timestamp,
	account_status smallint NOT NULL,
	account_flag smallint,
	account_notes text,
	created_at timestamp NOT NULL,
	updated_at timestamp,
	deleted_at timestamp,
	CONSTRAINT user_account__pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE identity.user_account OWNER TO admin;
-- ddl-end --

-- object: identity.account_status | type: TABLE --
-- DROP TABLE IF EXISTS identity.account_status CASCADE;
CREATE TABLE identity.account_status (
	id smallint NOT NULL,
	name varchar(35) NOT NULL,
	label varchar(50) NOT NULL,
	description varchar(255) NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT account_status__pk PRIMARY KEY (id),
	CONSTRAINT account_status__name__uq UNIQUE (name)

);
-- ddl-end --
COMMENT ON COLUMN identity.account_status.name IS 'Machine-friendly status name';
-- ddl-end --
COMMENT ON COLUMN identity.account_status.label IS 'Human-friendly status name';
-- ddl-end --
ALTER TABLE identity.account_status OWNER TO postgres;
-- ddl-end --

-- object: reference.country_info | type: TABLE --
-- DROP TABLE IF EXISTS reference.country_info CASCADE;
CREATE TABLE reference.country_info (
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	iso_code_2 char(2) NOT NULL,
	iso_code_3 char(3) NOT NULL,
	supported bool NOT NULL DEFAULT false,
	CONSTRAINT country_info__pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN reference.country_info.supported IS 'whether the product/platform is current supported in this country or not';
-- ddl-end --
ALTER TABLE reference.country_info OWNER TO postgres;
-- ddl-end --

-- object: reference.security_question | type: TABLE --
-- DROP TABLE IF EXISTS reference.security_question CASCADE;
CREATE TABLE reference.security_question (
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	display_text text NOT NULL,
	CONSTRAINT security_question__pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE reference.security_question OWNER TO postgres;
-- ddl-end --

-- object: config.terms_of_service | type: TABLE --
-- DROP TABLE IF EXISTS config.terms_of_service CASCADE;
CREATE TABLE config.terms_of_service (
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	version varchar(20) NOT NULL,
	is_current bool NOT NULL DEFAULT false,
	created_at timestamp NOT NULL,
	updated_at timestamp,
	CONSTRAINT terms_of_services__pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE config.terms_of_service OWNER TO postgres;
-- ddl-end --

-- object: user_account__username__idx | type: INDEX --
-- DROP INDEX IF EXISTS identity.user_account__username__idx CASCADE;
CREATE UNIQUE INDEX  CONCURRENTLY user_account__username__idx ON identity.user_account
	USING hash
	(
	  username
	);
-- ddl-end --

-- object: user_account__email_address__idx | type: INDEX --
-- DROP INDEX IF EXISTS identity.user_account__email_address__idx CASCADE;
CREATE UNIQUE INDEX  CONCURRENTLY user_account__email_address__idx ON identity.user_account
	USING hash
	(
	  email_address
	);
-- ddl-end --

-- object: identity.account_privacy_level | type: TABLE --
-- DROP TABLE IF EXISTS identity.account_privacy_level CASCADE;
CREATE TABLE identity.account_privacy_level (
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(35) NOT NULL,
	label varchar(50) NOT NULL,
	CONSTRAINT privacy_level__pk PRIMARY KEY (id),
	CONSTRAINT privacy_level__name__uq UNIQUE (name)

);
-- ddl-end --
ALTER TABLE identity.account_privacy_level OWNER TO postgres;
-- ddl-end --

-- object: user_account__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_profile DROP CONSTRAINT IF EXISTS user_account__fk CASCADE;
ALTER TABLE identity.user_profile ADD CONSTRAINT user_account__fk FOREIGN KEY (id)
REFERENCES identity.user_account (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: user_profile__uq | type: CONSTRAINT --
-- ALTER TABLE identity.user_profile DROP CONSTRAINT IF EXISTS user_profile__uq CASCADE;
ALTER TABLE identity.user_profile ADD CONSTRAINT user_profile__uq UNIQUE (id);
-- ddl-end --

-- object: reference.hash_algorithm | type: TABLE --
-- DROP TABLE IF EXISTS reference.hash_algorithm CASCADE;
CREATE TABLE reference.hash_algorithm (
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	CONSTRAINT hash_algorithm_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE reference.hash_algorithm OWNER TO postgres;
-- ddl-end --

-- object: identity.account_flag | type: TABLE --
-- DROP TABLE IF EXISTS identity.account_flag CASCADE;
CREATE TABLE identity.account_flag (
	id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	description varchar(1024) NOT NULL,
	CONSTRAINT account_flag_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE identity.account_flag OWNER TO postgres;
-- ddl-end --

-- object: identity.user_login | type: TABLE --
-- DROP TABLE IF EXISTS identity.user_login CASCADE;
CREATE TABLE identity.user_login (
	id char(26) NOT NULL,
	password_hash text NOT NULL,
	password_salt varchar(100) NOT NULL,
	password_algorithm smallint NOT NULL,
	verification_token_email varchar(255),
	verification_token_password varchar(255),
	CONSTRAINT user_login__pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE identity.user_login OWNER TO postgres;
-- ddl-end --

-- object: user_account__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_login DROP CONSTRAINT IF EXISTS user_account__fk CASCADE;
ALTER TABLE identity.user_login ADD CONSTRAINT user_account__fk FOREIGN KEY (id)
REFERENCES identity.user_account (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: user_login__uq | type: CONSTRAINT --
-- ALTER TABLE identity.user_login DROP CONSTRAINT IF EXISTS user_login__uq CASCADE;
ALTER TABLE identity.user_login ADD CONSTRAINT user_login__uq UNIQUE (id);
-- ddl-end --

-- object: user_profile__privacy_level__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_profile DROP CONSTRAINT IF EXISTS user_profile__privacy_level__fk CASCADE;
ALTER TABLE identity.user_profile ADD CONSTRAINT user_profile__privacy_level__fk FOREIGN KEY (privacy_level)
REFERENCES identity.account_privacy_level (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_account__status__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_account DROP CONSTRAINT IF EXISTS user_account__status__fk CASCADE;
ALTER TABLE identity.user_account ADD CONSTRAINT user_account__status__fk FOREIGN KEY (account_status)
REFERENCES identity.account_status (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_account__accepted_tos_version__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_account DROP CONSTRAINT IF EXISTS user_account__accepted_tos_version__fk CASCADE;
ALTER TABLE identity.user_account ADD CONSTRAINT user_account__accepted_tos_version__fk FOREIGN KEY (accepted_tos_version)
REFERENCES config.terms_of_service (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_account__security_question__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_account DROP CONSTRAINT IF EXISTS user_account__security_question__fk CASCADE;
ALTER TABLE identity.user_account ADD CONSTRAINT user_account__security_question__fk FOREIGN KEY (security_question)
REFERENCES reference.security_question (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_account__account_flag__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_account DROP CONSTRAINT IF EXISTS user_account__account_flag__fk CASCADE;
ALTER TABLE identity.user_account ADD CONSTRAINT user_account__account_flag__fk FOREIGN KEY (account_flag)
REFERENCES identity.account_flag (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: user_login__password_algorithm__fk | type: CONSTRAINT --
-- ALTER TABLE identity.user_login DROP CONSTRAINT IF EXISTS user_login__password_algorithm__fk CASCADE;
ALTER TABLE identity.user_login ADD CONSTRAINT user_login__password_algorithm__fk FOREIGN KEY (password_algorithm)
REFERENCES reference.hash_algorithm (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --



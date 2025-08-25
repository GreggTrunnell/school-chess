
-- TABLE SCHEMAS:

--Database: Racquets Not Paddles

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "email" VARCHAR(50),
  "city" VARCHAR(50),
  "zip" INTEGER,
  "greeting" VARCHAR(200),
  "right_handed" VARCHAR(5),
  "racquet_brand" VARCHAR(50)
);

CREATE TABLE "friends" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "friend_id" INTEGER,
  "requester_id" INTEGER,
  "recipient_id" INTEGER,
  "approved" BOOLEAN,
  "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "sender_id" INTEGER,
  "recipient_id" INTEGER,
  "message_content" VARCHAR(300),
  "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_by_sender" BOOLEAN,
  "delete_by_recipient" BOOLEAN
);

-------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() -- 👈
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();

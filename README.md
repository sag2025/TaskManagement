#######################################################################
ADDED A VIDEO TO DEMONSTRATE MY WEBISTE 
LINK------->https://drive.google.com/file/d/1B68MvuWBeWKetKeD6nIkvWe3P93kdpzQ/view?usp=sharing
###############################################################################







##CLEAR INSTRUCTIONS TO RUN MY WEBSITE AT YOUR LOCAL HOST 
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 PRE REQUISITES
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 DATABASE CONNECTION
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 SINCE I HAVE NOT PROVIDED MY .env FILE DATA , TO CONNECT TO THE DATABASE U HAVE TO CREATE YOUR OWN 
 STEP 1----> GO TO NEON.COM AND LOGIN
 STEP 2----> GO TO DASHBOARD
 STEP 3----> GET THE CONNECTION STRING 
 STEP 4----> CREATE AN .env FILE AND FILE ALL DATABASE CONNECTION PARAMS
 STEP 5----> NOW AT NEON.COM  AND OPEN SQL EDITOR 
 STEP 6----> PASTE THESE SQL COMMANDS THERE
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 create DATABASE users
 CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,
    
    title VARCHAR(255) NOT NULL,
    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'pending',

    due_date TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_status
        CHECK (status IN ('pending', 'completed'))
);
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GIT CLONE ORIGIN https://github.com/sag2025/TaskManagement
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 FRONTEND
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 STEP 1---> CD frontend
 STEP 2---> npm install
 STEP 3---> npm run dev
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 BACKEND
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
STEP 1---> CD backend
STEP 2---> npm install
STEP 3---> node app.js
 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 

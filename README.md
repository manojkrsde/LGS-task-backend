# 📖 Books - BACKEND | NODEJS + EXPRESS + POSTGRES + SEQUELIZE

**`Live Preview of Frontend`** : 

- DUMMY ACCOUNT FOR TESTING:

        Email : demo@gmail.com
        Password: 123456

## 🥇 Project Setup

1. ⬇️ **Download**: Download the project from GitHub and open it in your favorite text editor.
    ```
    git clone https://github.com/manojkrsde/LGS-task-backend
    ```

2. 📥 **Install Dependencies**: Navigate to the project folder and execute the following command to install all necessary dependencies:

   ```
   cd LGS-task-backend
   npm install
   ```

3. 🔌**Create .env file**: In the root directory, create a `.env` file and add the following environment variables `Change values`

   ```
    #server related
    PORT=3000
    NODE_ENV=development            # Options: development, production, test
    APP_NAME=BookLists

    #database related
    DB_USERNAME=manoj
    DB_PASSWORD=123456
    DB_NAME=BooksDB
    DB_HOSTNAME=127.0.0.1
    DB_PORT=5432
    DB_DIALECT=postgres

    #authentication related
    SALT_ROUNDS=8
    JWT_EXPIRY=1d
    JWT_SECRET=3e6f9f81a0e8419cbdd54d86d5aef24c66f68f7ba3ce1d8d9c3409a7092ff3df

   ```
5. ⚡**Initialize Database ORM**: In the root directory: run following commands

   `⚠️Note:` Do only once

   ```
   npx sequelize db:create
   npx sequelize db:migrate
   npx sequelize db:seed:all 

   ```

5. ⚡**Start the project**: Begin running the project using this command:

   `⚠️Note:` Make sure database is up and running

   ```
   npm start 
   or
   npm run dev
   ```


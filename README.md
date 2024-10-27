## Project Control Flow

- [x] Files setup
- [x] Install dependencies:
  - Express
  - MongoDB
  - Nodemon (dev)
  - Prettier (dev)
  - Mongoose
  - Dotenv
  - Cookie-parser
  - CORS
  - Cloudinary
  - Bcrypt
  - JsonWebToken
  - Multer
  - Mongoose-aggregate-paginate-v2

- [x] Setup `.prettierrc` and `.prettierignore` configuration files

- [x] Configure environment variables in `.env`:
  - `PORT=3000`
  - `mongo_DBI= "   "`
  - `cors_origin=*`
  - `accessTokenSecret`
  - `accessTokenExpiry`
  - `refreshTokenSecret`
  - `refreshTokenExpiry`
  - `cloudinary_cloudName`
  - `cloudinary_api_key`
  - `cloudinary_api_secret`

- [x] Connect MongoDB in `db/index.js` using the environment variables

- [x] Setup Express server in `src/app.js`

- [x] Define models in the `models` folder (write the schemas)

- [x] In `utils` folder, implement:
  - API handling code: `ApiError`, `ApiResponse`, `asyncHandler.js`
  - Cloudinary setup in `util/cloudinary.js`

- [x] Middleware setup:
  - Multer for file uploads
  - Authentication in `middleware.js` (**Important**)

### Important
- [x] Route setup in `router.js`

- [x] Write the controllers for different routes

- [x] Test the code using Postman

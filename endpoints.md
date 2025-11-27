- add tags for restaurant later
# REST_APIS

## Auth
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh
- POST /auth/forgot-password
- POST /auth/reset-password

## Users
- GET /users/me
- PUT /users/me
- DELETE /users/me
- PUT /users/me/password
- GET /users/me/addresses
- POST /users/me/addresses
- PUT /users/me/addresses/:id
- DELETE /users/me/addresses/:id //soft delete



## Orders
- GET /orders
- GET /orders?status=status
- GET /orders/:id
- GET /orders/:id/history
- PATCH /orders/:id

## Restaurants 
- GET /restaurants
- POST /restaurants 
- GET /restaurants?search=name&tag=food_type
- GET /restaurants/:id
- GET /restaurants/:id/menu
- PATCH /restaurants/me/menu
- POST /restaurants/me/menu
- GET /restaurants/me/summary



## Admin 
- PATCH /admin/restaurants/:id
- PATCH /admin/users/:id


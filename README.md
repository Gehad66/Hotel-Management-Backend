### Introduction
Hotel managment microservice. Hotelier Service that enables hotelier to register and add their offerings. Booking Service that enables user to book item as long as it's available
### Run Project:

    docker-compose up

### Stop Project

    docker-compose down
### Postman Collection
[Postman collection](https://github.com/Gehad66/Hotel-Management-Backend/tree/main/e2e)
### Supported APIs
#### Hotelier APIs
Hotelier supported APIs on url http://localhost:4000

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/hoteliers`                             | Retrieve all hoteliers.                      |
| `POST`   | `/hoteliers`                             | Create a new hotelier.                       |
| `GET`    | `/hoteliers/2`                          | Retrieve hotelier #2.                       |
| `GET`    | `/hoteliers/1/items/1`                          | Retrieve Item #1 for hoteliers  #1.                       |
| `PATCH`  | `/hoteliers/1/items/1`                          | Update Item #1 for hoteliers  #1.                 |
| `POST`   | `/hoteliers/1/items`                 | Create a new Item for hotelier #1                   |
| `DELETE`  | `/hoteliers/1/items/1`                          | Delete Item #1 for hoteliers  #1.   |
| `GET`    | `/hoteliers/1/items` | Retrieve all Items for hoteliers  #1.  |

#### Booking APIs
Booking supported APIs on url http://localhost:3000

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/bookings/availability`                             | Create availability for an item #x for hotelier #y.                      |
| `POST`   | `/bookings/availability`                             | Update availability for an item #x for hotelier #y.                       |
| `POST`    | `/bookings/hoteliers/1/items/2`                          | Book item #2 for hotelier #1 using date range                      |
## Future Suggestion
    
   - Convert Booking DB to NoSQL
   - ADD elastic search to Booking Service
   - Add Unit Testing
   - Follow thread safe best practices for Node
   - Add cashing to Both services
   - Allow for API filters
# Software Architecture: node-mvc-crud-product-supplier
## 1. Project Description
A CRUD website application for managing suppliers and products, built with Node.js, MongoDB, and Mongoose following the MVC architecture.

Supplier management: name, address, phone
Product management: name, price, quantity, supplierId (linked to supplier)
## 2. Data Model
### Products Table
| Field      | Data Type | Description               |
|-------------|--------------|----------------------|
| _id         | ObjectId     | Primary key          |
| name        | String       | Product name         |
| price       | Number       | Price                  |
| quantity    | Number       | Quantity             |
| supplierId  | ObjectId     | FK to suppliers     |

### Bảng suppliers
| Field      | Data Type | 	Description                |
|-------------|--------------|----------------------|
| _id         | ObjectId     | 	Primary key           |
| name        | String       | Supplier name     |
| address     | String       | Address              |
| phone       | String       | Phone number        |

## 3.  Folder Structure

```
node-mvc-crud-product-supplier/
├─ package.json
├─ .env                # Environment variable (MONGO_URI)
├─ app.js              # App initialization, middleware config, DB connection
├─ /models             # Mongoose schema definitions
│  ├─ Supplier.js      # Supplier schema
│  └─ Product.js       # Product schema
├─ /controllers        # Business logic handlers
│  ├─ supplierController.js
│  └─ productController.js
├─ /routes             # API and web routes
│  ├─ supplierRoutes.js
│  └─ productRoutes.js
├─ /views              # EJS templates
│  ├─ partials/
│  │  ├─ header.ejs
│  │  └─ footer.ejs
│  ├─ index.ejs
│  ├─ suppliers/
│  │  ├─ index.ejs     # Supplier list
│  │  ├─ new.ejs       # Add supplier
│  │  └─ edit.ejs      # Edit supplier
│  └─ products/
│     ├─ index.ejs     # Product list
│     ├─ new.ejs       # Add product
│     └─ edit.ejs      # Edit product
├─ /public
│  └─ css/style.css    # UI CSS
└─ seed.js             # Sample data generator (optional)
```

## 4.  MVC Workflow

- **Model**:  Defines data structure, connects to MongoDB via Mongoose (Product.js, Supplier.js).
- **View**: User interface using EJS, displays data and input forms.
- **Controller**: Handles CRUD logic, receives requests from routes, interacts with model, returns appropriate view.
- **Routes**: URI routing, forwards requests to corresponding controller

## 5. Environment Configuration

- Create a .env file with the MONGO_URI variable to configure MongoDB connection

## 6.  Start Project

```bash
npm install
node app.js
```

## 7. Contribution

Please create a pull request or contact via email for any contributions.

## 8. License

MIT

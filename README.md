# CST_3144_Back_End
# Lessons App 

A robust and scalable API for managing lessons data, built with Node.js, Express.js, and MongoDB. This project supports fetching, updating, and searching lessons, with a focus on simplicity and ease of use.

---
# github and render link
https://github.com/abhipatel2426/CST_3144_Back_End


## Key Highlights

- 🚀 **Fast and Lightweight**: Built with Express.js for efficient server-side performance.
- 📦 **Database Integration**: MongoDB used for secure and persistent data storage.
- 🔍 **Dynamic Search**: Search lessons by subject, location, price, or available spaces.
- 🛠 **Customizable**: Easily extendable to include more features or adapt to your needs.

---

## Getting Started

### Prerequisites

1. **Node.js** installed on your machine.
2. A **MongoDB database connection string**.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/abhipatel2426/CST_3144_Back_End
    cd lessons-management-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Update the MongoDB URI in `server.js`:
    ```javascript
    const uri = "mongodb+srv://......";
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Open your browser or API testing tool (like Postman) and navigate to:
    ```
    http://localhost:3050
    ```

---

## How It Works

1. **Fetch Lessons**
    ```
    GET /lessons
    ```
    Returns a list of all lessons.

2. **Search Lessons**
    ```
    GET /search?query=<term>
    ```
    Search lessons by subject, location, price, or available spaces.

3. **Update Lesson**
    ```
    PUT /lessons/:id
    ```
    Update available spaces or other lesson properties.

---

## File Structure

```plaintext
/public          - Public assets (HTML, images)
/lessonsData.js  - Initial lessons data for seeding
/server.js       - Main server file
/package.json    - Dependencies and scripts
/README.md       - Project documentation

Example Data
Sample lesson object:

json
{
    "id": 1,
    "subject": "Math",
    "Location": "London",
    "Price": 100,
    "image": "images/math.webp",
    "Space": 5
}

Why This Project?
Simple to use and understand.
Ready-to-deploy back-end with MongoDB integration.
Built for flexibility and scalability.

License
This project is licensed under the MIT License.

Built with 💻 by [Abhi patel]

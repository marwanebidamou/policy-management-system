# University Policies Management System

This project is a web application for creating, managing, and interacting with university-related policies. Users can create policies, upvote them, comment, and filter based on various criteria. The platform uses a **React (Vite)** frontend and a **Node.js/Express** backend.

---

## **Features**

### **Frontend**
- Built with **React** and **Vite** for a fast and optimized user interface.
- **Responsive design** using TailwindCSS.
- Dynamic **policy filtering** with options for tags, academic year, and more.
- Real-time user interactions such as upvoting and commenting.
- Multi-select tagging using `react-tailwindcss-select`.
- Clean and intuitive UI components for:
  - Policy creation and management.
  - Policy search and filtering.

### **Backend**
- Powered by **Node.js** and **Express.js**.
- Data validation with **Zod**.
- Authentication and authorization using **JWT**.
- API endpoints for managing:
  - Policies.
  - Tags.
  - Comments.
  - Upvotes.
- Database integration with **MongoDB** using **Mongoose** for schema management.
- Deployment-ready with Docker and Docker Compose.

---

## **Tech Stack**

### **Frontend**
- **React (Vite)**: For a fast and modern frontend experience.
- **TailwindCSS**: For responsive and clean styling.
- **Axios**: For making API calls.
- **react-router-dom**: For client-side routing.
- **react-tailwindcss-select**: For multi-select dropdowns.

### **Backend**
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **Zod**: For schema validation.
- **Mongoose**: For MongoDB object modeling.
- **JWT**: For authentication.

### **Database**
- **MongoDB**: For document-based data storage.

---
## **Future Enhancements**

Implement real-time updates using WebSockets.
Add user profile pages.
Enhance search with advanced filters and full-text search.
License
This project is open-source and available under the MIT License.

## **Acknowledgments**
Built as part of the CS472 - Web Application Development at Maharishi International Univesity.

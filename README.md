# Pantry Tracker

[Demo video](https://www.youtube.com/watch?v=CGeJq67n1TY)

![1](assets/1.png)
![2](assets/2.png)


Pantry Tracker is a web application designed to help users efficiently manage their pantry items. With features like expiration alerts, inventory management, and a shopping list, it ensures that you never run out of essential items and helps reduce food waste by keeping track of expiration dates.

## Features

- **Expiration Alerts:** Get notified about items that have expired or are about to expire.
- **Inventory Management:** Add, edit, and delete pantry items with real-time updates.
- **Shopping List:** Automatically generate a shopping list based on low stock or expired items, with the option for manual list management.
- **Firebase Integration:** All data is stored in a Firebase Firestore database, ensuring real-time synchronization across devices.
- **Responsive Design:** Accessible on both desktop and mobile devices.
- **Vercel Deployment:** Hosted on Vercel for reliable and fast performance.

## Tech Stack

- **Frontend:** React, Next.js
- **Backend:** Firebase Firestore
- **Hosting:** Vercel
- **Styling:** CSS (custom styling)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/techbire/pantry-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd pantry-tracker
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up Firebase:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Set up Firestore Database and enable it.
   - Copy the Firebase configuration details to `firebase.js` in your project.
5. Run the development server:
    ```bash
    npm run dev
    ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Firebase Database Structure

### Pantry Items Collection
```json
{
  "item": "Cadbury Dairy Milk",
  "category": "Chocolate",
  "expirationDate": "2024-12-01",
  "quantity": 5
}
```

### Shopping List Collection
```json
{
  "item": "Whole Wheat Bread"
}
```

## Deployment

This application is deployed on Vercel. Visit the live site [here](https://techbire-pantry-tracker.vercel.app/).

## File Structure

```bash
├── .next
├── components
│   ├── ExpirationAlerts.js
│   ├── PantryForm.js
│   ├── PantryList.js
│   └── ShoppingList.js
├── node_modules
├── pages
│   ├── _app.js
│   ├── index.js
├── public
├── styles
│   ├── globals.css
│   └── Home.module.css
├── .gitignore
├── firebase.js
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

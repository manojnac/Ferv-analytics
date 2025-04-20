Ferv Analytics
Ferv Analytics is a website traffic analysis application designed to provide insights into website performance, including user behavior, traffic sources, and bounce rates. It integrates data from Firebase Realtime Database and Google Analytics to provide real-time metrics and visualizations through interactive charts.

Features
Traffic Analysis: Real-time tracking of website traffic, user sessions, and page views.

Bounce Rate Calculation: Calculate bounce rate based on session data.

Google Analytics Integration: Fetch Google Analytics data, such as page views, sessions, and bounce rates.

User Behavior Insights: Analyze user behavior, including active users, returning users, and inactive users.

Dynamic Visualizations: Visualize traffic trends, page views, bounce rates, and user behavior through interactive charts using Chart.js.

Technologies Used
Frontend:

HTML, CSS, JavaScript

Chart.js for data visualizations

Firebase for storing traffic data in Realtime Database

Google Analytics API for fetching traffic analytics

Backend:

Node.js with Express.js for the server-side application

Firebase Admin SDK for interacting with Firebase Realtime Database

Google OAuth 2.0 for authentication and authorization with Google Analytics

Installation

Clone the repository:
git clone https://github.com/manojnac/Ferv-analytics.git
cd Ferv-analytics

Install the dependencies:
npm install

Add your Firebase service account key in the project directory as serviceAccountKey.json.

Set up Google OAuth 2.0 credentials. Create a project on Google Cloud Console, enable Google Analytics API, and download the credentials.

Run the application:
npm start

The server will start on http://localhost:3000.

Usage

Authenticate with Google Analytics:
Navigate to http://localhost:3000/auth to authenticate and get access to your Google Analytics data.

After successful authentication, the access token is saved in Firebase.

Track Traffic:

Send POST requests to the /store-url endpoint with the URL you want to track.
The traffic data is saved in Firebase Realtime Database.

View Analytics:
Access the /analytics endpoint to view real-time analytics, including the number of sessions, bounce rate, and Google Analytics data.

View Visualizations:
Open the userbehaviour.html file to see interactive charts for website traffic, page views, bounce rate, and user behavior.

Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to fork the repository and submit a pull request.

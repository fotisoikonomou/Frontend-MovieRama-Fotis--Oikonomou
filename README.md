# Frontend-MovieRama-Fotis-Oikonomou
Frontend-MovieRama-Fotis-Oikonomou
## CORS Policy Issue and Local Development

While developing my web application, I've been facing issues with the CORS (Cross-Origin Resource Sharing) policy. To work around this problem, I used the HTTP-server package, which allows me to serve my files locally and bypass CORS restrictions during development. This setup has helped me test my application without running into CORS-related issues. Another solution could be to use XAMPP, which can also host my application locally and help manage CORS policies more effectively.

### Instructions for Local Development

1. First, install the HTTP-server package globally: <b>npm install -g http-server</b>
2. Navigate to the `src` folder of the project and run:$ http-server -p 8000
This will start the local server on port 8000.

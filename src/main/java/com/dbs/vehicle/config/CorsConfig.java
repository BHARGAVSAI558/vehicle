CorsConfiguration config = new CorsConfiguration();

// Allow specific origins
config.addAllowedOrigin("http://localhost:5173"); // Vite default port
config.addAllowedOrigin("http://localhost:3000"); // React default port
config.addAllowedOrigin("https://vehicle-management-system.netlify.app"); // Netlify domain
config.addAllowedOriginPattern("https://*.netlify.app"); // Allow all Netlify subdomains

// Allow all HTTP methods
config.addAllowedMethod("*");

// Allow all headers
config.addAllowedHeader("*");

// Allow credentials
config.setAllowCredentials(true);

// Set max age to reduce preflight requests
config.setMaxAge(3600L); // 1 hour 
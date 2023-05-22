#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Initialize FirebaseESP8266 library
FirebaseData firebaseData;

// Replace with your Firebase project's host
#define FIREBASE_HOST "your-firebase-host.firebaseio.com"

// Replace with your Firebase project's secret
#define FIREBASE_AUTH "your-firebase-auth"

// Replace with your network credentials
#define WIFI_SSID "your_SSID"
#define WIFI_PASSWORD "your_PASSWORD"

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.println("Wi-Fi connected");
  
  // Connect to Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Serial.println("Connected to Firebase");
}

void loop() {
  // Update data in the Firebase database
  if (Firebase.setInt(firebaseData, "/sensorData/temperature", random(20, 30))) {
    Serial.println("Successfully updated data");
  } else {
    Serial.println("Failed to update data");
    Serial.println("Reason: " + firebaseData.errorReason());
  }
  
  delay(5000);
}


// #include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>

// #define FIREBASE_HOST "embed-toilet-default-rtdb.asia-southeast1.firebasedatabase.app" // Your Firebase Project URL goes here without "http:" and "/"
// #define FIREBASE_AUTH "LSSpk0ijKUICj9KLXTjtU6IA8tUFLHdzbwriclCu" // Your secret key
// #define WIFI_SSID "Nut (Iphone)" // your WiFi SSID
// #define WIFI_PASSWORD "Nut12345" // your WiFi Password

// FirebaseData firebaseData;

// void setup() {
//   Serial.begin(115200);
  
//   // connect to wifi.
//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//   Serial.print("connecting");
//   while (WiFi.status() != WL_CONNECTED) {
//     Serial.print(".");
//     delay(500);
//   }
//   Serial.println();
//   Serial.print("connected: ");
//   Serial.println(WiFi.localIP());
  
//   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

//   // Set max temperature for "yourDocumentId" in Firebase
//   Firebase.setInt(firebaseData, "/temperature/yourDocumentId/max", 120);
// }

// void loop() {
//   // Here you'd implement code to retrieve data from the STM32 and update Firebase.
  
//   // You might want to update the current temperature for example, make sure the path matches your Firebase structure
//   int temperature = Firebase.getInt(firebaseData, "/temperature/yourDocumentId/current");
//   temperature = temperature + 1;

//   Firebase.setInt(firebaseData, "/temperature/yourDocumentId", temperature);
  
//   delay(1000); // Wait for a second
// }

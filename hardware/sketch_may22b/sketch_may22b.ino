#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define WIFI_SSID "<nnnphone>"
#define WIFI_PASSWORD "<123natch90>"
#define FIRESTORE_PROJECT_ID "<watering-plant-2c69b>"
#define FIRESTORE_COLLECTION_ID "<temperature>"
#define FIRESTORE_DOCUMENT_ID "<yourDocumentId>"

void setup() {
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client; // Create a WiFiClient object

    HTTPClient http;

    String url = "https://firestore.googleapis.com/v1/projects/";
    url += FIRESTORE_PROJECT_ID;
    url += "/databases/(default)/documents/";
    url += FIRESTORE_COLLECTION_ID;
    url += "/";
    url += FIRESTORE_DOCUMENT_ID;

    http.begin(client, url); // Pass the WiFiClient object by reference
    http.addHeader("Content-Type", "application/json");

    // Prepare your sensor data here
    StaticJsonDocument<200> doc;
    doc["fields"]["status"]["stringValue"] = "newStatus";
    doc["fields"]["average"]["doubleValue"] = 25.5;
    doc["fields"]["min"]["doubleValue"] = 20.0;
    doc["fields"]["max"]["doubleValue"] = 30.0;

    String body;
    serializeJson(doc, body);

    int httpCode = http.PATCH(body);
    if (httpCode > 0) {
      String response = http.getString();
      Serial.println(httpCode);
      Serial.println(response);
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end();
  }

  delay(5000);
}


// #include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>

// // Replace with your WiFi credentials
// #define WIFI_SSID "<nnnphone>"
// #define WIFI_PASSWORD "<123natch90>"

// // Replace with your Firebase project details
// #define FIREBASE_HOST "<watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app>"
// #define FIREBASE_AUTH "<XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N>"

// void setup() {
//   Serial.begin(9600);

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
// }

// void loop() {
//   // This example just updates a static value, replace this with your actual sensor data
//   String sensorValue = String(random(0, 100));

//   Firebase.setString("sensorData/temperature", sensorValue);
//   delay(1000);

//   // handle Firebase errors
//   if (Firebase.failed()) {
//       Serial.print("setting /sensorData/temperature failed:");
//       Serial.println(Firebase.error());
//       return;
//   }
// }


// #include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>

// // Initialize FirebaseESP8266 library
// FirebaseData firebaseData;

// // Replace with your Firebase project's host
// #define FIREBASE_HOST "your-firebase-host.firebaseio.com"

// // Replace with your Firebase project's secret
// #define FIREBASE_AUTH "your-firebase-auth"

// // Replace with your network credentials
// #define WIFI_SSID "nnnphone"
// #define WIFI_PASSWORD "123natch90"

// void setup() {
//   Serial.begin(115200);
  
//   // Connect to WiFi
//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//   Serial.print("Connecting to Wi-Fi");
//   while (WiFi.status() != WL_CONNECTED) {
//     Serial.print(".");
//     delay(300);
//   }
//   Serial.println();
//   Serial.println("Wi-Fi connected");
  
//   // Connect to Firebase
//   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
//   Serial.println("Connected to Firebase");
// }

// void loop() {
//   // Update data in the Firebase database
//   if (Firebase.setInt(firebaseData, "/sensorData/temperature", random(20, 30))) {
//     Serial.println("Successfully updated data");
//   } else {
//     Serial.println("Failed to update data");
//     Serial.println("Reason: " + firebaseData.errorReason());
//   }
  
//   delay(5000);
// }


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

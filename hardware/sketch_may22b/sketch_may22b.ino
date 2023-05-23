#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

#define FIREBASE_HOST "watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N"

// Define your Wi-Fi credentials
const char* ssid = "Chantana 5G";
const char* password = "27462904";

FirebaseData firebaseData;

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to Wi-Fi!");

  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if(Firebase.setFloat(firebaseData, "temperature/average", 100.4)) {
    Serial.println("PASSED");
    Serial.println("PATH: " + firebaseData.dataPath());
    Serial.println("TYPE: " + firebaseData.dataType());
    Serial.print("VALUE: ");
    Serial.println(firebaseData.floatData());
    Serial.println("------------------------------------");
    Serial.println();
  } else {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }

  delay(5000); // Wait 5 seconds before sending the next data point
}


// #include <ESP8266WiFi.h>
// #include <FirebaseArduino.h>
// #include <SoftwareSerial.h>

// #define FIREBASE_HOST "watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app"
// #define FIREBASE_AUTH "XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N"

// // Define your Wi-Fi credentials
// const char* ssid = "Chantana 5G";
// const char* password = "27462904";

// void setup() {
//   Serial.begin(115200);

//   // Connect to Wi-Fi
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("Connected to Wi-Fi!");

//   // Initialize Firebase
//   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
// }

// void loop() {
//   // Collect data from sensors or other sources
//   //float temperature = readTemperature();

//   // Send data to Firestore
//   Firebase.setFloat("temperature/average", 100.4);

//   delay(5000); // Wait 5 seconds before sending the next data point
// }
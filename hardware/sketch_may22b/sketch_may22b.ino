#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

#define FIREBASE_HOST "embed-toilet-default-rtdb.asia-southeast1.firebasedatabase.app" // Your Firebase Project URL goes here without "http:" and "/"
#define FIREBASE_AUTH "LSSpk0ijKUICj9KLXTjtU6IA8tUFLHdzbwriclCu" // Your secret key
#define WIFI_SSID "Nut (Iphone)" // your WiFi SSID
#define WIFI_PASSWORD "Nut12345" // your WiFi Password

FirebaseData firebaseData;

void setup() {
  Serial.begin(115200);
  
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // Set max temperature for "yourDocumentId" in Firebase
  Firebase.setInt(firebaseData, "/temperature/yourDocumentId/max", 120);
}

void loop() {
  // Here you'd implement code to retrieve data from the STM32 and update Firebase.
  
  // You might want to update the current temperature for example, make sure the path matches your Firebase structure
  int temperature = Firebase.getInt(firebaseData, "/temperature/yourDocumentId/current");
  temperature = temperature + 1;

  Firebase.setInt(firebaseData, "/temperature/yourDocumentId", temperature);
  
  delay(1000); // Wait for a second
}

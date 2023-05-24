#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app" // Replace with your Firebase Project URL
#define FIREBASE_AUTH "XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N" // Replace with your Firebase secret
#define WIFI_SSID "Thammasorn" // Replace with your WiFi SSID
#define WIFI_PASSWORD "poom9902" // Replace with your WiFi password

FirebaseData firebaseData;

void setup() {
  Serial.begin(9600);
  delay(1000);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    Serial.print("+");
    Serial.println();
    delay(300);
  }
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Firebase.setString(firebaseData, "/message", "Hello from ESP826612345");
  if (Firebase.setString(firebaseData, "/message", "Hello from ESP826612345")) {
    Serial.println("PASSED");
    Serial.println("PATH: " + firebaseData.dataPath());
    Serial.println("TYPE: " + firebaseData.dataType());
    Serial.println("ETag: " + firebaseData.ETag());
    Serial.println();
  } else {
    Serial.println("FAILED");
    Serial.println();
  }

  delay(1000);
}

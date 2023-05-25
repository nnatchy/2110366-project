#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app" // Replace with your Firebase Project URL
#define FIREBASE_AUTH "XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N" // Replace with your Firebase secret
#define WIFI_SSID "Nut_" // Replace with your WiFi SSID
#define WIFI_PASSWORD "Nut12345" // Replace with your WiFi password

FirebaseData firebaseData;

void setup() {
  Serial.begin(9600);
  //connect to wifi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    Serial.println("");
    Serial.print("what");
    Serial.println("");


    delay(500);
  }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());
  
  //connect to firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  // Read data from the path in your Firebase Database
  if(Firebase.getString(firebaseData, "/test")) {
    if(firebaseData.dataType() == "string"){
      String data = firebaseData.stringData();
      Serial.println(data);
    }
  } else {
    Serial.println("Firebase read failed");
    Serial.println("REASON: " + firebaseData.errorReason());
  }
  delay(1000);
}

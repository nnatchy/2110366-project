#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Config Firebase
#define FIREBASE_HOST "watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N"

// Config connect WiFi
#define WIFI_SSID "Nut_"
#define WIFI_PASSWORD "Nut12345"

FirebaseData firebaseData;

EspSoftwareSerial::UART mySerial;
String append_text, hh, ss, tt, rr, soil, temperature, humid, rain;
int i = 0;

String st = "";
char inChar = ' ';
int A, B, C, D, E;

void setup() {
  Serial.begin(9600);
  mySerial.begin(115200, EspSoftwareSerial::SWSERIAL_8N1, D7, D8, false, 100, 100);
  delay(1000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  int i  = 0;
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(i);
    Serial.println();
    delay(300);
    i++;
  }
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  Read_Uart();
  Serial.println("t :" + temperature);
  Serial.println("h :" + humid);
  Serial.println("s :" + soil);
  Serial.println("r :" + rain);
    if (!Firebase.setFloat(firebaseData, "temperature/value", temperature.toFloat())) {
      Serial.println("FAILED to set temperature/value");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (!Firebase.setFloat(firebaseData, "humidity/value", humid.toFloat())) {
      Serial.println("FAILED to set humidity/value");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (!Firebase.setFloat(firebaseData, "soil-moisture/value", soil.toFloat())) {
      Serial.println("FAILED to set soil-moisture/value");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (!Firebase.setFloat(firebaseData, "water-level/value", rain.toFloat() / 21)) {
      Serial.println("FAILED to set water-level/value");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

// Max/min checks
// Temperature
    if (Firebase.getFloat(firebaseData, "temperature/max")) {
      float maxTemp = firebaseData.floatData();
      if (maxTemp < temperature.toFloat()) {
        if (!Firebase.setFloat(firebaseData, "temperature/max", temperature.toFloat())) {
          Serial.println("FAILED to set temperature/max");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get temperature/max");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (Firebase.getFloat(firebaseData, "temperature/min")) {
      float minTemp = firebaseData.floatData();
      if (minTemp > temperature.toFloat()) {
        if (!Firebase.setFloat(firebaseData, "temperature/min", temperature.toFloat())) {
          Serial.println("FAILED to set temperature/min");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get temperature/min");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

// Humidity
    if (Firebase.getFloat(firebaseData, "humidity/max")) {
      float maxHumid = firebaseData.floatData();
      if (maxHumid < humid.toFloat()) {
        if (!Firebase.setFloat(firebaseData, "humidity/max", humid.toFloat())) {
          Serial.println("FAILED to set humidity/max");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get humidity/max");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (Firebase.getFloat(firebaseData, "humidity/min")) {
      float minHumid = firebaseData.floatData();
      if (minHumid > humid.toFloat()) {
        if (!Firebase.setFloat(firebaseData, "humidity/min", humid.toFloat())) {
          Serial.println("FAILED to set humidity/min");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get humidity/min");
      Serial.println("REASON: " + firebaseData.errorReason());
    }


// Soil moisture
    if (Firebase.getFloat(firebaseData, "soil-moisture/min")) {
      float minSoil = firebaseData.floatData();
      if (minSoil < soil.toFloat()) {
        if (!Firebase.setFloat(firebaseData, "soil-moisture/min", soil.toFloat())) {
          Serial.println("FAILED to set soil-moisture/min");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get soil-moisture/min");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (Firebase.getFloat(firebaseData, "soil-moisture/max")) {
      float maxSoil = firebaseData.floatData();
      if (maxSoil > soil.toFloat()) {
        if (!Firebase.setFloat(firebaseData, "soil-moisture/max", soil.toFloat())) {
          Serial.println("FAILED to set soil-moisture/max");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get soil-moisture/max");
      Serial.println("REASON: " + firebaseData.errorReason());
    }


// Water level
    if (Firebase.getFloat(firebaseData, "water-level/max")) {
      float maxRain = firebaseData.floatData();
      if (maxRain < rain.toFloat() / 21) {
        if (!Firebase.setFloat(firebaseData, "water-level/max", rain.toFloat() / 21)) {
          Serial.println("FAILED to set water-level/max");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get water-level/max");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

    if (Firebase.getFloat(firebaseData, "water-level/min")) {
      float minRain = firebaseData.floatData();
      if (minRain > rain.toFloat() / 21) {
        if (!Firebase.setFloat(firebaseData, "water-level/min", rain.toFloat() / 21)) {
          Serial.println("FAILED to set water-level/min");
          Serial.println("REASON: " + firebaseData.errorReason());
        }
      }
    } else {
      Serial.println("FAILED to get water-level/min");
      Serial.println("REASON: " + firebaseData.errorReason());
    }


// Set temperature status
    String tempStatus;
    float tempFloat = temperature.toFloat();

    if (tempFloat < 15.0) {
      tempStatus = "Low";
    } else if (tempFloat > 35.0) {
      tempStatus = "High";
    } else {
      tempStatus = "Normal";
    }

    if (!Firebase.setString(firebaseData, "temperature/status", tempStatus)) {
      Serial.println("FAILED to set temperature/status");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

// Set humidity status
    String humidStatus;
    float humidFloat = humid.toFloat();

    if (humidFloat < 50.0) {
      humidStatus = "Low";
    } else if (humidFloat > 90.0) {
      humidStatus = "High";
    } else {
      humidStatus = "Normal";
    }

    if (!Firebase.setString(firebaseData, "humidity/status", humidStatus)) {
      Serial.println("FAILED to set humidity/status");
      Serial.println("REASON: " + firebaseData.errorReason());
    }

// Set water-level status
    // String rainStatus;
    // float rainFloat = (rain.toFloat() / 21);

    // if (rainFloat < 10.0) {
    //   rainStatus = "Low";
    // // } else if (rainFloat > 90.0) {
    // } else if (rainFloat > 50.0) {
    //   rainStatus = "High";
    // } else {
    //   rainStatus = "Normal";
    // }

    // if (!Firebase.setString(firebaseData, "water-level/status", rainStatus)) {
    //   Serial.println("FAILED to set water-level/status");
    //   Serial.println("REASON: " + firebaseData.errorReason());
    // }

// Set soil-moisture status
    String soilStatus;
    float soilFloat = soil.toFloat();

    if (soilFloat < 2800.0) {
      soilStatus = "High";
    } else if (soilFloat > 3500.0) {
      soilStatus = "Low";
    } else {
      soilStatus = "Normal";
    }

    if (!Firebase.setString(firebaseData, "soil-moisture/status", soilStatus)) {
      Serial.println("FAILED to set soil-moisture/status");
      Serial.println("REASON: " + firebaseData.errorReason());
    }


    delay(2500);

}

void Read_Uart() {
  if (mySerial.available() > 0) {
    String append_text = mySerial.readString();
    A = append_text.indexOf("T");
    B = append_text.indexOf("H");
    C = append_text.indexOf("S");
    D = append_text.indexOf("R");
    E = append_text.indexOf("E");
    tt = append_text.substring(A + 1, B);
    hh = append_text.substring(B + 1, C);
    ss = append_text.substring(C + 1, D);
    rr = append_text.substring(D + 1, E);
    append_text = "";

    if (tt != "") {
      temperature = tt;
    }
    if (hh != "") {
      humid = hh;
    }
    if (ss != "") {
      soil = ss;
    } 
    if (rr != ""){
      rain = rr;
    }
  }
}

#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
 
// Config Firebase
#define FIREBASE_HOST "watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "XOMBr8JX1mXKiZQXvbSyhhYEkhLc2f6YWsT9gr6N"
 
// Config connect WiFi
#define WIFI_SSID "KUAY"
#define WIFI_PASSWORD "KUAY"
 

const byte RX = D7;
const byte TX = D8;
SoftwareSerial mySerial(RX,TX);
String append_text, hh, ss, tt, rr, soil, temperature, humid, rain;
int i = 0;

String st = "";
char inChar = ' ';
int A, B, C, D, E;




void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  //testSerial.begin(115200);
 
  WiFi.mode(WIFI_STA);
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
 while(Firebase.failed()){
    Serial.println("hell");
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    //break
    //return ;
  }
}
 
void loop() {


if(Firebase.failed()){


    Serial.println("hell");
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    //break
    //return ;
  }
 
  Read_Uart();
  //Serial.println(Serial.read())

  
    
  Serial.println("t :" + temperature);
   Serial.println("h :" + humid);
    Serial.println("s :" + soil);
      Serial.println("r :" + rain);

//Update humidity temperature
      Firebase.setInt("/temperature/value", temperature.toInt());
      if (Firebase.getInt(firebaseData, "/temperature/max") < temperature.toInt()) {
        Firebase.setInt("/temperature/max", temperature.toInt());
      }
      if (Firebase.getInt(firebaseData, "/temperature/min") > temperature.toInt()) {
        Firebase.setInt("/temperature/min", temperature.toInt());
      }
      if (temperature.toInt() < 15) {
        Firebase.setString("/temperature/status", "Low");
      }
      else if (temperature.toInt() > 35){
        Firebase.setString("/temperature/status", "High");
      } else {
        Firebase.setString("/temperature/status", "Normal");
      }
// Update humidity
      Firebase.setInt("/humidity/value", humidity.toInt());
      if (Firebase.getInt(firebaseData, "/humidity/max") < humidity.toInt()) {
        Firebase.setInt("/humidity/max", humidity.toInt());
      }
      if (Firebase.getInt(firebaseData, "/humidity/min") > humidity.toInt()) {
        Firebase.setInt("/humidity/min", humidity.toInt());
      }
      if (humidity.toInt() < 15) {
        Firebase.setString("/humidity/status", "Low");
      }
      else if (humidity.toInt() > 35) {
        Firebase.setString("/humidity/status", "High");
      } else {
        Firebase.setString("/humidity/status", "Normal");
      }

// Update rain meter
      Firebase.setInt("/rain-meter/value", rainMeter.toInt());
      if (Firebase.getInt(firebaseData, "/rain-meter/max") < rainMeter.toInt()) {
        Firebase.setInt("/rain-meter/max", rainMeter.toInt());
      }
      if (Firebase.getInt(firebaseData, "/rain-meter/min") > rainMeter.toInt()) {
        Firebase.setInt("/rain-meter/min", rainMeter.toInt());
      }
      if (rainMeter.toInt() < 15) {
        Firebase.setString("/rain-meter/status", "Low");
      }
      else if (rainMeter.toInt() > 35) {
        Firebase.setString("/rain-meter/status", "High");
      } else {
        Firebase.setString("/rain-meter/status", "Normal");
      }

// Update soil moisture
      Firebase.setInt("/soil-moisture/value", soilMoisture.toInt());
      if (Firebase.getInt(firebaseData, "/soil-moisture/max") < soilMoisture.toInt()) {
        Firebase.setInt("/soil-moisture/max", soilMoisture.toInt());
      }
      if (Firebase.getInt(firebaseData, "/soil-moisture/min") > soilMoisture.toInt()) {
        Firebase.setInt("/soil-moisture/min", soilMoisture.toInt());
      }
      if (soilMoisture.toInt() < 15) {
        Firebase.setString("/soil-moisture/status", "Low");
      }
      else if (soilMoisture.toInt() > 35) {
        Firebase.setString("/soil-moisture/status", "High");
      } else {
        Firebase.setString("/soil-moisture/status", "Normal");
      }

// Update raining chance
      Firebase.setInt("/raining-chance/value", rainingChance.toInt());
      if (Firebase.getInt(firebaseData, "/raining-chance/max") < rainingChance.toInt()) {
        Firebase.setInt("/raining-chance/max", rainingChance.toInt());
      }
      if (Firebase.getInt(firebaseData, "/raining-chance/min") > rainingChance.toInt()) {
        Firebase.setInt("/raining-chance/min", rainingChance.toInt());
      }
      if (rainingChance.toInt() < 15) {
        Firebase.setString("/raining-chance/status", "Low");
      }
      else if (rainingChance.toInt() > 35) {
        Firebase.setString("/raining-chance/status", "High");
      } else {
        Firebase.setString("/raining-chance/status", "Normal");
      }



    // Firebase.setInt("temperature", temperature.toInt());
    // Firebase.setInt("humidity", humid.toInt());
    // Firebase.setInt("soil", soil.toInt());
    // Firebase.setInt("rain",rain.toInt());
    if (Firebase.failed()) {
        Serial.print("set /number failed:");
        Serial.println(Firebase.error());
        return;
    }
  Serial.print("set /number to ");
  Serial.println(Firebase.getInt("number"));
  i++;


  //delay(1000);
}



void Read_Uart() {

  st = "";
  while (mySerial.available()) {
    inChar = (char)mySerial.read();
    if (inChar == '\n') {
      Serial.println(append_text);
      A = append_text.indexOf("T");
      B = append_text.indexOf("H");
      C = append_text.indexOf("S");
      D = append_text.indexOf("R");
      E = append_text.indexOf("E");
      tt = append_text.substring(A + 1, B);
      hh = append_text.substring(B+1,C);
      ss = append_text.substring(C+1,D);
      rr = append_text.substring(D+1,E)

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

      return;
    }
    
    if (append_text.length() > 15 ) {
      append_text = "";
    } else {
      append_text += inChar;
    }  
  }
  delay(3000);
}
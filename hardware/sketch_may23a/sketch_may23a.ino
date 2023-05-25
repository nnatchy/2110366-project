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
      if (temperature.toInt())
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
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
  //Serial.println(Serial.read())  
  Serial.println("t :" + temperature);
   Serial.println("h :" + humid);
    Serial.println("s :" + soil);
      Serial.println("r :" + rain);
  Firebase.setFloat(firebaseData, "temperature/value", temperature.toFloat() );
  Firebase.setFloat(firebaseData, "humidity/value", humid.toFloat() );
  Firebase.setFloat(firebaseData, "soil-moisture/value", soil.toFloat() );
  Firebase.setFloat(firebaseData, "water-level/value", rain.toFloat() );
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

  // if(Firebase.setFloat(firebaseData, "temperature/value", temperature.toFloat() )) {
  //   Serial.println("PASSED");
  //   Serial.println("PATH: " + firebaseData.dataPath());
  //   Serial.println("TYPE: " + firebaseData.dataType());
  //   Serial.print("VALUE: ");
  //   Serial.println(firebaseData.floatData());
  //   Serial.println("------------------------------------");
  //   Serial.println();
  // } else {
  //   Serial.println("FAILED");
  //   Serial.println("REASON: " + firebaseData.errorReason());
  //   Serial.println("------------------------------------");
  //   Serial.println();
  // }

  delay(1000);


}


void Read_Uart() {

  if (mySerial.available() > 0) {
    String append_text = mySerial.readString();
    // Serial.println(append_text);
    A = append_text.indexOf("T");
    B = append_text.indexOf("H");
    C = append_text.indexOf("S");
    D = append_text.indexOf("R");
      E = append_text.indexOf("E");
      tt = append_text.substring(A + 1, B);
      hh = append_text.substring(B+1,C);
      ss = append_text.substring(C+1,D);
      rr = append_text.substring(D+1,E);
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
  }
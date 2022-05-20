#define RXD2 16
#define TXD2 17

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial2.begin(9600,SERIAL_8N1,RXD2,TXD2);
  Serial2.setTimeout(100);
}

void loop() {
  // put your main code here, to run repeatedly:
  //Serial.println("Hello");
  String recieve=Serial2.readString();
  if(recieve!="")
     Serial.println(recieve);
  //Serial.println("END");
  //delay(200);
}

# envirophat-mqtt
Publish sensor updates from Enviro pHat to MQTT

# Pre-requisites

1. Node js
2. Python
3. Pimoroni libs: `curl https://get.pimoroni.com/envirophat | bash`

# Why Node js?

Selfish reason: Because all my existing home automation runs on Node js managed with PM2.

Even though the provided libraries are Python, and it's pretty easy to publish to MQTT from Python, I wrote this so I could run my entire platform on Node js.


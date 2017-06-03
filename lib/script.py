from envirophat import weather
from envirophat import light
from envirophat import leds

leds.off()

temperature = weather.temperature()
light = light.light()
pressure = weather.pressure()

tmp = weather.temperature()

print "{ \"temperature\": " + temperature + ", \"light\": "+light+", \"pressure\": "+pressure+" }"

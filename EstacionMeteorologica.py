import time
import json
import requests

#cont = 10

while 2 > 1:

#while cont < 20:
   # cont = cont + 1
    #Api tiempo meteorologico
    response = requests.get('http://api.wunderground.com/api/0046ff2a3c970790/conditions/q/ES/caceres.json')
    assert response.status_code == 200
    data = response.json()

    print 'Publicando temperatura grados celsius: ' + str(data['current_observation']['temp_c'])
    temp_grados_celsius = str(data['current_observation']['temp_c'])
    print 'Publicando temperatura grados farenheit: ' + str(data['current_observation']['temp_f'])
    temp_grados_farenheit = str(data['current_observation']['temp_f'])
    print 'Publicando humedad: ' + data['current_observation']['relative_humidity']
    humedad = data['current_observation']['relative_humidity']
    print 'Publicando presion: ' + data['current_observation']['pressure_in']
    presion = data['current_observation']['pressure_in']
    print 'Publicando velocidad viento (mph): ' + str(data['current_observation']['wind_mph'])
    velocidad_viento = str(data['current_observation']['wind_mph'])
    print 'Publicando direccion viento: ' + data['current_observation']['wind_dir']
    direccion = data['current_observation']['wind_dir']

   # print 'Publicando estacion atmosferica: ' + data['current_observation']['observation_location']['full']

    r = requests.post("http://158.49.112.86:8080/api/tiempo", data={'temp_grados_celsius': temp_grados_celsius, 'temp_grados_farenheit': temp_grados_farenheit, 'humedad': humedad, 'presion': presion, 'velocidad_viento': velocidad_viento, 'direccion':direccion})
    print(r.status_code, r.reason)
    
    time.sleep(5)

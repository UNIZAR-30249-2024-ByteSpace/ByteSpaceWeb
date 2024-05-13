# Iniciar geoserver
Para inicar el geoserver necesitaremos estar en el directorio de **docker-compose.yml** y importar los módulos **dbdata.tar.zst** y **geoserverdata.tar.zst**.  

Si se emplea docker desktop, se puede emplear la extension "Volumes Backup & Share" para importar los módulos, estos deben ser importados con sus nombres originales.   
*[En la versión 4.29.0 y posteriores se encuentra la funcionalidad de importar modulos como beta sin necesidad de extensión, es posible que en versiones futuras no se necesite la extensión]*

##

Tras importar los módulos, dentro de una terminal ejecuta el commando
```
docker-compose up
```

Si todo va bien se incializara el geoserver y se podra acceder a el plano coloreado del Ada Byron.
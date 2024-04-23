# DCA Simulator :chart_with_upwards_trend:

El simulador se puede encontrar desplegado en [este enlace](https://dca-simulator.vercel.app/) :link:

> :warning: <span style="color:red">Importante</span>
> El simulador no funcionará sin un Proxy, extensión de navegador o similar que permita evitar el bloqueo de llamadas por CORS

## Despliegue Local :computer:

Para ambos modos de despliegue se debe crear un archivo `.env` en el directorio raíz del proyecto con la siguiente variable:
```env
NEXT_PUBLIC_API_URL=https://www.buda.com/api/v2
```


### Docker :whale:

- En el directorio raíz del proyecto ejecutar: `docker build -t dca-simulator`
- Luego del _build_ ejecutar: `docker run -p 3000:3000 dca-simulator`
- La aplicación debiese estar corriendo en [localhost:3000](http://localhost:3000)

### Usando NPM :package:

- En el directorio raíz del proyecto ejecutar: `npm install`
- Una vez instalados los paquetes ejecutar: `npm run build`
- La aplicación debiese estar corriendo en [localhost:3000](http://localhost:3000)

## Sobre el simulador

### Gráfico

Se hace uso de D3 para graficar:

- El valor del portafolio a través del tiempo
- La inversión total a través del tiempo

### Variables

Las variables con las que se puede interactuar son las siguientes:

- Monto inicial de inversión
- Mercado (todos los disponibles en la API de buda.com)
- Intervalo de inversión (Anual, Mensual, Semanal, Diario)
- Fecha de inicio de simulación
- Fecha de término de simulación

Al cambiar una de las variables el gráfico se actualizará automáticamente.

> :warning: <span style="color:red">Importante</span>
> La simulación se cae cuando el tiempo de la simulación es grande y los intervalos de inversión pequeños debido al límite de llamadas consecutivas de la API de buda.com
> Aparecerá el mensaje de error `429 Too many requests`

### Tabla

La tabla muestra el estado del portafolio y otros datos al momento de invertir

## Sobre el desafío

- Se logra el desafío base (12 meses invirtiendo una vez al mes BTC-CLP)
- Se agregan variables para interactuar con la simulación
- Se despliega en un contenedor de Docker
- Se puede ver la app funcionando [aquí](https://dca-simulator.vercel.app/)
- El diseño es responsivo y se ve bien para **cualquier** ancho de pantalla, incluído mobile
- El código es ordenado y se hace uso de diversos componentes para hacerlo mas legible
- No hay testing



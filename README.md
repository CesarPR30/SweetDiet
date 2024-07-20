# Documentación de la App Sweet Diet

## Términos y Condiciones de Uso de Sweet Diet

### 1. Aceptación de los Términos
Al descargar, instalar y usar la aplicación "Sweet Diet", el usuario acepta cumplir y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con estos términos, por favor, no utilice la aplicación.

### 2. Uso de Datos Personales
**Sweet Diet** recopila datos personales del usuario, incluyendo género, peso, talla y edad, con el único propósito de calcular métricas que ayuden a mejorar la salud del usuario. Estos datos serán tratados con la máxima confidencialidad y no se compartirán con terceros sin el consentimiento explícito del usuario.

### 3. Propósito de la Recopilación de Datos
Los datos personales proporcionados por el usuario serán utilizados exclusivamente para:
- Calcular índices de salud y métricas personalizadas.
- Ofrecer recomendaciones de dieta y ejercicios adaptadas al perfil del usuario.
- Mejorar la experiencia general del usuario dentro de la aplicación.

### 4. Protección de Datos Personales
**Sweet Diet** se compromete a proteger la privacidad del usuario y a implementar medidas de seguridad adecuadas para salvaguardar los datos personales contra el acceso no autorizado, alteración, divulgación o destrucción. Los datos serán almacenados de manera segura y solo accesibles por personal autorizado.

### 5. Derechos del Usuario
El usuario tiene derecho a:
- Acceder a sus datos personales y solicitarlos en cualquier momento.
- Rectificar cualquier dato incorrecto o incompleto.
- Solicitar la eliminación de sus datos personales de nuestros registros.

### 6. Responsabilidades del Usuario
El usuario se compromete a proporcionar información precisa y actualizada. **Sweet Diet** no se hace responsable por las consecuencias derivadas de la información incorrecta o desactualizada proporcionada por el usuario.

### 7. Modificaciones de los Términos y Condiciones
**Sweet Diet** se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será comunicado al usuario a través de la aplicación o por otros medios de contacto. El uso continuado de la aplicación después de la notificación de cambios implica la aceptación de los nuevos términos.

### 8. Contacto
Para cualquier duda o consulta relacionada con estos Términos y Condiciones, por favor, contacte con nosotros a través del correo electrónico: [info@sweetdiet.com](mailto:info@sweetdiet.com).


---
## Política de Privacidad de Sweet Diet

### 1. Introducción
En **Sweet Diet**, valoramos y respetamos la privacidad de nuestros usuarios. Esta política de privacidad explica cómo recopilamos, utilizamos, almacenamos y protegemos la información personal que los usuarios nos proporcionan.

### 2. Información que Recopilamos
**Sweet Diet** recopila los siguientes datos personales del usuario:
- Género
- Peso
- Talla
- Edad

### 3. Uso de la Información Recopilada
La información recopilada se utiliza exclusivamente para:
- Calcular métricas de salud personalizadas.
- Ofrecer recomendaciones dietéticas y de ejercicio adaptadas al perfil del usuario.
- Mejorar la experiencia general dentro de la aplicación.

### 4. Almacenamiento y Protección de la Información
**Sweet Diet** se compromete a proteger la información personal del usuario mediante la implementación de medidas de seguridad técnicas y organizativas adecuadas. La información será almacenada de manera segura y solo será accesible por personal autorizado.

### 5. Compartición de la Información
**Sweet Diet** no compartirá, venderá ni alquilará la información personal del usuario a terceros sin su consentimiento explícito, salvo en los casos requeridos por la ley o para proteger nuestros derechos legales.

### 6. Derechos del Usuario
El usuario tiene los siguientes derechos respecto a su información personal:
- Acceso: El usuario puede solicitar acceso a su información personal en cualquier momento.
- Rectificación: El usuario puede solicitar la corrección de cualquier dato incorrecto o incompleto.
- Eliminación: El usuario puede solicitar la eliminación de su información personal de nuestros registros.
- Restricción: El usuario puede solicitar la restricción del procesamiento de su información personal en determinadas circunstancias.

### 7. Retención de la Información
**Sweet Diet** retendrá la información personal del usuario solo durante el tiempo necesario para cumplir con los fines para los cuales fue recopilada, o según lo requerido por la ley.

### 8. Cambios en la Política de Privacidad
**Sweet Diet** se reserva el derecho de actualizar esta política de privacidad en cualquier momento. Cualquier cambio será notificado al usuario a través de la aplicación o por otros medios de contacto. El uso continuado de la aplicación después de la notificación de cambios implica la aceptación de la nueva política de privacidad.

---
# Plan.js README

## Descripción
Plan.js es un componente de React Native que permite a los usuarios ver y gestionar su plan nutricional diario. Este componente interactúa con Firebase para obtener y guardar datos, y utiliza una API Flask para generar comidas basadas en las necesidades calóricas del usuario, sus alergias y sus disgustos.

## Características
- **Autenticación con Firebase**: El componente verifica que el usuario esté autenticado antes de realizar cualquier acción.
- **Consulta y almacenamiento en Firebase**: Obtiene y guarda planes nutricionales del usuario en Firebase.
- **Generación de comidas**: Genera un plan nutricional diario mediante una API Flask.
- **Navegación por fechas**: Permite a los usuarios navegar a través de diferentes fechas para ver su plan nutricional.
- **Visualización de imágenes**: Obtiene y muestra imágenes de los platos y bebidas utilizando una API de búsqueda de imágenes de Google.

## Dependencias
- `react-native`: Framework para construir aplicaciones móviles.
- `firebase/auth`: Para autenticación de usuarios.
- `firebase/firestore`: Para almacenar y recuperar datos de Firebase Firestore.
- `moment`: Para manejo y manipulación de fechas.
- `axios`: Para realizar solicitudes HTTP a la API.
- `@react-navigation/native`: Para la navegación en la aplicación.
- `@expo/vector-icons`: Para los íconos de navegación.

## Estructura del Componente

### Estado
- `meals`: Lista de comidas para el día seleccionado.
- `loading`: Indica si los datos están cargando.
- `selectedDate`: Fecha seleccionada para mostrar el plan nutricional.
- `noMealsMessage`: Mensaje a mostrar cuando no hay comidas disponibles.
- `canGoBack`: Indica si se puede retroceder a una fecha anterior.

### Efectos
- `fetchUserData`: Se ejecuta al montar el componente y cada vez que cambia la fecha seleccionada. Obtiene los datos del usuario y su plan nutricional de Firebase, y si no hay comidas para la fecha seleccionada, llama a la API para generarlas.
- `checkCanGoBack`: Se ejecuta al montar el componente y cada vez que cambia la fecha seleccionada para verificar si hay datos disponibles para la fecha anterior.

### Funciones
- `fetchMealsWithRetry`: Intenta obtener datos de la API hasta un número máximo de reintentos en caso de fallo.
- `saveMealsToFirebase`: Guarda el plan nutricional generado en Firebase.
- `fetchMealsFromFirebase`: Obtiene el plan nutricional del usuario de Firebase para una fecha específica.
- `fetchImage`: Obtiene una imagen de un plato o bebida usando la API de búsqueda de imágenes de Google.
- `handlePress`: Navega a la pantalla de detalles de una comida cuando se presiona una comida específica.
- `renderItem`: Renderiza un elemento de comida.
- `renderMealSection`: Renderiza una sección de comidas (Desayuno, Almuerzo, Cena).
- `changeDate`: Cambia la fecha seleccionada.

### Renderizado
- Muestra el plan nutricional con la opción de navegar por fechas.
- Muestra un indicador de carga mientras los datos se están obteniendo.
- Muestra un mensaje cuando no hay comidas disponibles para la fecha seleccionada.
- Renderiza las secciones de comidas (Desayuno, Almuerzo, Cena) con sus respectivos platos y bebidas.

## API Flask
La API Flask genera un plan nutricional basado en las calorías diarias requeridas, alergias y disgustos del usuario. La respuesta sigue una estructura JSON específica.

### Ejemplo de Solicitud a la API
```json
{
  "kcal": 2000,
  "allergies": ["nueces"],
  "dislikes": ["brócoli"]
}
```
### Ejemplo de Respuesta de la API
```json
{
  "Comidas": {
    "Desayuno": {
      "Bebida": {
        "Titulo": "Jugo de naranja",
        "Kcal": 100,
        "Tiempo": "5 minutos",
        "Dificultad": "Fácil",
        "Ingredientes": ["Naranjas", "Azúcar"],
        "Preparacion": ["Exprimir naranjas", "Agregar azúcar", "Mezclar bien"]
      },
      "Plato": {
        "Titulo": "Tostadas con aguacate",
        "Kcal": 300,
        "Tiempo": "10 minutos",
        "Dificultad": "Fácil",
        "Ingredientes": ["Pan", "Aguacate", "Sal"],
        "Preparacion": ["Tostar el pan", "Aplastar el aguacate", "Untar el aguacate en el pan"]
      }
    },
    "Almuerzo": {
      "Bebida": {
        "Titulo": "Agua",
        "Kcal": 0,
        "Tiempo": "1 minuto",
        "Dificultad": "Fácil",
        "Ingredientes": ["Agua"],
        "Preparacion": ["Servir agua en un vaso"]
      },
      "Plato": {
        "Titulo": "Ensalada de pollo",
        "Kcal": 500,
        "Tiempo": "20 minutos",
        "Dificultad": "Media",
        "Ingredientes": ["Pollo", "Lechuga", "Tomate"],
        "Preparacion": ["Cocer el pollo", "Cortar la lechuga y el tomate", "Mezclar todos los ingredientes"]
      }
    },
    "Cena": {
      "Bebida": {
        "Titulo": "Té",
        "Kcal": 2,
        "Tiempo": "5 minutos",
        "Dificultad": "Fácil",
        "Ingredientes": ["Té", "Agua"],
        "Preparacion": ["Hervir agua", "Agregar té", "Servir"]
      },
      "Plato": {
        "Titulo": "Sopa de verduras",
        "Kcal": 200,
        "Tiempo": "30 minutos",
        "Dificultad": "Media",
        "Ingredientes": ["Zanahorias", "Papas", "Caldo de verduras"],
        "Preparacion": ["Cortar las verduras", "Hervir en caldo", "Servir caliente"]
      }
    }
  }
}
```
---
# Compra (.js)

## Descripción

Implementación de la sección de una aplicación móvil en React que facilita al usuario la elección de un supermercado, ya sea Plaza Vea o Metro, para buscar productos en el servidor Flask. La app realiza envíos de solicitudes POST a los endpoints de Flask y presenta los resultados de búsqueda en su interfaz.

## Código

### Dependencias

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
```

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React Native**: Framework para construir aplicaciones móviles usando React.
- **Axios**: Biblioteca para hacer solicitudes HTTP.

### Componente Principal

```javascript
const App = () => {
  const [data, setData] = useState(null);

  const buscarPlazaVea = async () => {
    try {
      const response = await axios.post(
        'http://192.168.18.99:5000/busqueda-plaza-vea',
        {
          busquedas: [
            'palta fuerte',
            'nueces bells',
            'limon acido',
            'yogurt galonera',
            'arroz 5kg',
            'azucar 5kg',
            'manzana delicia',
            'tomate redondo',
            'naranja de mesa',
          ],
        },
      );
      setData(response.data);
    } catch (error) {
    } finally {
    }
  };

  const buscarMetro = async () => {
    try {
      const response = await axios.post(
        'http://192.168.18.99:5000/busqueda-metro',
        {
          busquedas: [
            'palta fuerte',
            'nueces peladas',
            'limon kg',
            'yogurt galonera',
            'arroz 5kg',
            'azucar 5kg',
            'manzana kg',
            'tomate kg',
            'naranja de mesa',
          ],
        },
      );
      setData(response.data);
    } catch (error) {
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione su supermercado</Text>
      <TouchableOpacity style={styles.buttonPlazaVea} onPress={buscarPlazaVea}>
        <Image source={require('./plazavea.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonMetro} onPress={buscarMetro}>
        <Image source={require('./metro.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};

export default App;
```

#### Estados y Funciones

- **buscarPlazaVea**: Función asíncrona que envía una solicitud POST al endpoint de Plaza Vea y actualiza el estado con los datos recibidos.
- **buscarMetro**: Función asíncrona que envía una solicitud POST al endpoint de Metro y actualiza el estado con los datos recibidos.

## Uso

1. La aplicación muestra dos botones con imágenes representativas de Plaza Vea y Metro.
2. Al presionar un botón, se envía una solicitud POST al servidor Flask correspondiente para buscar los productos.
3. Los resultados se muestran en formato JSON en la interfaz de la aplicación.

### Ejemplo de Solicitud y Respuesta

#### Solicitud POST a Plaza Vea

```json
{
  "busquedas": [
    "palta fuerte",
    "nueces bells",
    "limon acido",
    "yogurt galonera",
    "arroz 5kg",
    "azucar 5kg",
    "manzana delicia",
    "tomate redondo",
    "naranja de mesa"
  ]
}
```

#### Respuesta

```json
[
  {
    "producto": "Palta Fuerte",
    "precio": 7.99
  },
  {
    "producto": "Nueces Bells",
    "precio": 25.00
  }
  // demás productos
]
```


---

# Lista Productos API (.py)

## Descripción

Implementación de un servidor web con Flask que procesa solicitudes para buscar precios de productos en los sitios web de Metro y Plaza Vea, utilizando Selenium para automatizar la navegación y recolección de los datos. El servidor ofrece dos rutas: `/busqueda-metro` y `/busqueda-plaza-vea`, que reciben solicitudes POST con los términos a buscar y retornan los nombres y precios de los productos hallados.

## Código

### Dependencias

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
```

- **Flask**: Framework para crear aplicaciones web.
- **Flask-CORS**: Extensión para permitir solicitudes CORS.
- **Selenium**: Herramienta para automatizar navegadores web.
- **WebDriverWait y expected_conditions**: Utilizados para esperar elementos específicos en la página.

### Rutas

#### `/busqueda-metro`

```python
@app.route('/busqueda-metro', methods=['POST'])
def obtener_precio_metro():
    data = request.json
    busquedas = data['busquedas']
    resultado = []

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 60)

    def buscar_en_metro(termino):
        driver.get('https://www.metro.pe/' + termino)

        productData = []
        try:
            nombre = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'span.vtex-product-summary-2-x-productBrand')))
            productData.append(nombre.text)

            precioInt = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'span.vtex-product-price-1-x-currencyInteger')))
            precioFrac = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'span.vtex-product-price-1-x-currencyFraction')))
            precio = float(precioInt.text + '.' + precioFrac.text)
            productData.append(precio)
        except Exception as e:
            print(f"Error al buscar {termino}: {e}")
        return productData

    for busqueda in busquedas:
        productData = buscar_en_metro(busqueda)
        resultado.append({
            'producto': productData[0],
            'precio': productData[1]
        })

    driver.quit()

    return jsonify(resultado)
```

- **buscar_en_metro**: Toma un término de búsqueda, navega al sitio de Metro, y extrae el nombre y precio del producto.
- **obtener_precio_metro**: Procesa la solicitud POST, ejecuta las búsquedas y devuelve los resultados en formato JSON.

#### `/busqueda-plaza-vea`

```python
@app.route('/busqueda-plaza-vea', methods=['POST'])
def obtener_precio_plaza_vea():
    data = request.json
    busquedas = data['busquedas']
    resultado = []

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 60)

    def buscar_en_plazavea(termino):
        driver.get('https://www.plazavea.com.pe/search/?_query=' + termino)

        productData = []
        try:
            nombre = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.Showcase__details__text a')))
            productData.append(nombre.text)

            precio = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.Showcase__salePrice')))
            productData.append(float(precio.get_attribute('data-price')))
        except Exception as e:
            print(f"Error al buscar {termino}: {e}")
        return productData

    for busqueda in busquedas:
        productData = buscar_en_plazavea(busqueda)
        resultado.append({
            'producto': productData[0],
            'precio': productData[1],
        })

    driver.quit()

    return jsonify(resultado)
```

- **buscar_en_plazavea**: Toma un término de búsqueda, navega al sitio de Plaza Vea, y extrae el nombre y precio del producto.
- **obtener_precio_plaza_vea**: Ruta que procesa la solicitud POST, ejecuta las búsquedas y devuelve los resultados en formato JSON.

### Ejecución del Servidor

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

- Inicia el servidor en el puerto 5000 y permite accesos desde cualquier dirección IP.

## Uso

1. Enviar una solicitud POST a `/busqueda-metro` o `/busqueda-plaza-vea` con un JSON que contenga una lista de términos de búsqueda.
2. El servidor devolverá un JSON con los nombres y precios de los productos encontrados.

### Ejemplo de Solicitud

```json
POST /busqueda-metro
{
    "busquedas": ["arroz", "azucar"]
}
```

### Ejemplo de Respuesta

```json
[
    {
        "producto": "Arroz",
        "precio": 5.99
    },
    {
        "producto": "Azucar",
        "precio": 3.49
    }
]
```
---
# Registro y Login en React Native con Firebase

## Descripción

Esta implementación en React Native permite a los usuarios registrarse y autenticarse utilizando Firebase para la autenticación y almacenamiento en tiempo real. Se proporciona una interfaz intuitiva para la recolección de datos del usuario y la creación de nuevas cuentas en Firebase. La información del usuario, como nombre, correo electrónico, talla, peso, edad, género y nivel de actividad física, se almacena en la base de datos en tiempo real de Firebase.


## Dependencias

```javascript
import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import app from "../credenciales";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
```


React: Biblioteca de JavaScript para construir interfaces de usuario.

React Native: Framework para desarrollar aplicaciones móviles.

Expo: Plataforma para React Native que proporciona herramientas y servicios.

Firebase: Plataforma de Google para el desarrollo de aplicaciones web y móviles, proporcionando autenticación y base de datos en tiempo real.

## Implentación del Register.js

```javascript
const auth = getAuth(app);
const db = getDatabase(app);

export default function Register(props) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [talla, setTalla] = useState('');
    const [peso, setPeso] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('');
    const [actividadFisica, setActividadFisica] = useState('');

    const registro = async () => {
        if (validarCampos()) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const userId = userCredential.user.uid;

                await set(ref(db, `users/${userId}`), {
                    nombre,
                    email,
                    talla,
                    peso,
                    edad,
                    genero,
                    actividadFisica
                });

                Alert.alert('Registro exitoso', 'Te has registrado correctamente');
                props.navigation.navigate('AdditionalInfo', { userId });
            } catch (error) {
                console.log(error);
                Alert.alert('Error', 'Hubo un error en el registro. Por favor, intenta nuevamente.');
            }
        } else {
            Alert.alert('Campos incompletos', 'Por favor, completa todos los campos antes de registrarte.');
        }
    };

    const validarCampos = () => {
        return nombre && email && password && talla && peso && edad && genero && actividadFisica;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.inner}>
                    <View style={styles.header}>
                        <Text style={styles.title}>📝 Registro</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="person-circle" size={24} color="#4CAF50" />
                        <TextInput
                            placeholder="Nombre"
                            placeholderTextColor="#4CAF50"
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="mail" size={24} color="#4CAF50" />
                        <TextInput
                            placeholder="Correo"
                            placeholderTextColor="#4CAF50"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed" size={24} color="#4CAF50" />
                        <TextInput
                            placeholder="Contraseña"
                            placeholderTextColor="#4CAF50"
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="fitness" size={24} color="#4CAF50" />
                        <TextInput
                            placeholder="Talla (cm)"
                            placeholderTextColor="#4CAF50"
                            style={styles.input}
                            value={talla}
                            onChangeText={setTalla}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="barbell" size={24} color="#4CAF50" />
                        <TextInput
                            placeholder="Peso (kg)"
                            placeholderTextColor="#4CAF50"
                            style={styles.input}
                            value={peso}
                            onChangeText={setPeso}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="calendar" size={24} color="#4CAF50" />
                        <TextInput
                            placeholder="Edad"
                            placeholderTextColor="#4CAF50"
                            style={styles.input}
                            value={edad}
                            onChangeText={setEdad}
                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Ionicons name="male-female" size={24} color="#4CAF50" />
                        <Picker
                            selectedValue={genero}
                            style={styles.picker}
                            onValueChange={(itemValue) => setGenero(itemValue)}
                        >
                            <Picker.Item label="Selecciona Género" value="" />
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Femenino" value="femenino" />
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Ionicons name="walk" size={24} color="#4CAF50" />
                        <Picker
                            selectedValue={actividadFisica}
                            style={styles.picker}
                            onValueChange={(itemValue) => setActividadFisica(itemValue)}
                        >
                            <Picker.Item label="Selecciona Actividad Física" value="" />
                            <Picker.Item label="Ganar peso" value="ganar_peso" />
                            <Picker.Item label="Perder peso" value="perder_peso" />
                            <Picker.Item label="Mantener peso" value="mantener_peso" />
                        </Picker>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={registro}>
                            <Text style={styles.buttonText}>Registrarse 🚀</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flexGrow: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        paddingVertical: 10,
        width: '100%',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        paddingVertical: 10,
        width: '100%',
    },
    picker: {
        flex: 1,
        marginLeft: 10,
        color: '#4CAF50',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#4CAF50',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
```
## Implementación del Login.js

```javascript
import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import app from "../credenciales";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const auth = getAuth(app);
const db = getDatabase(app);

export default function Login(props) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logueo = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const userRef = ref(db, `users/${userId}/nombre`);
            const snapshot = await get(userRef);
            if (snapshot.exists() && snapshot.val() === nombre) {
                Alert.alert('Iniciando sesión', 'Accediendo...');
                props.navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'El nombre no coincide con el registrado.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El usuario o la contraseña son incorrectos');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.inner}>
                    <Image source={require('../assets/salud.jpg')} style={styles.backgroundImage} />

                    <View style={styles.overlay}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Iniciar Sesión</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="person-circle" size={24} color="white" />
                            <TextInput
                                placeholder="Nombre"
                                placeholderTextColor="white"
                                style={styles.input}
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail" size={24} color="white" />
                            <TextInput
                                placeholder="Correo"
                                placeholderTextColor="white"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed" size={24} color="white" />
                            <TextInput
                                placeholder="Contraseña"
                                placeholderTextColor="white"
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={logueo}>
                                <Text style={styles.buttonText}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.registerButton]}
                                onPress={() => props.navigation.navigate('Register')}
                            >
                                <Text style={styles.buttonText}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Fondo negro translúcido
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    registerButton: {
        backgroundColor: '#FF6F61',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
```

## Estructura del proyecto para el Register y Login

```javascript
├── /src
│   ├── /screens
│   │   ├── Register1.js
│   │   ├── Register2.js
│   │   ├── Register3.js
│   │   ├── Register4.js
│   │   ├── Register5.js
│   │   ├── Register6.js
│   │   ├── Login1.js
│   │   ├── Login2.js
│   │   └── Login.js
│   │
│   ├── /assets
│   │   └── ...jpg
│   │
│   │
│   ├── BottomTabNavigator.js
│   ├── firebaseConfig.js
│   └── App.js
│
├── .gitignore
├── app.json
├── package.json
└── README.md

```

## Estilos

Los estilos se definen utilizando StyleSheet.create para mayor eficiencia.

## Notas Adicionales

- **Navegación**: El proyecto utiliza React Navigation para manejar la navegación entre las pantallas de registro y login.
- **Validaciones**: Se puede agregar validaciones adicionales en los formularios de registro y login para asegurar que los datos del usuario sean correctos y completos.
- **Seguridad**: Se pueden agregar verificaciones adicionales como la verificación de correo electrónico, para mejorar la seguridad de tu aplicación.

## Manejo de Errores

Manejamos los errores de autenticación y registro de manera adecuada para proporcionar una mejor experiencia al usuario. 

- **Error de Autenticación**: "El usuario o la contraseña son incorrectos."
- **Error de Registro**: "El correo electrónico ya está en uso."

## Resumen

Este proyecto proporciona una implementación básica de un sistema de registro y login en React Native utilizando Firebase para la autenticación y almacenamiento de datos en tiempo real.
[Documentación oficial de Firebase](https://firebase.google.com/docs) y la [Documentación de React Native](https://reactnative.dev/docs/getting-started).





from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re

app = Flask(__name__)
CORS(app)

def clean_data(ingredient_list):
    cleaned_list = []
    words_to_remove = ['taza', 'tazas', 'cucharada', 'cucharadas', 'de', 'quinoa', 'Quinoa']

    for item in ingredient_list:
        item = item.lower()
        if 'aguacate' in item:
            item = item.replace('aguacate', 'palta')

        cleaned_item = re.sub(r'\b\d+/?\d*\b', '', item)
        
        pattern = r'\b(?:' + '|'.join(words_to_remove) + r')\b'
        cleaned_item = re.sub(pattern, '', cleaned_item)
        
        if '(' in cleaned_item and ')' in cleaned_item:
            inside_parentheses = re.search(r'\(([^)]+)\)', cleaned_item).group(1)
            first_option = inside_parentheses.split(',')[0].split(' o ')[0].strip()
            cleaned_item = re.sub(r'\([^)]*\)', first_option, cleaned_item)
        
        cleaned_item = ' '.join(cleaned_item.split())
        cleaned_list.append(cleaned_item)
    
    return cleaned_list


@app.route('/busqueda-metro', methods=['POST'])
def obtener_precio_metro():
    data = request.json
    busquedas = clean_data(data['busquedas'])
    print(busquedas)
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
            print(nombre.text)

            precioInt = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'span.vtex-product-price-1-x-currencyInteger')))
            precioFrac = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'span.vtex-product-price-1-x-currencyFraction')))
            precio = precioInt.text + '.' + precioFrac.text
            productData.append(precio)
        except Exception as e:
            print(f"Error al buscar {termino}: {e}")
            productData.append('N/A')
            productData.append(0)
        return productData

    for busqueda in busquedas:
        productData = buscar_en_metro(busqueda)
        resultado.append({
            'producto': productData[0],
            'precio': productData[1]
        })

    driver.quit()

    return jsonify(resultado)


@app.route('/busqueda-plaza-vea', methods=['POST'])
def obtener_precio_plaza_vea():
    data = request.json
    busquedas = clean_data(data['busquedas'])
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
            print(nombre.text)

            precio = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.Showcase__salePrice')))
            productData.append(float(precio.get_attribute('data-price')))
        except Exception as e:
            print(f"Error al buscar {termino}: {e}")
            productData.append('N/A')
            productData.append(0)
        return productData

    for busqueda in busquedas:
        productData = buscar_en_plazavea(busqueda)
        resultado.append({
            'producto': productData[0],
            'precio': productData[1],
        })

    driver.quit()

    return jsonify(resultado)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
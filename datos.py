import pytesseract
from PIL import Image
import cv2
import numpy as np

nombre_archivo = "src/assets/images/imagen1.jpg"  # tu imagen

try:
    # 1. Cargar imagen con OpenCV
    img = cv2.imread(nombre_archivo)

    # 2. Convertir a escala de grises
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 3. Quitar ruido con un blur suave
    gray = cv2.medianBlur(gray, 3)

    # 4. Invertir colores (texto blanco → negro)
    inverted = cv2.bitwise_not(gray)

    # 5. Binarización adaptativa
    binarizada = cv2.adaptiveThreshold(
        inverted, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY,
        31, 15
    )

    # 6. Opcional: aumentar tamaño de la imagen (mejora OCR)
    scale_percent = 200  # duplicar tamaño
    width = int(binarizada.shape[1] * scale_percent / 100)
    height = int(binarizada.shape[0] * scale_percent / 100)
    binarizada = cv2.resize(binarizada, (width, height), interpolation=cv2.INTER_LINEAR)

    # 7. Guardar debug para revisión
    cv2.imwrite("debug_mejorado.png", binarizada)

    # 8. Configuración de Tesseract (modo español + solo letras/números básicos)
    custom_config = r'--oem 3 --psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁÉÍÓÚáéíóúÑñ0123456789@.:- '


    texto = pytesseract.image_to_string(binarizada, lang="spa", config=custom_config)

    print("Texto detectado limpio:\n")
    print(texto)

except Exception as e:
    print("Error:", e)
/**
 * Google Apps Script для приема данных из формы RSVP
 *
 * Инструкция по настройке:
 * 1. Откройте https://script.google.com
 * 2. Создайте новый проект
 * 3. Скопируйте этот код (замените SHEET_ID на ID вашей таблицы)
 * 4. Нажмите "Развертывание" -> "Новое развертывание"
 * 5. Выберите тип: "Веб-приложение"
 * 6. Настройки доступа: "Доступно всем, в том числе анонимным пользователям"
 * 7. Нажмите "Развернуть" и скопируйте URL веб-приложения
 * 8. Вставьте этот URL в index.html вместо YOUR_SCRIPT_URL_HERE
 */

const SHEET_ID = 'ВАШ_SHEET_ID_ЗДЕСЬ' // Замените на ID вашей Google Таблицы

function doPost(e) {
  try {
    // Получаем данные из запроса
    const data = JSON.parse(e.postData.contents)

    // Открываем таблицу
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

    // Добавляем заголовки, если их нет
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Дата отправки',
        'Имя гостя',
        'Присутствие',
        'Диета',
        'Примечание к диете',
        'Напитки',
        'Спутник',
        'Имя спутника',
        'Комментарий',
      ])
    }

    // Добавляем данные в таблицу
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attendance || '',
      data.diet || '',
      data.dietNote || '',
      Array.isArray(data.drinks) ? data.drinks.join(', ') : data.drinks || '',
      data.plusOne || '',
      data.partnerName || '',
      data.comment || '',
    ])

    // Возвращаем успешный ответ
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success' }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // Возвращаем ошибку
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', message: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    'Скрипт работает! Используйте POST запросы для отправки данных.',
  )
}

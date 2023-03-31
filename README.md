# Домашнее задание к занятию "7. Работа с HTTP"

Правила сдачи задания:

1. **Важно**: в рамках этого ДЗ нужно использовать npm (а значит, никакого `yarn.lock` в репозитории быть не должно)
1. Frontend должен собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
1. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages
1. В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
1. Авто-тесты писать не требуется

**Важно**: в данном ДЗ вам потребуется выполнить мини-проект. Мы понимаем, что он может занять чуть больше времени, чем обычные ДЗ, но тема HTTP настолько важна, что стоит уделить этому чуть больше времени.

---
[![Build status](https://ci.appveyor.com/api/projects/status/tltydthgnjs34v0c?svg=true)](https://ci.appveyor.com/project/Turovae/ahj-http-helpdesk-client)
---

### HelpDesk: Frontend

#### Легенда

Часть API вами написано, пора приступить к своим прямым обязанностям - написанию фронтенда, который будет с этим API работать.

#### Описание

Общий вид списка тикетов (должны загружаться с сервера в формате JSON):

![](./pic/helpdesk.png)

Модальное окно добавления нового тикета (вызывается по кнопке "Добавить тикет" в правом верхнем углу):

![](./pic/helpdesk-2.png)

Модальное окно редактирования существующего тикета (вызвается по кнопке с иконкой "✎" - карандашик):

![](./pic/helpdesk-3.png)

Модальное окно подтверждения удаления (вызывается по кнопке с иконкой "x" - крестик):

![](./pic/helpdesk-4.png)

Для просмотра деталей тикета нужно нажать на тело тикета (но не на кнопки - "сделано", "редактировать" или "удалить"):

![](./pic/helpdesk-5.png)

Ваше приложение должно реализовывать следующий функционал:
* Отображение всех тикетов
* Создание нового тикета
* Удаление тикета
* Изменение тикета
* Получение подробного описание тикета
* Отметка о выполнении каждого тикета

Весь этот функционал должен быть связан с сервером через методы. Например для удаления нужно отправить запрос с соответствующим методом, получить подтверждение и подтянуть обновлённый список тасков.

В качестве бонуса можете отображать какую-нибудь иконку загрузки (см. https://loading.io) на время подгрузки.

Авто-тесты к данной задаче не требуются. Все данные и изменения должны браться/сохраняться на сервере, который вы написали в предыдущей задаче.

В качестве результата пришлите проверяющему ссылку на GitHub репозиторий.

<details>
<summary>Заметка</summary>
    
Для получения данных с сервера вы можете использовать [XMLHttpRequest](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) или [fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch). Мы рекомендуем в fetch, но выбор остаётся за вами.
</details>

P.S. Подгрузка подробного описания специально организована в виде отдельного запроса, мы прекрасно понимаем, что на малых объёмах информации нет смысла делать её отдельно.

---

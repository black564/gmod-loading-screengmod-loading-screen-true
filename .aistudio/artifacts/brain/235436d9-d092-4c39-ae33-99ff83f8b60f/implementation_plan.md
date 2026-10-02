# План интеграции логотипа MoonRP в Garry's Mod (DarkRP)

## 1. Интеграция в Экран загрузки (sv_loadingurl)
- **Анимированный вариант**:
  - Экспорт WebM видео или автономного HTML/CSS/Canvas шаблона.
  - Подключение стандартных событий Garry's Mod JS API (`GameDetails`, `DownloadingFile`, `SetFilesTotal`, `SetFilesNeeded`).
  - Размещение на веб-хостинге или локальном FastDL сервере.
  - Прописка параметра `sv_loadingurl "https://ваш-домен.ru/loading/?steamid=%s&mapname=%m"` в `server.cfg`.

## 2. Интеграция в игровой HUD DarkRP
- **Способ А (Нативный VTF/VMT материал через Lua `surface.DrawTexturedRect`)**:
  - Конвертация PNG логотипа в формат Source Engine `.vtf` (Valve Texture Format) и создание `.vmt` файла.
  - Настройка автоматической загрузки игрокам через `resource.AddFile("materials/moonrp/logo.vmt")`.
  - Создание клиентского скрипта `garrysmod/lua/autorun/client/cl_moonrp_hud.lua` с отрисовкой водяного знака в хуке `HUDPaint`.
- **Способ Б (Анимированный DHTML HUD)**:
  - Использование встроенного в GMod браузера Awesomium/Chromium через `vgui.Create("DHTML")` для показа живой 60 FPS веб-анимации прямо в игре.

## 3. Добавление интерактивного генератора кода в приложение
- Внедрить в студию MoonRP вкладку **«Инструкция и Lua-код»** с готовыми файлами для скачивания (готовый `cl_moonrp_hud.lua`, `index.html` для экрана загрузки, `server.cfg` сниппеты).

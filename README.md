# NAUROK API

# Короткая инструкция использования

join_test_game() принимает 2 аргумента id (айди теста) и name (имя проходящего тест)

set_test_answer() принимает 5 аргументов sessionId (айди сессии), answerId (айди ответа), questionId (айди вопроса), point (поинты) , homework (домашняя работа)

get_session_token_from_test() принимает 1 аргумент html парсит сессию с сайта

get_test_session() принимает 1 агрумент Session парсит json данные (имя теста, данные про вопросы и т.д.)

end_test_session() принимает 1 аргумент Session завершает сессию теста

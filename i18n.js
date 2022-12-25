import { I18n } from 'i18n-js';
import ru from './src/constants/translations/ru/ru.json'
import uz from './src/constants/translations/uz/uz'
const translations = { ru, uz };
const i18n = new I18n(translations);
i18n.enableFallback = true;
// i18n.locale = 'ru'
export default i18n
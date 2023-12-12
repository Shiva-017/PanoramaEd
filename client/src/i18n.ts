import i18next from "i18next";
import  {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';



i18next.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns:['common'],
        backend:{
            loadPath: ' /i18n/{{lng}}/{{ns}}.json',
        },
        debug: true,
        interpolation:{
            escapeValue: false
        },
    });


export default i18next;
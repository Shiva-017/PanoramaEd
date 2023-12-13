import i18next from "i18next";
import  {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';

export const changeLanguage = (language:string)=>{
    i18next.changeLanguage(language);
}

i18next.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns:['common', 'college-compare', 'college-page', 'navbar', 'student-profile','student-metric-form','student-profile','suggested-colleges','students-post','login'],
        backend:{
            loadPath: ' /i18n/{{lng}}/{{ns}}.json',
        },
        debug: true,
        interpolation:{
            escapeValue: false
        },
    });


export default i18next;
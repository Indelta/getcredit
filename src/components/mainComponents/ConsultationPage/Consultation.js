import React from 'react';
import ConsultationFormBlock from './ConsultationForm';
import './consultation.scss';

const Consultation = () => {
    return (
        <section id="consultation">
            <div className="container">
                <h1>Проверка кредитной истории</h1>
                <p>Кредитная история – это сведения о всех сделках кредитного характера и договорах обеспечения (займ, кредит, поручительство, овердрафт, залог, гарантия) физических и юридических лиц, которые хранятся в Национальном банке Республики Беларусь. </p>
                <p className="strong">Внимание! Мы рекомендуем получить кредитный отчет до момента обращения в банки или финансовые организации.</p>
                <p className="strong">Наши специалисты помогут вам разобраться в кредитном отчете, подберут наиболее подходящие кредитные продукты на основании вашей скоринговой оценки.</p>
                <ConsultationFormBlock />
                <p>Хотя кредитная история носит информационный характер, при принятии решения о выдаче кредита, большинство банков и финансовых организаций берёт её за основу. Вероятность одобрения и размер необходимой суммы будут зависеть от скоринговой оценки. <span className="strong">Отказ в получении кредита также фиксируется в кредитной истории и уменьшает ваши шансы при повторном обращении в банки и другие финансовые организации.</span></p>
                <h2>Кредитные истории содержат:</h2>
                <ul>
                    <li>данные о физических или юридических лицах (ФИО, дата рождения, место регистрации  идентификационный номер, гражданство, - для физ. лиц; УНП, наименование, место нахождения, ЕГР, основной вид деятельности - для юр. лиц.;</li>
                    <li>данные о заключенных договорах кредитного характера;</li>
                    <li>сведения об исполнении клиентами своих обязательств (история погашения полученных средств, данные о просрочках и прекращения действия договоров);</li>
                    <li>скоринговая оценка кредитной истории Национального банка;</li>
                    <li>сведения о запросах кредитной истории;</li>
                </ul>
                <h2>Скоринговая оценка содержит 3 позиции:</h2>
                <ol>
                    <li><span className="strong">Класс рейтинга</span> — от A до F (всего  16 классов). (Чем выше этот показатель, тем выше  кредитный рейтинг и вероятность одобрения кредита)</li>
                    <li><span className="strong">Скорбалл</span> — итоговая оценка в баллах (от 0 до 400), которая рассчитывается на основе математической формулы</li>
                    <li><span className="strong">PPD</span> — вероятность  появления просрочки больше 90 дней в течение следующего календарного года. (А процентах — от 0% до 100%.)</li>
                </ol>
                <p>Каждый гражданин Республики Беларусь может получить кредитный отчет в режиме онлайн на сайте Кредитного регистра (<a href="www.creditregister.by" target="_blank" rel="noopener noreferrer">www.creditregister.by</a>). Для этого необходимо пройти регистрацию в Межбанковской системе идентификации (<a href="https://ipersonal.raschet.by/" target="_blank" rel="noopener noreferrer">https://ipersonal.raschet.by/</a>). Один раз в течение календарного года кредитный отчет предоставляется бесплатно, дальнейшие повторные обращения будут платными. </p>
            </div>
        </section>
    );
}

export default Consultation;
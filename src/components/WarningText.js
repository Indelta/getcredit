import React from 'react';
import RulesLink from './RulesLink';
import PolicyLink from './PolicyLink';

const WarningText = (props) => {
    return (
        <div className="warning-text">
            <p>Нажимая "{props.btnName}" вы соглашаетесь с <RulesLink>правилами</RulesLink> обработки персональный данных и подтверждаете, что ознакомились с <PolicyLink>политикой конфиденциальности</PolicyLink></p>
        </div>
    );
}

export default WarningText;
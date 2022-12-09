import React, {useEffect} from 'react';

function AuthForm({name, title, btnText, children, onSubmit}) {

    return (
        <div className="auth__container">
            <form className="auth__content" noValidate name={name} onSubmit={onSubmit}>
                <h1 className="auth__title">{title}</h1>
                {children}
                <button className="auth__btn" type="submit">{btnText}</button>
            </form>
        </div>
    );
}

export default AuthForm;

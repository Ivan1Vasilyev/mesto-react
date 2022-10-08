import React, { useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

const Main = props => {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  useState(() => {
    api
      .getUserInfo()
      .then(response => {
        setUserName(response.name);
        setUserDescription(response.about);
        setUserAvatar(response.avatar);
      })
      .catch(console.log);
  }, []);

  useState(() => {
    api
      .getDefaultCards()
      .then(response => {
        setCards(cards.concat(response));
      })
      .catch(console.log);
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        </button>
        <div className="profile__info">
          <h1 className="profile__user-name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__user-info">{userDescription}</p>
        </div>
        <button className="profile__button" type="button" aria-label="Добавить картинку" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map(card => (
            <Card onCardClick={props.onCardClick} key={card._id} card={card} onBasketClick={props.onBasketClick} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
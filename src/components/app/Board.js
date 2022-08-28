import React, { useState } from 'react';
import store from '../../utils/data'
import { v4 as uuid } from 'uuid';
import List from '../simple/List';
import StoreApi from '../../utils/storeApi';
import { Container, Draggable } from 'react-smooth-dnd';
import ListComposer from '../simple/ListComposer';

export default function Board() {
  const [data, setData] = useState(store);

  const addCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title: title
    };
    const list = data[listId];
    list.cards.push(newCard)
    const newState = {
      ...data,
      [listId]: list
    };
    setData(newState);
  };

  const addList = (name) => {
    const newListId = uuid();
    const newListOrder = [...data.listOrder, newListId];
    const newState = {
      ...data,
      [newListId]: {
        name: name,
        cards: []
      },
      listOrder: newListOrder
    };
    setData(newState);
  };

  const renameList = (listId, newName) => {
    const list = data[listId];
    list.name = newName;

    const newState = {
      ...data,
      [listId]: list
    };

    setData(newState);
  };

  const deleteList = (listId) => {
    const newState = Object.assign({}, data);
    const newListOrder = [...data.listOrder].filter(id => id !== listId);

    delete newState[listId];
    newState.listOrder = newListOrder;

    setData(newState);
  }

  const onListDrop = (dropResult) => {
    if (!dropResult) return;

    const { removedIndex, addedIndex, payload } = dropResult;
    const newOrder = [...data.listOrder];

    newOrder.splice(removedIndex, 1);
    newOrder.splice(addedIndex, 0, data.listOrder[removedIndex]);

    const newState = {
      ...data,
      listOrder: newOrder
    };

    setData(newState);
  };

  const moveCard = (listId, result) => {
    const { removedIndex, addedIndex, payload } = result;

    const newList = data[listId];
    const newCards = [...newList.cards];

    if (removedIndex != null) newCards.splice(removedIndex, 1);
    if (addedIndex != null) newCards.splice(addedIndex, 0, payload);

    newList.cards = newCards;

    const newState = {
      ...data,
      [listId]: newList
    };

    setData(newState);
  };

  return (
    <StoreApi.Provider value={{ addCard, addList, renameList, deleteList, moveCard }}>
      <div className="App">
        <div id="board">
          <Container
            orientation="horizontal"
            onDrop={onListDrop}
            dragClass="drag-list"
            dropClass="drop-list"
            dragHandleSelector=".title"
            dropPlaceholder={{
              showOnTop: true,
              className: 'list-drop-preview',
            }}
          >
            {data.listOrder.map((listId, index) => {
              const list = data[listId];

              return (
                <List
                  key={listId}
                  index={index}
                  list={list}
                  listId={listId}
                />

              )
            })}
            <ListComposer />
          </Container>
        </div>
      </div>
    </StoreApi.Provider>
  );
}
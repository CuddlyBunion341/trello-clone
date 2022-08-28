import React, { useContext } from 'react';
import Card from './Card';
import Title from './Title';
import CardComposer from './CardComposer'
import { Container, Draggable } from 'react-smooth-dnd';
import storeApi from '../../utils/storeApi';

/*
 Sources
 ==============
 Drag and Drop:
 https://github.com/kutlugsahin/smooth-dnd-demo/blob/master/src/demo/pages/cards.js
*/

const listWrapperStyle = {
    width: "270px",
    display: "inline-block",
    margin: "0 4px",
    height: "100%",
};

const listStyle = {
    backgroundColor: "#ebecf0",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column"
};

const cardWrapperStyle = {
    padding: "0 4px",
    margin: "0 4px"
};

export default function List({ list, index, listId }) {

    const { moveCard } = useContext(storeApi);

    const onCardDrop = (result) => {
        const { removedIndex, addedIndex, payload } = result;

        // console.log(`Card '${payload.id}' will be added to ${listId}`)
        if (removedIndex != null) console.log(`[${removedIndex}] ${payload.title} removed from ${list.name}`);
        if (addedIndex != null) console.log(`[${addedIndex}] ${payload.title} added to ${list.name}`);

        moveCard(listId, result);
    };

    return (
        <Draggable key={listId}>
            <div className="list-wrapper" style={listWrapperStyle}>
                <div className="list-content" style={listStyle}>
                    <Title title={list.name} listId={listId} />
                    <div className="card-wrapper" style={cardWrapperStyle}>
                        <Container groupName="1"
                            getChildPayload={i=>list.cards[i]}
                            onDrop={onCardDrop}
                            dropPlaceholder={{
                                showOnTop: true,
                                className: 'drop-preview',
                            }}
                            dragClass="drag-card"
                            dropClass="drop-card"
                        >
                            {list.cards.map((card, index) => (
                                <Draggable key={card.id}>
                                    <Card

                                        listId={listId}
                                        card={card}
                                        index={index}
                                    />
                                </Draggable>
                            ))}
                        </Container>
                    </div>
                    <CardComposer listId={listId} />
                </div>
            </div>
        </Draggable>
    );
}
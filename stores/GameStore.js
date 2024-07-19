import { defineStore, acceptHMRUpdate } from 'pinia';

const getDeckAPI =
    'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

const reds = ['HEARTS', 'DIAMONDS'];
const blacks = ['SPADES', 'CLUBS'];

function guessMatch(guess, suit) {
    if (guess === 'red') return reds.includes(suit);

    return blacks.includes(suit);
}

export const useGameStore = defineStore('GameStore', {
    state() {
        return {
            deckID: null,
            currentGuess: null,
            drawnCards: [],
            score: 0,
            loading: true,
        };
    },
    getters: {
        drawCardAPI: (state) => {
            return `https://www.deckofcardsapi.com/api/deck/${state.deckID}/draw/?count=1`;
        },
    },
    actions: {
        init() {
            setTimeout(async () => {
                const { deck_id } = await fetch(getDeckAPI).then((r) =>
                    r.json()
                );
                this.deckID = deck_id;
                this.loading = false;
            }, 2000);
        },
        setGuess(color) {
            this.currentGuess = color;
        },

        async drawCard() {
            // goto API draw a card
            const { cards } = await fetch(this.drawCardAPI).then((r) =>
                r.json()
            );

            const newCard = cards[0];
            // store the card in drawnCards Array
            this.drawnCards.push(newCard);
            // evaluate guess
            if (guessMatch(this.currentGuess, newCard.suit)) this.score++;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

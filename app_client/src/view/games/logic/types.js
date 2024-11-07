/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} name
 * @property {string} type
 * @property {string} rank
 * @property {number} rankScore
 * @property {Object} bonus
 */

/**
 * @typedef {Object} GameState
 * @property {number} turn
 * @property {string} currentTopic
 * @property {string} nextTopic
 * @property {number} player1Health
 * @property {number} player2Health
 * @property {Card[]} mainDeck
 * @property {Card[]} usedCards
 * @property {Card[]} player1Hand
 * @property {Card[]} player2Hand
 * @property {Card|null} selectedCard
 * @property {string|null} selectedAction
 * @property {boolean} isPlayerTurn
 */

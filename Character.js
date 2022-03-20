
import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from './utils.js'

export function Character(data) {
    Object.assign(this, data)
    
    this.diceArray = getDicePlaceholderHtml(this.diceCount)

    this.maxHealth = this.health
    
    this.getDiceHtml = function(diceCount) {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(num => `<div class="dice">${num}</div>`).join('')
    }

    this.takeDamage = function(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((prev, curr) => prev+curr)
        this.health -= totalAttackScore;
        if (this.health <= 0) {
            this.dead = true;
            this.health = 0;
        }
        console.log(getPercentage(this.health, this.maxHealth));
    }

    this.getCharacterHtml = function() {
        const {elementId, name, avatar, health, diceCount, diceArray} = this;
        let diceHtml = this.getDiceHtml(diceCount);
        return `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img src=${avatar} class="avatar">
            <p class="health">health: <b> ${health} </b></p>
            <div class="dice-container">
                ${diceArray}
            </div>
        </div>
        `
    }


    
}

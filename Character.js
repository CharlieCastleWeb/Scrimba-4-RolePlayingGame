
import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from './utils.js'

export class Character {

    constructor(data) {
        Object.assign(this, data)
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
        this.maxHealth = this.health
    }

    setDiceHtml(diceCount) {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map(num => `<div class="dice">${num}</div>`).join('')
    }

    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((prev, curr) => prev+curr)
        this.health -= totalAttackScore;
        if (this.health <= 0) {
            this.dead = true;
            this.health = 0;
        }
    }

    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? 'danger' : ''} " 
                        style="width: ${percent}%;">
                    </div>
                </div>`
    }

    getCharacterHtml() {
        const {elementId, name, avatar, health, diceCount, diceHtml} = this;
        const healthBar = this.getHealthBarHtml()
        return `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img src=${avatar} class="avatar">
            <p class="health">health: <b> ${health} </b></p>
            ${healthBar}
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
        `
    }


    
}

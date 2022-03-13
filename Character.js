
import {getDiceRollArray} from './utils.js'

export function Character(data) {
    Object.assign(this, data)
    this.getDiceHtml = function(diceCount) {
        return getDiceRollArray(diceCount).map(function(dice){
            return `<div class="dice">${dice}</div>`
        }).join('')
    }
    this.getCharacterHtml = function() {
        const {elementId, name, avatar, health, diceRoll, diceCount} = this;
        
        
        const diceHtml = this.getDiceHtml(diceCount);
        return `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img src=${avatar} class="avatar">
            <p class="health">health: <b> ${health} </b></p>
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
        `
    }
}
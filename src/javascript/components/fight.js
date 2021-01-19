import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise(resolve => {
    const arenaFirstFighter = createArenaFighter(firstFighter);
    const arenaSecondFighter = createArenaFighter(secondFighter);
    
    const pressedKeys = new Map();

    document.addEventListener('keydown', (e) => {
      pressedKeys.set(e.code, true);
      
      processFightAction(arenaFirstFighter, arenaSecondFighter, pressedKeys);

      if (arenaFirstFighter.currentHealth <= 0 || arenaSecondFighter.currentHealth <= 0) {
        const winner = arenaFirstFighter.currentHealth <= 0 ? secondFighter : firstFighter;
        resolve(winner);
      };
    });
    
    document.addEventListener('keyup', (e) => {
      pressedKeys.delete(e.code);
    });
  });
}

function createArenaFighter(fighter) {
  return {
    ...fighter,
    currentHealth: fighter.health,
    criticalHitCooldown: new Date(),
    setCooldown() {
      this.criticalHitCooldown = new Date();
    },
  };
}

function processFightAction(firstFighter, secondFighter, keyMap) {
  const leftHealthIndicator = document.getElementById('left-fighter-indicator');
  const rightHealthIndicator = document.getElementById('right-fighter-indicator');
  
  switch(true) {
    case keyMap.has(controls.PlayerOneAttack): {
      applyFighterAttack(firstFighter, secondFighter, rightHealthIndicator, keyMap);
    };break;
    case keyMap.has(controls.PlayerTwoAttack): {
      applyFighterAttack(secondFighter, firstFighter, leftHealthIndicator, keyMap);
    };break;
    case controls.PlayerOneCriticalHitCombination.every(code => keyMap.has(code)): {
      applyFighterCriticalAttack(firstFighter, secondFighter, rightHealthIndicator);
    };break;
    case controls.PlayerTwoCriticalHitCombination.every(code => keyMap.has(code)): {
      applyFighterCriticalAttack(secondFighter, firstFighter, leftHealthIndicator);
    };break;
  };
}

function applyFighterAttack(attacker, defender, healthIndicator, keyMap) {
  if (isAttackBlocked(keyMap)) return; 
      
  defender.currentHealth -= getDamage(attacker, defender);
  updateHealthIndicator(defender, healthIndicator);
}

function applyFighterCriticalAttack(attacker, defender, healthIndicator) {
  if (isCriticalHitCooldown(attacker)) return;

  defender.currentHealth -= attacker.attack * 2;
  updateHealthIndicator(defender, healthIndicator);
  
  attacker.setCooldown();
}

function isAttackBlocked(keyMap) {
  return keyMap.has(controls.PlayerOneBlock) || keyMap.has(controls.PlayerTwoBlock);
}

function isCriticalHitCooldown(attacker) {
  const cooldownSeconds = (new Date().getTime() - attacker.criticalHitCooldown.getTime()) / 1000;
  return cooldownSeconds < 10;
} 

function updateHealthIndicator(defender, indicator) {
  const { health, currentHealth } = defender;

  const indicatorWidth = Math.max(0, (currentHealth * 100) / health);
  indicator.style.width = `${indicatorWidth}%`;
}


function randNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}



export function getDamage(attacker, defender) {
  const damage =  Math.max(0, getHitPower(attacker) - getBlockPower(defender))

  return damage
}

export function getHitPower(fighter) {
  const hitPower = fighter.attack * randNum(1,2)
 
  return hitPower
}

export function getBlockPower(fighter) {
  const blockPower = fighter.defense * randNum(1,2)

  return blockPower
}

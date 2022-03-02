export default {
  // TODO: add toughness (critical defence)

  PRIMARY_STRENGTH: 'PRIMARY_STRENGTH',
  PRIMARY_DEXTERITY: 'PRIMARY_DEXTERITY',
  PRIMARY_INTELLIGENCE: 'PRIMARY_INTELLIGENCE',
  PRIMARY_VITALITY: 'PRIMARY_VITALITY',

  PRIMARY_STRENGTH_AND_VITALITY: 'PRIMARY_STRENGTH_AND_VITALITY',
  PRIMARY_DEXTERITY_AND_VITALITY: 'PRIMARY_DEXTERITY_AND_VITALITY',
  PRIMARY_INTELLIGENCE_AND_VITALITY: 'PRIMARY_INTELLIGENCE_AND_VITALITY',

  CRITICAL_CHANCE: 'CRITICAL_CHANCE',
  CRITICAL_DAMAGE: 'CRITICAL_DAMAGE',

  // ACCURACY: 'ACCURACY',

  DAMAGE_PHYSICAL_VALUE: 'DAMAGE_PHYSICAL_VALUE',
  DAMAGE_PHYSICAL_PERCENTAGE: 'DAMAGE_PHYSICAL_PERCENTAGE',

  DAMAGE_FIRE_VALUE: 'DAMAGE_FIRE_VALUE',
  DAMAGE_FIRE_PERCENTAGE: 'DAMAGE_FIRE_PERCENTAGE',

  DAMAGE_COLD_VALUE: 'DAMAGE_COLD_VALUE',
  DAMAGE_COLD_PERCENTAGE: 'DAMAGE_COLD_PERCENTAGE',

  DAMAGE_LIGHTNING_VALUE: 'DAMAGE_LIGHTNING_VALUE',
  DAMAGE_LIGHTNING_PERCENTAGE: 'DAMAGE_LIGHTNING_PERCENTAGE',

  DAMAGE_POISON_VALUE: 'DAMAGE_POISON_VALUE',
  DAMAGE_POISON_PERCENTAGE: 'DAMAGE_POISON_PERCENTAGE',

  DAMAGE_ARCANE_VALUE: 'DAMAGE_ARCANE_VALUE',
  DAMAGE_ARCANE_PERCENTAGE: 'DAMAGE_ARCANE_PERCENTAGE',

  DAMAGE_VALUE: 'DAMAGE_VALUE',
  DAMAGE_PERCENTAGE: 'DAMAGE_PERCENTAGE',

  ARMOR: 'ARMOR',

  RESIST_FIRE: 'RESIST_FIRE',
  RESIST_COLD: 'RESIST_COLD',
  RESIST_LIGHTNING: 'RESIST_LIGHTNING',
  RESIST_POISON: 'RESIST_POISON',
  RESIST_ARCANE: 'RESIST_ARCANE',
  RESIST_BLEED: 'RESIST_BLEED',
  RESIST_PIERCING: 'RESIST_PIERCING',

  RESIST_ALL: 'RESIST_ALL', // most likely on legendaries

  EVASION_BLOCK: 'EVASION_BLOCK',
  EVASION_DODGE: 'EVASION_DODGE',
  EVASION_PARRY: 'EVASION_PARRY',

  HEALTH_PERCENTAGE: 'HEALTH_PERCENTAGE',
  MANA_PERCENTAGE: 'MANA_PERCENTAGE',

  LIFE_HIT: 'LIFE_HIT',
  LIFE_LEECH: 'LIFE_LEECH',
  LIFE_REGEN: 'LIFE_REGEN',

  MANA_HIT: 'MANA_HIT',
  MANA_LEECH: 'MANA_LEECH',
  MANA_REGEN: 'MANA_REGEN',

  FIND_QUANTITY: 'FIND_QUANTITY',
  FIND_QUALITY: 'FIND_QUALITY',
  FIND_GOLD: 'FIND_GOLD',

  INDESTRUCTIBLE: 'INDESTRUCTIBLE',

  REDUCED_DAMAGE_MELEE: 'REDUCED_DAMAGE_MELEE',
  REDUCED_DAMAGE_RANGE: 'REDUCED_DAMAGE_RANGE',

  /*
  REDUCED_CONTROL_DURATION: 'REDUCED_CONTROL_DURATION',
  REDUCED_COOLDOWN: 'REDUCED_COOLDOWN',
  REDUCED_MANA_COST: 'REDUCED_MANA_COST',
  */

  CHANCE_TO_STUN: 'CHANCE_TO_STUN', // object cannot do anything
  CHANCE_TO_SAP: 'CHANCE_TO_SAP', // object cannot do anything but effect ends right away if object is attacked
  CHANCE_TO_CONFUSE: 'CHANCE_TO_CONFUSE', // object will pick random target on any side
  CHANCE_TO_BURN: 'CHANCE_TO_BURN', // applies dot
  CHANCE_TO_CHILL: 'CHANCE_TO_CHILL', // reduced object's damage due to slowness
  CHANCE_TO_SHOCK: 'CHANCE_TO_SHOCK', // object is more vulnerable to damage
  CHANCE_TO_DEVASTATE: 'CHANCE_TO_DEVASTATE', // x times the critical damage applied

  EFFECT_CULL: 'EFFECT_CULL',
  EFFECT_BLEED: 'EFFECT_BLEED', // to stack or not to stack?

  /*
  REFLECT_DAMAGE: 'REFLECT_DAMAGE',
  */

  MOVEMENT: 'MOVEMENT', // boots only
};
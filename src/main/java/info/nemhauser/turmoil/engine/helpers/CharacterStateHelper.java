package info.nemhauser.turmoil.engine.helpers;

import com.rabbitmq.client.AMQP;
import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Accessory;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.enums.AttributeType;
import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;

import java.util.ArrayList;

public class CharacterStateHelper
{
	public static CharacterState getCharacterState(Character character)
	{
		CharacterState characterState = ServerHelper.getCharacterState(character);
		if (characterState == null)
		{
			characterState = new CharacterState();
		}
		return characterState;
	}

	public static void setCharacterState(Character character, CharacterState characterState)
	{
		ServerHelper.setCharacterState(character, characterState);
	}

	public static void computeValuesForCharacterState(Character character)
	{
		computeValuesForCharacterState(getCharacterState(character), character);
	}

	public static void computeValuesForCharacterState(CharacterState characterState, Character character)
	{
		characterState.level = character.level;

		characterState.experience = character.experience;
		characterState.requiredExperience = 1000; // ExperienceHelper.getRequiredExperience(character.level + 1); TODO: reimplement

		characterState.applyResistAll();
		characterState.applyPercentageDamage();
		characterState.updateHealthAndMana();
		characterState.capValues();
		characterState.computeAverageDamage();
	}

	private static void updateCharacterState(CharacterState characterState)
	{
		characterState.resetValues();

		for (Item item: characterState.getItems().values())
		{
			updateCharacterStateWithItem(characterState, item);
		}

		// TODO: do something about character
		computeValuesForCharacterState(characterState, TurmoilApplication.getCharacter("fox"));
	}

	public static void removeItem(CharacterState characterState, Item item)
	{
		if (characterState.removeItem(item.getItemSlot().toString()))
		{
			updateCharacterState(characterState);
		}
	}

	public static void addItem(CharacterState characterState, Item item)
	{
		characterState.putItem(item.getItemSlot().toString(), item);
		updateCharacterState(characterState);
	}

	public static void updateCharacterStateWithItem(CharacterState characterState, Item item)
	{
		switch (item.itemType)
		{
			case ACCESSORY -> updateCharacterStateWithAccessory(characterState, (Accessory) item);
			case ARMOR -> updateCharacterStateWithArmor(characterState, (Armor) item);
			case WEAPON -> updateCharacterStateWithWeapon(characterState, (Weapon) item);
		}

		if (item.attributes != null && item.attributes.length > 0)
		{
			for (Attribute attribute : item.attributes)
			{
				updateCharacterStateWithAttribute(characterState, attribute);
			}
		}
	}

	public static void updateCharacterStateWithAccessory(CharacterState characterState, Accessory accessory)
	{
		// nothing specific atm
	}

	public static void updateCharacterStateWithArmor(CharacterState characterState, Armor armor)
	{
		characterState.increaseArmor(armor.armorValue);
	}

	public static void updateCharacterStateWithWeapon(CharacterState characterState, Weapon weapon)
	{
		switch (weapon.damageType)
		{
			case PHYSICAL -> {
				characterState.damageMinPhysical += weapon.minDamage;
				characterState.damageMaxPhysical += weapon.maxDamage;
			}
			case FIRE -> {
				characterState.damageMinFire += weapon.minDamage;
				characterState.damageMaxFire += weapon.maxDamage;
			}
			case COLD -> {
				characterState.damageMinCold += weapon.minDamage;
				characterState.damageMaxCold += weapon.maxDamage;
			}
			case LIGHTNING -> {
				characterState.damageMinLightning += weapon.minDamage;
				characterState.damageMaxLightning += weapon.maxDamage;
			}
			case POISON -> {
				characterState.damageMinPoison += weapon.minDamage;
				characterState.damageMaxPoison += weapon.maxDamage;
			}
			case ARCANE -> {
				characterState.damageMinArcane += weapon.minDamage;
				characterState.damageMaxArcane += weapon.maxDamage;
			}
		}
	}

	public static void updateCharacterStateWithAttribute(CharacterState characterState, Attribute attribute)
	{
		/*
			//ACCURACY,

			//REDUCED_CONTROL_DURATION,
			//REDUCED_COOLDOWN,
			//REDUCED_MANA_COST,

			//EFFECT_CULL,
			//EFFECT_BLEED, // to stack or not to stack?

			//REFLECT_DAMAGE,
		*/

		switch (attribute.type)
		{
			case PRIMARY_STRENGTH -> characterState.statStrength += attribute.primaryValue;
			case PRIMARY_DEXTERITY -> characterState.statDexterity += attribute.primaryValue;
			case PRIMARY_INTELLIGENCE -> characterState.statIntelligence += attribute.primaryValue;
			case PRIMARY_VITALITY -> characterState.statVitality += attribute.primaryValue;
			case PRIMARY_STRENGTH_AND_VITALITY -> {
				characterState.statStrength += attribute.primaryValue;
				characterState.statVitality += attribute.secondaryValue;
			}
			case PRIMARY_DEXTERITY_AND_VITALITY -> {
				characterState.statDexterity += attribute.primaryValue;
				characterState.statVitality += attribute.secondaryValue;
			}
			case PRIMARY_INTELLIGENCE_AND_VITALITY -> {
				characterState.statIntelligence += attribute.primaryValue;
				characterState.statVitality += attribute.secondaryValue;
			}
			case CRITICAL_CHANCE -> characterState.increaseCritChance(attribute.primaryValue);
			case CRITICAL_DAMAGE -> characterState.increaseCritDamage(attribute.primaryValue);
			case DAMAGE_VALUE -> {
				characterState.increaseDamageMin(attribute.primaryValue);
				characterState.increaseDamageMax(attribute.secondaryValue);
			}
			case DAMAGE_PHYSICAL_VALUE -> {
				characterState.damageMinPhysical += attribute.primaryValue;
				characterState.damageMaxPhysical += attribute.secondaryValue;
			}
			case DAMAGE_FIRE_VALUE -> {
				characterState.damageMinFire += attribute.primaryValue;
				characterState.damageMaxFire += attribute.secondaryValue;
			}
			case DAMAGE_COLD_VALUE -> {
				characterState.damageMinCold += attribute.primaryValue;
				characterState.damageMaxCold += attribute.secondaryValue;
			}
			case DAMAGE_LIGHTNING_VALUE -> {
				characterState.damageMinLightning += attribute.primaryValue;
				characterState.damageMaxLightning += attribute.secondaryValue;
			}
			case DAMAGE_POISON_VALUE -> {
				characterState.damageMinPoison += attribute.primaryValue;
				characterState.damageMaxPoison += attribute.secondaryValue;
			}
			case DAMAGE_ARCANE_VALUE -> {
				characterState.damageMinArcane += attribute.primaryValue;
				characterState.damageMaxArcane += attribute.secondaryValue;
			}
			case DAMAGE_PERCENTAGE -> characterState.damagePercentage += attribute.primaryValue;
			case DAMAGE_PHYSICAL_PERCENTAGE -> characterState.damagePercentagePhysical += attribute.primaryValue;
			case DAMAGE_FIRE_PERCENTAGE -> characterState.damagePercentageFire += attribute.primaryValue;
			case DAMAGE_COLD_PERCENTAGE -> characterState.damagePercentageCold += attribute.primaryValue;
			case DAMAGE_LIGHTNING_PERCENTAGE -> characterState.damagePercentageLightning += attribute.primaryValue;
			case DAMAGE_POISON_PERCENTAGE -> characterState.damagePercentagePoison += attribute.primaryValue;
			case DAMAGE_ARCANE_PERCENTAGE -> characterState.damagePercentageArcane += attribute.primaryValue;
			case RESIST_FIRE -> characterState.increaseResistFire(attribute.primaryValue);
			case RESIST_COLD -> characterState.increaseResistCold(attribute.primaryValue);
			case RESIST_LIGHTNING -> characterState.increaseResistLightning(attribute.primaryValue);
			case RESIST_POISON -> characterState.increaseResistPoison(attribute.primaryValue);
			case RESIST_ARCANE -> characterState.increaseResistArcane(attribute.primaryValue);
			case RESIST_BLEED -> characterState.increaseResistBleed(attribute.primaryValue);
			case RESIST_PIERCING -> characterState.increaseResistPiercing(attribute.primaryValue);
			case RESIST_ALL -> characterState.increaseResistAll(attribute.primaryValue);
			case ARMOR -> characterState.increaseArmor(attribute.primaryValue);
			case EVASION_BLOCK -> characterState.evasionBlock += attribute.primaryValue;
			case EVASION_DODGE -> characterState.evasionDodge += attribute.primaryValue;
			case EVASION_PARRY -> characterState.evasionParry += attribute.primaryValue;
			case HEALTH_PERCENTAGE -> characterState.healthPercentage += attribute.primaryValue;
			case MANA_PERCENTAGE -> characterState.manaPercentage += attribute.primaryValue;
			case LIFE_HIT -> characterState.lifeHit += attribute.primaryValue;
			case LIFE_LEECH -> characterState.lifeLeech += attribute.primaryValue;
			case LIFE_REGEN -> characterState.lifeRegen += attribute.primaryValue;
			case MANA_HIT -> characterState.manaHit += attribute.primaryValue;
			case MANA_LEECH -> characterState.manaLeech += attribute.primaryValue;
			case MANA_REGEN -> characterState.manaRegen += attribute.primaryValue;
			case FIND_QUANTITY -> characterState.findQuantity += attribute.primaryValue;
			case FIND_QUALITY -> characterState.findQuality += attribute.primaryValue;
			case FIND_GOLD -> characterState.findGold += attribute.primaryValue;
			case REDUCED_DAMAGE_MELEE -> characterState.reducedDamageMelee += attribute.primaryValue;
			case REDUCED_DAMAGE_RANGE -> characterState.reducedDamageRanged += attribute.primaryValue;
			case CHANCE_TO_STUN -> characterState.chanceToStun += attribute.primaryValue;
			case CHANCE_TO_SAP -> characterState.chanceToSap += attribute.primaryValue;
			case CHANCE_TO_CONFUSE -> characterState.chanceToConfuse += attribute.primaryValue;
			case CHANCE_TO_BURN -> characterState.chanceToBurn += attribute.primaryValue;
			case CHANCE_TO_CHILL -> characterState.chanceToChill += attribute.primaryValue;
			case CHANCE_TO_SHOCK -> characterState.chanceToShock += attribute.primaryValue;
			case CHANCE_TO_DEVASTATE -> characterState.chanceToDevastate += attribute.primaryValue;
			case MOVEMENT -> characterState.movement += attribute.primaryValue;
		}
	}
}

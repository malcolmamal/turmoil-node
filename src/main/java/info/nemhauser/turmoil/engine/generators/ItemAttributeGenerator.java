package info.nemhauser.turmoil.engine.generators;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Accessory;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.enums.AccessoryType;
import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.AttributeType;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class ItemAttributeGenerator
{
	public static ArrayList<AttributeType> pickAppropriateAttributeTypes(Item item)
	{
		ArrayList<AttributeType> appropriateAttributeTypes = new ArrayList<AttributeType>();

		appropriateAttributeTypes.addAll(Arrays.asList(
				AttributeType.PRIMARY_STRENGTH,
				AttributeType.PRIMARY_DEXTERITY,
				AttributeType.PRIMARY_INTELLIGENCE,
				AttributeType.PRIMARY_VITALITY,
				AttributeType.PRIMARY_STRENGTH_AND_VITALITY,
				AttributeType.PRIMARY_DEXTERITY_AND_VITALITY,
				AttributeType.PRIMARY_INTELLIGENCE_AND_VITALITY,
				AttributeType.INDESTRUCTIBLE
		));

		if (item.itemType != ItemType.WEAPON)
		{
			appropriateAttributeTypes.addAll(Arrays.asList(
				AttributeType.RESIST_FIRE,
				AttributeType.RESIST_COLD,
				AttributeType.RESIST_LIGHTNING,
				AttributeType.RESIST_POISON,
				AttributeType.RESIST_ARCANE,
				AttributeType.RESIST_BLEED,
				AttributeType.RESIST_PIERCING,

				AttributeType.HEALTH_PERCENTAGE,
				AttributeType.MANA_PERCENTAGE
			));

			if (!item.rarity.isPlain())
			{
				appropriateAttributeTypes.add(AttributeType.RESIST_ALL);
			}
		}

		if (item.itemType != ItemType.ARMOR)
		{
			appropriateAttributeTypes.addAll(Arrays.asList(
				AttributeType.LIFE_HIT,
				AttributeType.LIFE_REGEN,

				AttributeType.MANA_HIT,
				AttributeType.MANA_REGEN
			));

			if (item.level > 15)
			{
				appropriateAttributeTypes.addAll(Arrays.asList(
					AttributeType.LIFE_LEECH,
					AttributeType.MANA_LEECH
				));
			}

			if (!item.rarity.isPlain())
			{
				appropriateAttributeTypes.addAll(Arrays.asList(
					AttributeType.CHANCE_TO_STUN,
					AttributeType.CHANCE_TO_SAP,
					AttributeType.CHANCE_TO_CONFUSE,
					AttributeType.CHANCE_TO_BURN,
					AttributeType.CHANCE_TO_CHILL,
					AttributeType.CHANCE_TO_SHOCK,
					AttributeType.CHANCE_TO_DEVASTATE
				));
			}
		}

		//TODO: newdebug
//		System.out.println("item " + item);
//		System.out.println("item " + item.toStringFull());
//		System.out.println("item type: " + item.itemType);
		switch (item.itemType)
		{
			case ACCESSORY:
				if (((Accessory)item).getAccessoryType() == AccessoryType.SHIELD)
				{
					appropriateAttributeTypes.add(AttributeType.EVASION_BLOCK);
				}

				if (((Accessory)item).isJewellery())
				{
					appropriateAttributeTypes.addAll(Arrays.asList(
						AttributeType.FIND_QUANTITY,
						AttributeType.FIND_QUALITY,
						AttributeType.FIND_GOLD
					));
				}
				break;
			case ARMOR:
				appropriateAttributeTypes.addAll(Arrays.asList(
					AttributeType.ARMOR,
					AttributeType.EVASION_DODGE,

					AttributeType.REDUCED_DAMAGE_MELEE,
					AttributeType.REDUCED_DAMAGE_RANGE
				));

				if (((Armor)item).getArmorType() == ArmorType.BOOTS)
				{
					appropriateAttributeTypes.add(AttributeType.MOVEMENT);
				}

				if (((Armor)item).getArmorType() == ArmorType.GLOVES)
				{
					appropriateAttributeTypes.add(AttributeType.CRITICAL_CHANCE);
					appropriateAttributeTypes.add(AttributeType.CRITICAL_DAMAGE);
				}
				break;
			case WEAPON:
				appropriateAttributeTypes.addAll(Arrays.asList(
					AttributeType.CRITICAL_CHANCE,
					AttributeType.CRITICAL_DAMAGE,
					AttributeType.EVASION_PARRY,

					AttributeType.EFFECT_BLEED,

					AttributeType.DAMAGE_PHYSICAL_VALUE,
					AttributeType.DAMAGE_PHYSICAL_PERCENTAGE,
					AttributeType.DAMAGE_FIRE_VALUE,
					AttributeType.DAMAGE_FIRE_PERCENTAGE,
					AttributeType.DAMAGE_COLD_VALUE,
					AttributeType.DAMAGE_COLD_PERCENTAGE,
					AttributeType.DAMAGE_LIGHTNING_VALUE,
					AttributeType.DAMAGE_LIGHTNING_PERCENTAGE,
					AttributeType.DAMAGE_POISON_VALUE,
					AttributeType.DAMAGE_POISON_PERCENTAGE,
					AttributeType.DAMAGE_ARCANE_VALUE,
					AttributeType.DAMAGE_ARCANE_PERCENTAGE,

					AttributeType.DAMAGE_VALUE,
					AttributeType.DAMAGE_PERCENTAGE
				));

				if (!item.rarity.isPlain())
				{
					appropriateAttributeTypes.add(AttributeType.EFFECT_CULL);
				}
				break;
		}

		return appropriateAttributeTypes;
	}

	public static ArrayList<Attribute> rollAttributes(Item item)
	{
		ArrayList<AttributeType> appropriateAttributeTypes = pickAppropriateAttributeTypes(item);
		ArrayList<Attribute> attributes = new ArrayList<>() {};

		int quantity = item.rarity.getAttributesQuantity();
		for (int i = 0; i < quantity; i++)
		{
			if (appropriateAttributeTypes.size() > 0)
			{
				Attribute attribute = ItemAttributeGenerator.rollAttribute(item, appropriateAttributeTypes);
				if (attribute != null)
				{
					attributes.add(attribute);
				}
			}
		}
		return attributes;
	}

	public static Attribute rollAttribute(Item item, ArrayList<AttributeType> possibleAttributeTypes)
	{
		double primaryValue = 0;
		double secondaryValue = 0;
		double tertiaryValue = 0;

		//TODO: refactor getRandomValue method
		//AttributeType attributeType = EnumValues.getRandomValue(possibleAttributeTypes);
		AttributeType attributeType = possibleAttributeTypes.get(new Random().nextInt(possibleAttributeTypes.size()));

		boolean wasProcessed = false;

		if (attributeType == AttributeType.INDESTRUCTIBLE)
		{
			wasProcessed = true;
		}

		if (attributeType == AttributeType.MOVEMENT)
		{
			primaryValue = 1 + new Random().nextInt(2);
			wasProcessed = true;
		}

		if (attributeType.isPrimaryStat())
		{
			primaryValue = getPrimaryStatValue(item);

			if (attributeType.isPrimaryDoubleStat())
			{
				primaryValue = Math.floor(primaryValue / 2);
				secondaryValue = Math.floor(getPrimaryStatValue(item) / 2);

				possibleAttributeTypes.removeAll(Arrays.asList(
					AttributeType.PRIMARY_STRENGTH_AND_VITALITY,
					AttributeType.PRIMARY_DEXTERITY_AND_VITALITY,
					AttributeType.PRIMARY_INTELLIGENCE_AND_VITALITY
				));
			}
			else
			{
				possibleAttributeTypes.removeAll(Arrays.asList(
					AttributeType.PRIMARY_STRENGTH,
					AttributeType.PRIMARY_DEXTERITY,
					AttributeType.PRIMARY_INTELLIGENCE,
					AttributeType.PRIMARY_VITALITY
				));
			}

			if (item.itemType == ItemType.WEAPON && !((Weapon)item).isOneHanded())
			{
				// two handers get more primary stats
				primaryValue = Math.ceil(primaryValue * 1.5);
				if (secondaryValue != 0)
				{
					secondaryValue = Math.ceil(secondaryValue * 1.5);
				}
			}

			wasProcessed = true;
		}

		if (attributeType == AttributeType.CRITICAL_CHANCE || attributeType == AttributeType.CRITICAL_DAMAGE)
		{
			int minCritValue = 3;
			int maxCritValue = 5;

			if (item.itemType == ItemType.WEAPON)
			{
				minCritValue += 1;
				maxCritValue += 3;

				if (!((Weapon)item).isOneHanded())
				{
					minCritValue += 1;
					maxCritValue += 2;
				}
			}

			primaryValue = Math.round(minCritValue + (maxCritValue - minCritValue) * new Random().nextDouble());
			if (attributeType == AttributeType.CRITICAL_DAMAGE)
			{
				primaryValue *= 10;
			}
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.DAMAGE_PHYSICAL_VALUE, AttributeType.DAMAGE_FIRE_VALUE,
				AttributeType.DAMAGE_COLD_VALUE, AttributeType.DAMAGE_LIGHTNING_VALUE,
				AttributeType.DAMAGE_POISON_VALUE, AttributeType.DAMAGE_ARCANE_VALUE,
				AttributeType.DAMAGE_VALUE).contains(attributeType))
		{
			double baseDamage = item.level * 1.5;
			if (attributeType == AttributeType.DAMAGE_VALUE)
			{
				baseDamage *= 0.8;
			}

			if (!item.rarity.isPlain())
			{
				baseDamage *= 1.3;
			}

			primaryValue = 1 + Math.round(baseDamage + (2 * baseDamage - baseDamage) * new Random().nextDouble());
			secondaryValue = 1 + Math.round(primaryValue + (2 * primaryValue - primaryValue) * new Random().nextDouble());

			wasProcessed = true;

			possibleAttributeTypes.removeAll(Arrays.asList(
				AttributeType.DAMAGE_PHYSICAL_VALUE,
				AttributeType.DAMAGE_FIRE_VALUE,
				AttributeType.DAMAGE_COLD_VALUE,
				AttributeType.DAMAGE_LIGHTNING_VALUE,
				AttributeType.DAMAGE_POISON_VALUE,
				AttributeType.DAMAGE_ARCANE_VALUE,
				AttributeType.DAMAGE_VALUE
			));
		}

		if (Arrays.asList(AttributeType.DAMAGE_PHYSICAL_PERCENTAGE, AttributeType.DAMAGE_FIRE_PERCENTAGE,
				AttributeType.DAMAGE_COLD_PERCENTAGE, AttributeType.DAMAGE_LIGHTNING_PERCENTAGE,
				AttributeType.DAMAGE_POISON_PERCENTAGE, AttributeType.DAMAGE_ARCANE_PERCENTAGE).contains(attributeType))
		{
			primaryValue = Math.round(10 + (20 - 10) * new Random().nextDouble());
			if (!item.rarity.isPlain())
			{
				primaryValue += 2;
			}
			wasProcessed = true;

			possibleAttributeTypes.removeAll(Arrays.asList(
				AttributeType.DAMAGE_PHYSICAL_PERCENTAGE,
				AttributeType.DAMAGE_FIRE_PERCENTAGE,
				AttributeType.DAMAGE_COLD_PERCENTAGE,
				AttributeType.DAMAGE_LIGHTNING_PERCENTAGE,
				AttributeType.DAMAGE_POISON_PERCENTAGE,
				AttributeType.DAMAGE_ARCANE_PERCENTAGE
			));
		}

		if (attributeType == AttributeType.DAMAGE_PERCENTAGE)
		{
			primaryValue = Math.round(6 + (12 - 6) * new Random().nextDouble());
			if (!item.rarity.isPlain())
			{
				primaryValue += 1;
			}
			wasProcessed = true;
		}

		if (attributeType.isResist())
		{
			primaryValue = Math.round(10 + (25 - 10) * new Random().nextDouble());
			wasProcessed = true;

			possibleAttributeTypes.removeAll(Arrays.asList(
				AttributeType.RESIST_FIRE,
				AttributeType.RESIST_COLD,
				AttributeType.RESIST_LIGHTNING,
				AttributeType.RESIST_POISON,
				AttributeType.RESIST_ARCANE,
				AttributeType.RESIST_BLEED,
				AttributeType.RESIST_PIERCING,
				AttributeType.RESIST_ALL
			));
		}

		if (attributeType == AttributeType.ARMOR)
		{
			primaryValue = (double)item.level + (10 + (25 - 10) * Math.round(new Random().nextDouble()));
			if (item.itemType == ItemType.ARMOR && ((Armor)item).getArmorType() == ArmorType.CHEST)
			{
				primaryValue = Math.ceil(primaryValue * 1.4);
			}
			wasProcessed = true;
		}

		// TODO: if it's a shield then block should be always rolled ? (or is it just additional block to the base one?)
		if (attributeType == AttributeType.EVASION_BLOCK)
		{
			int minBlockChance = 10;
			int maxBlockChance = 25;
			double blockAmountMultiplier = 1;

			if (item.rarity == ItemRarity.RARE)
			{
				minBlockChance += 5;
				maxBlockChance += 5;
				blockAmountMultiplier = 1.2;
			}
			else if (!item.rarity.isPlain())
			{
				minBlockChance += 10;
				maxBlockChance += 10;
				blockAmountMultiplier = 1.4;

				if (item.rarity == ItemRarity.EPIC)
				{
					maxBlockChance += 5;
					blockAmountMultiplier = 1.5;
				}
			}

			primaryValue = Math.round(minBlockChance + (maxBlockChance - minBlockChance) * new Random().nextDouble());

			double baseBlockAmount = 5.0 + (double)item.level * blockAmountMultiplier;
			secondaryValue = Math.round(baseBlockAmount + (2.0 * baseBlockAmount - baseBlockAmount) * new Random().nextDouble());
			tertiaryValue = Math.round(1.0 + secondaryValue + (2.0 * secondaryValue - secondaryValue) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (attributeType == AttributeType.EVASION_PARRY)
		{
			primaryValue = Math.round(15 + (25 - 15) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (attributeType == AttributeType.EVASION_DODGE)
		{
			primaryValue = Math.round(4 + (8 - 4) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.LIFE_HIT, AttributeType.MANA_HIT).contains(attributeType))
		{
			double baseOnHit = Math.ceil(item.level / 5);
			primaryValue = 1 + Math.round(baseOnHit + (2.0 * baseOnHit - baseOnHit) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.LIFE_REGEN, AttributeType.MANA_REGEN).contains(attributeType))
		{
			double baseRegen = Math.ceil(item.level / 4);
			primaryValue = 5 + Math.round(baseRegen + (2.0 * baseRegen - baseRegen) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.LIFE_LEECH, AttributeType.MANA_LEECH).contains(attributeType))
		{
			primaryValue = Math.round(1 + (3 - 1) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.FIND_QUANTITY, AttributeType.FIND_QUALITY, AttributeType.FIND_GOLD).contains(attributeType))
		{
			primaryValue = Math.round(10 + (25 - 10) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.CHANCE_TO_STUN, AttributeType.CHANCE_TO_SAP, AttributeType.CHANCE_TO_CONFUSE,
				AttributeType.CHANCE_TO_BURN, AttributeType.CHANCE_TO_CHILL, AttributeType.CHANCE_TO_SHOCK,
				AttributeType.CHANCE_TO_DEVASTATE).contains(attributeType))
		{
			int minConditionChance = 2;
			int maxConditionChance = 5;

			if (item.itemType == ItemType.ACCESSORY && ((Accessory)item).isJewellery())
			{
				minConditionChance *= 2;
				maxConditionChance *= 2;
			}

			primaryValue = Math.round(minConditionChance + (maxConditionChance - minConditionChance) * new Random().nextDouble());

			possibleAttributeTypes.removeAll(Arrays.asList(
				AttributeType.CHANCE_TO_STUN,
				AttributeType.CHANCE_TO_SAP,
				AttributeType.CHANCE_TO_CONFUSE,
				AttributeType.CHANCE_TO_BURN,
				AttributeType.CHANCE_TO_CHILL,
				AttributeType.CHANCE_TO_SHOCK,
				AttributeType.CHANCE_TO_DEVASTATE
			));
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.HEALTH_PERCENTAGE, AttributeType.MANA_PERCENTAGE).contains(attributeType))
		{
			primaryValue = Math.round(5 + (15 - 5) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (attributeType == AttributeType.EFFECT_BLEED)
		{
			int baseBleed = item.level * 2;
			primaryValue = Math.round(15 + (30 - 15) * new Random().nextDouble());
			secondaryValue = 1 + Math.round(baseBleed + (3 * baseBleed - baseBleed) * new Random().nextDouble());
			tertiaryValue = Math.round(3 + (6 - 3) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (attributeType == AttributeType.EFFECT_CULL)
		{
			primaryValue = Math.round(8 + (12 - 8) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (Arrays.asList(AttributeType.REDUCED_DAMAGE_MELEE, AttributeType.REDUCED_DAMAGE_RANGE).contains(attributeType))
		{
			primaryValue = Math.round(5 + (20 - 5) * new Random().nextDouble());
			wasProcessed = true;
		}

		if (wasProcessed)
		{
			if (possibleAttributeTypes.contains(attributeType))
			{
				possibleAttributeTypes.remove(attributeType);
			}

			return new Attribute(attributeType, primaryValue, secondaryValue, tertiaryValue); // item,
		}
		return null;
	}

	public static double getPrimaryStatValue(Item item)
	{
		double minValue;
		double maxValue;

		double root = 1.3;

		switch (item.itemType)
		{
			case ACCESSORY:
				root = 1.2;
				break;
			case ARMOR:
				root = 1.4;
				break;
			case WEAPON:
				root = 1.3;
				break;
		}
		maxValue = 10.0 + (double)item.level + Math.pow((double)item.level, 1.0 / root);
		minValue = maxValue / 2;

		return Math.floor(minValue + (maxValue - minValue) * new Random().nextDouble());
	}
}

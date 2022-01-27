package info.nemhauser.turmoil.engine.generators;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Accessory;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.helpers.EnumHelper;
import info.nemhauser.turmoil.engine.helpers.ServerHelper;
import info.nemhauser.turmoil.engine.templates.AccessoryTemplate;
import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
import info.nemhauser.turmoil.engine.templates.ItemTemplate;
import info.nemhauser.turmoil.engine.templates.WeaponTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class ItemGenerator
{
	public static Item rollItemOfRarityAndType(Character character, ItemRarity rarity, ItemType itemType)
	{
		Item item = generateItem(rarity, itemType);
		if (item != null)
		{
			item.level = character.level;
			if (rarity.isPlain())
			{
				generateName(item);
			}

			addAttributes(item);
			rollStats(item);
		}

		return item;
	}

	public static Item rollItem(Character character)
	{
		return rollItem(character, 0);
	}

	public static Item rollItem(Character character, int boost)
	{
		ItemRarity rarity = (ItemRarity)ServerHelper.getEnumValues().getProperRandomItemRarity(boost);
		ItemType itemType = (ItemType)ServerHelper.getEnumValues().getRandomItemType();

		return rollItemOfRarityAndType(character, rarity, itemType);
	}

	public static Item rollMonsterWeapon(Monster monster)
	{
		ItemRarity rarity = (ItemRarity)ServerHelper.getEnumValues().getProperRandomItemRarity();
		if (!rarity.isPlain())
		{
			// monsters should have lower chance of getting a high quality weapon
			rarity = (ItemRarity)ServerHelper.getEnumValues().getProperRandomItemRarity();
		}

		Item item = generateItem(rarity, ItemType.WEAPON);
		if (item != null)
		{
			item.level = monster.level;
			if (rarity.isPlain())
			{
				generateName(item);
			}

			addAttributes(item);
			rollStats(item);
		}
		return item;
	}

	public static void generateName(Item item)
	{
		int randomPrefix = new Random().nextInt(ServerHelper.getItemTemplates().itemPrefixes.length);
		int randomSuffix = new Random().nextInt(ServerHelper.getItemTemplates().itemSuffixes.length);
		item.itemName = ServerHelper.getItemTemplates().itemPrefixes[randomPrefix] + " " + ServerHelper.getItemTemplates().itemSuffixes[randomSuffix];
	}

	public static Item generateItem(ItemRarity rarity, ItemType itemType)
	{
		Item item = null;
		switch (itemType)
		{
			case WEAPON:
				item = generateWeapon(rarity);
				break;
			case ARMOR:
				item = generateArmor(rarity);
				break;
			case ACCESSORY:
				item = generateAccessory(rarity);
				break;
		}
		return item;
	}

	public static Accessory generateAccessory(ItemRarity rarity)
	{
		AccessoryTemplate template;
		if (rarity.isPlain())
		{
			template = (AccessoryTemplate)getRandomTemplate(ServerHelper.getItemTemplates().accessoryCommonTemplates);
		}
		else
		{
			template = (AccessoryTemplate)getRandomTemplate(ServerHelper.getItemTemplates().accessoryLegendaryTemplates);
		}

		template.rarity = rarity;
		return new Accessory(template);
	}

	public static Armor generateArmor(ItemRarity rarity)
	{
		ArmorTemplate template;
		if (rarity.isPlain())
		{
			template = (ArmorTemplate)getRandomTemplate(ServerHelper.getItemTemplates().armorCommonTemplates);
		}
		else
		{
			template = (ArmorTemplate)getRandomTemplate(ServerHelper.getItemTemplates().armorLegendaryTemplates);
		}

		template.rarity = rarity;
		return new Armor(template);
	}

	public static Weapon generateWeapon(ItemRarity rarity)
	{
		WeaponTemplate template;
		if (rarity.isPlain())
		{
			template = (WeaponTemplate)getRandomTemplate(ServerHelper.getItemTemplates().weaponCommonTemplates);
		}
		else
		{
			template = (WeaponTemplate)getRandomTemplate(ServerHelper.getItemTemplates().weaponLegendaryTemplates);
		}

		template.rarity = rarity;
		return new Weapon(template);
	}

	public static ItemTemplate getRandomTemplate(ItemTemplate[] values)
	{
		return values[new Random().nextInt(values.length)];
	}

	public static Item addAttributes(Item item)
	{
		item.attributes = new Attribute[]{};

		ArrayList<Attribute> attributes = ItemAttributeGenerator.rollAttributes(item);
		attributes.addAll(Arrays.asList(item.attributes));
		item.attributes = attributes.toArray(new Attribute[0]);

		return item;
	}

	public static Item rollStats(Item item)
	{
		switch (item.itemType)
		{
			case ACCESSORY:
				rollAccessoryStats((Accessory) item);
				break;
			case ARMOR:
				rollArmorStats((Armor) item);
				break;
			case WEAPON:
				rollWeaponStats((Weapon) item);
				break;
		}
		return item;
	}

	public static void rollAccessoryStats(Accessory accessory)
	{
		if (accessory.level == null)
		{
			accessory.level = 1;
		}

		//todo
	}

	public static void rollArmorStats(Armor armor)
	{
		double rarityMultiplier = getRarityMultiplier(armor.rarity);

		if (armor.level == null)
		{
			armor.level = 1;
		}

		armor.armorValue = (int)((1 + new Random().nextInt(20) + armor.level * (1 + new Random().nextInt(5))) * rarityMultiplier);
	}

	public static void rollWeaponStats(Weapon weapon)
	{
		double handMultiplier = weapon.isOneHanded() ? 1 : 1.5;
		double rarityMultiplier = getRarityMultiplier(weapon.rarity);

		if (weapon.level == null)
		{
			weapon.level = 1;
		}

		weapon.minDamage = (int)((1 + (weapon.level * (1 + new Random().nextInt(5))) * handMultiplier) * rarityMultiplier);
		weapon.maxDamage = (int)((2 + (weapon.level * (6 + new Random().nextInt(5))) * handMultiplier) * rarityMultiplier);

		if (weapon.rarity.isPlain())
		{
			weapon.damageType = EnumHelper.randomEnum(DamageType.class);
		}
	}

	public static double getRarityMultiplier(ItemRarity rarity)
	{
		double rarityMultiplier = 1;
		switch (rarity)
		{
			case COMMON:
				rarityMultiplier = 1.0;
				break;
			case MAGIC:
				rarityMultiplier = 1.1;
				break;
			case RARE:
				rarityMultiplier = 1.2;
				break;
			case SET:
			case LEGENDARY:
				rarityMultiplier = 1.5;
				break;
			case UNIQUE:
				rarityMultiplier = 1.6;
				break;
			case EPIC:
				rarityMultiplier = 1.7;
		}
		return rarityMultiplier;
	}
}


package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.enums.WeaponType;
import info.nemhauser.turmoil.engine.exceptions.CouldNotEquipException;
import info.nemhauser.turmoil.engine.helpers.CharacterStateHelper;

import java.lang.reflect.Field;
import java.util.HashMap;

public class Character extends Person
{
	String portrait;

	public Integer experience = 0;

	Account owner;

	String name;

	public Weapon slotRightHand;
	Item slotLeftHand; // Weapon or Accessory

	Armor slotHelm;
	Armor slotChest;
	Armor slotBelt;
	Armor slotGloves;
	Armor slotPants;
	Armor slotBoots;
	Armor slotBracers;
	Armor slotPauldrons;

	Accessory slotAmulet;
	Accessory slotRingOne;
	Accessory slotRingTwo;
	Accessory slotRingThree;
	Accessory slotRingFour;

	public Character(String ident)
	{
		super(ident);
	}

	public String toString() {
		return name + "[" + level + "]";
	}

	//TODO: remember: Unfortunately 'character' is a reserved word in MySQL therefore plural form is used as an exception

	public HashMap<String, Item> getEquippedItems()
	{
		HashMap<String, Item> equippedItems = new HashMap<>();
		try
		{
			for (Field field : getClass().getDeclaredFields())
			{
				if (!field.getName().startsWith("slot"))
				{
					continue;
				}

				Item equippedItem = (Item) field.get(this);
				if (equippedItem == null)
				{
					continue;
				}
				equippedItems.put(equippedItem.getIdent(), equippedItem);
			}
		}
		catch (IllegalAccessException e)
		{
			e.printStackTrace();
		}

		return equippedItems;
	}

	public Item unequip(String itemIdent)
	{
		Item itemToReturn = null;

		try
		{
			for (Field field : getClass().getDeclaredFields())
			{
				if (!field.getName().startsWith("slot"))
				{
					continue;
				}

				Item equippedItem = (Item) field.get(this);
				if (equippedItem == null)
				{
					continue;
				}

				if (equippedItem.getIdent().equals(itemIdent))
				{
					itemToReturn = equippedItem;
					field.set(this, null);
				}
			}
		}
		catch (IllegalAccessException e)
		{
			e.printStackTrace();
		}

		if (itemToReturn != null)
		{
			// TODO: do it better
			CharacterStateHelper.removeItem(getCharacterState(), itemToReturn);
		}

		return itemToReturn;
	}

	public Item equip(Item item) throws CouldNotEquipException
	{
		Item itemToReturn = null;

		switch (item.itemType)
		{
			case ARMOR -> {
				itemToReturn = equipArmor((Armor) item);

				break;
			}
			case ACCESSORY -> {
				itemToReturn = equipAccessory((Accessory) item);

				break;
			}
			case WEAPON -> {
				itemToReturn = equipWeapon((Weapon) item);

				break;
			}
		}

		if (item.getItemSlot() != null)
		{
			// TODO: do it better
			CharacterStateHelper.addItem(getCharacterState(), item);
		}

		return itemToReturn;
	}

	public Armor equipArmor(Armor armor)
	{
		Armor replacedItem = null;
		switch (armor.getArmorType())
		{
			case HELM -> {
				replacedItem = slotHelm;
				slotHelm = armor;
				slotHelm.setItemSlot(ItemSlot.HELM);

				return replacedItem;
			}
			case CHEST -> {
				replacedItem = slotChest;
				slotChest = armor;
				slotChest.setItemSlot(ItemSlot.CHEST);

				return replacedItem;
			}
			case BELT -> {
				replacedItem = slotBelt;
				slotBelt = armor;
				slotBelt.setItemSlot(ItemSlot.BELT);

				return replacedItem;
			}
			case GLOVES -> {
				replacedItem = slotGloves;
				slotGloves = armor;
				slotGloves.setItemSlot(ItemSlot.GLOVES);

				return replacedItem;
			}
			case PANTS -> {
				replacedItem = slotPants;
				slotPants = armor;
				slotPants.setItemSlot(ItemSlot.PANTS);

				return replacedItem;
			}
			case BOOTS -> {
				replacedItem = slotBoots;
				slotBoots = armor;
				slotBoots.setItemSlot(ItemSlot.BOOTS);

				return replacedItem;
			}
			case BRACERS -> {
				replacedItem = slotBracers;
				slotBracers = armor;
				slotBracers.setItemSlot(ItemSlot.BRACERS);

				return replacedItem;
			}
			case PAULDRONS -> {
				replacedItem = slotPauldrons;
				slotPauldrons = armor;
				slotPauldrons.setItemSlot(ItemSlot.PAULDRONS);

				return replacedItem;
			}
		}

		return null;
	}

	public Item equipWeapon(Weapon weapon) throws CouldNotEquipException
	{
		Item replacedItem = null;
		if (weapon.isOneHanded())
		{
			if (slotRightHand == null)
			{
				slotRightHand = weapon;
				slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
			}
			else if (slotLeftHand == null && slotRightHand.isOneHanded())
			{
				slotLeftHand = weapon;
				slotLeftHand.setItemSlot(ItemSlot.LEFT_HAND);
			}
			else
			{
				replacedItem = slotRightHand;
				slotRightHand = weapon;
				slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
			}
		}
		else if (slotLeftHand == null)
		{
			replacedItem = slotRightHand;
			slotRightHand = weapon;
			slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
		}
		else if (slotRightHand == null)
		{
			replacedItem = slotLeftHand;
			slotLeftHand = null;
			slotRightHand = weapon;
			slotRightHand.setItemSlot(ItemSlot.RIGHT_HAND);
		}
		else
		{
			throw new CouldNotEquipException("Could not equip: " + weapon.itemCode);
		}

		return replacedItem;
	}

	public Item equipAccessory(Accessory accessory) throws CouldNotEquipException
	{
		Item replacedItem = null;
		switch (accessory.getAccessoryType())
		{
			case AMULET -> {
				replacedItem = slotAmulet;
				slotAmulet = accessory;
				slotAmulet.setItemSlot(ItemSlot.AMULET);

				return replacedItem;
			}
			case RING -> {
				if (slotRingOne == null)
				{
					slotRingOne = accessory;
					slotRingOne.setItemSlot(ItemSlot.RING_ONE);
				}
				else if (slotRingTwo == null)
				{
					slotRingTwo = accessory;
					slotRingTwo.setItemSlot(ItemSlot.RING_TWO);
				}
				else if (slotRingThree == null)
				{
					slotRingThree = accessory;
					slotRingThree.setItemSlot(ItemSlot.RING_THREE);
				}
				else
				{
					replacedItem = slotRingFour;
					slotRingFour = accessory;
					slotRingFour.setItemSlot(ItemSlot.RING_FOUR);
				}

				return replacedItem;
			}
			case MOJO, SOURCE, SHIELD -> {
				if (slotRightHand != null && !slotRightHand.isOneHanded())
				{
					replacedItem = slotRightHand;
				}
				else if (slotLeftHand != null)
				{
					replacedItem = slotLeftHand;
				}
				slotLeftHand = accessory;
				slotLeftHand.setItemSlot(ItemSlot.LEFT_HAND);

				return replacedItem;
			}
			case QUIVER -> {
				if (slotRightHand == null
						|| slotRightHand.getWeaponType() == WeaponType.BOW
						|| slotRightHand.getWeaponType() == WeaponType.CROSSBOW)
				{
					replacedItem = slotLeftHand;
					slotLeftHand = accessory;
					slotLeftHand.setItemSlot(ItemSlot.LEFT_HAND);
				}
				else
				{
					throw new CouldNotEquipException("Could not equip: " + accessory.itemCode);
				}

				return replacedItem;
			}
		}

		return null;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public CharacterState getCharacterState()
	{
		return (CharacterState) characterState;
	}

	public void setCharacterState(CharacterState characterState)
	{
		this.characterState = characterState;
	}

	@Override
	public DamageType getDamageType()
	{
		if (slotRightHand == null)
		{
			return DamageType.PHYSICAL;
		}

		return slotRightHand.damageType;
	}
}

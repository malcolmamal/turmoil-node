package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.templates.ItemTemplate;

public class Item
{
	public static int globalId = 1;

	public int id = 1; // will be filled by hibernate later on

	public String itemCode;
	public String itemName;
	public Integer level = 1;

	Integer durability = 1;
	Integer priceValue = 1;

	public ItemType itemType;
	public ItemRarity rarity = ItemRarity.COMMON;

	Boolean isCrafted = false;
	Boolean isEquipped = false;
	Boolean isStashed = false;

	Stash stash;

	Character craftedBy;
	Account owner;

	ItemSlot itemSlot;

	public Attribute[] attributes;

	public Item(ItemTemplate template)
	{
		id = globalId;
		globalId++;

		rarity = template.rarity;
		itemCode = template.itemCode;
	}

	public ItemSlot getItemSlot()
	{
		return itemSlot;
	}

	public void setItemSlot(ItemSlot itemSlot)
	{
		this.itemSlot = itemSlot;
	}

	public String toString() {
		return itemName + " [" + itemType + "]";
	}

	public String getFileCode()
	{
		return itemCode.toLowerCase();
	}

	public String getRarityClass()
	{
		return switch (rarity)
		{
			case COMMON -> "white";
			case MAGIC -> "blue";
			case RARE -> "yellow";
			case LEGENDARY -> "orange";
			case SET -> "green";
			case UNIQUE -> "red";
			case EPIC -> "purple";
		};
	}

	public String[] getItemProperties()
	{
		return new String[]{};
	}

	public void putToStash(Stash newStash)
	{
		if (newStash != null)
		{
			stash = newStash;
			isStashed = true;
		}
	}

	public String getImagePath()
	{
		return "/images/items/";
	}

	public String getFullImagePath()
	{
		return getImagePath() + "/" + getFileCode() + ".png";
	}

	public String toStringFull()
	{
		String value =	"itemCode: "	+ itemCode		+ ", " +
					"itemName: "	+ itemName		+ ", " +
					"itemType: "	+ itemType		+ ", " +
					"level: "		+ level			+ ", " +
					"rarity: "		+ rarity		+ ", " +
					"isCrafted: "	+ isCrafted		+ ", " +
					"isEquipped: "	+ isEquipped	+ ", " +
					"isStashed: "	+ isStashed		+ ", " +
					"stash: "		+ stash			+ ", " +
					"craftedBy: "	+ craftedBy		+ ", " +
					"owner: "		+ owner			+ ", " +
					"itemSlot: "	+ itemSlot;

		value += ", [attributes: ";

		//TODO: ITERATOR
		/*
		attributes.each {
			value += it.toStringFull() + " ";
		}
		*/
		value += "]";

		return value;
	}

	public boolean isSquareLayout()
	{
		return false;
	}

	public boolean isLongLayout()
	{
		return false;
	}

	public String getTooltipShapeClass()
	{
		if (isSquareLayout())
		{
			return "square";
		}

		if (isLongLayout())
		{
			return "long";
		}

		return "default";
	}

	public String getTooltipEffectClass()
	{
		return "";
	}

	public String getItemTypeClass()
	{
		return "";
	}

	public String getIdent()
	{
		return "ident-" + id;
	}

	public boolean isArmor()
	{
		return itemType == ItemType.ARMOR;
	}

	public boolean isWeapon()
	{
		return itemType == ItemType.WEAPON;
	}

	public boolean isAccessory()
	{
		return itemType == ItemType.ACCESSORY;
	}

	public ItemType getItemType()
	{
		return itemType;
	}
}

package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Accessory;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.enums.ItemSlot;
import info.nemhauser.turmoil.engine.enums.ItemType;

public class ItemInEquipmentResponse
{
	private String ident;
	private String fileCode;
	private String filePath;
	private String rarity;
	private String type;

	private String itemSpecificType;

	private String damageType;
	private String slot;

	/*
	 * TODO: extends ItemInEquipmentResponse
	 */

	public ItemInEquipmentResponse(Item item, ItemSlot slot)
	{
		this.ident = item.getIdent();
		this.fileCode = item.getFileCode();
		this.filePath = item.getFullImagePath();
		this.rarity = item.getRarityClass();
		this.type = item.itemType.toString();
		this.slot = slot.getClassName();

		this.damageType = "";
		switch (item.getItemType())
		{
			case WEAPON -> {
				Weapon weapon = (Weapon) item;
				this.damageType = weapon.damageType.toString().toLowerCase();
				this.itemSpecificType = weapon.getWeaponType().toString();
			}
			case ARMOR -> {
				Armor armor = (Armor) item;
				this.itemSpecificType = armor.getArmorType().toString();
			}
			case ACCESSORY -> {
				Accessory accessory = (Accessory) item;
				this.itemSpecificType = accessory.getAccessoryType().toString();
			}
		}
	}

	public String getIdent()
	{
		return ident;
	}

	public String getFileCode()
	{
		return fileCode;
	}

	public String getFilePath()
	{
		return filePath;
	}

	public String getRarity()
	{
		return rarity;
	}

	public String getType()
	{
		return type;
	}

	public String getSlot()
	{
		return slot;
	}

	public String getDamageType()
	{
		return damageType;
	}

	public String getItemSpecificType()
	{
		return itemSpecificType;
	}
}

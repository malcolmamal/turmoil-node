package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.AccessoryType;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.templates.AccessoryTemplate;

public class Accessory extends Item
{
	private AccessoryType accessoryType;

	public Accessory(AccessoryTemplate template)
	{
		super(template);

		itemType = ItemType.ACCESSORY;
		accessoryType = template.accessoryType;
	}

	public String toString() {
		return itemName;
	}

	public boolean isSquareLayout()
	{
		return (accessoryType == AccessoryType.RING || accessoryType == AccessoryType.AMULET) ? true : false;
	}

	public String getImagePath()
	{
		return super.getImagePath() + "accessories" + (rarity.isPlain() ? "/" + getAccessoryFileCode() : "");
	}

	public String getAccessoryFileCode()
	{
		switch (accessoryType)
		{
			case AMULET:
				return "amulets";
			case MOJO:
				return "mojos";
			case QUIVER:
				return "quivers";
			case RING:
				return "rings";
			case SHIELD:
				return "shields";
			case SOURCE:
				return "sources";
		}

		return "";
	}

	public boolean isJewellery()
	{
		return (accessoryType == AccessoryType.RING || accessoryType == AccessoryType.AMULET);
	}

	public String toStringFull()
	{
		return	"[ " 				+ super.toStringFull()	+ ", " +
				"itemType: "		+ itemType				+ ", " +
				"accessoryType: "	+ accessoryType			+
				" ]";
	}

	public String getItemTypeClass()
	{
		return "accessory." + accessoryType.toString();
	}

	public AccessoryType getAccessoryType()
	{
		return accessoryType;
	}
}

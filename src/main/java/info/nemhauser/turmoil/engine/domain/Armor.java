package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.templates.ArmorTemplate;

public class Armor extends Item
{
	public ArmorType armorType;

	public Integer armorValue = 0;

	public Armor()
	{
		super();
	}

	public Armor(ArmorTemplate template)
	{
		super(template);

		itemType = ItemType.ARMOR;
		armorType = template.armorType;
		armorValue = template.armorValue;
	}

	public String toString() {
		return itemName;
	}

	public boolean isLongLayout()
	{
		return (armorType == ArmorType.BELT) ? true : false;
	}

	public String getImagePath()
	{
		return super.getImagePath() + "armors" + (rarity.isPlain() ? "/" + getArmorFileCode() : "");
	}

	public String getArmorFileCode()
	{
		switch (armorType)
		{
			case BELT:
				return "belts";
			case BOOTS:
				return "boots";
			case BRACERS:
				return "bracers";
			case CHEST:
				return "chests";
			case GLOVES:
				return "gloves";
			case HELM:
				return "helms";
			case PANTS:
				return "pants";
			case PAULDRONS:
				return "pauldrons";
		}

		return "";
	}

	public String toStringFull()
	{
		return	"[ " 			+ super.toStringFull()	+ ", " +
				"itemType: "	+ itemType				+ ", " +
				"armorType: "	+ armorType				+ ", " +
				"armorValue: "	+ armorValue			+
				" ]";
	}

	public String getTooltipEffectClass()
	{
		return "armor";
	}

	public String getItemTypeClass()
	{
		return "armor." + armorType.toString();
	}

	public ArmorType getArmorType()
	{
		return armorType;
	}
}

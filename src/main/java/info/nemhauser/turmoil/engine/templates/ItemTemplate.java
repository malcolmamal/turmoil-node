package info.nemhauser.turmoil.engine.templates;

import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;

public class ItemTemplate
{
	public String itemCode;
	public Boolean isLegendary = false;

	public ItemRarity rarity;

	public String toString()
	{
		return "itemCode: " + itemCode + ", isLegendary: " + isLegendary;
	}

	//TODO: wtf
	/*
	public Map toMap()
	{
		return [
			itemCode: itemCode,
			isLegendary: isLegendary
		]
	}

	 */
}

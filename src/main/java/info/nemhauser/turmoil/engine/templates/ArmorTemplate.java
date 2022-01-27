package info.nemhauser.turmoil.engine.templates;

import java.util.Map;

import info.nemhauser.turmoil.engine.enums.ArmorType;

public class ArmorTemplate extends ItemTemplate
{
	public Integer armorValue;

	public ArmorType armorType;

	public String toString()
	{
		return	"[ " 			+ super.toString()	+ ", " +
				"armorValue: "	+ armorValue		+ ", " +
				"armorType: "	+ armorType			+
				" ]";
	}

	//TODO: wtf
	/*
	public Map toMap()
	{
		return super.toMap() + [
			armorValue: armorValue,
			armorType: armorType
		]
	}

	 */
}

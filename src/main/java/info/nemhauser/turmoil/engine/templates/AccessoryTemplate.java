package info.nemhauser.turmoil.engine.templates;

import info.nemhauser.turmoil.engine.enums.AccessoryType;

import java.util.Map;

public class AccessoryTemplate extends ItemTemplate
{
	public AccessoryType accessoryType;

	public String toString()
	{
		return	"[ " 				+ super.toString()	+ ", " +
				"accessoryType: "	+ accessoryType		+
				" ]";
	}

	//TODO: wtf?
	/*
	public Map toMap()
	{
		return super.toMap() + [
			accessoryType: accessoryType
		];
	}
	 */
}

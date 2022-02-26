package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.AttributeType;

public class Attribute
{
	// public Item item;

	public AttributeType type;

	public double primaryValue = 0;
	public double secondaryValue = 0;
	public double tertiaryValue = 0;

	public Attribute()
	{

	}

	public Attribute(AttributeType attributeType, double primaryValue, double secondaryValue, double tertiaryValue) // Item item,
	{
		// this.item = item;
		this.type = attributeType;
		this.primaryValue = primaryValue;
		this.secondaryValue = secondaryValue;
		this.tertiaryValue = tertiaryValue;
	}

	public String toString() {
		return type + " [" + primaryValue + ", " + secondaryValue + ", " + tertiaryValue + "]";
	}

	public String toStringFull()
	{
		return	"[ " 				+
				"type: "			+ type				+ ", " +
				"primaryValue: "	+ primaryValue		+ ", " +
				"secondaryValue: "	+ secondaryValue	+ ", " +
				"tertiaryValue: "	+ tertiaryValue		+
				" ]";
	}

//	public double[] getValues()
//	{
//		return new double[] {primaryValue, secondaryValue, tertiaryValue};
//	}
}

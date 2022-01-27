package info.nemhauser.turmoil.engine.mechanics.combat.effects;

import info.nemhauser.turmoil.engine.enums.DamageMagnitude;
import info.nemhauser.turmoil.engine.enums.DamageType;

public class DamageDealt
{
	long value;
	DamageType type;
	DamageMagnitude magnitude;

	public DamageDealt(long value, DamageType type, DamageMagnitude magnitude)
	{
		this.value = value;
		this.type = type;
		this.magnitude = magnitude;
	}

	public long getValue()
	{
		return value;
	}

	public DamageType getType()
	{
		return type;
	}

	public DamageMagnitude getMagnitude()
	{
		return magnitude;
	}

	public boolean isCritical()
	{
		return magnitude == DamageMagnitude.CRITICAL
				|| magnitude == DamageMagnitude.DEVASTATE;
	}
}

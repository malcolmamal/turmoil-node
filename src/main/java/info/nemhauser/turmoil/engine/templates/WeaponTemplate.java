package info.nemhauser.turmoil.engine.templates;

import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.enums.WeaponType;

public class WeaponTemplate extends ItemTemplate
{
	public Integer minDamage;
	public Integer maxDamage;

	public DamageType damageType;
	public WeaponType weaponType;

	public String toString()
	{
		return	"[ " 			+ super.toString()	+ ", " +
				"minDamage: "	+ minDamage			+ ", " +
				"maxDamage: "	+ maxDamage			+ ", " +
				"damageType: "	+ damageType		+ ", " +
				"weaponType: "	+ weaponType		+
				" ]";
	}

	/*
	public Map toMap()
	{
		return super.toMap() + [
			minDamage: minDamage,
			maxDamage: maxDamage,
			damageType: damageType,
			weaponType: weaponType
		]
	}

	 */
}

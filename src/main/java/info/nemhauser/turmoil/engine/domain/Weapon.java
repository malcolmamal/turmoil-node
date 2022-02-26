package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.enums.WeaponType;
import info.nemhauser.turmoil.engine.templates.WeaponTemplate;

public class Weapon extends Item
{
	public WeaponType weaponType;
	public DamageType damageType;

	public Integer minDamage = 1;
	public Integer maxDamage = 2;

	public String toString() {
		return itemName;
	}

	public Weapon()
	{
		super();
	}

	public Weapon(WeaponTemplate template)
	{
		super(template);

		itemType = ItemType.WEAPON;
		weaponType = template.weaponType;
		damageType = template.damageType;
		minDamage = template.minDamage;
		maxDamage = template.maxDamage;
	}

	public double getAverageDamage()
	{
		Integer damage = 0;

		if (minDamage != null)
		{
			damage += minDamage;
		}

		if (maxDamage != null)
		{
			damage += maxDamage;
		}

		return damage / 2;
	}

	public boolean isOneHanded()
	{
		switch (weaponType)
		{
			case STAFF:
			case BOW:
			case CROSSBOW:
			case TWO_HANDED_AXE:
			case TWO_HANDED_MACE:
			case TWO_HANDED_SWORD:
			case POLEARM:
				return false;
			default:
				return true;
		}
	}

	public String getImagePath()
	{
		return super.getImagePath() + "weapons/" + getWeaponFileCode();
	}

	public String getWeaponFileCode()
	{
		switch (weaponType)
		{
			case STAFF:
				return "staves";
			case BOW:
				return "bows";
			case CROSSBOW:
				return "crossbows";
			case ONE_HANDED_AXE:
			case TWO_HANDED_AXE:
				return "axes";
			case ONE_HANDED_MACE:
			case TWO_HANDED_MACE:
				return "maces";
			case ONE_HANDED_SWORD:
			case TWO_HANDED_SWORD:
				return "swords";
			case POLEARM:
				return "polearms";
			case WAND:
				return "wands";
			case DAGGER:
				return "daggers";
			case SPEAR:
				return "spears";
		}

		return "";
	}

	public String toStringFull()
	{
		return	"[ " 			+ super.toStringFull()	+ ", " +
				"itemType: "	+ itemType				+ ", " +
				"weaponType: "	+ weaponType			+ ", " +
				"damageType: "	+ damageType			+ ", " +
				"minDamage: "	+ minDamage				+ ", " +
				"maxDamage: "	+ maxDamage				+ ", " +
				"avgDamage: "	+ getAverageDamage()	+
				" ]";
	}

	public String getTooltipEffectClass()
	{
		return damageType.toString().toLowerCase();
	}

	public String getItemTypeClass()
	{
		return "weapon." + weaponType.toString();
	}

	public WeaponType getWeaponType()
	{
		return weaponType;
	}
}

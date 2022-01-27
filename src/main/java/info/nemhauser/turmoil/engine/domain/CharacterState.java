package info.nemhauser.turmoil.engine.domain;

import java.util.HashMap;

public class CharacterState extends PersonState
{
	public Integer level;
	public Integer experience;
	public Integer requiredExperience;

	public double statStrength;
	public double statDexterity;
	public double statIntelligence;
	public double statVitality;



	public double healthPercentage;
	public double manaPercentage;



	public double damageMinPhysical;
	public double damageMaxPhysical;
	public double damageMinFire;
	public double damageMaxFire;
	public double damageMinCold;
	public double damageMaxCold;
	public double damageMinLightning;
	public double damageMaxLightning;
	public double damageMinPoison;
	public double damageMaxPoison;
	public double damageMinArcane;
	public double damageMaxArcane;

	public double damagePercentage;
	public double damagePercentagePhysical;
	public double damagePercentageFire;
	public double damagePercentageCold;
	public double damagePercentageLightning;
	public double damagePercentagePoison;
	public double damagePercentageArcane;

	public double evasionDodge;
	public double evasionBlock;
	public double evasionParry;

	public double lifeHit;
	public double lifeLeech;
	public double lifeRegen;

	public double manaHit;
	public double manaLeech;
	public double manaRegen;

	public double findQuantity;
	public double findQuality;
	public double findGold;

	public double reducedDamageMelee;
	public double reducedDamageRanged;

	public double movement;

	public double chanceToStun;
	public double chanceToSap;
	public double chanceToConfuse;
	public double chanceToBurn;
	public double chanceToChill;
	public double chanceToShock;
	public double chanceToDevastate;

	private final HashMap<String, Item> items = new HashMap<>();


	public void resetValues()
	{
		level = 0;

		statStrength = 0;
		statDexterity = 0;
		statIntelligence = 0;
		statVitality = 0;

		health = 0;
		mana = 0;

		healthPercentage = 0;
		manaPercentage = 0;

		damageMin = 0;
		damageMax = 0;

		damageMinPhysical = 0;
		damageMaxPhysical = 0;
		damageMinFire = 0;
		damageMaxFire = 0;
		damageMinCold = 0;
		damageMaxCold = 0;
		damageMinLightning = 0;
		damageMaxLightning = 0;
		damageMinPoison = 0;
		damageMaxPoison = 0;
		damageMinArcane = 0;
		damageMaxArcane = 0;

		damagePercentage = 0;
		damagePercentagePhysical = 0;
		damagePercentageFire = 0;
		damagePercentageCold = 0;
		damagePercentageLightning = 0;
		damagePercentagePoison = 0;
		damagePercentageArcane = 0;

		damageAvg = 0;

		critChance = 33; //TODO: only for tests
		critDamage = 100;

		armor = 0;

		evasionDodge = 0;
		evasionBlock = 0;
		evasionParry = 0;

		resistFire = 0;
		resistCold = 0;
		resistLightning = 0;
		resistPoison = 0;
		resistArcane = 0;
		resistBleed = 0;
		resistPiercing = 0;
		resistAll = 0;

		lifeHit = 0;
		lifeLeech = 0;
		lifeRegen = 0;

		manaHit = 0;
		manaLeech = 0;
		manaRegen = 0;

		findQuantity = 0;
		findQuality = 0;
		findGold = 0;

		reducedDamageMelee = 0;
		reducedDamageRanged = 0;

		movement = 0;

		chanceToStun = 0;
		chanceToSap = 0;
		chanceToConfuse = 0;
		chanceToBurn = 0;
		chanceToChill = 0;
		chanceToShock = 0;
		chanceToDevastate = 0;
	}

	public void computeAverageDamage()
	{
		damageMin = damageMinPhysical + damageMinFire + damageMinCold + damageMinLightning + damageMinPoison + damageMinArcane;
		damageMax = damageMaxPhysical + damageMaxFire + damageMaxCold + damageMaxLightning + damageMaxPoison + damageMaxArcane;

		double damageMinCrit = damageMin * critDamage / 100;
		double damageMaxCrit = damageMax * critDamage / 100;

		damageAvg = Math.round(((damageMin + damageMax)/2) * ((100 - critChance)/100.0) + ((damageMinCrit + damageMaxCrit)/2) * (critChance/100.0));
	}

	public void applyResistAll()
	{
		if (resistAll != 0)
		{
			resistFire += resistAll;
			resistCold += resistAll;
			resistLightning += resistAll;
			resistPoison += resistAll;
			resistArcane += resistAll;
			resistBleed += resistAll;
			resistPiercing += resistAll;
		}
	}

	public void applyPercentageDamage()
	{
		damagePercentage = 0;
		damagePercentagePhysical = 0;

		if (damagePercentage != 0)
		{
			damageMin = Math.round(damageMin + damageMin * damagePercentage / 100);
			damageMax = Math.round(damageMax + damageMax * damagePercentage / 100);
		}

		if (damagePercentagePhysical != 0)
		{
			damageMinPhysical = Math.round(damageMinPhysical + damageMinPhysical * damagePercentagePhysical / 100);
			damageMaxPhysical = Math.round(damageMaxPhysical + damageMaxPhysical * damagePercentagePhysical / 100);
		}

		if (damagePercentageFire != 0)
		{
			damageMinFire = Math.round(damageMinFire + damageMinFire * damagePercentageFire / 100);
			damageMaxFire = Math.round(damageMaxFire + damageMaxFire * damagePercentageFire / 100);
		}

		if (damagePercentageCold != 0)
		{
			damageMinCold = Math.round(damageMinCold + damageMinCold * damagePercentageCold / 100);
			damageMaxCold = Math.round(damageMaxCold + damageMaxCold * damagePercentageCold / 100);
		}

		if (damagePercentageLightning != 0)
		{
			damageMinLightning = Math.round(damageMinLightning + damageMinLightning * damagePercentageLightning / 100);
			damageMaxLightning = Math.round(damageMaxLightning + damageMaxLightning * damagePercentageLightning / 100);
		}

		if (damagePercentagePoison != 0)
		{
			damageMinPoison = Math.round(damageMinPoison + damageMinPoison * damagePercentagePoison / 100);
			damageMaxPoison = Math.round(damageMaxPoison + damageMaxPoison * damagePercentagePoison / 100);
		}

		if (damagePercentageArcane != 0)
		{
			damageMinArcane = Math.round(damageMinArcane + damageMinArcane * damagePercentageArcane / 100);
			damageMaxArcane = Math.round(damageMaxArcane + damageMaxArcane * damagePercentageArcane / 100);
		}
	}

	public void updateHealthAndMana()
	{
		if (healthPercentage != 0)
		{
			health = Math.round(health + health * healthPercentage / 100);
		}

		if (manaPercentage != 0)
		{
			mana = Math.round(mana + mana * manaPercentage / 100);
		}
	}

	public void capValues()
	{
		if (critChance > 75)
		{
			critChance = 75;
		}

		if (evasionBlock > 80)
		{
			evasionBlock = 80;
		}

		if (evasionDodge > 75)
		{
			evasionDodge = 75;
		}

		if (evasionParry > 75)
		{
			evasionParry = 75;
		}
	}

	public void putItem(String itemSlotKey, Item item)
	{
		items.put(itemSlotKey, item);
	}

	public boolean removeItem(String itemSlotKey)
	{
		if (items.containsKey(itemSlotKey))
		{
			items.remove(itemSlotKey);

			return true;
		}

		return false;
	}

	public HashMap<String, Item> getItems()
	{
		return items;
	}
}

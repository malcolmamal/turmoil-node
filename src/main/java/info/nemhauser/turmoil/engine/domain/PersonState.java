package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.DamageType;

public class PersonState
{
	protected double health;
	protected double mana;

	protected double damageMin;
	protected double damageMax;

	protected double damageAvg;

	protected double critChance;
	protected double critDamage;

	protected double armor;

	protected double resistFire;
	protected double resistCold;
	protected double resistLightning;
	protected double resistPoison;
	protected double resistArcane;
	protected double resistBleed;
	protected double resistPiercing;
	protected double resistAllElemental;
	protected double resistAll;

	public PersonState()
	{

	}

	public PersonState(double health, double mana, double damageMin, double damageMax, double critChance, double critDamage)
	{
		this.health = health;
		this.mana = mana;
		this.damageMin = damageMin;
		this.damageMax = damageMax;
		this.critChance = critChance;
		this.critDamage = critDamage;
	}

	public double getHealth()
	{
		return health;
	}

	public double getMana()
	{
		return mana;
	}

	public double getDamageMin()
	{
		return damageMin;
	}

	public double getDamageMax()
	{
		return damageMax;
	}

	public double getDamageAvg()
	{
		return damageAvg;
	}

	public double getCritChance()
	{
		return critChance;
	}

	public double getCritDamage()
	{
		return critDamage;
	}

	public void setDamageMin(double damageMin)
	{
		this.damageMin = damageMin;
	}

	public void setDamageMax(double damageMax)
	{
		this.damageMax = damageMax;
	}

	public void setCritChance(double critChance)
	{
		this.critChance = critChance;
	}

	public void setCritDamage(double critDamage)
	{
		this.critDamage = critDamage;
	}

	public void increaseDamageMin(double value)
	{
		this.damageMin += value;
	}

	public void increaseDamageMax(double value)
	{
		this.damageMax += value;
	}

	public void increaseCritChance(double value)
	{
		this.critChance += value;
	}

	public void increaseCritDamage(double value)
	{
		this.critDamage += value;
	}

	public double getResistFire()
	{
		return resistFire;
	}

	public void setResistFire(double resistFire)
	{
		this.resistFire = resistFire;
	}

	public double getResistCold()
	{
		return resistCold;
	}

	public void setResistCold(double resistCold)
	{
		this.resistCold = resistCold;
	}

	public double getResistLightning()
	{
		return resistLightning;
	}

	public void setResistLightning(double resistLightning)
	{
		this.resistLightning = resistLightning;
	}

	public double getResistPoison()
	{
		return resistPoison;
	}

	public void setResistPoison(double resistPoison)
	{
		this.resistPoison = resistPoison;
	}

	public double getResistArcane()
	{
		return resistArcane;
	}

	public void setResistArcane(double resistArcane)
	{
		this.resistArcane = resistArcane;
	}

	public double getResistBleed()
	{
		return resistBleed;
	}

	public void setResistBleed(double resistBleed)
	{
		this.resistBleed = resistBleed;
	}

	public double getResistPiercing()
	{
		return resistPiercing;
	}

	public void setResistPiercing(double resistPiercing)
	{
		this.resistPiercing = resistPiercing;
	}

	public double getResistAll()
	{
		return resistAll;
	}

	public void setResistAll(double resistAll)
	{
		this.resistAll = resistAll;
	}

	public void increaseResistFire(double value)
	{
		this.resistFire += value;
	}

	public void increaseResistCold(double value)
	{
		this.resistCold += value;
	}

	public void increaseResistLightning(double value)
	{
		this.resistLightning += value;
	}

	public void increaseResistPoison(double value)
	{
		this.resistPoison += value;
	}

	public void increaseResistArcane(double value)
	{
		this.resistArcane += value;
	}

	public void increaseResistBleed(double value)
	{
		this.resistBleed += value;
	}

	public void increaseResistPiercing(double value)
	{
		this.resistPiercing += value;
	}

	public void increaseResistAll(double value)
	{
		this.resistAll += value;
	}

	public double getArmor()
	{
		return armor;
	}

	public void increaseArmor(double value)
	{
		this.armor += value;
	}

	public double getResistForDamageType(DamageType damageType)
	{
		double resistToReturn = 0;

		switch (damageType)
		{
			case COLD -> resistToReturn = resistCold;
			case FIRE -> resistToReturn = resistFire;
			case ARCANE -> resistToReturn = resistArcane;
			case LIGHTNING -> resistToReturn = resistLightning;
			case POISON -> resistToReturn = resistPoison;
		}

		return resistToReturn;
	}
}

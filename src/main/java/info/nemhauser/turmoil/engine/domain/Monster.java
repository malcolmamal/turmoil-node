package info.nemhauser.turmoil.engine.domain;

import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.utils.Random;

import java.util.HashMap;

public class Monster extends Person
{
	private static int identNumber = 1;

	public Weapon slotRightHand;
	public HashMap<String, Item> lootBag = new HashMap<>();

	private DamageType damageType;

	public Monster(int position)
	{
		super("testEnemy" + identNumber++);

		instancePosition = "polygon-10-" + position;

		characterState = new PersonState(health, 100, 5, 10, 10, 50);

		pickDamageType();
	}

	public String toString() {
		return name;
	}

	private void pickDamageType()
	{
		DamageType damageType = Random.randomEnum(DamageType.class);

		if (damageType == DamageType.HEALING)
		{
			damageType = DamageType.PHYSICAL;
		}

		this.damageType = damageType;
	}

	public String getFullImagePath()
	{
		return getImagePath() + getFileCode();
	}

	@Override
	public DamageType getDamageType()
	{
		return damageType;
	}
}

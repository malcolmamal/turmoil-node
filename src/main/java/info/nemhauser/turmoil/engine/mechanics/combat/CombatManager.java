package info.nemhauser.turmoil.engine.mechanics.combat;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.*;
import info.nemhauser.turmoil.engine.enums.DamageMagnitude;
import info.nemhauser.turmoil.engine.enums.DamageType;
import info.nemhauser.turmoil.engine.mechanics.combat.effects.DamageDealt;

import java.util.Random;

public class CombatManager
{
	public static DamageDealt dealDamage(Person attacker, Person defender)
	{
		PersonState attackerState = attacker.getCharacterState();
		DamageMagnitude magnitude = getDamageMagnitude(attackerState);

		long damageToDeal = getPureDamageToDeal(attackerState, magnitude);

		double damageMitigation = getDamageMitigation(defender.getCharacterState(), attacker.getDamageType(), damageToDeal);

		if (damageMitigation > 75)
		{
			damageMitigation = 75;
		}

		damageToDeal -= Math.round(damageToDeal * damageMitigation / 100);

		return new DamageDealt(damageToDeal, attacker.getDamageType(), magnitude);
	}

	public static long getPureDamageToDeal(PersonState attackerState, DamageMagnitude magnitude)
	{
		long damageToDeal = 0;

		switch (magnitude)
		{
			case NORMAL -> damageToDeal = Math.round(attackerState.getDamageMin() + (attackerState.getDamageMax() - attackerState.getDamageMin()) * new Random().nextDouble());
			case CRITICAL -> {
				double damageMinCrit = attackerState.getDamageMin() * attackerState.getCritDamage() / 100;
				double damageMaxCrit = attackerState.getDamageMax() * attackerState.getCritDamage() / 100;

				damageToDeal = Math.round(damageMinCrit + (damageMaxCrit - damageMinCrit) * new Random().nextDouble());
			}
			case DEVASTATE -> damageToDeal = Math.round(attackerState.getDamageMax() * attackerState.getCritDamage() / 100 * 1.5);
		}

		return damageToDeal;
	}

	public static double getDamageMitigation(PersonState defenderState, DamageType damageType, long damageToDeal)
	{
		if (damageType == DamageType.PHYSICAL)
		{
			return (defenderState.getArmor() / (defenderState.getArmor() + 10 * damageToDeal)) * 100;
		}

		return defenderState.getResistForDamageType(damageType);
	}

	public static DamageMagnitude getDamageMagnitude(PersonState personState)
	{
		if (personState.getCritChance() > 0 && Math.round(100 * new Random().nextDouble()) <= personState.getCritChance())
		{
			/*
			 * 10% chance for a crit to be magnitude
			 */
			if (Math.round(100 * new Random().nextDouble()) <= 15)
			{
				return DamageMagnitude.DEVASTATE;
			}

			return DamageMagnitude.CRITICAL;
		}

		return DamageMagnitude.NORMAL;
	}
}

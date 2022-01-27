package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Person;

public class EnemyUnitResponse
{
	private final String ident;
	private final String portrait;
	private final String position;
	private final int health;
	private final double healthBar;
	private final int movementPoints;

	public EnemyUnitResponse(Person monster)
	{
		this.ident = monster.getIdent();
		this.portrait = monster.getPortrait();
		this.position = monster.getInstancePosition();
		this.health = monster.getCurrentHealth();
		this.healthBar = monster.getHealthBarValue();
		this.movementPoints = monster.getMovementPoints();
	}

	public String getIdent()
	{
		return ident;
	}

	public String getPortrait()
	{
		return portrait;
	}

	public String getPosition()
	{
		return position;
	}

	public int getHealth()
	{
		return health;
	}

	public double getHealthBar()
	{
		return healthBar;
	}

	public int getMovementPoints()
	{
		return movementPoints;
	}
}

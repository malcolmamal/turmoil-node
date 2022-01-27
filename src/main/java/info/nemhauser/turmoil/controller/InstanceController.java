package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.mechanics.combat.CombatManager;
import info.nemhauser.turmoil.engine.mechanics.combat.effects.DamageDealt;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.exceptions.GraphException;
import info.nemhauser.turmoil.engine.helpers.CharacterStateHelper;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import info.nemhauser.turmoil.engine.world.map.graph.Pathing;
import info.nemhauser.turmoil.response.*;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
class InstanceController {

	@RequestMapping(value = "/instance/initializeEnemyUnits", produces = "application/json")
	public @ResponseBody
	JSONObject instanceInitializeEnemyUnits()
	{
		JSONArray array = new JSONArray();

		for (Monster monster : TurmoilApplication.getCombatState().getEnemies().values())
		{
			array.add(new EnemyUnitResponse(monster));
		}

		JSONObject object = new JSONObject();
		object.put("enemyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instance/initializeFriendlyUnits", produces = "application/json")
	public @ResponseBody
	JSONObject instanceInitializeFriendlyUnits()
	{
		//TODO: maybe join with enemy?

		JSONArray array = new JSONArray();

		array.add(new FriendlyUnitResponse(TurmoilApplication.getCombatState().friend, TurmoilApplication.getCombatState().getPolygonsInRange()));

		JSONObject object = new JSONObject();
		object.put("friendlyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instance/instanceAddEnemy", produces = "application/json")
	public @ResponseBody
	JSONObject instanceAddEnemy()
	{
		JSONArray array = new JSONArray();

		TurmoilApplication.getCombatState().addEnemy(InstanceHelper.createMonster(TurmoilApplication.getCharacter("fox")));
		for (Monster monster : TurmoilApplication.getCombatState().getEnemies().values())
		{
			array.add(new EnemyUnitResponse(monster));
		}

		JSONObject object = new JSONObject();
		object.put("enemyUnits", array);

		return object;
	}

	@RequestMapping(value = "/instance/instanceActionOnPosition/{position}", produces = "application/json")
	public @ResponseBody
	JSONObject instanceActionOnPosition(@PathVariable String position)
	{
		CombatState cs = TurmoilApplication.getCombatState();

		JSONArray array = new JSONArray();

		// our action

		if (cs.getEnemiesOnPositions().containsKey(position))
		{
			// attack
			array.add(attackEnemyOnPosition(position));
		}
		else
		{
			// move
			try
			{
				array.add(moveToPosition(position).toJSONObject());
			}
			catch (GraphException e)
			{
				return new ExceptionResponse(e).toJSONObject();
			}
		}

		// enemy action
		for (Monster enemy: cs.getEnemies().values())
		{
			array.add(actionEnemy(enemy));
		}

		JSONObject object = new JSONObject();
		object.put("success", true);
		object.put("actions", array);

		return object;
	}

	private JSONObject attackEnemyOnPosition(String position)
	{
		Logger.log("Attacking unit at " + position);
		Character character = TurmoilApplication.getCharacter("fox");

		if (position != null)
		{
			CombatState cs = TurmoilApplication.getCombatState();
			Monster enemy = cs.getEnemyOnPosition(position);

			if (enemy == null)
			{
				return new FailedResponse("Could not find enemy for position " + position).toJSONObject();
			}

			DamageDealt damageDealt = CombatManager.dealDamage(character, enemy);
			enemy.currentHealth -= (int)damageDealt.getValue();

			JSONObject object = new JSONObject(Map.of(
					"success", true,
					"actionType", "attack",
					"type", damageDealt.getMagnitude().toString().toLowerCase(),
					"polygonId", position,
					"damageDealt", damageDealt.getValue(),
					"healthBar", enemy.getHealthBarValue(),
					"attackingUnit", character.getIdent()
			));

			if (enemy.currentHealth <= 0)
			{
				object.put("unitToRemove", new EnemyUnitResponse(enemy));

				Item item = enemy.lootBag.get("loot");
				if (item != null)
				{
					TurmoilApplication.getServerState().addItem(item);
					object.put("itemForStash", new ItemInStashResponse(item));
				}

				cs.removeEnemy(enemy);

				Monster newEnemy = InstanceHelper.createMonster(TurmoilApplication.getCharacter("fox"));
				cs.addEnemy(newEnemy);

				object.put("unitToAdd", new EnemyUnitResponse(newEnemy));
				object.put("healthBar", enemy.getHealthBarValue());

				//TODO: handle it properly
				character.experience += 10;
				//				if (character.experience >= ExperienceHelper.getRequiredExperience(character.level+1))
				//				{
				//					character.level++;
				//					character.experience = ExperienceHelper.getRequiredExperience(character.level) - character.experience;
				//				}
				CharacterStateHelper.computeValuesForCharacterState(character);
			}

			return object;
		}
		return new JSONObject();
	}

	private MoveResponse moveToPosition(String position) throws GraphException
	{
		Logger.log("Moving character to " + position);

		CombatState cs = TurmoilApplication.getCombatState();

		if (cs.friend.getInstancePosition().equals(position))
		{
			throw new GraphException("Cannot move to the same position (" + position + ")");
		}

		if (!cs.getPolygonsInRange().contains(position))
		{
			throw new GraphException("Cannot move to position (" + position + ") since it is out of range ("
				+ cs.friend.getMovementPoints() + ")");
		}

		if (cs.getEnemiesOnPositions().containsKey(position))
		{
			throw new GraphException("Cannot move to position (" + position + ") since it is already occupied");
		}

		Pathing pathing = new Pathing(cs.getInstanceGraphForEnemy(cs.friend), cs.friend.instancePosition, position);
		//TODO: do not return next but according to movementPoints
		pathing.getNextPosition();

		cs.friend.instancePosition = position;

		return new MoveResponse(
				"move",
				true,
				cs.friend.instancePosition,
				cs.friend.getIdent(),
				new FriendlyUnitResponse(cs.friend, cs.getPolygonsInRange())
		);
	}

	private JSONObject actionEnemy(Monster enemy)
	{
		CombatState cs = TurmoilApplication.getCombatState();

		String enemyPosition = enemy.getInstancePosition();
		String characterPosition = cs.friend.getInstancePosition();

		Pathing pathing;
		String moveTo;
		try
		{
			pathing = new Pathing(cs.getInstanceGraphForEnemy(enemy), enemyPosition, characterPosition);
			moveTo = pathing.getNextPosition();
		}
		catch (GraphException e)
		{
			return new ExceptionResponse(e).toJSONObject();
		}

		Logger.log("Move distance: " + pathing.getDistance());
		Logger.log("enemy will move to: " + moveTo);

		if (moveTo.equals(cs.friend.getInstancePosition()))
		{
			Logger.log("Enemy should attack!");

			DamageDealt damageDealt = CombatManager.dealDamage(enemy, cs.friend);
			cs.friend.currentHealth -= (int)damageDealt.getValue();

			return new JSONObject(Map.of(
					"success", true,
					"polygonId", moveTo,
					"actionType", "attack",
					"type", damageDealt.getMagnitude().toString().toLowerCase(),
					"damageDealt", damageDealt.getValue(),
					"healthBar", cs.friend.getHealthBarValue(),
					"attackingUnit", enemy.getIdent()
			));
		}

		enemy.setInstancePosition(moveTo);

		return new JSONObject(Map.of(
				"success", true,
				"polygonId", moveTo,
				"actionType", "move",
				"unitToMove", enemy.getIdent()
		));
	}
}

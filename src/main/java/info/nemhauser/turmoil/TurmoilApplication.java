package info.nemhauser.turmoil;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.exceptions.CouldNotEquipException;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.engine.helpers.InstanceHelper;
import info.nemhauser.turmoil.engine.instances.CombatState;
import info.nemhauser.turmoil.engine.instances.ServerState;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TurmoilApplication
{
	private static CombatState combatState;
	private static Character character; //TODO: remove it
	private static CharacterState characterState;

	private static ServerState serverState;

	public static void main(String[] args)
	{
		SpringApplication.run(TurmoilApplication.class, args);

		Logger.log("-> Initializing Character and Combat State...");

		initializeState();

		Logger.log("-> Initialized Character and Combat State!");
	}

	private static void initializeState()
	{
		serverState = new ServerState();
		serverState.getItemTemplates().initialize();

		character = new Character("testElement");
		character.setName("Fox Nemhauser");
		character.setMovementPoints(3);
		serverState.getCharacters().put("fox", character);

		characterState = new CharacterState();
		characterState.resetValues();
		character.setCharacterState(characterState);

		try
		{
			character.equip(ItemGenerator.rollItemOfRarityAndType(character, ItemRarity.LEGENDARY, ItemType.WEAPON));
		}
		catch (CouldNotEquipException e)
		{
			e.printStackTrace();
		}

		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character));
		serverState.addItem(ItemGenerator.rollItem(character, 20));
		serverState.addItem(ItemGenerator.rollItem(character, 20));
		serverState.addItem(ItemGenerator.rollItem(character, 50));
		serverState.addItem(ItemGenerator.rollItem(character, 50));
		serverState.addItem(ItemGenerator.rollItem(character, 50));
		serverState.addItem(ItemGenerator.rollItem(character, 50));
		serverState.addItem(ItemGenerator.rollItem(character, 70));
		serverState.addItem(ItemGenerator.rollItem(character, 100));
		serverState.addItem(ItemGenerator.rollItem(character, 100));

		combatState = InstanceHelper.getCombatState(character);
	}

	public static CombatState getCombatState()
	{
		return combatState;
	}

	public static Character getCharacter(String key)
	{
		return serverState.getCharacters().get(key);
	}

	public static CharacterState getCharacterState()
	{
		return characterState;
	}

	public static ServerState getServerState()
	{
		return serverState;
	}
}

/*
 * TODO:
 *   1. at some point make sure that initial actions are loaded in one go
 *   2. seems like items can now roll with HEALING damage type :-)
 *   3. spear in second hand, equipping and unequipping two handed mace duplicates visually the spear in stash, seems like equipping it does not unequip left hand -> fixed on backend, need to check front
 *   4.
 *   5. inventory, open stashes
 *   6. some of the items (uniques or epics?) should also have negative stats (like in diablo 1) but the positive stats should be much higher that in other legendaries
 *   x.
 *   8. jira
 *   9. add movement range, show available movement at front, deny wrong movement on backend
 *  10.
 *  11. known issue, how to handle? (base armor is shown but +armor attribute is not added to base visually)
 *  12. when trying to move -> also check obstacles, try to handle it visually
 *  13. moveToPosition -> unify for friend and enemy, check if the path's length is appropriate to movementPoints
 *  14.
 *  15. request sent twice sometimes (click and then click before the item disappears, maybe blocking actions on stash/equipment should happen too?) !!!! blocking actions added, maybe this will help
 *  16. do something on dying animation maybe? just do not remove it right away, show the damages and maybe some fade away
 *  17.
 *  18. seems like wearing two hander and trying to equip a shield works... but should not
 *  19. put some armor and random resists on mobs (also add to tooltip)
 *  20. potions / skills soon?
 *  21.
 *  22. level and experience
 *  23. would be nice to add bow (ranged) logic (add range param to bows)
 *  24. check what about critical hits of player
 *  25. scaling of items and monsters with level
 *  26. should be able to equip bow if we have quiver in secondary slot, however bow and sword should not be possible
 *  27. make movement actions faster (and maybe slow down attack actions?) so the flow is better
 *  28. pass whole unit in props for FriendlyUnit and EnemyUnit
 *
 */
package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class TooltipController
{
	@RequestMapping("/tooltipTest")
	public String getTooltipTest(@RequestParam(value = "id") String id, Model model) {

		model.addAttribute("myId", id);
		model.addAttribute("yourId", "Aneta");

		return "index";
	}

	@RequestMapping("/tooltip/item/{item}")
	public String getTooltipForItem(@PathVariable String item, Model model) throws Exception
	{
		//TODO: handle not found

		Item itemForTooltip = TurmoilApplication.getServerState().getItem(item);
		if (itemForTooltip == null)
		{
			if (TurmoilApplication.getCharacter("fox").getEquippedItems().containsKey(item))
			{
				itemForTooltip = TurmoilApplication.getCharacter("fox").getEquippedItems().get(item);
			}
		}

		if (itemForTooltip == null)
		{
			throw new Exception("Tried to find item but failed, for code:" + item);
		}

		model.addAttribute("item", itemForTooltip);

		return "tooltip/item";
	}

	@RequestMapping("/tooltip/monster/{monster}")
	public String getTooltipForMonster(@PathVariable String monster, Model model) throws Exception
	{
		//TODO: handle not found

		Monster monsterForTooltip = TurmoilApplication.getCombatState().getEnemies().get(monster);
		if (monsterForTooltip == null)
		{
			throw new Exception("Tried to find monster but failed, for code:" + monster);
		}

		model.addAttribute("monster", monsterForTooltip);

		return "tooltip/monster";
	}

	@RequestMapping("/tooltip/friend/{friend}")
	public String getTooltipForFriend(@PathVariable String friend, Model model) throws Exception
	{
		//TODO: handle not found

		Character characterForTooltip = TurmoilApplication.getCharacter("fox");
		if (characterForTooltip == null)
		{
			throw new Exception("Tried to find monster but failed, for code:" + friend);
		}

		model.addAttribute("monster", characterForTooltip);

		return "tooltip/monster";
	}
}

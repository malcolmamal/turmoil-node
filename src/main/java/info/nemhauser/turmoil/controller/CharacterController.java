package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.CharacterState;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.exceptions.CouldNotEquipException;
import info.nemhauser.turmoil.response.ItemInEquipmentResponse;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CharacterController
{
	private final static String slot = "slot_right_hand";

	@RequestMapping(value = "/character/state", produces = "application/json")
	public @ResponseBody
	CharacterState getCharacterStats()
	{
		return TurmoilApplication.getCharacterState();
	}

	@RequestMapping(value = "/character/unequip/{itemKey}", produces = "application/json")
	public @ResponseBody
	JSONObject unequipItem(@PathVariable String itemKey)
	{
		//TODO: item should know on which slot it is, front should not dictate it
		JSONObject object = new JSONObject();
		Character character = TurmoilApplication.getCharacter("fox");

		Item itemForStash = character.unequip(itemKey);

		object.put("itemForStash", new ItemInEquipmentResponse(itemForStash, itemForStash.getItemSlot()));
		TurmoilApplication.getServerState().addItem(itemForStash);

		object.put("success", true);

		return object;
	}

	@RequestMapping(value = "/character/equip/{itemKey}", produces = "application/json")
	public @ResponseBody
	JSONObject equipItem(@PathVariable String itemKey)
	{
		JSONObject object = new JSONObject();

		Character character = TurmoilApplication.getCharacter("fox");
		Item itemToEquip = TurmoilApplication.getServerState().getItems().get(itemKey);

		Item itemForStash;
		try
		{
			itemForStash = character.equip(itemToEquip);
		}
		catch (CouldNotEquipException e)
		{
			object.put("message", e.getMessage());
			object.put("success", false);

			return object;
		}

		if (itemForStash != null)
		{
			object.put("itemForStash", new ItemInEquipmentResponse(itemForStash, itemForStash.getItemSlot()));
			TurmoilApplication.getServerState().addItem(itemForStash);
		}

		TurmoilApplication.getServerState().removeItem(itemToEquip);
		object.put("itemForEquipment", new ItemInEquipmentResponse(itemToEquip, itemToEquip.getItemSlot()));

		object.put("success", true);

		return object;
	}
}

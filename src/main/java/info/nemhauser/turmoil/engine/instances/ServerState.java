package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;

import java.util.HashMap;

public class ServerState
{
	private final HashMap<String, Character> characters = new HashMap<>();
	private static final HashMap<String, Item> items = new HashMap<>();

	private static final ItemTemplates itemTemplates = new ItemTemplates();
	private static boolean stashHasChanged = false;

	public HashMap<String, Character> getCharacters()
	{
		return characters;
	}

	public HashMap<String, Item> getItems()
	{
		return items;
	}

	public void addItem(Item item)
	{
		stashHasChanged = true;
		items.put(item.getIdent(), item);
	}

	public void removeItem(Item item)
	{
		stashHasChanged = true;
		items.remove(item.getIdent());
	}

	public Item getItem(String key)
	{
		if (!items.containsKey(key))
		{
			return null;
		}

		return items.get(key);
	}

	public ItemTemplates getItemTemplates()
	{
		return itemTemplates;
	}

	public boolean getStashHasChanged()
	{
		return stashHasChanged;
	}

	public void setStashHasChanged(boolean stashHasChanged)
	{
		ServerState.stashHasChanged = stashHasChanged;
	}
}

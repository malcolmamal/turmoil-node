package info.nemhauser.turmoil.engine.helpers;

import groovy.util.ConfigObject;
import groovy.util.ConfigSlurper;
import info.nemhauser.turmoil.engine.enums.*;
import info.nemhauser.turmoil.engine.templates.AccessoryTemplate;
import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
import info.nemhauser.turmoil.engine.templates.ItemTemplate;
import info.nemhauser.turmoil.engine.templates.WeaponTemplate;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

public class ItemTemplatesHelper
{
	public static ItemTemplate[] parseItems(String itemType, Boolean legendary)
	{
		HashMap<String, ItemTemplate> itemTemplates = new HashMap<String, ItemTemplate>();
		try
		{
			ConfigObject configObject = new ConfigSlurper().parse(new URL("file:properties/items-" + itemType + ".groovy")); // items-accessories.groovy

			ConfigObject items = (ConfigObject)configObject.get(legendary ? "legendaries" : itemType); //accessories legendaries
			Iterator iterator = items.keySet().iterator();

			while (iterator.hasNext())
			{
				String key = iterator.next().toString();
				ConfigObject values = (ConfigObject)items.get(key);

				ItemTemplate provideItem = provideItem(itemTemplates, key, itemType, legendary);

//				System.out.println("key: " + key);
				Set set = values.entrySet();

				Iterator setIterator = set.iterator();
				while (setIterator.hasNext())
				{
					Map.Entry<String, Object> map = (Map.Entry<String, Object>)setIterator.next();
					//TODO: newdebug
//					System.out.println("map key:" + map.getKey());
//					System.out.println("map value: " + map.getValue());
//					System.out.println("map class: "+ map.getValue().getClass());

					switch (itemType)
					{
						case "accessories":
						{
							AccessoryTemplate template = (AccessoryTemplate)provideItem;
							template.accessoryType = (AccessoryType) map.getValue();

							itemTemplates.put(key, template);
							break;
						}
						case "armors":
						{
							ArmorTemplate template = (ArmorTemplate)provideItem;
							switch (map.getKey())
							{
								case "armor_value":
								{
									template.armorValue = (Integer) map.getValue();
									break;
								}
								case "armor_type":
								{
									template.armorType = (ArmorType) map.getValue();
									break;
								}
							}

							itemTemplates.put(key, template);
							break;
						}
						case "weapons":
						{
							WeaponTemplate template = (WeaponTemplate)provideItem;

							switch (map.getKey())
							{
								case "min_damage":
								{
									template.minDamage = (Integer) map.getValue();
									break;
								}
								case "max_damage":
								{
									template.maxDamage = (Integer) map.getValue();
									break;
								}
								case "damage_type":
								{
									template.damageType = (DamageType) map.getValue();
									break;
								}
								case "weapon_type":
								{
									template.weaponType = (WeaponType) map.getValue();
									break;
								}
							}

							itemTemplates.put(key, template);
							break;
						}
					}
				}
			}
		}
		catch (MalformedURLException e)
		{
			e.printStackTrace();
		}

		return itemTemplates.values().toArray(new ItemTemplate[0]);
	}

	public static ItemTemplate provideItem(HashMap<String, ItemTemplate> itemTemplates, String itemCode, String itemType, Boolean legendary)
	{
		if (itemTemplates.containsKey(itemCode))
		{
			return itemTemplates.get(itemCode);
		}

		switch (itemType)
		{
			case "accessories":
			{
				AccessoryTemplate template = new AccessoryTemplate();
				template.itemCode = itemCode;
				template.isLegendary = legendary;

				itemTemplates.put(itemCode, template);
				return template;
			}
			case "armors":
			{
				ArmorTemplate template = new ArmorTemplate();
				template.itemCode = itemCode;
				template.isLegendary = legendary;

				itemTemplates.put(itemCode, template);
				return template;
			}
			case "weapons":
			{
				WeaponTemplate template = new WeaponTemplate();
				template.itemCode = itemCode;
				template.isLegendary = legendary;

				itemTemplates.put(itemCode, template);
				return template;
			}
		}

		return null;
	}

	public static AccessoryTemplate[] parseCommonAccessories()
	{
		ItemTemplate[] itemTemplates = parseItems("accessories", false);
		ArrayList<AccessoryTemplate> accessoryTemplates = new ArrayList<AccessoryTemplate>();

		for (ItemTemplate element : itemTemplates) {
			accessoryTemplates.add((AccessoryTemplate)element);
		}
		return accessoryTemplates.toArray(new AccessoryTemplate[0]);
	}

	public static AccessoryTemplate[] parseLegendaryAccessories()
	{
		ItemTemplate[] itemTemplates = parseItems("accessories", true);
		ArrayList<AccessoryTemplate> accessoryTemplates = new ArrayList<AccessoryTemplate>();

		for (ItemTemplate element : itemTemplates) {
			accessoryTemplates.add((AccessoryTemplate)element);
		}
		return accessoryTemplates.toArray(new AccessoryTemplate[0]);
	}

	public static ArmorTemplate[] parseCommonArmors()
	{
		ItemTemplate[] itemTemplates = parseItems("armors", false);
		ArrayList<ArmorTemplate> armorTemplates = new ArrayList<ArmorTemplate>();

		for (ItemTemplate element : itemTemplates) {
			armorTemplates.add((ArmorTemplate)element);
		}
		return armorTemplates.toArray(new ArmorTemplate[0]);
	}

	public static ArmorTemplate[] parseLegendaryArmors()
	{
		ItemTemplate[] itemTemplates = parseItems("armors", true);
		ArrayList<ArmorTemplate> armorTemplates = new ArrayList<ArmorTemplate>();

		for (ItemTemplate element : itemTemplates) {
			armorTemplates.add((ArmorTemplate)element);
		}
		return armorTemplates.toArray(new ArmorTemplate[0]);
	}

	public static WeaponTemplate[] parseCommonWeapons()
	{
		ItemTemplate[] itemTemplates = parseItems("weapons", false);
		ArrayList<WeaponTemplate> weaponTemplates = new ArrayList<WeaponTemplate>();

		for (ItemTemplate element : itemTemplates) {
			weaponTemplates.add((WeaponTemplate)element);
		}
		return weaponTemplates.toArray(new WeaponTemplate[0]);
	}

	public static WeaponTemplate[] parseLegendaryWeapons()
	{
		ItemTemplate[] itemTemplates = parseItems("weapons", true);
		ArrayList<WeaponTemplate> weaponTemplates = new ArrayList<WeaponTemplate>();

		for (ItemTemplate element : itemTemplates) {
			weaponTemplates.add((WeaponTemplate)element);
		}
		return weaponTemplates.toArray(new WeaponTemplate[0]);
	}

	public static String[] parseItemNames(Boolean isPrefix)
	{
		ArrayList<String> tokens = new ArrayList<String>(){};
		String fileNameType = (isPrefix) ? "prefix" : "suffix";
		try
		{
			InputStream file = new FileInputStream(new File("properties/names-" + fileNameType + ".groovy"));

			BufferedReader br = new BufferedReader(new InputStreamReader(file));

			String line;
			while ((line = br.readLine()) != null)
			{
				tokens.add(line);
			}
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}

		return tokens.toArray(new String[0]);
	}

	public static void getContext()
	{
		//return Holders.getGrailsApplication().mainContext;
	}
}

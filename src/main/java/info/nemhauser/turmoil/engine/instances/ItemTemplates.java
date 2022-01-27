package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.helpers.ItemTemplatesHelper;

import info.nemhauser.turmoil.engine.templates.AccessoryTemplate;
import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
import info.nemhauser.turmoil.engine.templates.WeaponTemplate;

public class ItemTemplates
{
	public AccessoryTemplate[] accessoryCommonTemplates;
	public AccessoryTemplate[] accessoryLegendaryTemplates;

	public ArmorTemplate[] armorCommonTemplates;
	public ArmorTemplate[] armorLegendaryTemplates;

	public WeaponTemplate[] weaponCommonTemplates;
	public WeaponTemplate[] weaponLegendaryTemplates;

	public String[] itemPrefixes;
	public String[] itemSuffixes;

	public void initialize()
	{
		accessoryCommonTemplates = ItemTemplatesHelper.parseCommonAccessories();
		accessoryLegendaryTemplates = ItemTemplatesHelper.parseLegendaryAccessories();

		armorCommonTemplates = ItemTemplatesHelper.parseCommonArmors();
		armorLegendaryTemplates = ItemTemplatesHelper.parseLegendaryArmors();

		weaponCommonTemplates = ItemTemplatesHelper.parseCommonWeapons();
		weaponLegendaryTemplates = ItemTemplatesHelper.parseLegendaryWeapons();

		itemPrefixes = ItemTemplatesHelper.parseItemNames(true);
		itemSuffixes = ItemTemplatesHelper.parseItemNames(false);
	}
}



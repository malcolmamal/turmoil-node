package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Item;

public class ItemInStashResponse
{
	private String ident;
	private String fileCode;
	private String filePath;
	private String rarity;
	private String type;

	public ItemInStashResponse(Item item)
	{
		this.ident = item.getIdent();
		this.fileCode = item.getFileCode();
		this.filePath = item.getFullImagePath();
		this.rarity = item.getRarityClass();
		this.type = item.itemType.toString();
	}

	public String getIdent()
	{
		return ident;
	}

	public String getFileCode()
	{
		return fileCode;
	}

	public String getFilePath()
	{
		return filePath;
	}

	public String getType()
	{
		return type;
	}

	public String getRarity()
	{
		return rarity;
	}
}
